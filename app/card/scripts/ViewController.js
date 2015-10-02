angular
	.module('card')
	.controller('ViewController', function($scope, supersonic) {
		$scope.card;

		$scope.DeclareCard = function() {
			var CardsObject = Parse.Object.extend("howzitData");
			var query = new Parse.Query(CardsObject);
			query.get(getURLParameter("id"), {
				success: function(result) {
					$scope.card = result;
				},
				error: function(object, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		}
		$scope.DeclareCard();
		
	});
