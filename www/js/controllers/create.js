'use strict';

app.controller('CreateController', function($scope, FURL, $firebase, $stateParams){

  var ref = new Firebase(FURL);
  var fbChallenges = $firebase(ref.child('challenges')).$asArray();
  var challengeId = $stateParams.challengeId;

  console.log(challengeId);

  if(challengeId) {
    $scope.selectedChallenge = getChallenge(challengeId);
    console.log($scope.selectedChallenge);
  }

  function getChallenge(challengeId){
    console.log(challengeId);
    return $firebase(ref.child('challenges').child(challengeId)).$asObject();
  }

  $scope.challenges = fbChallenges;

  $scope.challenge = {};
  $scope.challenge.imageURI = "http://dreamatico.com/data_images/mountain/mountain-1.jpg";


  $scope.createChallenge = function(challenge) {
    console.log(challenge);
    fbChallenges.$add(challenge);

    //$location('/tab/dash');

  }
});

