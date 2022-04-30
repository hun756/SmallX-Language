const fs = require('mz/fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
    const fileName = process.argv[2];

    if (!fileName) {
        console.error('Please provide a .smlx file.\n');
        return;
    }

    const astFileName = fileName.replace(".small", ".ast");
    const jsFileName = fileName.replace(".small", ".js");

    await myExec(`node parse.js ${fileName}`);
    await myExec(`node generator.js ${astFileName}`);
    await myExec(`node ${jsFileName}`);
}

async function myExec(command) {
    const output = await exec(command);
    if (output.stdout) {
        process.stdout.write(output.stdout);
    }
    if (output.stderr) {
        process.stderr.write(output.stder);
    }
}

main().catch(err => console.log(err.stack));