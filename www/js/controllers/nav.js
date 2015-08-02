'use strict';

app.controller('NavController', function($scope, Auth, $ionicSideMenuDelegate, $state){
  //want to show if the user is logged in or out to decide if we should show loggout button
  $scope.signedIn = Auth.signedIn;
  $scope.currentUser =Auth.user;

  $scope.showMenu = function() {
    console.log('in toggle function');
    $ionicSideMenuDelegate.toggleRight()
  };

  $scope.goProfile = function(){
    console.log('going to profile');
    $state.go('app.profile');
  };

  if(Auth.signedIn()){
    console.log("user is already logged in");
    $state.go('app.tab.dash');
  }



  $scope.logout = function() {
    Auth.logout();
    console.log("logging out");
    $state.go('login');
  };

  $scope.profile = function(){
    console.log('profile was clicked');
    $state.go('tab.profile');
  }
});
