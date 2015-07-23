'use strict';

app.controller('DisplayController', function(FURL, $scope, $stateParams, Photo){
  //want to show if the user is logged in or out to decide if we should show loggout button
  $scope.currentUser = Auth.user;
  $scope.signedIn = Auth.signedIn;
  $scope.photos = Photo.all;

  console.log('got to the display controller');

  //$scope.photoId =

  if($stateParams.photoId) {
    var photoId = $stateParams.photoId;
    var photo = Photo.getPhoto(photoId).$asObject();
    setSelectedPhoto(photo); //we call this below and pass in the challenge
  }

  function setSelectedPhoto(photo) {
    $scope.selectedPhoto = photo;
    console.log('the selected photo is ', photo);
  }


});
