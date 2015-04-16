'use strict';

app.controller('NavController', function($scope, Auth, $state){
  //want to show if the user is logged in or out to decide if we should show loggout button
  $scope.signedIn = Auth.signedIn;


  $scope.logout = function() {
    Auth.logout();
    console.log("logging out");
    $state.go('login');
  }
});
