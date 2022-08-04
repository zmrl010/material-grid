## [4.0.1](https://github.com/zmrl010/material-grid/compare/v4.0.0...v4.0.1) (2022-08-04)


### Bug Fixes

* remove overrides ([cde88de](https://github.com/zmrl010/material-grid/commit/cde88ded1dbd53668f1144e150f733b5d50decf0))

# [4.0.0](https://github.com/zmrl010/material-grid/compare/v3.0.2...v4.0.0) (2022-08-04)


### Bug Fixes

* **build:** add jsx runtime to list of externals ([94c6af4](https://github.com/zmrl010/material-grid/commit/94c6af4c15a34bbb007b8afdcc4342e66267ea4f))
* **build:** fix sourcemap issue ([3a821c6](https://github.com/zmrl010/material-grid/commit/3a821c619a0e467f7aa47e080e765217b00b3f12))
* **build:** output types using rollup plugin ([7f0cce5](https://github.com/zmrl010/material-grid/commit/7f0cce56c0ab25ce331d765f03b9c991e819ae3c))
* extend row border to full width ([1175bd9](https://github.com/zmrl010/material-grid/commit/1175bd9e5a35ae143a317372468d784629bea733))
* fixed some bad style bugs and cleanup ([d6957e3](https://github.com/zmrl010/material-grid/commit/d6957e3b6240801f30ebaeac2c7711da9a37007c))
* **test:** set globals in vitest to allow jest-dom extensions ([d998c49](https://github.com/zmrl010/material-grid/commit/d998c49f0f8620465a1ab46cfc54346e2aa14269))
* tweak size detection to be more accurate ([69c4d96](https://github.com/zmrl010/material-grid/commit/69c4d961caabe71261337911f7b7d0c74ec9121e))
* tweak tsconfig for demo ([357e43d](https://github.com/zmrl010/material-grid/commit/357e43d567f76466d573c961cf218c84657188ea))


### Features

* implement autosizer ([7296a0f](https://github.com/zmrl010/material-grid/commit/7296a0fd28d54acd70198016689e48b6ac978924))
* install parcel to use for dev + build ([39dcc51](https://github.com/zmrl010/material-grid/commit/39dcc518198492f25f3f9a01854b0ef57f43aeca))
* upgrade to react-table v8 ([c4623ae](https://github.com/zmrl010/material-grid/commit/c4623ae83a0cdeffd9ff9e9504ff0aee63ee63d3))
* use vite for dev and final build ([296984c](https://github.com/zmrl010/material-grid/commit/296984c4a706fe6752af7a1cc2cbdfba6ede6cbf))

## [3.0.2](https://github.com/zmrl010/material-grid/compare/v3.0.1...v3.0.2) (2022-05-12)


### Bug Fixes

* add minimal generics ([ce5c121](https://github.com/zmrl010/material-grid/commit/ce5c1218b49f84f05abb5b65523f920fcc8cb3a2))

## [3.0.1](https://github.com/zmrl010/material-grid/compare/v3.0.0...v3.0.1) (2022-05-12)


### Bug Fixes

* less strict types ([4f5019c](https://github.com/zmrl010/material-grid/commit/4f5019c8d65e249a73133aa635253903f534ea21))
* turn off eslint type-checking rules ([4a95700](https://github.com/zmrl010/material-grid/commit/4a957006cb762c61c1954fb7c4eae3937704f470))

# [3.0.0](https://github.com/zmrl010/material-grid/compare/v2.0.0...v3.0.0) (2022-05-05)


### Bug Fixes

* **ci:** fix misnamed job condition ([bc72653](https://github.com/zmrl010/material-grid/commit/bc72653174356d78aa68fbec09ab52f0fb1200b1))
* **tests:** ignore dist dir ([b387659](https://github.com/zmrl010/material-grid/commit/b38765970bb47fe4ba0fd1408774779497e4bd5f))


* chore!: remove generics and context ([7032446](https://github.com/zmrl010/material-grid/commit/7032446b08c38732c1b6287d1f4b421cf5afbc89))


### Features

* include npm publish with release ([6b31b05](https://github.com/zmrl010/material-grid/commit/6b31b0566d4566abee75f59e04bf01018dd47674))


### BREAKING CHANGES

* Both features are too complex and provide little benefit.

# [2.0.0](https://github.com/zmrl010/material-grid/compare/v1.4.0...v2.0.0) (2022-05-04)


### Bug Fixes

* sorting icon inconsistency ([2acb059](https://github.com/zmrl010/material-grid/commit/2acb0595a01282906b208bace8168faebdce1a9c))


* chore!: drop support for row drag n drop ([367ec7b](https://github.com/zmrl010/material-grid/commit/367ec7b8054f699473764e64e8b3b5b4cc3a13ac))


### Features

* semantic release! ([65b8cba](https://github.com/zmrl010/material-grid/commit/65b8cba0bf7320e68776a72928ffdc952717e5e5))


### BREAKING CHANGES

* removed dependencies and props no longer reference dnd
