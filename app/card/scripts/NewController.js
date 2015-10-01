angular
  .module('card')
  .controller("NewController", function ($scope, supersonic) {
    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };
    
    var cameraOptions = {
      destinationType: "dataURL",
      quality: 40,
      targetWidth: 300,
      targetHeight: 300
    };
    
    $scope.CameraTapped = function() {
      supersonic.media.camera.takePicture(cameraOptions).then( function(result){
        //save image dataURL into dataURL
        //change the image on the new.html to the one taken
        var image = document.getElementById('cardImage');
        image.src = "data:image/jpeg;base64," + result;
      })
    };
});