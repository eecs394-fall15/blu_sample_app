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

      var Cards = supersonic.data.model("Card");
      Cards.findAll().then( function(allCards) {

        // Check if there is a name on the name field. Return and warn user if not.
        if(!$scope.card.name) {
          supersonic.ui.dialog.alert("Please input a name.");
          document.getElementsByName('nameLabel')[0].style.backgroundColor = "#FFB8B6";
          return;
        }

        // Logic to check if name is already in database.
        var exists = false;
        for(var i = 0; i < allCards.length; i++) {
          // Make sure to allow the same name to be reused (i.e. the second part of the conditional)
          if(allCards[i].name == $scope.card.name && allCards[i].id != $scope.card.id) {
            exists = true;
          }
        }
        
        // If name is already in database, return and warn user.
        if(exists) {
          supersonic.ui.dialog.alert("Name already exists.\nPlease input another name.");
          return;
        }

        // If no problems were encountered, save new card.
        $scope.card.save().then( function () {
          supersonic.ui.modal.hide();
        }, function () {
          // This is necessary. If the promise fails (i.e. the card doesn't save), the modal still has to close.
          // This ALWAYS happens if the user clicks on "Edit Card", but makes no changes and still presses "Save".
          supersonic.ui.modal.hide();
        });
      });

      $scope.showSpinner = false;
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

    $scope.GetImageFromName = function(name) {
      var path = ReferencePath(name);

      var http = new XMLHttpRequest();
      http.open('HEAD', path, false);
      http.send();
      
      return http.status==404 ? ReferencePath("camera") : path;

    };

  });
