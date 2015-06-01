'use strict';

// MODULES //

var isArrayArray = require( 'validate.io-array-array' ),
	isFunction = require( 'validate.io-function' ),
	isObject = require( 'validate.io-object' ),
	contains = require( 'validate.io-contains' );

var matrix = require( 'compute-matrix' );

// VARIABLES //

var DTYPES = require( './dtypes.js' );

// TOMATRIX //

/**
* FUNCTION: toMatrix( arr[, options ] )
*	Construct a matrix from an array of arrays.
*
* @param {Array} arr - input array of arrays
* @param {Object} [options] - function options
* @param {String} [options.dtype='float64'] - specifies the data type of the created matrix
* @param {Function} [options.accessor] - accessor function for accessing object array values
* @returns {Matrix} an instance of `Matrix` with values equal to those in arr
*/
function toMatrix( arr, opts ) {

	var nCols, nRows, i, j, clbk, dtype, ret, val;

	if ( !isArrayArray( arr ) ) {
		throw new TypeError( 'to-matrix()::invalid input argument. The first argument must be an array of arrays. Value: `' + arr + '`.' );
	}

	if ( arguments.length >  1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'to-matrix()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}

		if ( opts.hasOwnProperty( 'dtype' ) ) {
			dtype = opts.dtype;
			if ( !contains( DTYPES, dtype ) ) {
				throw new TypeError( 'to-matrix()::invalid input argument. Unrecognized/unsupported data type. Value: `' + dtype + '`.' );
			}
		}

		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'to-matrix()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}

	nRows = arr.length;
	nCols = arr[0].length;

	if ( dtype ) {
		ret = matrix( [ nRows, nCols ], dtype );
	} else {
		ret = matrix( [ nRows, nCols ] );
	}

	if ( !clbk ) {
		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				if ( arr[i].length !== nCols ) {
					throw new TypeError( 'to-matrix()::invalid input argument. Each array in the input array of arrays must have the same length. Value: `' + arr + '`.' );
				}
				ret.set( i, j, arr[ i ][ j ] );
			}
		}
	} else {
		for ( i = 0; i < nRows; i++ ) {
			for ( j = 0; j < nCols; j++ ) {
				if ( arr[i].length !== nCols ) {
					throw new TypeError( 'to-matrix()::invalid input argument. Each array in the input array of arrays must have the same length. Value: `' + arr + '`.' );
				}
				val = clbk( arr[ i ][ j ], i, j );
				ret.set( i, j, val );
			}
		}
	}
	return ret;
} // end FUNCTION toMatrix()


// EXPORTS //

module.exports = toMatrix;
