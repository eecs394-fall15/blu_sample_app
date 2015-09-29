angular
  .module('card')
  .controller("ShowController", function ($scope, Card, supersonic) {
    $scope.card = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Card.find($scope.dataId).then( function (card) {
        $scope.$apply( function () {
          $scope.card = card;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.card.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }

    $scope.GetImageFromName = function(name, image) {
      return ReferencePath(name, image);
    };
  });