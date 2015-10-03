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
		
	});
