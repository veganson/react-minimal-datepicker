# react-minimal-datepicker
[npm](https://www.npmjs.com/package/react-minimal-datepicker)

**usage:**

    npm install --save react-minimal-datepicker
    import ReactMinimalDatepicker from 'react-minimal-datepicker';
	// inside your render method:
	<ReactMinimalDatepicker/>

**available props:**

 - onChange - is called when datepicker's value is changed. You can specify format of the value with "format" prop
 - format - string that momentjs will use to parse datepicker's value in onChange
 - onDayChange, onMonthChange, onYearChange
 - numberOfYearsToShow
 - containerClassName
 - stylesForYearInput, stylesForMonthInput, stylesForDayInput
 - classNameForYearInput, classNameForMonthInput, classNameForDayInput
