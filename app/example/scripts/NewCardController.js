angular
  .module('example')
  .controller('NewCardController', function($scope, supersonic) {

    $scope.AddTapped = function(){
    	alert("test");
    };

    $scope.CameraTapped = function(){
    	alert("test");
    };

//Camera functions

	$scope.newCard = function() {
		navigator.camera.getPicture(onSuccess, onFail, { quality: 75,
	    destinationType: Camera.DestinationType.DATA_URL, 
	    targetWidth: 500, targetHeight: 250
		});
	}

	function onSuccess(imageData) {
	    var image = document.getElementById('cardImage');
	    image.src = "data:image/jpeg;base64," + imageData;
	}

	function onFail() {
	    alert('Take a picture of the business card :)');
	}

	//form for entering contact info for card
	$scope.master = {};

	$scope.update = function(contact) {
        $scope.master = angular.copy(contact);
      };

  });
