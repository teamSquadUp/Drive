'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (x, y, mass, drag) {

	return {

		position: new _Vector2D2.default(x, y),
		mass: mass,
		drag: drag,
		force: new _Vector2D2.default(0, 0),
		velocity: new _Vector2D2.default(0, 0),

		addForce: function addForce(force) {

			this.force.add(force);
		},
		integrate: function integrate(duration) {

			var acc = this.currentForce(this.position);
			acc.divide(this.mass);
			var posDelta = new _Vector2D2.default(this.velocity.x, this.velocity.y);
			posDelta.multiply(duration);
			this.position.add(posDelta);
			acc.multiply(duration);
			this.velocity.add(acc);
			this.force = new _Vector2D2.default(0, 0);
		},
		currentForce: function currentForce(_pos, _vel) {

			var totalForce = new _Vector2D2.default(this.force.x, this.force.y);
			var speed = this.velocity.length();
			var dragVel = new _Vector2D2.default(this.velocity.x, this.velocity.y);
			dragVel.multiply(this.drag * this.mass * speed);
			totalForce.subtract(dragVel);
			return totalForce;
		}
	};
};

var _Vector2D = require('./Vector2D');

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }