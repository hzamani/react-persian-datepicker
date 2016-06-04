'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsPersian = require('../utils/persian');

var _utilsAssets = require('../utils/assets');

var _momentJalali = require('moment-jalali');

var _momentJalali2 = _interopRequireDefault(_momentJalali);

// List of months
var months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

var styles = {
  wrapper: {
    width: '100%',
    clear: 'both'
  },
  button: {
    float: 'right',
    width: '33.33333333%',
    height: '25%'
  },
  navButton: {
    outline: 'none'
  }
};

var MonthSelector = (function (_Component) {
  _inherits(MonthSelector, _Component);

  function MonthSelector() {
    _classCallCheck(this, MonthSelector);

    _get(Object.getPrototypeOf(MonthSelector.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      year: this.props.selectedMonth
    };
  }

  _createClass(MonthSelector, [{
    key: 'nextYear',
    value: function nextYear() {
      this.setState({
        year: this.state.year.clone().add(1, 'year')
      });
    }
  }, {
    key: 'prevYear',
    value: function prevYear() {
      this.setState({
        year: this.state.year.clone().subtract(1, 'year')
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(key) {
      var _context = this.context;
      var setMonth = _context.setMonth;
      var setCalendarMode = _context.setCalendarMode;

      setMonth((0, _momentJalali2['default'])(key, 'jM-jYYYY'));
      setCalendarMode('days');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var year = this.state.year;
      var selectedMonth = this.props.selectedMonth;

      return _react2['default'].createElement(
        'div',
        { className: 'month-selector' },
        _react2['default'].createElement(
          'div',
          { className: 'heading' },
          (0, _utilsPersian.persianNumber)(year.format('jYYYY')),
          _react2['default'].createElement('button', { type: 'button',
            title: 'سال قبل',
            style: styles.navButton,
            className: 'prev',
            onClick: this.prevYear.bind(this),
            dangerouslySetInnerHTML: _utilsAssets.rightArrow }),
          _react2['default'].createElement('button', { type: 'button',
            title: 'سال بعد',
            style: styles.navButton,
            className: 'next',
            onClick: this.nextYear.bind(this),
            dangerouslySetInnerHTML: _utilsAssets.leftArrow })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'months-list', style: styles.wrapper },
          months.map(function (name, key) {
            var buttonFingerprint = key + 1 + '-' + year.format('jYYYY');
            var selectedMonthFingerprint = selectedMonth.format('jM-jYYYY');
            var classes = [];
            var isCurrent = selectedMonthFingerprint === buttonFingerprint;

            if (isCurrent) {
              classes.push('selected-month');
            }

            return _react2['default'].createElement(
              'button',
              { className: classes.join(' '),
                isCurrent: isCurrent,
                style: styles.button,
                key: key,
                onClick: _this.handleClick.bind(_this, buttonFingerprint) },
              name
            );
          })
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      selectedMonth: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      setCalendarMode: _react.PropTypes.func.isRequired,
      setMonth: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return MonthSelector;
})(_react.Component);

exports['default'] = MonthSelector;
module.exports = exports['default'];
