'use strict';

app.directive('selectChallenge', function() {
  console.log('in selectState');

  return function(scope, elem, attrs) {
        //console.log('in selectState');
        //var currentState = attrs.state;

        scope.$on('ChangeColor', function() {
          console.log('changing color');


            console.log('it is on!');
              //angular.element(elem).addClass(attrs.iconOff);
            //  angular.element(elem).data('state', 'on');
            //  angular.element(elem).addClass(attrs.iconOn);
            //} else {
            //  console.log('it is off');
            //  angular.element(elem).removeClass(attrs.iconOn);
            //  angular.element(elem).data('state', 'off');
            //  angular.element(elem).addClass(attrs.iconOff);
          //}
          //currentState = !currentState;
        })

  }
});
