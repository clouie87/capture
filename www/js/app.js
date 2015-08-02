// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', [
  'ionic',
  //'contrib.drawer',
  'ngCordova',
  'starter.controllers',
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'starter.services',
  'firebase',
  'toaster'

])

.constant('FURL', 'https://capture-photo.firebaseio.com/')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url:"/login",
    templateUrl: "templates/login.html",
    controller: 'AuthController'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'NavController'
  })

    .state('app.profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
          //controller: 'AuthController'
      controller: 'ProfileController'
    })

    // setup an abstract state for the tabs directive
    .state('app.tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('app.tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'CreateController'
      }
    }
  })

  .state('app.tab.challenges-photos', {
    url: '/dash/:challengeId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/challenges-photos.html',
        controller: 'CreateController'
      }
    }
  })

  .state('app.tab.photo-display', {
    url: '/dash/:challengeId/:photoId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/photo-display.html',
        controller: 'CreateController'
      }
    }
  })

  .state('app.tab.photo', {
      url: '/photo',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-photo.html',
          controller: 'PhotoController'
        }
      }
    })
    .state('app.tab.photo-camera', {
      url: '/photo/camera',
      views: {
        'tab-photo': {
          templateUrl: 'templates/photo-camera.html',
          controller: 'PhotoController'
        }
      }
    })
    .state('app.tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  //.state('app.profile', {
  //  url: '/profile',
  //  views: {
  //    'app-profile': {
  //      templateUrl: 'templates/profile.html',
  //      //controller: 'AuthController'
  //      controller: 'ProfileController'
  //    }
  //  }
  //})

  .state('app.tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/login');

});
