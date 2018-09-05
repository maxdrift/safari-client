# Safari Client

### Desktop application to select and tag images in Safari Fotosub competitions

<br/>

[![Build Status][travis-image]][travis-url]
[![Appveyor Build Status][appveyor-image]][appveyor-url]
[![Dependency Status][david_img]][david_site]
[![Github Tag][github-tag-image]][github-tag-url]

## Install

* **Note: requires a node version >= 7 and an npm version >= 4.**

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/maxdrift/safari-client.git your-project-name
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```
**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn), run `npm install`.

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ npm run dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```bash
DEBUG_PROD=true npm run package
```

## How to add modules to the project

See [HERE](https://github.com/chentsulin/electron-react-boilerplate)

## License
MIT © [Riccardo Massari](https://github.com/maxdrift)

[github-tag-image]: https://img.shields.io/github/tag/maxdrift/safari-client.svg
[github-tag-url]: https://github.com/maxdrift/safari-client/releases/latest
[travis-image]: https://travis-ci.org/maxdrift/safari-client.svg?branch=master
[travis-url]: https://travis-ci.org/maxdrift/safari-client
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/maxdrift/safari-client?svg=true
[appveyor-url]: https://ci.appveyor.com/project/maxdrift/safari-client/branch/master
[david_img]: https://img.shields.io/david/maxdrift/safari-client.svg
[david_site]: https://david-dm.org/maxdrift/safari-client
