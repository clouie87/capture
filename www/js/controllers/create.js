'use strict';

app.controller('CreateController', function($scope, FURL, $firebase, $stateParams, Challenge, Auth, Accept, Acceptu, Photo){

  $scope.searchChallenges='';
  $scope.challenges = Challenge.all;
  $scope.signedIn = Auth.signedIn;
  //$scope.userAccepts = [];

  //$scope.userAccepts = Acceptu.all;
  $scope.challengeAccept = Accept.accepteds;
  $scope.acceptUser =[];

  $scope.photos = Photo.all;
  console.log($scope.photos);
  var currentUser = Auth.user;
  var uid = currentUser.uid;


  Acceptu.getAcceptsForUser(uid).$asArray().$loaded().then(function (acceptUser) {
    $scope.acceptUser = acceptUser;
    console.log('the user accept is', acceptUser);
  });

  $scope.isActive = function (challengeId){
    for (var i = 0; i < $scope.acceptUser.length; i++) {
      console.log('the scope is ', $scope.acceptUser.length);
      if ($scope.acceptUser[i].challengeId === challengeId) {
        return true;
      }
    }
    return false;
  };

  if($stateParams.challengeId) {
    console.log('the challenge is ', challenge);
    var challengeId = $stateParams.challengeId;
    var challenge = Challenge.getChallenge(challengeId).$asObject();
    setSelectedChallenge(challenge); //we call this below and pass in the challenge
  }

  function setSelectedChallenge(challenge){
    $scope.selectedChallenge = challenge;

    console.log('selected Challenge is 2 ', challenge);
    $scope.accepteds = Accept.accepteds(challenge.$id);
    console.log($scope.accepteds);
    //$scope.accepteds = Accept.accepteds(challenge.$id);

  }

  $scope.activate = function(challenge) {
    console.log('user', Auth.user.uid);
    console.log('the id is', challenge.$id);
    $scope.selectedChallenge = challenge;
    console.log('the id is2 ', $scope.selectedChallenge);
    console.log('the button was clicked');
    var accept = {
      status: 'on',
      user: Auth.user.uid,
      name: currentUser.profile.name,
      challengeId: challenge.$id
    };
      console.log(accept);
      Accept.addActivate($scope.selectedChallenge.$id, accept).then(function(){
        console.log('saved active_challenge');
      });
      Challenge.addActivate(uid, $scope.selectedChallenge.$id, accept).then(function(){
        console.log('saved active_user');
      });

  };

  if($stateParams.photoId) {
    var photoId = $stateParams.photoId;
    var photo = Photo.getPhoto(photoId).$asObject();
    setSelectedPhoto(photo); //we call this below and pass in the challenge
  }

  function setSelectedPhoto(photo){
    $scope.selectedPhoto = photo;

    console.log('selected Photo is 2 ', photo);
    //$scope.votes = Vote.votes(photo.$id);
  }
  //
  //$scope.vote = function() {
  //  //console.log('the id is', challenge.$id);
  //  console.log('the id is2 ', $scope.selectedPhoto);
  //  //console.log('the button was clicked');
  //  var vote = {
  //    status: 'on',
  //    user: Auth.user.profile.$id,
  //    name: Auth.user.profile.name,
  //    challengeId: challenge.$id,
  //    photoId: photo.$id
  //  };
  //  console.log(accept);
  //  Accept.addActivate($scope.selectedChallenge.$id, accept).then(function(){
  //    console.log('saved');
  //  });
  //}

});

