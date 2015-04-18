'use strict';

app.controller('ProfileController', function(FURL, $scope, Auth, $state, $firebase, $cordovaCamera, Photo){
  //want to show if the user is logged in or out to decide if we should show loggout button
  $scope.currentUser = Auth.user;
  $scope.signedIn = Auth.signedIn;
  $scope.photos = Photo.all;

  console.log(Auth.user);
  //var ref = new Firebase(FURL);
  //var images = $firebase(ref.child('images')).$asArray();

  //
  //$scope.images = [];
  //
  //
  //$scope.upload = function () {
  //  console.log('upload pic clicked');
  //  var options = {
  //    quality: 75,
  //    destinationType: navigator.camera.DestinationType.FILE_URI,
  //    sourceType: navigator.camera.PictureSourceType.CAMERA,
  //    allowEdit: true,
  //    encodingType: navigator.camera.EncodingType.JPEG,
  //    popoverOptions: CameraPopoverOptions,
  //    targetWidth: 500,
  //    targetHeight: 500,
  //    saveToPhotoAlbum: false
  //  };
  //  $cordovaCamera.getPicture(options).then(function (imageData) {
  //    alert(imageData);
  //
  //    image.datetime = Firebase.ServerValue.TIMESTAMP;
  //    return images.$add({image: imageData}).then(function(){
  //
  //      alert("Image has been uploaded");
  //    });
  //  }, function (error) {
  //    console.error(error);
  //  });
  //}


  $scope.logout = function() {
    Auth.logout();
    console.log("logging out");
    $state.go('login');
  };


});
