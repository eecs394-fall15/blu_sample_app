angular
  .module('example')
  .controller('NewCardController', function($scope, supersonic) {

    $scope.AddTapped = function(){
    	alert("test");
    };

    $scope.CameraTapped = function(){
    	alert("test");
    };

	var options = {
	  targetHeight: 300,
	  encodingType: "png",
	};

	$scope.newCard = function() {
	  supersonic.media.camera.takePicture(options).then( function(result){
	    $scope.image = result
	  });
	};

  });
