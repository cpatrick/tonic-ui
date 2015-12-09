## [Tonic.ui](http://kitware.github.io/tonic-ui/)

[![Build Status](https://travis-ci.org/Kitware/tonic-ui.svg?branch=master)](https://travis-ci.org/Kitware/tonic-ui)
[![Dependency Status](https://david-dm.org/kitware/tonic-ui.svg)](https://david-dm.org/kitware/tonic-ui)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Goal
_Tonic UI_ is meant to provide a set of reusable components for building
complex user interfaces and applications while having those components well tested.

The user should be able to pick and choose what they want and only embed the 1%
they care about, all without exploding their application size.

## Documentation

See the [documentation](https://kitware.github.io/tonic-ui) for a
getting started guide, advanced documentation, and API descriptions.

## Development

The tonic suite of components can be develop independently of each other
or treated as a whole.

When fetched individually you should either install the build dependencies
in your local __node_modules__ or as global packages. Which can be done as follow:

```js
# For local setup
$ npm run dep:local
$ npm install

# For global setup
$ npm run dep:global
$ npm install
```

Otherwise you can get the full Tonic suite with the following set of commands:

```js
$ git clone https://github.com/kitware/tonic.git
$ cd tonic
$ npm install
```

### Licensing

**tonic-ui** is licensed under [BSD Clause 3](LICENSE).

### Getting Involved

Fork our repository and do great things. At [Kitware](http://www.kitware.com),
we've been contributing to open-source software for 15 years and counting, and
want to make **tonic-ui** useful to as many people as possible.
