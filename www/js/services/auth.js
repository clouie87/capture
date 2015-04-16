'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebase){
  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  var Auth = {

    user: {},

    login: function (user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },
    signup: function (user) {
      return auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function () {
        return Auth.login(user);
      });
    },
    logout: function () {
      auth.$unauth();
    },

    signedIn: function(){
      //console.log('the user is signed in');
      return !!Auth.user.provider;
      //same as Auth.user && Auth.user.provider just shorter
    }
  };

  //a way to check if the user has logged in or out.
  //firebase has a $onAuth function that listens for changes in user state
  //this function has a callback that fires when a user state changes (authData)

  auth.$onAuth(function(authData){
      if (authData) {
        angular.copy(authData, Auth.user); //when user logs in we will store userData in Auth.user
      } else {
        angular.copy({}, Auth.user); //when user logs out we'll release that data
      }
  });

  return Auth;

});
