angular
  .module('card')
  .controller("EditController", function ($scope, Card, supersonic) {
    $scope.card = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Card.find(steroids.view.params.id).then( function (card) {
      $scope.$apply(function() {
        $scope.card = card;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.card.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
