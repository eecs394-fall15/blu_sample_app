angular.module('common', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic',
  'parse-angular',
  'parse-angular.enhance',
  'angular-carousel'
  ]).run( function() {
	Parse.initialize("yqtXuPcMyUFfsvxLL79AeNLCgDJ3G7DX9zUhz6IX", "fq7twRB4J99HaNdUpCQ5OtTN0nHbI0nd9QmLvPws");
});
