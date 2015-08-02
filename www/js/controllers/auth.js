'use strict';

app.controller('AuthController', function($scope, $state, Auth, $ionicPopup, $cordovaMedia, $cordovaNativeAudio) {

  if(Auth.signedIn()){
    console.log("user is already logged in");
    $state.go('tab.dash');
  }

  $scope.user = {};


  //$cordovaNativeAudio
  //  .preloadSimple('upvote', 'img/upvote.wav')
  //  .then(function (msg) {
  //    alert("Success! "+msg);
  //  }, function (error) {
  //    alert(error);
  //  }
  //);
  //
  ////play: function (id, successCallback, errorCallback, completeCallback)
  //
  //$scope.play = function(){
  //
  //  alert("will play the sound");
  //  $cordovaNativeAudio.play('upvote');
  //};



  //$scope.play = function(src) {
  //  alert(src);
  //  //var src = "../img/upvote.wav";
  //  var media = new Media(src, function () {
  //    alert("playAudio():Audio Success");
  //  },
  //  // error callback
  //  function (err) {
  //    alert("playAudio():Audio Error: " + JSON.stringify(err));
  //  });
  //
  //  media.play();
  //  //$cordovaMedia.play(media)
  //};

  //  var src = './img/upvote.wav';
  //  var media = new Media(src, null, null, mediaStatusCallback);
  //  $cordovaMedia.play(media);
  //};
  //
  //var mediaStatusCallback = function(status) {
  //  if(status == 1) {
  //    $ionicLoading.show({template: 'Loading...'});
  //  } else {
  //    $ionicLoading.hide();
  //  }
  //};

  $scope.showLogin = function() {
    $scope.user = {};
    console.log('open login modal');
    var myLogin = $ionicPopup.show({
      templateUrl: 'templates/partials/login.html',
      title: 'Seek & Shoot',
      cssClass: 'loginPopup',
      scope: $scope,
      buttons:[

        {
          text: 'Login',
          type: 'button-energized',
          onTap: function (user) {

            user = $scope.user;
            console.log('the use is logging in', user);
            Auth.login(user).then(function () {
              console.log("Logged in succesfully!");
              $state.go('app.tab.dash');

            }, function (err) {
              console.log('Error...');
              //toaster.pop('error', "Oops there was an error!");
            })
          }
        },
          {
          text: 'Signup',
          type:'button-assertive',
          onTap: function(user){
            //console.log('the use is logging in', user);
            user= $scope.user;
            Auth.signup(user).then(function () {
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
            $state.go('app.tab.dash');
          }, function (err) {
            console.log('Error...');
            //toaster.pop('error', "Oops there was an error!");
          })
        }
      }]
    })
  };

});
