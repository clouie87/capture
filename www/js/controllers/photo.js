'use strict';

app.controller('PhotoController', function($scope){
  console.log('got to the PhotoContoller linked');

  $scope.name='';
  $scope.description='';

  $scope.createPhoto = function(challenge) {
    console.log(challenge);
  }
});
