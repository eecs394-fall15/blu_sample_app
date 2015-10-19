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
			targetWidth: 600,
			targetHeight: 600
		};
		
		$scope.CameraTappedFront = function() {
			supersonic.media.camera.takePicture(cameraOptions).then( function(result){
				//save image dataURL into dataURL
				//change the image on the new.html to the one taken
				var image = document.getElementById('cardImageFront');
				image.src = "data:image/jpeg;base64," + result;
			})
		};

		$scope.CameraTappedBack = function() {
			supersonic.media.camera.takePicture(cameraOptions).then( function(result){
				//save image dataURL into dataURL
				//change the image on the new.html to the one taken
				var image = document.getElementById('cardImageBack');
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
				sentEmail: document.getElementById('sentEmail').checked,
				applied: document.getElementById('applied').checked,
				referred: document.getElementById('referred').checked,
				meeting: document.getElementById('meeting').checked,
				dataURLFront: function(){ 
					var imageSrcFront = document.getElementById("cardImageFront").src;
	                // Set dataURL as default.jpg if no image was set
	                return imageSrcFront == cameraDataURL ? defaultDataURL : imageSrcFront
                }(),
                dataURLBack: function(){ 
					var imageSrcBack = document.getElementById("cardImageBack").src;
	                // Set dataURL as default.jpg if no image was set
	                return imageSrcBack == cameraDataURL ? defaultDataURL : imageSrcBack
                }(),
                searchData: document.getElementById("name").value.toLowerCase() + " "
                			+ document.getElementById("company").value.toLowerCase() + " "
                			+ document.getElementById("email").value.toLowerCase() + " "
                			+ document.getElementById("tags").value.toLowerCase() + " "
                			+ (document.getElementById('sentEmail').checked ? "sent followup email " : "")
                			+ (document.getElementById('applied').checked ? "applied for a position " : "")
                			+ (document.getElementById('referred').checked ? "referred " : "")
                			+ (document.getElementById('meeting').checked ? "set up a meeting " : "")
			}, {
				success: function(card) {
					// The object was saved successfully
					supersonic.ui.modal.hide();
				},
				error: function(card, error) {
					alert("Error in NewController: " + error.code + " " + error.message);
				}
			});
		}
    });