angular
  .module('card')
  .controller("NewController", function ($scope, Card, supersonic) {
    $scope.card = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newcard = new Card($scope.card);

      var Cards = supersonic.data.model("Card");
      Cards.findAll().then( function(allCards) {

        // Check if there is a name on the name field. Return and warn user if not.
        if(!newcard.name) {
          supersonic.ui.dialog.alert("Please input a name.");
          document.getElementsByName('nameLabel')[0].style.backgroundColor = "#FFB8B6";
          return;
        }

        // Logic to check if name is already in database.
        var exists = false;
        for(var i = 0; i < allCards.length; i++) {
          if(allCards[i].name == newcard.name) {
            exists = true;
          }
        }

        // If name is already in database, return and warn user.
        if(exists) {
          supersonic.ui.dialog.alert("Name already exists.\nPlease input another name.");
          return;
        }

        // If no problems were encountered, save new card.
        newcard.dateId = GetDateId();
        newcard.save().then( function () {
          supersonic.ui.modal.hide();
        });
      });

      $scope.showSpinner = false;
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };

    var cameraOptions = {
      quality: 90
    };

    $scope.CameraTapped = function() {
      supersonic.media.camera.takePicture(cameraOptions).then( function(result){
        $scope.image = result
      })
    };

    $scope.GetImageFromName = function(name) {
      var path = ReferencePath(name);

      var http = new XMLHttpRequest();
      http.open('HEAD', path, false);
      http.send();
      
      return http.status==404 ? ReferencePath("camera") : path;

    };
    
});