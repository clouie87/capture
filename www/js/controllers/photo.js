'use strict';

app.controller('PhotoController', function($scope, $rootScope, $state, $firebase, FURL, $ionicPopup, $cordovaCamera, Photo){
  console.log('got to the PhotoContoller linked');
  $scope.photos = Photo.all;
  console.log($scope.photos);

  $rootScope.data = {};
  $rootScope.data.imageURI = "http://41.media.tumblr.com/tumblr_mby7btxbMs1r8gydho1_500.jpg";
  //need to use rootScope here because im passing it between pages(?)

  ////////////////////////////take the photo////////////////////////////////


  $rootScope.takePhoto = function(data){
    console.log('going to camera');
    //$state.go('tab.photo-camera');
    //alert('taking picture');
    console.log(data);

    //var cameraOptions = {
    //  targetWidth: 300,
    //  //targetHeight: 300,
    //  allowEdit : true,
    //  destinationType: navigator.camera.DestinationType.FILE_URI,
      alert('upload pic is working');
      var options = {
          quality: 75,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: navigator.camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
        };

    $state.go('tab.photo-camera');

    navigator.camera.getPicture(function(data) {
      //alert('image is: ' + data);
      $rootScope.data.imageURI = data;

      var image = "data:image/jpeg;base64, " + data;

      //alert('image is: ' + image);

      $rootScope.$apply();

    });

  };

  /////////////////////////////////////submit Form Action////////////////////////////////
  $scope.submitForm = function(){
    $scope.photo = {};
    console.log('submit button was clicked');
    var mySubmit = $ionicPopup.show({
      templateUrl: 'templates/partials/submit.html',
      title: 'Submit Photo',
      scope: $scope,
      buttons:[{
        text: 'x',
        type:'button button-icon icon ios-close-round'
      },
        {
          text: 'Submit',
          type:'button-calm',
          onTap: function(photo) {
            photo = $scope.photo;
            $scope.photo.imageURI = $rootScope.data.imageURI;
            console.log('photo object: ', photo.name, photo.description, photo.imageURI);
            Photo.submitPhoto(photo);
              //.then(function(){
              //console.log('saving photo', photo);
              ////alert('saving photo ' + photo.imageURI);
            //});
          }
        }]
    });
  };

  //Photo.submitPhoto = function(photo) {
  //  console.log('saving photo', photo);
  //};




  $scope.name='';
  $scope.description='';

  $scope.createPhoto = function(challenge) {
    console.log(challenge);
  }
});
