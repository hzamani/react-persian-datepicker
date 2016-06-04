'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsPersian = require('../utils/persian');

var styles = {
  wrapper: {
    padding: 5,
    float: 'right',
    width: '14.28571429%'
  },
  button: {
    outline: 'none',
    cursor: 'pointer'
  }
};

var Day = (function (_Component) {
  _inherits(Day, _Component);

  function Day() {
    _classCallCheck(this, Day);

    _get(Object.getPrototypeOf(Day.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Day, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.selected !== this.props.selected || nextProps.disabled !== this.props.disabled || nextProps.isCurrentMonth !== this.props.isCurrentMonth;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      var _props = this.props;
      var onClick = _props.onClick;
      var day = _props.day;

      if (onClick) {
        onClick(day);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var day = _props2.day;
      var disabled = _props2.disabled;
      var selected = _props2.selected;
      var isCurrentMonth = _props2.isCurrentMonth;
      var onClick = _props2.onClick;

      var rest = _objectWithoutProperties(_props2, ['day', 'disabled', 'selected', 'isCurrentMonth', 'onClick']);

      var className = [];

      if (selected) {
        className.push('selected');
      }

      if (isCurrentMonth) {
        className.push('current-month');
      }

      return _react2['default'].createElement(
        'div',
        { className: 'day-wrapper',
          style: styles.wrapper },
        _react2['default'].createElement(
          'button',
          _extends({ type: 'button',
            onClick: this.handleClick.bind(this),
            disabled: disabled,
            className: className.join(' '),
            style: styles.button }, rest),
          (0, _utilsPersian.persianNumber)(day.format('jD'))
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      day: _react.PropTypes.object.isRequired,
      isCurrentMonth: _react.PropTypes.bool,
      disabled: _react.PropTypes.bool,
      selected: _react.PropTypes.bool,
      onClick: _react.PropTypes.func
    },
    enumerable: true
  }]);

  return Day;
})(_react.Component);

exports['default'] = Day;
module.exports = exports['default'];
