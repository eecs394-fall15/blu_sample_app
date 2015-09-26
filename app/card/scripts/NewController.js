angular
  .module('card')
  .controller("NewController", function ($scope, Card, supersonic) {
    $scope.card = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newcard = new Card($scope.card);

      if(!newcard.name) {
        document.getElementsByName('nameLabel')[0].style.backgroundColor = "#FFB8B6";
        $scope.showSpinner = false;
        return;
      }

      if(false /* Check if name already exists */) {
        alert("Name already exists.");
        $scope.showSpinner = false;
        return;
      }

      newcard.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };

    $scope.CameraTapped = function() {
    supersonic.media.camera.takePicture(options).then( function(result){
      $scope.image = result
    })
  };

});