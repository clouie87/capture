'use strict';

app.controller('AuthController', function($scope, $state, Auth, $ionicPopup) {

  if(Auth.signedIn()){
    console.log("user is already logged in");
    $state.go('tab.dash');
  }

  $scope.user = {};

  $scope.showLogin = function() {
    $scope.user = {};
    console.log('open login modal');
    var myLogin = $ionicPopup.show({
      templateUrl: 'templates/partials/login.html',
      title: 'Login',
      cssClass: 'loginPopup',
      scope: $scope,
      buttons:[{
        text: 'x',
        type:'button button-icon icon ios-close-round'
        },
        {
          text: 'Login',
          type:'button-energized',
          onTap: function(user){
            user= $scope.user;
            Auth.login(user).then(function () {
              console.log("Logged in succesfully!");
              $state.go('app.tab.dash');

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
      cssClass: 'loginPopup',
      title: 'Signup',
      buttons:[{
        type:'button button-icon icon ios-close-round',
        text: 'x'
      },
      {
        text: 'Signup',
        type:'button-royal',
        //class: 'royal',
        onTap: function(user){
          user= $scope.user;
          Auth.signup(user).then(function () {
            console.log("Signup succesfully!");
            $state.go('tab.dash');
          }, function (err) {
            console.log('Error...');
            //toaster.pop('error', "Oops there was an error!");
          })
        }
      }]
    })
  };

});
