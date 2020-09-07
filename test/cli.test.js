let path = require("path");
let exec = require("child_process").exec;

test("renders help", async () => {
	const { exitCode, stdout } = await cli(["-h"]);

	expect(exitCode).toBe(0);
	expect(stdout).toContain("Usage: wakamai-fondue [options]");
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
