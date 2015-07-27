'use strict';

app.controller('CreateController', function($scope, FURL, $firebase, $stateParams, Challenge, Auth, Accept, Acceptu, Photo){

  $scope.searchChallenges='';
  $scope.challenges = Challenge.all;
  $scope.signedIn = Auth.signedIn;
  //$scope.userAccepts = [];

  $scope.userAccepts = Acceptu.all;
  $scope.challengeAccept = Accept.accepteds;

  $scope.photos = Photo.all;
  console.log($scope.photos);
  var currentUser = Auth.user;
  var uid = currentUser.uid;

  //console.log('the photos are', $scope.photos);
  //console.log('the accepteds are', $scope.accepteds);
  //console.log('the accepteds uid is ', uid);
  //

  $scope.isActive = function (challengeId){
    console.log(challengeId);

    Acceptu.getAcceptsForUser(uid).$asArray().$loaded().then(function (acceptUser) {
      if (acceptUser) {
        for (var i = 0; i < acceptUser.length; i++) {
          var accept = acceptUser[i];

          if(accept.challengeId === challengeId) {
            console.log('returning true');
            return true;
          }
        }
        return false;
      }
    });
    //$scope.userAccepts.$loaded().then(function(accepts){
    //  console.log('we are doing a test');
    //  for(var i=0; i < accepts.length; i++) {
    //    console.log(accepts[i]);
    //    //if ($scope.userAccepts[i].id.challengeId === challengeId){
    //    //  return true;
    //    //}
    //  }
      //accepts = accepts.$id.challengeId;
      //console.log(accepts);
    //  return false;
    //});
    //console.log($scope.userAccepts);
    //for(var i=0; i < $scope.userAccepts.length; i++) {
    //  console.log($scope.userAccepts[i]);
    //  //if ($scope.userAccepts[i].id.challengeId === challengeId){
    //  //  return true;
    //  //}
    //}
    //return false;
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

