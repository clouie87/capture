'use strict';

app.controller('NavController', function($scope, Auth, $state){
  //want to show if the user is logged in or out to decide if we should show loggout button
  $scope.currentUser = Auth.user;
  $scope.signedIn = Auth.signedIn;


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
