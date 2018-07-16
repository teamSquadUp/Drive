"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SubtractVector2D = SubtractVector2D;
exports.default = Vector2D;

/**
 * Subtracts a 2D vector by a 2D vector.
 *
 * @param {Vector2D} vector1
 * @param {Vector2D} vector2
 */
function SubtractVector2D(vector1, vector2) {

	return new Vector2D(vector1.x - vector2.x, vector1.y - vector2.y);
}

/**
 * Represents a simple 2D vector with x and z values.
 *
 * @param  {Integer} x The x position of the Vector.
 * @param  {Integer} y The y position of the Vector.
 * @return {Vector2D}  A Vector2D object with all the anemities of a Vector class.
 */
function Vector2D(x, y) {

	return {

		x: x,
		y: y,

		length: function length() {

			return Math.sqrt(this.sqrtLength());
		},
		sqrtLength: function sqrtLength() {

			return this.x * this.x + this.y * this.y;
		},
		add: function add(vector) {

			this.x += vector.x;
			this.y += vector.y;
		},
		subtract: function subtract(vector) {

			this.x -= vector.x;
			this.y -= vector.y;
		},
		divide: function divide(divisor) {

			this.x /= divisor;
			this.y /= divisor;
		},
		multiply: function multiply(multiplier) {

			this.x *= multiplier;
			this.y *= multiplier;
		},
		normalize: function normalize() {

			var sqrLen = this.sqrtLength();

			if (sqrLen !== 0) {
				var factor = 1.0 / Math.sqrt(sqrLen);
				this.x *= factor;
				this.y *= factor;
			}
		},
		normalized: function normalized() {

			var sqrLen = this.sqrtLength();

			if (sqrLen !== 0) {
				var factor = 1.0 / Math.sqrt(sqrLen);
				return new Vector2D(this.x * factor, this.y * factor);
			}
			return new Vector2D(0, 0);
		}
	};
}