'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _momentJalaali = require('moment-jalaali');

var _momentJalaali2 = _interopRequireDefault(_momentJalaali);

var styles = {
  wrapperVisible: {
    position: 'relative'
  },
  wrapperHidden: {
    position: 'relative',
    overflow: 'hidden'
  },
  calendarHidden: {
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateY(10px)'
  },
  calendarVisible: {
    visibility: 'visible',
    opacity: 1,
    transform: 'translateY(0)'
  },
  calendar: {
    position: 'absolute',
    top: '100%',
    transition: 'all .3s ease',
    zIndex: '9999'
  }
};

var DatePicker = (function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker() {
    _classCallCheck(this, DatePicker);

    _get(Object.getPrototypeOf(DatePicker.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      visible: false,
      value: this.props.defaultValue && (0, _momentJalaali2['default'])(this.props.defaultValue, this.props.displayFormat),
      inputValue: this.props.defaultValue || ''
    };
  }

  _createClass(DatePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var defaultValue = _ref.defaultValue;
      var displayFormat = _ref.displayFormat;

      if (this.props.defaultValue !== defaultValue) {
        var format = displayFormat || this.props.displayFormat;
        this.handleChange((0, _momentJalaali2['default'])(defaultValue, format), false, false);
      }
    }
  }, {
    key: 'setVisibility',
    value: function setVisibility(visible) {
      if (visible) {
        this.closing = true;
      }

      this.setState({ visible: visible });
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var _props = this.props;
      var onChange = _props.onChange;
      var displayFormat = _props.displayFormat;

      var inputValue = event.target.value;
      var dateTime = (0, _momentJalaali2['default'])(inputValue, displayFormat);
      this.setState({ inputValue: inputValue });
      if (this.handleChange(dateTime, true)) {
        this.setState({ value: dateTime });
      } else if (inputValue === '') {
        onChange(null);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(date) {
      var preserveInput = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var callChange = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      var _props2 = this.props;
      var onChange = _props2.onChange;
      var displayFormat = _props2.displayFormat;

      if (date.isValid()) {
        if (!preserveInput) {
          this.setState({
            inputValue: date.format(displayFormat)
          });
        }

        if (onChange && callChange) {
          onChange(date);
        }

        return true;
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(date) {
      this.setVisibility(false);
      this.handleChange(date);
    }
  }, {
    key: 'handleInputFocus',
    value: function handleInputFocus() {
      this.setVisibility(true);
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur() {
      var _this = this;

      setTimeout(function () {
        if (_this.closing) {
          _this.setVisibility(false);
        } else {
          _this.closing = true;
        }
      }, 200);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var visible = _state.visible;
      var inputValue = _state.inputValue;
      var value = _state.value;
      var _props3 = this.props;
      var min = _props3.min;
      var max = _props3.max;
      var defaultMonth = _props3.defaultMonth;
      var children = _props3.children;
      var defaultValue = _props3.defaultValue;

      var rest = _objectWithoutProperties(_props3, ['min', 'max', 'defaultMonth', 'children', 'defaultValue']);

      var calendarVisibilityStyle = visible ? styles.calendarVisible : styles.calendarHidden;
      var calendarStyles = _extends({}, styles.calendar, calendarVisibilityStyle);

      var wrapperStyles = visible ? styles.wrapperVisible : styles.wrapperHidden;

      return _react2['default'].createElement(
        'div',
        { style: wrapperStyles, className: 'calendar-datepicker' },
        _react2['default'].createElement('input', _extends({ type: 'text' }, rest, {
          onChange: this.handleInputChange.bind(this),
          onFocus: this.handleInputFocus.bind(this),
          onBlur: this.handleInputBlur.bind(this),
          value: inputValue,
          ref: 'formatter' })),
        children,
        _react2['default'].createElement(
          'div',
          { style: calendarStyles,
            onClick: function () {
              _this2.closing = false;
            } },
          _react2['default'].createElement(_Calendar2['default'], { selectedDay: value,
            min: min,
            max: max,
            defaultMonth: defaultMonth,
            onSelect: this.handleSelect.bind(this) })
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      defaultValue: _react.PropTypes.string,
      onChange: _react.PropTypes.func,
      children: _react.PropTypes.node,
      min: _react.PropTypes.object,
      max: _react.PropTypes.object,
      defaultMonth: _react.PropTypes.object,
      displayFormat: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      displayFormat: 'jYYYY/jMM/jDD'
    },
    enumerable: true
  }]);

  return DatePicker;
})(_react.Component);

exports['default'] = DatePicker;
module.exports = exports['default'];
