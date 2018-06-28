'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Paper;

var _Vector2D = require('./Vector2D');

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Draws a falling Square on a canvas.
 *
 * @param  {Number} x   The x starting position of the Paper.
 * @param  {Number} y   The y starting position of the Paper.
 * @return {Object}     A moveable and drawable paper object.
 */
function Paper(x, y, config) {

	var angle = config.DEG_TO_RAD * Math.random() * 360;
	var corners = [];
	var randomIndex = config.COLOR_INDEX(config.COLORS);

	for (var i = 0; i < 4; i++) {
		var dx = Math.cos(angle + config.DEG_TO_RAD * (i * 90 + 45));
		var dy = Math.sin(angle + config.DEG_TO_RAD * (i * 90 + 45));
		corners[i] = new _Vector2D2.default(dx, dy);
	}

	return {
		position: new _Vector2D2.default(x, y),
		rotationSpeed: Math.random() * 600 + 800,
		angle: angle,
		rotation: config.DEG_TO_RAD * Math.random() * 360,
		cosA: 1.0,
		size: 5.0,
		oscillationSpeed: Math.random() * 1.5 + 0.5,
		xSpeed: 40.0,
		ySpeed: Math.random() * 60 + 50.0,
		corners: corners,
		time: Math.random(),
		frontColor: config.COLORS[randomIndex][0],
		backColor: config.COLORS[randomIndex][1],
		bounds: new _Vector2D2.default(0, 0),

		/**
   * Moves the paper points to a new position.
   *
   * Rotates paper, updates the x position by the oscillation of the object,
   * updates the y position by appling the current ySpeed as well as the duration
   * passed. If the element is out of bounds the paper is transported back to the
   * top.
   *
   * @param {Number} duration     The amount of time that has passed.
   */
		update: function update(duration) {

			this.time += duration;
			this.rotation += this.rotationSpeed * duration;
			this.cosA = Math.cos(config.DEG_TO_RAD * this.rotation);
			this.position.x += Math.cos(this.time * this.oscillationSpeed) * this.xSpeed * duration;
			this.position.y += this.ySpeed * duration;
			if (this.position.y > Paper.bounds.y) {
				this.position.x = Math.random() * Paper.bounds.x;
				this.position.y = 0;
			}
		},


		/**
   * Draws the paper on the given canvas.
   *
   * @param {CanvasRenderingContext2D} canvas     What to draw on.
   */
		draw: function draw(canvas) {

			if (this.cosA > 0) {
				canvas.fillStyle = this.frontColor;
			} else {
				canvas.fillStyle = this.backColor;
			}

			canvas.beginPath();
			canvas.moveTo((this.position.x + this.corners[0].x * this.size) * window.devicePixelRatio, (this.position.y + this.corners[0].y * this.size * this.cosA) * window.devicePixelRatio);

			for (var _i = 1; _i < 4; _i++) {
				canvas.lineTo((this.position.x + this.corners[_i].x * this.size) * window.devicePixelRatio, (this.position.y + this.corners[_i].y * this.size * this.cosA) * window.devicePixelRatio);
			}

			canvas.closePath();
			canvas.fill();
		}
	};
}