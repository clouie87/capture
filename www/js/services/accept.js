'use strict';

app.factory('Accept', function(FURL, $firebase, Auth, Challenge, toaster) {

  var ref = new Firebase(FURL);
  var accepteds_challenge = $firebase(ref.child('accepteds_challenge')).$asArray();
  var uid = Auth.user.uid;

  var Accept = {

    accepteds: function(challenge){
      console.log('the challenge in the accepted funtion is', challenge);
      return $firebase(ref.child('accepteds_challenge').child(challenge)).$asArray();
    },


    addActivate: function(challengeId, accept){
      console.log('in the acitvate function');
      console.log('the challenge id is ', challengeId);

      var accepteds_challenge = this.accepteds(challengeId);
      console.log(accepteds_challenge);

      var accepteds_user = this.accepteds(uid);

      if(accepteds_challenge){
        console.log('adding to accepteds_challenge');
        return accepteds_challenge.$add(accept);
      }

    },
    isActive: function(){
     //return Challenge.userAcceptChallenge(user.id);
  }
  };
  return Accept;
});
