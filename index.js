const { program } = require("commander");
const packageJson = require("./package.json");

program.name("wakamai-fondue").version(packageJson.version);

program.parse(process.argv);
