'use strict';

app.controller('PhotoController', function($scope, $rootScope, $state, Auth, FURL, $ionicPopup, $cordovaCamera, toaster, Photo, Challenge, Accept){
  console.log('got to the PhotoContoller linked');
  $scope.photos = Photo.all;
  console.log($scope.photos);

  $rootScope.data = {};
  $rootScope.data.imageURI = "http://41.media.tumblr.com/tumblr_mby7btxbMs1r8gydho1_500.jpg";
  //need to use rootScope here because im passing it between pages(?)

  ////////////////////////////take the photo////////////////////////////////


  $rootScope.takePhoto = function(data){
    console.log('going to camera');

    $rootScope.photo = {};

    //var Camera= navigator.camera;

    console.log(data);

      //alert('upload pic is working');

    var options = {
          quality: 75,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: navigator.camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
    };


    $state.go('tab.photo-camera');

    navigator.camera.getPicture(function(photo) {
      //alert('image is: ' + options.quality);
      $rootScope.data.imageURI = photo;


      var image = "data:image/jpeg;base64," + photo;

      //alert('image is: ' + image);

      $rootScope.$apply();
    }, function(err) {

      alert("Sorry!  Can't take your photo!");
    }, options);

  };

  /////////////////////////////////////submit Form Action////////////////////////////////
  $scope.submitForm = function(){
    $scope.photo = {};
    console.log('submit button was clicked');
    var mySubmit = $ionicPopup.show({
      templateUrl: 'templates/partials/submit.html',
      title: 'Submit Photo',
      //cssClass: 'photoUploadPopup',
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
            Photo.submitPhoto(photo).then(function(){
              toaster.pop('Success', "photo is saved");
            });

          }
        }]
    });
  };


  ///////////////////////////////////Create Form///////////////////////////////////
  $scope.createForm = function(){
    $scope.photo = {};
    console.log('submit button was clicked');
    var mySubmit = $ionicPopup.show({
      templateUrl: 'templates/partials/submit.html',
      title: 'Create Photo',
      //cssClass: 'photoUploadPopup',
      scope: $scope,
      buttons:[{
        text: 'x',
        type:'button button-icon icon ios-close-round'
      },
        {
          text: 'Create',
          type:'button-energized',
          onTap: function(photo) {
            photo = $scope.photo;
            $scope.photo.imageURI = $rootScope.data.imageURI;
            console.log('photo object: ', photo.name, photo.description, photo.imageURI);
            Challenge.createChallenge(photo);

          }
        }]
    });
  };
  $scope.name='';
  $scope.description='';

  //$scope.createPhoto = function(challenge) {
  //  console.log(challenge);
  //}
});
