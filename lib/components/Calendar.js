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

var _Heading = require('./Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _DaysOfWeek = require('./DaysOfWeek');

var _DaysOfWeek2 = _interopRequireDefault(_DaysOfWeek);

var _MonthSelector = require('./MonthSelector');

var _MonthSelector2 = _interopRequireDefault(_MonthSelector);

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _utilsMomentHelper = require('../utils/moment-helper');

var _momentJalaali = require('moment-jalaali');

var _momentJalaali2 = _interopRequireDefault(_momentJalaali);

// Load Persian localisation
_momentJalaali2['default'].loadPersian();

var Calendar = (function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _this = this;

    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      month: this.props.defaultMonth || this.props.selectedDay || (0, _momentJalaali2['default'])(this.props.min),
      selectedDay: this.props.selectedDay || null,
      mode: 'days'
    };

    this.handleClickOnDay = function (selectedDay) {
      var onSelect = _this.props.onSelect;

      _this.selectDay(selectedDay);
      if (onSelect) {
        onSelect(selectedDay);
      }
    };

    this.days = null;
    this.lastRenderedMonth = null;
  }

  _createClass(Calendar, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        nextMonth: this.nextMonth.bind(this),
        prevMonth: this.prevMonth.bind(this),
        setCalendarMode: this.setMode.bind(this),
        setMonth: this.setMonth.bind(this)
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var selectedDay = _ref.selectedDay;
      var defaultMonth = _ref.defaultMonth;
      var min = _ref.min;

      if (this.props.selectedDay !== selectedDay) {
        this.selectDay(selectedDay);
      } else if (defaultMonth && this.props.defaultMonth !== defaultMonth && this.state.month === this.props.defaultMonth) {
        this.setMonth(defaultMonth);
      } else if (min && this.props.min !== min && this.state.month.isSame(this.props.min)) {
        this.setMonth(min.clone());
      }
    }
  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.setState({ mode: mode });
    }
  }, {
    key: 'setMonth',
    value: function setMonth(month) {
      this.setState({ month: month });
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      this.setState({
        month: this.state.month.clone().add(1, 'jMonth')
      });
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth() {
      this.setState({
        month: this.state.month.clone().subtract(1, 'jMonth')
      });
    }
  }, {
    key: 'selectDay',
    value: function selectDay(selectedDay) {
      var month = this.state.month;

      if (selectedDay.format('jYYYYjMM') !== month.format('jYYYYjMM')) {
        this.setState({ month: selectedDay });
      }

      this.setState({ selectedDay: selectedDay });
    }
  }, {
    key: 'renderMonthSelector',
    value: function renderMonthSelector() {
      var month = this.state.month;

      return _react2['default'].createElement(_MonthSelector2['default'], { selectedMonth: month });
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this2 = this;

      var _state = this.state;
      var month = _state.month;
      var selectedDay = _state.selectedDay;
      var _props = this.props;
      var min = _props.min;
      var max = _props.max;

      var days = undefined;

      if (this.lastRenderedMonth === month) {
        days = this.days;
      } else {
        days = (0, _utilsMomentHelper.getDaysOfMonth)(month);
        this.days = days;
        this.lastRenderedMonth = month;
      }

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_Heading2['default'], { month: month }),
        _react2['default'].createElement(_DaysOfWeek2['default'], null),
        _react2['default'].createElement(
          'div',
          { className: 'calendar-container' },
          days.map(function (day) {
            var isCurrentMonth = day.format('jMM') === month.format('jMM');
            var disabled = (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false);
            var selected = selectedDay ? selectedDay.isSame(day, 'day') : false;

            return _react2['default'].createElement(_Day2['default'], {
              key: day.format('YYYYMMDD'),
              onClick: _this2.handleClickOnDay,
              day: day,
              disabled: disabled,
              selected: selected,
              isCurrentMonth: isCurrentMonth });
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var min = _props2.min;
      var max = _props2.max;

      var rest = _objectWithoutProperties(_props2, ['min', 'max']);

      var mode = this.state.mode;

      return _react2['default'].createElement(
        'div',
        _extends({ className: 'calendar' }, rest),
        mode === 'monthSelector' ? this.renderMonthSelector() : this.renderDays()
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      min: _react.PropTypes.object,
      max: _react.PropTypes.object,
      selectedDay: _react.PropTypes.object,
      defaultMonth: _react.PropTypes.object,
      onSelect: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      nextMonth: _react.PropTypes.func.isRequired,
      prevMonth: _react.PropTypes.func.isRequired,
      setCalendarMode: _react.PropTypes.func.isRequired,
      setMonth: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return Calendar;
})(_react.Component);

exports['default'] = Calendar;
module.exports = exports['default'];
