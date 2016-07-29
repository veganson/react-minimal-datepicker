import moment from 'moment';
import _ from 'lodash';

export const getArrayOfYears = (numberOfYearsToShow) => {
  let result = [];
  let currYear = moment().year();
  _.times(numberOfYearsToShow, () => {
    currYear--;
    result.push(currYear);
  });
  return result;
};

export const getAllDaysOfMonth = (year, month) => {
  var daysInMonth = [];
  var monthDate = moment().year(year).month(month).startOf('month');
  _.times(monthDate.daysInMonth(), function () {
    daysInMonth.push(monthDate.format('D'));
    monthDate.add(1, 'day');
  });
  return daysInMonth;
};
