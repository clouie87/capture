'use strict';

app.factory('Photo', function(FURL, $firebase, Auth, toaster) {
  var ref = new Firebase(FURL);
  var photos = $firebase(ref.child('photos')).$asArray();
  var challenges = $firebase(ref.child('challenges')).$asArray();
  var user = Auth.user;

  var Photo = {
    all: photos,

    getPhoto: function (photoId) {
    return $firebase(ref.child('photo').child(photoId));
    },

    photoSave: function(photo){
      console.log('made it to photoSave!');
    },

    submitPhoto: function(photo){
      console.log(photo.name, 'is photo name');
      console.log(Auth.user.uid);

      photo.datetime = Firebase.ServerValue.TIMESTAMP;

      var data = photo.imageURI;
      var imageSave = "data:image/jpeg;base64," + data;

        var obj ={
          //photoId: newPhoto.key(),
          //type: true,
          creator: Auth.user.uid,
          created: photo.datetime,
          name: photo.name,
          description: photo.description,
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
        description: photo.description,
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
