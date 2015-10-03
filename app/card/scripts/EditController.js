angular
	.module('card')
	.controller('EditController', function($scope, supersonic) {
		$scope.card;

		$scope.cancel = function () {
			supersonic.ui.modal.hide();
		};

		$scope.DeclareCard = function() {
			var CardsObject = Parse.Object.extend("howzitData");
			var query = new Parse.Query(CardsObject);
			query.get(getURLParameter("id"), {
				success: function(result) {
					$scope.card = result;
				},
				error: function(object, error) {
					alert("Error in EditController: " + error.code + " " + error.message);
				}
			});
		}
		$scope.DeclareCard();

		var cameraOptions = {
			destinationType: "dataURL",
			quality: 40,
			targetWidth: 1000,
			targetHeight: 1000
		};

		$scope.CameraTapped = function() {
			supersonic.media.camera.takePicture(cameraOptions).then( function(result){
				//save image dataURL into dataURL
				//change the image on the edit.html to the one taken
				var image = document.getElementById('editCardImage');
				image.src = "data:image/jpeg;base64," + result;
			})
		};

		$scope.save = function() {
			$scope.card.save(null, {
				success: function(card) {
					// First, save the card
					card.set("name", document.getElementById("editName").value);
					card.set("company", document.getElementById("editCompany").value);
					card.set("email", document.getElementById("editEmail").value);
					card.set("tags", document.getElementById("editTags").value);
					card.set("dataURL", document.getElementById("editCardImage").src);
					card.save();

					supersonic.ui.modal.hide();
				}
			});
		}

	});
