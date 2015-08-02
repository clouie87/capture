'use strict';

app.factory('Challenge', function(FURL, $firebase, Auth, toaster, Photo) {
  var ref = new Firebase(FURL);
  //var photos = $firebase(ref.child('photos')).$asArray();
  var challenges = $firebase(ref.child('challenges')).$asArray();
  var currentUser = Auth.user;
  var uid = currentUser.uid;

  var Challenge = {
    all: challenges,

    getChallenge: function (challengeId) {
    return $firebase(ref.child('challenges').child(challengeId));
    },


    createChallenge: function(photo){
      photo.datetime = Firebase.ServerValue.TIMESTAMP;

      var data = photo.imageURI;
      var imageSave = "data:image/jpeg;base64," + data;
      //alert('creator,', Auth.user.uid.name);
      alert('creator,', currentUser.profile.name);

      var obj ={
        //photoId: newPhoto.key(),
        //type: true,
        creator: currentUser.profile.name,
        created: photo.datetime,
        name: photo.name,
        description: photo.description,
        image: imageSave
      };

      console.log('object i want ot save is', obj);

      return challenges.$add(obj).then(function(){
        toaster.pop('success', "You created a new challenge!")
      });

    },

    accepteds: function(uid){
      console.log('the challenge in the accepted funtion is', uid);
      return $firebase(ref.child('accepteds_user').child(uid)).$asArray();
    },

    addActivate: function(uid, challengeId, accept) {
      console.log('in the acitvate user function');
      console.log('the challenge id is ', challengeId);

      var accepteds_user = this.accepteds(uid);
      console.log(accepteds_user);

      if (accepteds_user) {
        console.log('adding to accepteds_user');
        return accepteds_user.$add(accept);
      }

      //return $firebase(ref.child('user_challenges').child(challenge.user).$push(object));


    }

  };
  return Challenge;
});
