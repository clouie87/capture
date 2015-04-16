'use strict';

app.controller('LoginController', function($scope, $ionicPopup){
  console.log('got to the LoginController linked');

  $scope.showLogin = function() {
    console.log('open login modal');
    var myLogin = $ionicPopup.show({
      templateUrl: 'templates/partials/login.html',
      title: 'Login'
    })
  }

  $scope.showSignup = function() {
    console.log('open signup modal');
    var mySignup = $ionicPopup.show({
      templateUrl: 'templates/partials/signup.html',
      title: 'Signup'
    })
  }

});
