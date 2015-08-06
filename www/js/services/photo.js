'use strict';

app.factory('Photo', function(FURL, $firebase, Auth, toaster) {
  var ref = new Firebase(FURL);
  var uid = Auth.user.uid;

  var photos = $firebase(ref.child('photos').child(uid)).$asArray();
  var photo_challenge = $firebase(ref.child('photo_challenge')).$asArray();
  var challenges = $firebase(ref.child('challenges')).$asArray();
  var user = Auth.user;

  var Photo = {
    all: photos,

    getPhoto: function (photoId) {
    return $firebase(ref.child('photo').child(photoId));
    },


    submitPhoto: function(photo){
      photo.datetime = Firebase.ServerValue.TIMESTAMP;

      var data = photo.imageURI;
      var imageSave = "data:image/jpeg;base64," + data;

        var obj ={
          challengeId: photo.challengeId,
          creator: Auth.user.uid,
          name: photo.name,
          created: photo.datetime,
          title: photo.photoName,
          image: imageSave
        };
      console.log('object i want ot save is', obj);

        return photos.$add(obj).then(function(){
        //alert("Image has been uploaded");
      });

    },

    createPhoto: function(photo){
      photo.datetime = Firebase.ServerValue.TIMESTAMP;

      var data = photo.imageURI;
      var imageSave = "data:image/jpeg;base64," + data;

      var obj ={
        //photoId: newPhoto.key(),
        creator: Auth.user.uid,
        created: photo.datetime,
        name: photo.name,
        //description: photo.description,
        image: imageSave
      };

      console.log('object i want ot save is', obj);

      return challenges.$add(obj).then(function(){
        toaster.pop('success', "You created a new challenge!")
      });

    }

  };
  return Photo;
});
