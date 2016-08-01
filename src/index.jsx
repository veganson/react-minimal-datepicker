import React, { PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
//todo change url
import { getAllDaysOfMonth, getArrayOfYears } from './helpers/dateHelper.js';

export default class ReactMinimalDatepicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDateChange = this.onDateChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderMonths = this.renderMonths.bind(this);
    this.renderYears = this.renderYears.bind(this);

    this.dateFormatForOnChange = props.format || 'x';

    this.years = getArrayOfYears(+props.numberOfYearsToShow || 100);
    this.months = moment.months();
    this.days = getAllDaysOfMonth(_.first(this.years), 0);
    this.selectedMoment = moment()
      .year(_.first(this.years))
      .month(_.first(this.months))
      .date(_.first(this.days))
      .startOf('day');

    this.renderedYears = this.renderYears();
    this.renderedDays = this.renderDays();
    this.renderedMonths = this.renderMonths();
  }

  componentWillReceiveProps(nextProps) {
    if (+nextProps.selected !== +this.selectedMoment.format('x')) {
      this.selectedMoment = moment(+nextProps.selected);
    }
  }

  onDateChange() {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.selectedMoment.format(this.dateFormatForOnChange));
    }
    this.forceUpdate();
  }

  onDayChange(e) {
    e.stopPropagation();
    if (typeof this.props.onDayChange === 'function') {
      this.props.onDayChange(e);
    }
    this.selectedMoment.date(e.target.value);
    this.onDateChange();
  }

  onMonthChange(e) {
    e.stopPropagation();
    if (typeof this.props.onMonthChange === 'function') {
      this.props.onMonthChange(e);
    }
    this.selectedMoment.month(e.target.value);
    this.days = getAllDaysOfMonth(this.selectedMoment.year(), this.selectedMoment.month());
    this.renderedDays = this.renderDays();
    this.onDateChange();
  }

  onYearChange(e) {
    e.stopPropagation();
    if (typeof this.props.onYearChange === 'function') {
      this.props.onYearChange(e);
    }
    this.selectedMoment.year(e.target.value);
    this.days = getAllDaysOfMonth(this.selectedMoment.year(), this.selectedMoment.month());
    this.renderedDays = this.renderDays();
    this.onDateChange();
  }

  renderDays() {
    return _.map(this.days, (day) => (
      <option value={day} key={`datepicker_days_${day}`}>{day}</option>
    ));
  }

  renderMonths() {
    return _.map(this.months, (month) => (
      <option value={_.indexOf(this.months, month)}
        key={`datepicker_months_${month}`}>
        {month}
      </option>
    ));
  }

  renderYears() {
    return _.map(this.years, (year) => (
      <option value={year} key={`datepicker_years_${year}`}>{year}</option>
    ));
  }

  render() {
    const { containerClassName, stylesForDayInput, stylesForMonthInput, stylesForYearInput, classNameForDayInput, classNameForMonthInput, classNameForYearInput, onDayChange, onMonthChange, onYearChange } = this.props;

    return (
      <div className={`reactMinimalDatepicker ${containerClassName}`}>

        <select
          value={this.selectedMoment.date()}
          name="reactMinimalDatepickerDay"
          id="reactMinimalDatepickerDay"
          className={`${classNameForDayInput}`}
          style={stylesForDayInput}
          onChange={this.onDayChange}>
          {this.renderedDays}
        </select>

        <select
          value={this.selectedMoment.month()}
          name="reactMinimalDatepickerMonth"
          id="reactMinimalDatepickerMonth"
          className={`${classNameForMonthInput}`}
          style={stylesForMonthInput}
          onChange={this.onMonthChange}>
          {this.renderedMonths}
        </select>

        <select
          value={this.selectedMoment.year()}
          name="reactMinimalDatepickerYear"
          id="reactMinimalDatepickerYear"
          className={`${classNameForYearInput}`}
          style={stylesForYearInput}
          onChange={this.onYearChange}>
          {this.renderedYears}
        </select>

      </div>
    );
  }
}

ReactMinimalDatepicker.propTypes = {
  onChange: PropTypes.func,
  onDayChange: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  numberOfYearsToShow: PropTypes.number,
  containerClassName: PropTypes.string,
  stylesForYearInput: PropTypes.object,
  stylesForMonthInput: PropTypes.object,
  stylesForDayInput: PropTypes.object,
  classNameForYearInput: PropTypes.string,
  classNameForMonthInput: PropTypes.string,
  classNameForDayInput: PropTypes.string,
  format: PropTypes.string,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};
