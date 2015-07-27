'use strict';

app.factory('Acceptu', function(FURL, $firebase, Auth, Challenge, toaster) {

  var ref = new Firebase(FURL);
  var uid = Auth.user.uid;
  //var accepteds_challenge = $firebase(ref.child('accepteds_challenge')).$asArray();
  var accepteds_user = $firebase(ref.child('accepteds_user')).$asArray();
  //
  //});

  var Acceptu = {
    all: accepteds_user,

    accepteds: function(uid){
      console.log('the challenge in the accepted funtion is', uid);
      return $firebase(ref.child('accepteds_user').child(uid)).$asArray();
    },

    getAcceptsForUser: function(uid){
      //console.log(uid);
      return $firebase(ref.child('accepteds_user').child(uid));
    },

    isActive: function(uid) {
      return $firebase(ref.child('accepteds_user').child(uid));

    }

    //addActivate: function(uid, challengeId, accept){
    //  console.log('in the acitvate user function');
    //  console.log('the challenge id is ', challengeId);
    //
    //  var accepteds_user = this.accepteds(uid);
    //  console.log(accepteds_user);
    //
    //  if(accepteds_user) {
    //    console.log('adding to accepteds_user');
    //    return accepteds_user.$add(accept);
    //  }
    //},

  };
  return Acceptu;
});
