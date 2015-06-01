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


	it( 'should throw an error if provided input which is not an array of arrays', function test() {
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
				toMatrix( [ [ 1, 2 ], [ 3, 4 ] ], value );
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
				toMatrix(  [ [ 1, 2 ], [ 3, 4 ] ], {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a data type which is not equal to element of DTYPES', function test() {
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
				toMatrix(  [ [ 1, 2 ], [ 3, 4 ] ], {'dtype': value} );
			};
		}
	});

	it( 'should throw an error if provided an array of arrays of unequal dimensions', function test() {

		// without accessor:
		expect( badValue() ).to.throw( TypeError );

		function badValue() {
			return function() {
				toMatrix(  [ [ 1, 2, 3 ], [ 4, 5 ] ] );
			};
		}

		// with accessor:
		expect( badValue2() ).to.throw( TypeError );

		function badValue2() {
			return function() {
				toMatrix(  [ [ {'x': 1}, 2, 3 ], [ {'x': 4}, 5 ] ], {'accessor': getValue} );
			};
		}

		function getValue( d, i, j ) {
			return j === 0 ? d.x : d;
		}

	});


	it( 'should construct a Matrix from an array of arrays', function test() {

		var i, j, m, X, nRows, nCols;

		X = [
			[ 2, 4, 3, 1],
			[ 1, 2, 2, 1],
			[ 7, 3, 9, 7],
			[ 11, 9, 9, 8],
			[ 3, 2, 3, 1]
		];
		nRows = X.length;
		nCols = X[0].length;

		m = toMatrix( X );
		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				expect( m.get( i, j ) === X[i][j] ).to.be.true;
			}
		}
	});

	it( 'should construct a Matrix from an array of arrays specifying a data type', function test() {

		var i, j, m, X, expected, nRows, nCols;

		X = [
			[ 2.2, 4, 3, 1],
			[ 1, 2, 2, 1],
			[ 7, 3.1, 9, 7.2],
			[ 11, 9.3, 9, 8],
			[ 3, 2, 3, 1]
		];
		nRows = X.length;
		nCols = X[0].length;

		expected = [
			[ 2, 4, 3, 1],
			[ 1, 2, 2, 1],
			[ 7, 3, 9, 7],
			[ 11, 9, 9, 8],
			[ 3, 2, 3, 1]
		];

		m = toMatrix( X, {'dtype': 'int32'} );
		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				expect( m.get( i, j ) === expected[i][j] ).to.be.true;
			}
		}
	});

	it( 'should construct a Matrix from an array of arrays using an accessor function', function test() {

		var i, j, m, X, nRows, nCols;

		X = [
			[ {'x': 2}, 4, 3, 1],
			[ {'x': 1}, 2, 2, 1],
			[ {'x': 7}, 3, 9, 7],
			[ {'x': 11}, 9, 9, 8],
			[ {'x': 3}, 2, 3, 1]
		];
		nRows = X.length;
		nCols = X[0].length;

		m = toMatrix( X, {'accessor': getValue} );
		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				expect( m.get( i, j ) === getValue( X[i][j], i, j ) ).to.be.true;
			}
		}

		function getValue( d, i, j ) {
			return j === 0 ? d.x : d;
		}
	});

});
