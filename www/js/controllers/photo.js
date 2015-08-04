'use strict';

app.controller('PhotoController', function($scope, $rootScope, $state, Auth, FURL, $ionicPopup, $cordovaCamera, toaster, Photo, $ionicModal, Challenge, Accept){
  console.log('got to the PhotoContoller linked');

  $scope.photos = Photo.all;
  $scope.challenges = Challenge.all;
  $scope.signedIn = Auth.signedIn;
  //console.log($scope.photos);
  //var user = Auth.user;

  //console.log(Auth.user);
  //console.log(Auth.user.profile);
  //console.log(Auth.signedIn);

  //$scope.accepteds = Accept.getAcceptsForUser(Auth.user.uid);
  //console.log('the accepted are ', $scope.accepteds);

  $rootScope.data = {};
  $rootScope.data.imageURI = "http://41.media.tumblr.com/tumblr_mby7btxbMs1r8gydho1_500.jpg";
  //need to use rootScope here because im passing it between pages(?)
  $rootScope.accept = [];

  ////////////////////////////take the photo////////////////////////////////


  $rootScope.takePhoto = function(data){
    console.log('going to camera');

    $rootScope.photo = {};

    //var Camera= navigator.camera;

    //console.log(data);

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


    $state.go('app.tab.photo-camera');

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
  //$scope.submitForm = function(){
  //  $scope.photo = {};
  //  console.log('submit button was clicked');
  //  var mySubmit = $ionicPopup.show({
  //    templateUrl: 'templates/partials/submit.html',
  //    title: 'Submit Photo',
  //    //cssClass: 'photoUploadPopup',
  //    scope: $scope,
  //    buttons:[{
  //      text: 'x',
  //      type:'button button-icon icon ios-close-round'
  //    },
  //      {
  //        text: 'Submit',
  //        type:'button-calm',
  //        onTap: function(photo) {
  //          photo = $scope.photo;
  //          $scope.photo.imageURI = $rootScope.data.imageURI;
  //          console.log('photo object: ', photo.name, photo.description, photo.imageURI);
  //          Photo.submitPhoto(photo).then(function(){
  //            toaster.pop('Success', "photo is saved");
  //          });
  //
  //        }
  //      }]
  //  });
  //};

  ///////////////////////////////////Submit Form //////////////////////////////////


  //alert("the number of challenges are", $scope.challenges.length);

  $scope.challenges = $rootScope.acceptUser;

  //alert($rootScope.accept);


  $ionicModal.fromTemplateUrl('templates/partials/submitp.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function($ionicModal){
    $scope.modal = $ionicModal;
  });

  $scope.openModal = function() {
    //$scope.play = function(src) {

    console.log('opening model');
    $scope.modal.show();
    //var challengeId = challenge.$id;

    //Comment.allComments(challengeId).$asArray().$loaded().then(function (comments){
    //  console.log('the comments for this challenge are ', comments);
    //  $scope.comments = comments;
    //
    //  for(var c =0; c< comments.length; c++){
    //    console.log(comments[c].comment);
    //    $scope.comment = comments[c];
    //
  };

  $scope.select = function(challenge){
    //console.log('the challenge selected is', challenge);
    $scope.photo = challenge;
    $scope.challengeId = challenge.$id;
    $scope.challengeName = challenge.description;
    console.log('the challenge id is ', $scope.challengeId);
    if($scope.challengeId){
      //$scope.photo.challengeId = $scope.challengeId;
      $scope.selected = true;
    }
  };

  $scope.submitPhoto = function(photo){
    console.log(photo);
    console.log('challengeId:', photo.$id, 'name', photo.photoName);

    var newPhoto = {
      submitter: Auth.user.profile.name,
      submitterId: Auth.user.uid,
      name: photo.photoName,
      challengeId: photo.$id,
      photo: 'tbd'
    };

    console.log(newPhoto)

  }

//});


  ///////////////////////////////////Create Form///////////////////////////////////
  $scope.createForm = function(){
    $scope.photo = {};
    console.log('submit button was clicked');
    var mySubmit = $ionicPopup.show({
      templateUrl: 'templates/partials/submit.html',
      title: 'Create Challenge',
      //cssClass: 'createForm',
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
