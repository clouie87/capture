'use strict';

app.factory('Accept', function(FURL, $firebase, Auth, Challenge, toaster) {

  var ref = new Firebase(FURL);
  var accepteds = $firebase(ref.child('accepteds_challenge')).$asArray();
  var uid = Auth.user.uid;
  console.log(uid);
  var name = Auth.user.profile.name;

  var Accept = {
    all: accepteds,

    getAll: function(){
      return $firebase(ref.child('accepteds_challenge'))
    },

    accepteds: function(challenge){
      //console.log('the challenge in the accepted function is', challenge);
      return $firebase(ref.child('accepteds_challenge').child(challenge)).$asArray();
    },

    getAcceptsForChallenge: function(challengeId){
      return $firebase(ref.child('accepteds_challenge').child(challengeId));
    },

    getAccepts: function(challengeId) {
      return $firebase(ref.child('accepteds_challenge').child(challengeId));
    },

    getAccept: function(challenge, acceptedId) {
      return $firebase(ref.child('accepteds_challenge').child(challenge).child(acceptedId));
    },

    getNames: function(){

    },

    addActivate: function(challengeId, accept){
      console.log('in the acitvate function');
      console.log('the challenge id is ', challengeId);

      var accepteds_challenge = this.accepteds(challengeId);
      //console.log(accepteds_challenge);

      if(accepteds_challenge){
        console.log('adding to accepteds_challenge');
        return accepteds_challenge.$add(accept);
      }

    },

    deActivate: function(challenge, acceptedId) {
      console.log('the challenge is', challenge, acceptedId);

      return this.getAccept(challenge, acceptedId).$remove();

      //this.getAccepts(challenge).$asArray().$loaded().then(function(userName){
      //  //console.log(userName);
      //  //console.log(userName.length);
      //  for (var i = 0; i < userName.length; i++){
      //    //console.log(userName[i]);
      //    //console.log(userName[i].name);
      //    if (userName[i].user === uid){
      //      //console.log('will be deleting', userName[i]);
      //      var acceptedId= userName[i].$id;
      //      //console.log(challenge, acceptedId);
      //      //return $firebase(ref.child('accepteds_challenge').child(challenge).child(acceptedId)).$remove();
      //    }
      //    //return $firebase(ref.child('accepteds_challenge').child(challenge).child(acceptedId)).$remove();
      //  }

        //return $firebase(ref.child('accepteds_challenge').child(challenge).child(acceptedId)).$remove();
        //return $firebase(ref.child('accepteds_challenge').child(challenge).child(acceptedId));
        //console.log(acceptedId, challenge);
        //return this.getAccept(challenge, acceptedId)
        //var newNames = this.getAccept(challenge, acceptedId);
      //});


    },

    isActive: function(){
     //return Challenge.userAcceptChallenge(user.id);
  }
  };
  return Accept;
});
