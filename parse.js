const nearley = require('nearley');
const grammar = require('./small.js');
const fs = require('mz/fs');
const { ParserRules } = require('./small.js');


async function main() {
    const fileName = process.argv[2];
    const parser =
    new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    if (!fileName) {
        console.error('Please provide a .smlx file.\n');
        return;
    }

    const code = (await fs.readFile(fileName)).toString();

    parser.feed(code);

    if (parser.results.length > 1) {
        console.error('Error: Ambigious grammar dtected.');
    } else if (parser.results.length == 1) {
        const ast = parser.results[0];
        const outputFilename = fileName.replace('.smlx', '.ast');
        await fs.writeFile(outputFilename, JSON.stringify(ast, null, "  "));
        console.log(`Wrote ouput file : ${outputFilename}`);
    } else {
        console.error('Error: no parse found.');
    }

    console.log(parser.results);
}

main().catch(err => console.log(err.stack));