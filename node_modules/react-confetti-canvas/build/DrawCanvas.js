'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (canvas, config) {

	var canvasConfetti = {

		canvasParent: canvas.parentNode,
		canvasWidth: canvas.parentNode.offsetWidth,
		canvasHeight: canvas.parentNode.offsetHeight,
		context: canvas.getContext('2d'),
		interval: null,
		confettiRibbons: [],
		confettiPapers: [],

		/**
   * Resizes the canvas according to the current width and height of the usable window.
   */
		resize: function resize() {

			this.canvasWidth = this.canvasParent.offsetWidth;
			this.canvasHeight = this.canvasParent.offsetHeight;
			canvas.width = this.canvasWidth * window.devicePixelRatio;
			canvas.height = this.canvasHeight * window.devicePixelRatio;
			_Paper2.default.bounds = new _Vector2D2.default(this.canvasWidth, this.canvasHeight);
			_Ribbon2.default.bounds = new _Vector2D2.default(this.canvasWidth, this.canvasHeight);
		},


		/**
   * Sets up the size of the canvas, creates the Confetti Papers and Ribbons, cancels
   * any current animation frames and starts the update process.
   */
		start: function start() {

			this.resize();

			_Paper2.default.bounds = new _Vector2D2.default(this.canvasWidth, this.canvasHeight);
			for (var i = 0; i < config.PAPER_COUNT; i++) {
				this.confettiPapers[i] = new _Paper2.default(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight, config);
			}

			_Ribbon2.default.bounds = new _Vector2D2.default(this.canvasWidth, this.canvasHeight);
			for (var _i = 0; _i < config.RIBBON_COUNT; _i++) {
				this.confettiRibbons[_i] = new _Ribbon2.default(Math.random() * this.canvasWidth, -Math.random() * this.canvasHeight * 2, config);
			}

			this.stop();
			this.update();
		},


		/**
   * Clears the entire canvas, updates the Confetti Ribbons and Papers, draws them onto
   * the canvas and then sets the next animation frame to call this function.
   */
		update: function update() {

			this.context.clearRect(0, 0, canvas.width, canvas.height);

			for (var i = 0; i < config.RIBBON_COUNT; i++) {
				this.confettiRibbons[i].update(config.DURATION);
				this.confettiRibbons[i].draw(this.context);
			}

			for (var _i2 = 0; _i2 < config.PAPER_COUNT; _i2++) {
				this.confettiPapers[_i2].update(config.DURATION);
				this.confettiPapers[_i2].draw(this.context);
			}

			this.interval = window.requestAnimationFrame(function () {
				return canvasConfetti.update();
			});
		},
		stop: function stop() {

			window.cancelAnimationFrame(this.interval);
		}
	};

	canvasConfetti.start();
	window.resizeConfetti = function () {
		return canvasConfetti.resize();
	};
	window.addEventListener('resize', window.resizeConfetti);
};

var _Vector2D = require('./Vector2D');

var _Vector2D2 = _interopRequireDefault(_Vector2D);

var _Paper = require('./Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Ribbon = require('./Ribbon');

var _Ribbon2 = _interopRequireDefault(_Ribbon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local WindowAnimationTiming interface
window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;

/**
 * Utilizes the given canvas to draw a number of Confetti Ribbons and Papers onto it.
 *
 * NOTE:
 * Applies a onresize function to the window called "window.resizeConfetti." Once finished
 * with the DrawCanvas function remove the "window.resizeConfetti" from the resize listener.
 *
 * @param  {CanvasRenderingContext2D} canvas What to draw on.
 */