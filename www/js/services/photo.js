'use strict';

app.factory('Photo', function(FURL, $firebase, Auth) {
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
      //alert(photo.name, 'is photo name');
      photo.datetime = Firebase.ServerValue.TIMESTAMP;

      var data = photo.imageURI;
      //alert('the data in submit photo is:  ', data);

        //var base64Data = photo.imageURI.replace(/^data:image\/jpeg;base64,/, "");
        //alert('the base 64'+ base64Data);
        //require("fs").writeFile("test.jpg", base64Data, 'base64', function(err) {
        //  console.log(err);
        //  alert(err_)
        //});

      var imageSave = "data:image/jpeg;base64," + data;

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

    }
  };
  return Photo;
});
