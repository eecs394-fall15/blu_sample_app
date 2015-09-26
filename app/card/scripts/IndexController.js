angular
  .module('card')
  .controller("IndexController", function ($scope, Card, supersonic) {
    $scope.cards = null;
    $scope.showSpinner = true;

    Card.all().whenChanged( function (cards) {
        $scope.$apply( function () {
          $scope.cards = cards;
          $scope.showSpinner = false;
        });
    });

    $scope.RemoveSpaces = function(str) {
      return str.replace(/\s+/g, '');
    };

    $scope.ReferencePath = function(name) {
      return "/images/" + $scope.RemoveSpaces(name) + ".jpg";
    };
    
  });