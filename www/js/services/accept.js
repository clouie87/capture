'use strict';

app.factory('Accept', function(FURL, $firebase, Auth, Challenge, toaster) {

  var ref = new Firebase(FURL);
  var uid = Auth.user.uid;


  var Accept = {
    //getAcceptsForUser: function(uid){
    //  var defer = $q.defer();
    //
    //  $firebase(ref.child('accepteds').child(user))
    //    .$asArray()
    //    .$loaded()
    //    .then(function(challengeId){
    //      defer.resolve(challengId);
    //    }, function(err){
    //      defer.reject();
    //    });
    //
    //  return defer.promise;
    //},

    accepteds: function(challengeId){
      //console.log(challenge);
      return $firebase(ref.child('accepteds')).$asArray();
    },
    addActivate: function(challengeId, accept){
      console.log('in the acitvate function');
      console.log('the challenge id is ', challengeId);

      var accepteds_challenge = this.accepteds(challengeId);
      ////
      if(accepteds_challenge){
        return accepteds_challenge.$add(accept);

      }
    },
    isActive: function(){
     //return Challenge.userAcceptChallenge(user.id);
  }
  };
  return Accept;
});
