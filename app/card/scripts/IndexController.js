angular
  .module('card')
  .controller('IndexController', function($scope, supersonic) {
  	$scope.cards = null;
  	init();

  	$scope.init = function() {
  		init();
  	}
  });
