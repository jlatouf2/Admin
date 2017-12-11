'use strict'
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers',  'ngCordova'])

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

    $cordovaPushV5.initialize(
                {
                    android: {
                        senderID: "951079272607"  //fcm
                       //senderID : "402556160618" //gcm
                    }
                }
            ).then(function (result) {
                $cordovaPushV5.onNotification();
                 $cordovaPushV5.onError();
                console.log("About to register");
                $cordovaPushV5.register().then(function (device_token) {
                    console.log("Register success with device_token " + device_token);

                    //registerDevice();
                }, function (err) {
                    // handle error
                    console.log("Error registering device");
                });
            });

            $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, notification) {
                //Never reaches here for Android in background, but works fine for iOS when in background
                //Reaches here for Android when in foreground
    console.log("jsjsadsa")
               console.log('Received some notification: '+ JSON.stringify([notification]));

                $cordovaPushV5.finish().then(function (result) {
                    console.log('finished notificationReceived RESULT: ' + result);
                }, function (err) {
                    // handle error
                    console.log('finished notificationReceived ERROR: ' + err);

                });
            });

            $rootScope.$on('$cordovaPushV5:errorOccurred', function(event, error) {
                // handle error
                console.log('cordovaPushV5:errorOccurred ERROR: ' + error);
            });





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
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
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

        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: "firstController"
        });
    $urlRouterProvider.otherwise('/home');
});
