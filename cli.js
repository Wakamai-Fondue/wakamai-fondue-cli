#!/usr/bin/env node
/* eslint-disable no-process-exit */
const { program } = require("commander");
const { fromPath } = require("./vendor/wf-engine/lib/index");
const packageJson = require("./package.json");
const { stdout } = require("process");

program
	.name("wakamai-fondue")
	.version(packageJson.version)
	.arguments("<file>")
	.action(run);

program.option("-c, --css", "Generate CSS");
program.option("-j, --json", "Dump info about font in JSON format");

program.exitOverride((err) => {
	if (
		err.code === "commander.missingArgument" ||
		err.code === "commander.unknownOption"
	) {
		stdout.write("\n");
		program.outputHelp();
	}

	process.exit(err.exitCode);
});

program.parse(process.argv);

async function run(file) {
	const fondue = await loadFont(file);

	if (program.css) {
		stdout.write(fondue.cssString);
	}

	if (program.json) {
		const summary = fondue.summary;
		stdout.write(JSON.stringify(summary, null, 4));
	}

	if (!program.css && !program.json) {
		program.outputHelp();
		process.exit(1);
	}
}

async function loadFont(file) {
	try {
		return await fromPath(file);
	} catch (e) {
		let errorMessage;

		switch (e.code) {
			case "ENOENT":
				errorMessage = `${file}: No such file`;
				break;
			default:
				errorMessage = e.toString();
		}

		console.error(errorMessage);
		process.exit(1);
	}
}
