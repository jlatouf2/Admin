'use strict'
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers',  'ngCordova', 'chart.js'])

.run(function($ionicPlatform, $rootScope,   $cordovaPushV5) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


  });

})



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('storeNames', {
            url: '/storeNames',
            templateUrl: 'templates/storeNames.html',
            controller: 'storeNamesCtrl'
        })
        .state('storelines', {
            url: '/storelines',
            templateUrl: 'templates/storelines.html',
            controller: 'StorelinesCtrl'
        })
        .state('peopleline', {
            url: '/peopleline',
            templateUrl: 'templates/peopleline.html',
            controller: 'PeoplelineCtrl'
        })
        .state('other', {
            url: '/other',
            templateUrl: 'templates/other.html',
            controller: 'ContactController'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'ContactController'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
        })

        .state('messaging', {
            url: '/messaging',
            templateUrl: 'templates/messaging.html',
            controller: 'MessagingCtrl'
        })

      .state('analytics', {
          url: '/analytics',
          templateUrl: 'templates/analytics.html',
          controller: 'AnalyticsCtrl'
      })

      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
      })

      .state('details', {
          url: '/details',
          templateUrl: 'templates/details.html',
          controller: 'DetailsCtrl'
      })

      .state('admin', {
          url: '/admin',
          templateUrl: 'templates/admin.html',
          controller: 'AdminCtrl'
      })
          .state('chart', {
          url: '/chart',
          templateUrl: 'templates/chart.html',
          controller: 'ChartCtrl'
      })

        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: "firstController"
        });
    $urlRouterProvider.otherwise('/home');
});
