'use strict';

app.controller('CreateController', function($scope, FURL, $firebase, $stateParams, Challenge, Auth, Accept, Acceptu, Photo){

  $scope.searchChallenges='';
  $scope.challenges = Challenge.all;
  $scope.signedIn = Auth.signedIn;

  $scope.challengeAccept = Accept.accepteds;
  $scope.acceptUser =[];
  $scope.acceptChallenges =[];
  $scope.accepteds = Accept.all;
  $scope.accept = [];

  $scope.photos = Photo.all;
  console.log($scope.photos);
  var currentUser = Auth.user;
  var uid = currentUser.uid;


  /////////////////   GET ALL THE CHALLENGES THAT CURRENT USER HAS ACCEPTED ///////////////
  Acceptu.getAcceptsForUser(uid).$asArray().$loaded().then(function (acceptUser) {
    $scope.acceptUser = acceptUser;
    //console.log('the user accept is', acceptUser);
  });

  $scope.isActive = function (challengeId){

    for (var i = 0; i < $scope.acceptUser.length; i++) {
      //console.log('the scope is ', $scope.acceptUser.length);
      if ($scope.acceptUser[i].challengeId === challengeId && $scope.acceptUser[i].status === "on") {
        return true;
      }
    }
    return false;
  };


  /////////////////   GET ALL THE USERS THAT HAVE ACCEPTED A SPECIFIC ///////////////

    $scope.accepteds = Accept.getAll().$asArray().$loaded().then(function(acceptedChallenge){
      var accept = [];
      console.log(acceptedChallenge);
      console.log(acceptedChallenge.length);

      for(var i = 0; i < acceptedChallenge.length; i ++){
        console.log('the data is ', acceptedChallenge[i]);
        var acceptName = acceptedChallenge[i].$id;
        $scope.accept[acceptName]= [];
        Accept.getAcceptsForChallenge(acceptName).$asArray().$loaded().then(function (acceptedName) {
          console.log('the data is now', acceptedName);

            for (var j = 0; j < acceptedName.length; j++) {
              $scope.accept[acceptedName[j].challengeId].push(acceptedName[j].name);

            }
          console.log($scope.accept);

        });
      }
    });



  /////////////////   WHEN SOMETHING HAPPENS TO A SPECIFIC CHALLENGE ///////////////
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
    console.log('the id is ', $scope.selectedChallenge);
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
      Acceptu.addActivate(uid, $scope.selectedChallenge.$id, accept).then(function(){
        console.log('saved active_user');
      });

  };

  $scope.deactivate = function (challenge) {
    $scope.selectedChallenge = challenge;
    console.log('the deactivate button was clicked');

    for (var i = 0; i < $scope.acceptUser.length; i++) {
      console.log('the scope is ', $scope.acceptUser);
      if ($scope.acceptUser[i].challengeId === $scope.selectedChallenge.$id && $scope.acceptUser[i].status === "on") {

        var acceptedId = $scope.acceptUser[i];
        console.log(acceptedId);
        var challenge = $scope.selectedChallenge.$id;
        Acceptu.deActivate(uid, acceptedId).then(function(){
          console.log('in the then function of deActivate for Acceptu');
        });

        Accept.deActivate(challenge).then(function(){
          console.log('in the then function of deActivate for Accept');
        });
        //return true;
      }
    }

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

