angular
	.module('card')
	.controller('EditController', function($scope, supersonic) {
		$scope.card;

		$scope.cancel = function () {
			supersonic.ui.modal.hide();
		};

		supersonic.ui.views.current.whenVisible( function() {
			var CardsObject = Parse.Object.extend("howzitData");
			var query = new Parse.Query(CardsObject);
			query.get(getURLParameter("id"), {
				success: function(result) {
					$scope.card = result;
					
					if( $scope.card.get("sentEmail") ) {
						document.getElementById('sentEmail').checked = true;
					}
					if( $scope.card.get("applied") ) {
						document.getElementById('applied').checked = true;
					}
					if( $scope.card.get("referred") ) {
						document.getElementById('referred').checked = true;
					}
					if( $scope.card.get("meeting") ) {
						document.getElementById('meeting').checked = true;
					}
				},
				error: function(object, error) {
					alert("Error in EditController: " + error.code + " " + error.message);
				}
			});
		})

		var cameraOptions = {
			destinationType: "dataURL",
			quality: 40,
			targetWidth: 600,
			targetHeight: 600
		};

		$scope.CameraTappedFront = function() {
			supersonic.media.camera.takePicture(cameraOptions).then( function(result){
				//save image dataURL into dataURL
				//change the image on the edit.html to the one taken
				var imageFront = document.getElementById('editCardImageFront');
				imageFront.src = "data:image/jpeg;base64," + result;
			})
		};
		$scope.CameraTappedBack = function() {
			supersonic.media.camera.takePicture(cameraOptions).then( function(result){
				//save image dataURL into dataURL
				//change the image on the edit.html to the one taken
				var imageBack = document.getElementById('editCardImageBack');
				imageBack.src = "data:image/jpeg;base64," + result;
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
					card.set("dataURLFront", document.getElementById("editCardImageFront").src);
					card.set("dataURLBack", document.getElementById("editCardImageBack").src);
					card.set("searchData", document.getElementById("editName").value.toLowerCase() + " "
											+ document.getElementById("editCompany").value.toLowerCase() + " "
											+ document.getElementById("editEmail").value.toLowerCase() + " "
											+ document.getElementById("editTags").value.toLowerCase()
											+ (document.getElementById("sentEmail").checked ? "sent followup email " : "")
											+ (document.getElementById("applied").checked ? "applied for a position " : "")
											+ (document.getElementById("referred").checked ? "referred " : "")
											+ (document.getElementById("meeting").checked ? "set up a meeting " : ""));
					card.set("sentEmail", document.getElementById("sentEmail").checked);
					card.set("applied", document.getElementById("applied").checked);
					card.set("referred", document.getElementById("referred").checked);
					card.set("meeting", document.getElementById("meeting").checked);
					card.save().then(function() {
						supersonic.ui.modal.hide();
					});

					
				}
			});
		}



	});
