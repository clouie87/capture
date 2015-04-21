'use strict';

app.controller('CreateController', function($scope, FURL, $firebase, $stateParams, Challenge, Auth, Accept, Photo){

  $scope.searchChallenges='';
  $scope.challenges = Challenge.all;
  $scope.signedIn = Auth.signedIn;
  $scope.photos = Photo.all;
  console.log($scope.photos);

  //Photo.getPhoto;

  console.log('the photos are', $scope.photos);

  if($stateParams.challengeId) {
    var challengeId = $stateParams.challengeId;
    var challenge = Challenge.getChallenge(challengeId).$asObject();
    setSelectedChallenge(challenge); //we call this below and pass in the challenge
  }

  function setSelectedChallenge(challenge){
    $scope.selectedChallenge = challenge;

    console.log('selected Challenge is 2 ', challenge);
    $scope.accepteds = Accept.accepteds(challenge.$id);
  }

  $scope.activate = function() {
    //console.log('the id is', challenge.$id);
    console.log('the id is2 ', $scope.selectedChallenge);
    console.log('the button was clicked');
    var accept = {
      status: 'on',
      user: Auth.user.profile.$id,
      name: Auth.user.profile.name,
      challengeId: challenge.$id
    };
      console.log(accept);
      Accept.addActivate($scope.selectedChallenge.$id, accept).then(function(){
        console.log('saved');
      });
  }

});

