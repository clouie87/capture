'use strict';

app.factory('Vote', function(FURL, $firebase, Auth) {

  var ref = new Firebase(FURL);
  var user = Auth.user;


  var Vote = {
    votes: function(photoId){
      //console.log(challenge);
      return $firebase(ref.child('votes').child(photoId)).$asArray();
    },
    addVote: function(photoId, vote){
      console.log('in the addVote function');
      console.log('the photo id is ', photoId);

      var votes_photo = this.votes(photoId);
      ////
      if(votes_photo){
        return votes_photo.$add(vote);

      }
    },
    isActive: function(){
     //return Challenge.userAcceptChallenge(user.id);
  }
  };
  return Vote;
});
