'use strict';

app.factory('Photo', function(FURL, $firebase, Auth, $cordovaCamera) {
  var ref = new Firebase(FURL);
  var photos = $firebase(ref.child('photos')).$asArray();
  var user = Auth.user;

  var Photo = {
    all: photos,

    getPhoto: function (photoId) {
    return $firebase(ref.child('photo').child(photoId));
    },

    photoSave: function(photo){
      console.log('made it to photoSave!');
    },

    //takePhoto: function () {
    //  console.log('upload pic clicked');
    //  alert('upload pic is working');
    //  var options = {
    //      quality: 75,
    //      destinationType: navigator.camera.DestinationType.FILE_URI,
    //      sourceType: navigator.camera.PictureSourceType.CAMERA,
    //      allowEdit: true,
    //      encodingType: navigator.camera.EncodingType.JPEG,
    //      popoverOptions: CameraPopoverOptions,
    //      targetWidth: 500,
    //      targetHeight: 500,
    //      saveToPhotoAlbum: false
    //    };
    //
    //  },

    submitPhoto: function(photo){
      console.log(photo.name, 'is photo name');
      alert(photo.name, 'is photo name');
      photo.datetime = Firebase.ServerValue.TIMESTAMP;

        var imageSave= photo.imageURI;
        console.log('the image is', imageSave);

        var obj ={
          //photoId: newPhoto.key(),
          //type: true,
          name: photo.name,
          description: photo.description,
          image: 'camera.jpg'
        };

          console.log('object i want ot save is', obj);

        return photos.$add({image: imageSave}).then(function(){

        alert("Image has been uploaded");
      });
    //}, function (error) {
    //console.error(error);
  //});
//}


        //var PhotoRef = $firebase(ref.child('photo'));
        //return newPhoto;
      //});
    }
  };
  return Photo;
});
