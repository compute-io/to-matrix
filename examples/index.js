'use strict';

var toMatrix = require( './../lib' );

var X = [
	[ 2, 4, 3, 1],
	[ 1, 2, 2, 1],
	[ 7, 3, 9, 7],
	[ 11, 9, 9, 8],
	[ 3, 2, 3, 1]
];

var m = toMatrix( X );

console.log( m.get( 3, 0 ) );
