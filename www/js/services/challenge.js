'use strict';

app.factory('Challenge', function(FURL, $firebase, Auth, toaster, Photo) {
  var ref = new Firebase(FURL);
  //var photos = $firebase(ref.child('photos')).$asArray();
  var challenges = $firebase(ref.child('challenges')).$asArray();
  var currentUser = Auth.user;

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
    userAcceptChallenge: function(challengeId){


      Challenge.getChallenge(challengeId)
      .$asObject()
      .$loaded()
      .then(function(challenge) {
        console.log('in the userAcceptChallenge function');
          var object ={
            challengeId: challengeId,
            user: Auth.user.profile.id,
            type: true,
            title: challenge.name
          };
          return $firebase(ref.child('user_challenges').child(challenge.user).$push(object));


      });

    }

  };
  return Challenge;
});
