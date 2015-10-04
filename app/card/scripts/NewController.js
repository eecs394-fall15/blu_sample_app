angular
	.module('card')
	.controller("NewController", function ($scope, supersonic) {
        var cameraDataURL = "http://localhost/images/camera.jpg";
        var defaultDataURL = "http://localhost/images/default.jpg";

		$scope.cancel = function () {
			supersonic.ui.modal.hide();
		};
		
		var cameraOptions = {
			destinationType: "dataURL",
			quality: 40,
			targetWidth: 1000,
			targetHeight: 1000
		};
		
		$scope.CameraTapped = function() {
			supersonic.media.camera.takePicture(cameraOptions).then( function(result){
				//save image dataURL into dataURL
				//change the image on the new.html to the one taken
				var image = document.getElementById('cardImage');
				image.src = "data:image/jpeg;base64," + result;
			})
		};

		$scope.SaveTapped = function() {
			var CardsObject = Parse.Object.extend("howzitData");
			var card = new CardsObject();

			card.save({
				name: document.getElementById("name").value,
				company: document.getElementById("company").value,
				email: document.getElementById("email").value,
				tags: document.getElementById("tags").value,
				dataURL: function(){ var imageSrc = document.getElementById("cardImage").src;
                                     // Set dataURL as default.jpg if no image was set
                                     return imageSrc == cameraDataURL ? defaultDataURL : imageSrc }()
			}, {
				success: function(card) {
					// The object was saved successfully
				},
				error: function(card, error) {
					alert("Error in NewController: " + error.code + " " + error.message);
				}
			});

			supersonic.ui.modal.hide();
		}
    });