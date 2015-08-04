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

.controller('AccountCtrl', function($scope, $rootScope, $ionicModal, Challenge, Photo, Auth) {

  $scope.challenges = $rootScope.acceptUser;
  $scope.photos = Photo.all;
    var uid = Auth.user.uid;
    //var userChallenges = $rootScope.acceptUser;
  //$scope.photo.challengeId =[];

    //console.log('the number of challenges are', $scope.challenges.length);
    console.log('the number of challenges are', $rootScope.acceptUser);

    //if($scope.challenges.$id === $rootScope.acceptUser.challengeId){
    //  console.log($scope.challenge.$id);


      //console.log($scope.challenges)

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
      //for(var j = 0; j< $rootScope.acceptUser.length; j++){
      //  var c_id = $rootScope.acceptUser[j].challengeId;
      //  //$scope.challenges = c_id;
      //  $scope.challenges[c_id] = [];
      //
      //  $scope.challenges = Challenge.getChallenge(c_id).$asObject();
      //    //$scope.challenges = challenge;
      //
      //}

      console.log('opening model');
      console.log($scope.challenges);
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

      $scope.$emit('ChangeColor');
      $scope.photo = challenge;
      $scope.challengeId = challenge.$id;
      //$scope.challengeName = challenge.description;

      console.log('the challenge id is ', $scope.challengeId);

      //console.log('the challenge id is ', $scope.challengeName);
      if($scope.challengeId){
        //$scope.photo.challengeId = $scope.challengeId;
        $scope.selected = true;


        //selectChallenge.select();
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
      };

      console.log(newPhoto)

    }

      });
//});
