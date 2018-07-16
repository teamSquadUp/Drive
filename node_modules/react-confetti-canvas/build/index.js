'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Config = require('./Config');

var _Config2 = _interopRequireDefault(_Config);

var _DrawCanvas = require('./DrawCanvas');

var _DrawCanvas2 = _interopRequireDefault(_DrawCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// A basic key to value object to help setup the config values
// from the given properties.
var propsToConfig = {
	colors: 'COLORS',
	duration: 'DURATION',
	paperCount: 'PAPER_COUNT',
	ribbonCount: 'RIBBON_COUNT',
	ribbonParticleCount: 'RIBBON_PARTICLE_COUNT',
	ribbonParticleDist: 'RIBBON_PARTICLE_DIST',
	ribbonParticleThick: 'RIBBON_PARTICLE_THICK',
	ribbonParticleAngle: 'RIBBON_PARTICLE_ANGLE',
	ribbonParticleMass: 'RIBBON_PARTICLE_MASS',
	ribbonParticleDrag: 'RIBBON_PARTICLE_DRAG'
};

var ConfettiCanvas = (_temp2 = _class = function (_Component) {
	_inherits(ConfettiCanvas, _Component);

	function ConfettiCanvas() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ConfettiCanvas);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfettiCanvas.__proto__ || Object.getPrototypeOf(ConfettiCanvas)).call.apply(_ref, [this].concat(args))), _this), _this.handleCanvas = function (el) {

			if (el === null) {
				window.removeEventListener('resize', window.resizeConfetti, false);
				return;
			}

			console.log(_this.getConfig());

			(0, _DrawCanvas2.default)(el, _this.getConfig());
		}, _this.getConfig = function () {
			var configCopy = Object.assign({}, _Config2.default);

			for (var property in propsToConfig) {
				if (_this.props[property] !== undefined) {
					configCopy[propsToConfig[property]] = _this.props[property];
				}
			}

			return configCopy;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ConfettiCanvas, [{
		key: 'render',
		value: function render() {

			return _react2.default.createElement('canvas', { id: 'confetti', height: '1', width: '1', ref: this.handleCanvas });
		}
	}]);

	return ConfettiCanvas;
}(_react.Component), _class.propTypes = {
	colors: _propTypes2.default.array,
	duration: _propTypes2.default.number,
	paperCount: _propTypes2.default.number,
	ribbonCount: _propTypes2.default.number,
	ribbonParticleCount: _propTypes2.default.number,
	ribbonParticleDist: _propTypes2.default.number,
	ribbonParticleThick: _propTypes2.default.number,
	ribbonParticleAngle: _propTypes2.default.number,
	ribbonParticleMass: _propTypes2.default.number,
	ribbonParticleDrag: _propTypes2.default.number
}, _temp2);
exports.default = ConfettiCanvas;