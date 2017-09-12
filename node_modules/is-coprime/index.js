'use strict';
var gcd = require('gcd');

module.exports = function (a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw new TypeError('Expected a number');
	}

	return gcd(a, b) === 1;
};
