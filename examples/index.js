'use strict';

var toMatrix = require( './../lib' );

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
