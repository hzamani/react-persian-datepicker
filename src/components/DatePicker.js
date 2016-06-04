import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar';
import moment from 'moment-jalaali';

const styles = {
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

export default class DatePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node,
    min: PropTypes.object,
    max: PropTypes.object,
    defaultMonth: PropTypes.object,
    displayFormat: PropTypes.string
  };

  static defaultProps = {
    displayFormat: 'jYYYY/jMM/jDD'
  };

  state = {
    visible: false,
    value: this.props.defaultValue && moment(this.props.defaultValue, this.props.displayFormat),
    inputValue: this.props.defaultValue || ''
  };

  componentWillReceiveProps({defaultValue, displayFormat}) {
    if (this.props.defaultValue !== defaultValue) {
      const format = displayFormat || this.props.displayFormat;
      this.handleChange(moment(defaultValue, format), false, false);
    }
  }

  setVisibility(visible) {
    if (visible) {
      this.closing = true;
    }

    this.setState({visible});
  }

  handleInputChange(event) {
    const { onChange, displayFormat } = this.props;
    const inputValue = event.target.value;
    const dateTime = moment(inputValue, displayFormat);
    this.setState({inputValue});
    if (this.handleChange(dateTime, true)) {
      this.setState({value: dateTime});
    } else if (inputValue === '') {
      onChange(null);
    }
  }

  handleChange(date, preserveInput = false, callChange = true) {
    const { onChange, displayFormat } = this.props;

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

  handleSelect(date) {
    this.setVisibility(false);
    this.handleChange(date);
  }

  handleInputFocus() {
    this.setVisibility(true);
  }

  handleInputBlur() {
    setTimeout(() => {
      if (this.closing) {
        this.setVisibility(false);
      } else {
        this.closing = true;
      }
    }, 200);
  }

  render() {
    const { visible, inputValue, value } = this.state;
    const { min, max, defaultMonth, children, defaultValue, ...rest } = this.props;

    const calendarVisibilityStyle = visible ? styles.calendarVisible : styles.calendarHidden;
    const calendarStyles = {
      ...styles.calendar,
      ...calendarVisibilityStyle
    };

    const wrapperStyles = visible ? styles.wrapperVisible : styles.wrapperHidden;

    return (<div style={wrapperStyles} className="calendar-datepicker">
      <input type="text" {...rest}
             onChange={this.handleInputChange.bind(this)}
             onFocus={this.handleInputFocus.bind(this)}
             onBlur={this.handleInputBlur.bind(this)}
             value={inputValue}
             ref="formatter"/>
      { children }
      <div style={calendarStyles}
           onClick={() => {this.closing = false;}}>
        <Calendar selectedDay={value}
                  min={min}
                  max={max}
                  defaultMonth={defaultMonth}
                  onSelect={this.handleSelect.bind(this)}/>
      </div>
    </div>);
  }
}
