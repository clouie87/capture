'use strict';

app.factory('Accept', function(FURL, $firebase, Auth, Challenge, toaster) {

  var ref = new Firebase(FURL);
  var user = Auth.user;


  var Accept = {
    accepteds: function(challengeId){
      //console.log(challenge);
      return $firebase(ref.child('accepteds').child(challengeId)).$asArray();
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
