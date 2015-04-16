'use strict';

app.controller('AuthController', function($scope, $state, Auth, $ionicPopup) {
  $scope.user = {};

  $scope.showLogin = function() {
    $scope.user = {};
    console.log('open login modal');
    var myLogin = $ionicPopup.show({
      templateUrl: 'templates/partials/login.html',
      title: 'Login',
      scope: $scope,
      buttons:[{
        text: 'x',
        type:'cancel',
        class: 'close'
        },
        {
          text: 'Login',
          type:'submit',
          class: 'energized',
          onTap: function(user){
            user= $scope.user;
            console.log(user);
            Auth.login(user).then(function () {
              //toaster.pop('success', "Logged in successfully!");
              console.log("Logged in succesfully!");
              $state.go('tab.dash');

            }, function (err) {
              console.log('Error...');
              //toaster.pop('error', "Oops there was an error!");
            })
          }
        }]
    });
    //myLogin.then(function(result){
    //  myLogin.close();
    //
    //  console.log('submit', result);
    //});
    //myLogin.close();
  };

  $scope.showSignup = function() {
    console.log('open signup modal');
    var mySignup = $ionicPopup.show({
      templateUrl: 'templates/partials/signup.html',
      scope: $scope,
      title: 'Signup',
      buttons:[{
        text: 'x',
        type:'cancel',
        class: 'close'
      }]
    })
  };

  //if(Auth.signedIn()){
  //  console.log('user is singed in');
  //  ////  $state.go('tab.dash');
  //}


  $scope.signup = function (user) {
    Auth.signup(user).then(function () {
      //toaster.pop('success', "Registered successfully!");
      console.log("Signup succesfully!");
      $scope.closeLogin = $ionicPopup.close();
      $state.go('tab.dash');

    }, function (err) {
      console.log('Error...');
      //toaster.pop('error', "Oops there was an error!");
    })
  };

  //$scope.login = function (user) {
  //  console.log('in log in fuction and user is ', user);
  //  Auth.login(user).then(function () {
  //    //toaster.pop('success', "Logged in successfully!");
  //    console.log("Logged in succesfully!");
  //
  //    //$state.go('tab.dash');
  //
  //  }, function (err) {
  //    console.log('Error...');
  //    //toaster.pop('error', "Oops there was an error!");
  //  })
  //};

});
