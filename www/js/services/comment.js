'use strict';

app.factory('Comment', function(FURL, $firebase, Auth, Challenge, toaster) {

  var ref = new Firebase(FURL);
  var comments = $firebase(ref.child('comments')).$asArray();
  var uid = Auth.user.uid;

  var Comment = {
    all: comments,

    getComments: function(challengeId){
      return $firebase(ref.child('comments').child(challengeId)).$asArray();
    },

    allComments: function(challengeId){
      console.log(challengeId);
      return $firebase(ref.child('comments').child(challengeId));
    },
    //addComment: function(challengeId) {
    //  return $firebase(ref.child('accepteds_challenge').child(challengeId));
    //},

    //getAccept: function(challenge, acceptedId) {
    //  return $firebase(ref.child('accepteds_challenge').child(challenge).child(acceptedId));
    //},

    addComment: function(challenge, newComment){
      console.log('in the acitvate function');

      var commentDatetime= Firebase.ServerValue.TIMESTAMP;

      var comment = {
        comment: newComment,
        created: commentDatetime,
        user: Auth.user.uid,
        name: Auth.user.profile.name,
        challengeId: challenge.$id
      };
      console.log(comment);

      var comments = this.getComments(challenge.$id);

      if(comments){
        return comments.$add(comment).then(function(){
          toaster.pop('success', "Comment added!")
        });
      }

    }
  };
  return Comment;
});
