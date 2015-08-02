angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope.like = function(){
      console.log('button clicked liked');

    }
  })

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $ionicModal, Challenge, Photo, Auth) {

  $scope.challenges = Challenge.all;
  $scope.photos = Photo.all;
    var uid = Auth.user.uid
  //$scope.photo.challengeId =[];

    console.log('the number of challenges are', $scope.challenges.length);

    for (var i = 0; i < 5; i++){
      var challenge = $scope.challenges[i];
      //console.log(challenge);
      $scope.challenge = challenge;
    }

  $scope.settings = {
    enableFriends: true
  };

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
        submitterId: uid,
        name: photo.photoName,
        challengeId: photo.$id,
        photo: 'tbd'
      }

      console.log(newPhoto)

    }

      });
//});
