const fs = require('mz/fs');
const uglify = require('uglify-js');
async function main() {
    const fileName = process.argv[2];

    if (!fileName) {
        console.error('Please provide a .ast file.\n');
        return;
    }

    const astJson = (await fs.readFile(fileName)).toString();
    const runtimeJs = (await fs.readFile("runtime.js")).toString();
    const astStr = JSON.parse(astJson);
    let jsCode, tempStr = new String(runtimeJs + generateJsforStatements(astStr));
    var t;
    if (t = uglify.minify(tempStr, {
        mangle: {
            toplevel: true,
        },
        nameCache: {
        }
    }).error) {
        console.error(t)
        jsCode = tempStr;
    } else {
        jsCode = uglify.minify(tempStr).code;
    }

    const outputFilename = fileName.replace(".ast", ".js");
    await fs.writeFile(outputFilename, String(jsCode));

    console.log(`Wrote ${outputFilename} .`)
}

function generateJsforStatements(statements) {
    const lines = [];
    for (const statement of statements) {
        const line = generateJsforStatementOrExpr(statement)
        lines.push(line);
    }

    return lines.join("\n")
}

function generateJsforStatementOrExpr(node) {
    if (node.type === "var_assign") {
        const varName = node.var_name.value;
        let jsExpr = node.value.value;
        let fname;

        if (node.value.type === "fun_call") {
            fname = node.value.fun_name.value;
            const argsList = node.value.arguments.map((arg) => {
                return generateJsforStatementOrExpr(arg);
            }).join(", ");

            jsExpr = `${fname}(${argsList})`;
        }

        const js = `var ${varName} = ${jsExpr};`;
        return js;

    } else if (node.type === "fun_call") {

        const fname = node.fun_name.value;
        const argsList = node.arguments.map((arg) => {
            return generateJsforStatementOrExpr(arg);
        }).join(", ");

        return `${fname}(${argsList})`;

    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "number") {
        return node.value;
    } else if (node.type === "identifier") {
        return node.value;
    } else {
        throw new Error(`Unhandled AST node type ${node.type}`);
    }
}

main().catch(err => console.log(err.stack));