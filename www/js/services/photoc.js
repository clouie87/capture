'use strict';

app.factory('PhotoChallenge', function(FURL, $firebase, Auth, toaster) {
  var ref = new Firebase(FURL);
  var photo_challenge = $firebase(ref.child('photo_challenge')).$asArray();

  var PhotoChallenge = {
    //all: photos,

    getPhotos: function (challengeId) {
    return $firebase(ref.child('photo_challenge').child(challengeId)).$asArray();
    },



    photoSave: function(photo){
      //alert("in photo save");

      console.log('photo will be saved:', photo);
      photo.datetime = Firebase.ServerValue.TIMESTAMP;

      var data = photo.imageURI;
      var imageSave = "data:image/jpeg;base64," + data;
      var challengeId = photo.challengeId;

      var obj ={
        challengeId: photo.challengeId,
        creator: Auth.user.uid,
        name: photo.name,
        created: photo.datetime,
        title: photo.photoName,
        image: imageSave
      };
      console.log('object i want ot save is', obj);

      var photo_challenge = this.getPhotos(challengeId);

      return photo_challenge.$add(obj)
    }


  };
  return PhotoChallenge;
});
