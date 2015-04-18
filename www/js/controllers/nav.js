'use strict';

app.controller('NavController', function($scope, Auth, $state){
  //want to show if the user is logged in or out to decide if we should show loggout button
  $scope.signedIn = Auth.signedIn;
  $scope.currentUser =Auth.user;

  //if(Auth.signedIn()){
  //  console.log("user is already logged in");
  //  $state.go('tab.dash');
  //}



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
