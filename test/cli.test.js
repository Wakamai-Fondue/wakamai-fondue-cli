let path = require("path");
let exec = require("child_process").exec;

describe("help", () => {
	test("renders help on -h", async () => {
		const { exitCode, stdout } = await cli(["-h"]);

		expect(exitCode).toBe(0);
		expect(stdout).toContain("Usage: wakamai-fondue [options]");
	});

	test("renders help on --help", async () => {
		const { exitCode, stdout } = await cli(["-h"]);

		expect(exitCode).toBe(0);
		expect(stdout).toContain("Usage: wakamai-fondue [options]");
	});

	test("renders help if no arguments are given", async () => {
		const { exitCode, stdout } = await cli([""]);

		expect(exitCode).toBe(1);
		expect(stdout).toContain("Usage: wakamai-fondue [options]");
	});
});

describe("font file path", () => {
	test("error when path does not exist", async () => {
		const { exitCode, stdout, stderr } = await cli([
			"./test/fixtures/bogus/nothing.ttf",
			"--info",
		]);

		expect(exitCode).toBe(1);
		expect(stdout).toBe("");
		expect(stderr).toBe(
			"./test/fixtures/bogus/nothing.ttf: No such file\n"
		);
	});

	test("error when path is not a font", async () => {
		const { exitCode, stdout, stderr } = await cli([
			"./test/fixtures/roboto/LICENSE",
			"--info",
		]);

		expect(exitCode).toBe(1);
		expect(stdout).toBe("");
		expect(stderr).toBe(
			"Error: FontNode error. File extension is missing.\n"
		);
	});
});

describe("--css", () => {
	test("renders font CSS for all features", async () => {
		const { exitCode, stdout } = await cli([
			"./test/fixtures/roboto/Roboto-Regular.ttf",
			"--css",
		]);

		expect(exitCode).toBe(0);
		expect(stdout).toMatch(
			/CSS for/
		); /* FIXME: Not including Font name now as it currently includes null bytes. */
		expect(stdout).toMatch(/Generated by Wakamai Fondue/);
	});
});

describe("--info", () => {
	test("dumps all font info", async () => {
		const { exitCode, stdout } = await cli([
			"./test/fixtures/roboto/Roboto-Regular.ttf",
			"--info",
		]);

		expect(exitCode).toBe(0);

		const parsedInfo = JSON.parse(stdout);
		expect(parsedInfo["Filename"]).toBe("Roboto-Regular.ttf");
	});
});

function cli(args, cwd = ".") {
	return new Promise((resolve) => {
		exec(
			`node ${path.resolve("./index")} ${args.join(" ")}`,
			{ cwd },
			(error, stdout, stderr) => {
				resolve({
					exitCode: error && error.code ? error.code : 0,
					error,
					stdout,
					stderr,
				});
			}
		);
	});
}
