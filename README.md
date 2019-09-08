# TypeScript Definitions for `mock-fs`

This repository is like a staging area so I can easily test type definitions
before submitting to DefinitelyTyped.

`mock-fs` allows Node's `fs` module to be backed by an in-memory mock file
system. Useful for running tests.

_Code repository:_ <https://github.com/tschaub/mock-fs>

_NPM entry:_ <https://www.npmjs.com/package/mock-fs>

## Notes

On Windows, if you want `dtslint` to stop complaining about the lack of NPM
packages with a matching name, you need to:

1. Add `curl` to the `PATH`.
2. Monkey patch the `download-file-sync` package in `node_modules` by adding
   `--ssl-no-revoke` to the list of arguments passed by `child_process` to
   `curl`.

If this really annoys you, create an issue regarding this to
[`dts-critic`](https://github.com/sandersn/dts-critic).
