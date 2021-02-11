# Architecture

This CLI is a thin wrapper around https://github.com/Wakamai-Fondue/wakamai-fondue-engine.
It supports Node 12 and up.

The WF engine is not currently published on NPM. It requires precompilation for the following reasons:

1. WF engine uses ES modules, which are only available behind a feature flag on Node 12
2. WF engine imports JSON which requires a feature flag, even on Node 15. See https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_json_module_loading.

The WF engine is vendored into this repo and pre-compiled as part of the build process.

To update the engine, run the following command from the root of the repo:

```sh
git subtree pull --prefix vendor/wf-engine https://github.com/Wakamai-Fondue/wakamai-fondue-engine.git master --squash
```
