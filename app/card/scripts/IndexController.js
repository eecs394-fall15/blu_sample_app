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

    $scope.GetImageFromName = function(name) {
      var path = ReferencePath(name);

      var http = new XMLHttpRequest();
      http.open('HEAD', path, false);
      http.send();
      
      return http.status==404 ? ReferencePath("default") : path;

    };

  });