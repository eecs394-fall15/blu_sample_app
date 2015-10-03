angular.module('card', [
	/* Declare any module-specific dependencies here */
	'common'
]);

supersonic.ui.tabs.hide();

// Taken from http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)&&[,""])[1].replace(/\+/g, '%20'))||null
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Returns information in the form [yyyy, monthName, d?d]
function getDateInfo(date) {
	return [
		date.getFullYear(),
		months[date.getMonth()],
		date.getDate()
	];
}

// Input is of the form of the output for getDateInfo (i.e. [yyyy, monthName, d?d])
function areDatesEqual(date1, date2) {
	try {
		return (date1[0] == date2[0] && date1[1] == date2[1] && date1[2] == date2[2]);
	} catch(e) {
		return false;
	}
}

// Add the specified number of days to the input date. Output is a Date value.
function addDays(date, days) {
	date = new Date(date); // in case date is an int and not a Date value
	date.setDate(date.getDate() + days);
	return date;
}