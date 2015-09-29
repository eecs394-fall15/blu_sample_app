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

    $scope.GetImageFromName = function(name, image) {
      return ReferencePath(name, image);
    };

  });