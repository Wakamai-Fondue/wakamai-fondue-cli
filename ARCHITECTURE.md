# Architecture

This CLI is a thin wrapper around https://github.com/Wakamai-Fondue/wakamai-fondue-engine.
It supports Node 12 and up.

The WF engine is not currently published on NPM, but requires to be compiled for the following reasons:

1. WF engine uses ES modules, which are only available behind a feature flag on Node 12
2. WF engine imports JSON which requires a feature flag, even on Node 15. See https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_json_module_loading.

For compilation we currently rely on the following behaviour:

-   The engine dependency is loaded straight from GitHub
-   NPM installs devDependencies for git dependencies if they have a `prepare` script and runs the `prepare` script which compiles the engine. See https://docs.npmjs.com/cli/v6/using-npm/scripts#life-cycle-scripts.
