'use strict';

// MODULES //

var isArrayArray = require( 'validate.io-array-array' ),
	isFunction = require( 'validate.io-function' ),
	isObject = require( 'validate.io-object' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw;


// TO MATRIX //

/**
* FUNCTION: toMatrix( arr[, options ] )
*	Construct a matrix from an array of arrays.
*
* @param {Array[]} arr - input array of arrays
* @param {Object} [options] - function options
* @param {String} [options.dtype='float64'] - specifies the data type of the created matrix
* @param {Function} [options.accessor] - accessor function for accessing object array values
* @returns {Matrix} new Matrix instance
*/
function toMatrix( arr, opts ) {
	/* jshint newcap:false */
	var dtype = 'float64',
		nCols,
		nRows,
		clbk,
		ctor,
		out,
		d,
		r, i, j;

	if ( !isArrayArray( arr ) ) {
		throw new TypeError( 'toMatrix()::invalid input argument. The first argument must be an array of arrays. Value: `' + arr + '`.' );
	}
	if ( arguments.length >  1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'toMatrix()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'dtype' ) ) {
			dtype = opts.dtype;
			ctor = ctors( dtype );
			if ( dtype === 'generic' || ctor === null ) {
				throw new TypeError( 'toMatrix()::invalid option. Unrecognized/unsupported data type. Option: `' + dtype + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'toMatrix()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}
	nRows = arr.length;
	nCols = arr[ 0 ].length;
	for ( i = 1; i < nRows; i++ ) {
		for ( j = 0; j < nCols; j++ ) {
			if ( arr[ i ].length !== nCols ) {
				throw new TypeError( 'toMatrix()::invalid input argument. Every nested array must have the same length. Value: `' + arr + '`.' );
			}
		}
	}
	if ( !ctor ) {
		ctor = ctors( dtype );
	}
	d = new ctor( nRows*nCols );
	out = matrix( d, [nRows,nCols], dtype );

	if ( clbk ) {
		for ( i = 0; i < nRows; i++ ) {
			r = i * nCols;
			for ( j = 0; j < nCols; j++ ) {
				d[ r + j ] = clbk( arr[ i ][ j ], i, j );
			}
		}
	} else {
		for ( i = 0; i < nRows; i++ ) {
			r = i * nCols;
			for ( j = 0; j < nCols; j++ ) {
				d[ r + j ] = arr[ i ][ j ];
			}
		}
	}
	return out;
} // end FUNCTION toMatrix()


// EXPORTS //

module.exports = toMatrix;
