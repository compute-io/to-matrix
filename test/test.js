/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	toMatrix = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-to-matrix', function tests() {

	it( 'should export a function', function test() {
		expect( toMatrix ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is not an array of arrays', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			[ [], null ],
			[ [], {} ],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				toMatrix( value );
			};
		}
	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				toMatrix( [[1,2],[3,4]], value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				toMatrix( [[1,2],[3,4]], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unknown or unsupported data type', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				toMatrix( [[1,2],[3,4]], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided nested arrays with varying dimensions', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			toMatrix( [[1,2,3],[4,5]] );
		}
	});

	it( 'should construct a matrix from an array of arrays', function test() {
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
				assert.strictEqual( mat.get( i, j ), arr[ i ][ j ] );
			}
		}
	});

	it( 'should construct a matrix having a specified data type', function test() {
		var expected,
			nRows,
			nCols,
			arr,
			mat,
			i, j;

		arr = [
			[ 2.2, 4, 3, 1],
			[ 1, 2, 2, 1],
			[ 7, 3.1, 9, 7.2],
			[ 11, 9.3, 9, 8],
			[ 3, 2, 3, 1]
		];
		nRows = arr.length;
		nCols = arr[ 0 ].length;

		expected = [
			[ 2, 4, 3, 1],
			[ 1, 2, 2, 1],
			[ 7, 3, 9, 7],
			[ 11, 9, 9, 8],
			[ 3, 2, 3, 1]
		];

		mat = toMatrix( arr, {
			'dtype': 'int32'
		});

		assert.strictEqual( mat.dtype, 'int32' );

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( mat.get( i, j ), expected[ i ][ j ] );
			}
		}
	});

	it( 'should construct a matrix using an accessor function', function test() {
		var nRows,
			nCols,
			arr,
			mat,
			i, j;

		arr = [
			[ {'x': 2}, 4, 3, 1],
			[ {'x': 1}, 2, 2, 1],
			[ {'x': 7}, 3, 9, 7],
			[ {'x': 11}, 9, 9, 8],
			[ {'x': 3}, 2, 3, 1]
		];
		nRows = arr.length;
		nCols = arr[ 0 ].length;

		mat = toMatrix( arr, {
			'accessor': getValue
		});

		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				assert.strictEqual( mat.get( i, j ), getValue( arr[ i ][ j ], i, j ) );
			}
		}
		function getValue( d, i, j ) {
			return ( j === 0 ) ? d.x : d;
		}
	});

});
