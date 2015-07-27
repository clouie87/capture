'use strict';

app.directive('iconSwitcher', function(Auth, Acceptu) {
  console.log('in icon switcher');
  var uid = Auth.user.uid;

  return{
    link: function(scope, elem, attrs) {
      var currentState = attrs.state;

      //findAccepteds(uid);

      //function findAccepteds(uid){
      //  Acceptu.getAcceptsForUser(uid).$asArray().$loaded().then(function(acceptUser) {
      //    if (acceptUser) {
      //      console.log('going to see', acceptUser);
      //      console.log('seeing', acceptUser.length);
      //      for (var i=0; i < acceptUser.length; i++) {
      //        console.log(acceptUser[i]);
      //        if(acceptUser[i].status === 'on')
      //        //currentState = 'on';
      //          angular.element(elem).removeClass(attrs.iconOff);
      //          angular.element(elem).data('state', 'on');
      //          angular.element(elem).addClass(attrs.iconOn);
      //          console.log(currentState);
      //      }
      //    } else {
      //      currentState = 'off';
      //    }
      //  });
      //}
      elem.on('click', function () {
        console.log('clicked!');

        if (currentState === 'off') {
          console.log('it is on!');
          angular.element(elem).removeClass(attrs.iconOff);
          angular.element(elem).data('state', 'on');
          angular.element(elem).addClass(attrs.iconOn);
          //} else {
          //  console.log('it is off');
          //  angular.element(elem).removeClass(attrs.iconOn);
          //  angular.element(elem).data('state', 'off');
          //  angular.element(elem).addClass(attrs.iconOff);

        }
        currentState = !currentState;
      })

    }
  }
})
