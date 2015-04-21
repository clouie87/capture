'use strict';

app.controller('ProfileController', function(FURL, $scope, Auth, $state, $firebase, $cordovaCamera, $ionicPopup, Photo){
  //want to show if the user is logged in or out to decide if we should show loggout button
  $scope.currentUser = Auth.user;
  $scope.signedIn = Auth.signedIn;
  $scope.photos = Photo.all;

  $scope.editProfile = function(){
    console.log('in edit profile');

      console.log('submit button was clicked');
      var mySubmit = $ionicPopup.show({
        templateUrl: 'templates/partials/submit.html',
        title: 'Edit Profile',
        //cssClass: 'photoUploadPopup',
        scope: $scope,
        buttons:[{
          text: 'x',
          type:'button button-icon icon ios-close-round'
        },
          {
            text: 'Edit',
            type:'button-calm',
            onTap: function() {
              console.log('edit saved');
            }
          }]
      })

  };

  $scope.logout = function() {
    Auth.logout();
    console.log("logging out");
    $state.go('login');
  };


});
