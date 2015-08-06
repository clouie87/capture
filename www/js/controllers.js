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

.controller('AccountCtrl', function($scope, $rootScope, $ionicModal, Acceptu, Challenge, Photo, PhotoChallenge, Auth) {

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

      console.log($rootScope.acceptUser);


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

        };

    $scope.selected = -1;
    $scope.photo = {};

    $scope.select = function(index){




      //$scope.challengeId = challenge.challengeId;
      $scope.selected = index;


      console.log('the challenge id is ', $scope.selected);
      //console.log('the challenge is ', challenge.challengeId);
      //console.log('the challenge is ', challenge);


    };

    $scope.make = function(challenge){
      $scope.photo = challenge;
      $scope.challengeId = challenge.$id;

      console.log('the challenge is ', challenge.challengeId);
      //console.log('the challenge is ', challenge);

      if($scope.challengeId){
        $scope.made = true;

      }

    };


    $scope.submitPhoto = function(photo){
      console.log(photo);
      console.log('challengeId:', photo.challengeId, 'name', photo.photoName);

      $scope.photo.imageURI = $rootScope.data.imageURI;

      Photo.submitPhoto(photo).then(function(){

        for (var i = 0; i < $scope.acceptUser.length; i++) {
          //console.log('the scope is ', $scope.acceptUser);
          if ($scope.acceptUser[i].challengeId === photo.challengeId && $scope.acceptUser[i].status === "on") {

            var acceptedId = $scope.acceptUser[i];
            console.log(acceptedId);
            //var challenge = $scope.selectedChallenge.$id;

            Acceptu.photoAdd(uid, acceptedId).then(function () {
              console.log('in the then function of deActivate for Acceptu');

            });

            //            toaster.pop('Success', "photo is saved");
          }
        }
      });

      PhotoChallenge.photoSave(photo).then(function(){
        console.log('success');
      });

      //var newPhoto = {
      //  submitter: Auth.user.profile.name,
      //  submitterId: uid,
      //  name: photo.photoName,
      //  challengeId: photo.challengeId,
      //  photo: photo.imageURI
      //};
      //
      //console.log(newPhoto)

    }

      });
//});
