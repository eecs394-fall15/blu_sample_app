angular
  .module('example')
  .controller('NewCardController', function($scope, supersonic) {

    $scope.AddTapped = function(){
    	alert("test");
    };

    $scope.CameraTapped = function(){
    	alert("test");
    };

  });
