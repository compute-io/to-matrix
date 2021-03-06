to-matrix
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Construct a [matrix](https://github.com/dstructs/matrix) from an array of arrays.


## Installation

``` bash
$ npm install compute-to-matrix
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var toMatrix = require( 'compute-to-matrix' );
```

#### toMatrix( arr[, options ] )

Constructs a [`matrix`](https://github.com/dstructs/matrix) from an `array` of `arrays`.

``` javascript
var arr = [
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
]

var mat = toMatrix( arr );
/*
	[ 1 2 3
	  4 5 6
	  7 8 9 ]
*/
```

The function accepts the following `options`:

*	__accessor__: accessor `function` for accessing `array` values.
*	__dtype__:  [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

For non-numeric nested `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var arr = [
	[ {'x': 1}, {'x': 0}, {'x': 0} ],
	[ {'x': 0}, {'x': 1}, {'x': 0} ],
	[ {'x': 0}, {'x': 0}, {'x': 1} ],
];

function getValue( d, i, j ) {
	return d.x;
}

var mat = toMatrix( arr, {
	'accessor': getValue
});
/*
	[ 1 0 0
	  0 1 0
	  0 0 1 ]
*/
```

The `accessor` function is provided three arguments:

- 	__d__: the current element
- 	__i__: the row index of the current element
- 	__j__: the column index of the current element 

By default, the [`matrix`](https://github.com/dstructs/matrix) elements are floating-point 64-bit numbers (`float64`). To specify a different data type, set the `dtype` option.

``` javascript
var arr = [
	[ 1.1, 2.3 ],
	[ 3.2, 4.1 ]
];

var mat = toMatrix( arr, {
	'dtype': 'int32'
});
/*
	[ 1 2
	  3 4 ]
*/
```

For supported data types, see [dstructs-matrix](https://github.com/dstructs/matrix). 



## Examples

``` javascript
var toMatrix = require( 'compute-to-matrix' );

var nRows,
	nCols,
	arr,
	mat,
	i, j;

arr = [
	[ 2, 4, 3, 1],
	[ 1, 2, 2, 1],
	[ 7, 3, 9, 7],
	[ 11, 9, 9, 8],
	[ 3, 2, 3, 1]
];

nRows = arr.length;
nCols = arr[ 0 ].length;

mat = toMatrix( arr );

for ( i = 0; i < nRows; i++ ) {
	for ( j = 0; j < nCols; j++ ) {
		console.log( '(%d,%d) -> %d', i, j, mat.get( i, j ) );
	}
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-to-matrix.svg
[npm-url]: https://npmjs.org/package/compute-to-matrix

[travis-image]: http://img.shields.io/travis/compute-io/to-matrix/master.svg
[travis-url]: https://travis-ci.org/compute-io/to-matrix

[coveralls-image]: https://img.shields.io/coveralls/compute-io/to-matrix/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/to-matrix?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/to-matrix.svg
[dependencies-url]: https://david-dm.org/compute-io/to-matrix

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/to-matrix.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/to-matrix

[github-issues-image]: http://img.shields.io/github/issues/compute-io/to-matrix.svg
[github-issues-url]: https://github.com/compute-io/to-matrix/issues
