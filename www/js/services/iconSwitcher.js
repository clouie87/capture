'use strict';

app.directive('iconSwitcher', function() {
  console.log('in icon switcher');
  return{
    link: function(scope, elem, attrs) {
      var currentState = attrs.state;
      //console.log(scope, elem, attrs);

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
