angular
	.module('card')
	.controller('ViewController', function($scope, supersonic) {
		$scope.card;

		supersonic.ui.views.current.whenVisible( function() {
			var CardsObject = Parse.Object.extend("howzitData");
			var query = new Parse.Query(CardsObject);
			query.get(getURLParameter("id"), {
				success: function(result) {
					$scope.card = result;

					if( $scope.card.get("sentEmail") ) {
						$("#sentEmail").css("color","#4987EE")
						$("#emailText").css("color","black")
					}
					if( $scope.card.get("applied") ) {
						$("#applied").css("color","#66CC33")
						$("#appliedText").css("color","black")
					}
					if( $scope.card.get("referred") ) {
						$("#referred").css("color","#FFB800")
						$("#referredText").css("color","black")
					}
					if( $scope.card.get("meeting") ) {
						$("#meeting").css("color","#8A6DE9")
						$("#meetingText").css("color","black")
					}
				},
				error: function(object, error) {
					alert("Error in ViewController (DeclareCard): " + error.code + " " + error.message);
				}
			});
		});
		// $scope.DeclareCard();

		$scope.remove = function(id) {
			$scope.card.destroy({
				success: function(myObject) {
					// The object was deleted from the Parse Cloud.
					supersonic.ui.layers.pop(); // Go back to previous page
				},
				error: function(myObject, error) {
					alert("Error in ViewController (remove): " + error.code + " " + error.message);
				}
			});
		}

		$scope.OpenEdit = function(card_id) {
			// Open Edit
			supersonic.ui.modal.show("card#edit?id="+card_id);

		};
		
	});
