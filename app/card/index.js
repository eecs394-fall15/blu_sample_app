angular.module('card', [
  /* Declare any module-specific dependencies here */
  'common'
]);

function ReferencePath(name) {
  return "/images/" + name + ".jpg";
}

function GetDateId() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; // Jan = 0
  var yyyy = today.getFullYear();
  
  // Append '0' to start if less than 10
  dd = dd<10 ? "0"+dd : dd;
  mm = mm<10 ? "0"+mm : mm;
  
  return yyyy + mm + dd;
}