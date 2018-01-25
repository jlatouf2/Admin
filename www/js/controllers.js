'use strict';
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', { scope: $scope })
        .then(function(modal) { $scope.modal = modal; });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {   $scope.modal.hide();  };

        // Open the login modal
        $scope.login = function() { $scope.modal.show(); };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() { console.log('Doing login', $scope.loginData);
         $timeout(function() { $scope.closeLogin();  }, 1000);
        };

})

.controller('firstController', function($scope, $location, $http, $rootScope, $ionicModal, AuthService) {

      //alert(localStorage.getItem("TokenData"));

          //  NOTE: THIS IS THE NOTIFICAITON KEY:
        // localStorage.setItem("TokenData", 'blackbox');


        $scope.$on('$stateChangeSuccess', function () {
          console.log($rootScope.token);
      /*      if (  $rootScope.token !== 'true') {
              $location.path('/admin');
            }
              */
          });

        $scope.noteToken = localStorage.getItem("TokenData");
      //     $scope.noteToken ="BLACK";

          $scope.email = "jlatouf2@gmail.com";   $scope.password = "jarredl";
          $scope.blue = function(){  console.log('white;');};
            /*   --------LOGIN MODAL-----------     */
        $scope.loginModal = function(){  $("#myModal").modal("show"); };

          /*   --------LOGIN FUNCTION-----------     */
        $scope.ServiceFunction5 = function () { AuthService.LoginExample3($scope.email, $scope.password, $scope.noteToken); $scope.closeLogin1(); };

        /*   --------LOGOUT MODAL-----------     */
        $scope.logoutFunction = function(){  AuthService.logout(); };

        /*   --------SOCKET EX-----------     */
        $scope.socketData = function(){ socket.emit('clientEvent', 'Sent an event from the client!'); };

        var currentLocation = window.location;
        console.log(currentLocation);



            // Template for Modal
        $ionicModal.fromTemplateUrl('templates/modals/loginmodal.html', { scope: $scope })
        .then(function(modal) {   $scope.modal1 = modal; });

        $scope.closeLogin1 = function() { $scope.modal1.hide();  };

        // Open the login modal
        $scope.loginMod = function() { $scope.modal1.show(); };

    })

.controller('ContactController', function($scope, $location, $http,  $state, $rootScope, AuthService, $cordovaDialogs, $cordovaToast, $ionicPlatform, $cordovaLocalNotification) {

        //  $cordovaDialogs.beep(3);

        $scope.$on('$stateChangeSuccess', function () {
          console.log($rootScope.token);
            if (  $rootScope.token !== 'true') {
              $location.path('/admin');
            }
          });


          $scope.dialog = function(){ $cordovaDialogs.alert('message', 'title', 'button name')
             .then(function() {   });
           };

        // NOTE: THIS WORKS FOR IOS:
        $scope.sendFirebasehttp12 = function(){
          $http({
          url : "https://fcm.googleapis.com/fcm/send",
          method : 'POST',
          headers : { 'Content-Type' : 'application/json',
          'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
          data: ({"to": "dKDJ81CczpM:APA91bGziW_Xf6oyIimfPhoS1tAlHuWlxTVt6HEPyhirhCXk7T84oqLGr9dgerAfQiqa-9FulavrtAL0liBBXIn_NHdtB490_su4WAg8K4DN64N22WeNItunOf2g3vrO6SMcVT-qAh3O", "notification": {"title":"Test","body":"Test", "sound":"default"}})

          }).success(function(data){
              alert("login Successfully");  console.log(data);
          }).error(function(error){
              alert("login error");    console.log(error);
          });
        };

        // NOTE: THIS WORKS FOR ANDROID:

        $scope.sendFirebasehttp99 = function(){
          $http({
          url : "https://fcm.googleapis.com/fcm/send",
          method : 'POST',
          headers : { 'Content-Type' : 'application/json',
          'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
          data: ({"to": "eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S", "notification": {"title":"Test","body":"Test", "sound":"default"},  "priority":"high"})

          }).success(function(data){
              alert("login Successfully");
              console.log(data);

          }).error(function(error){
              alert("login error");
              console.log(error);

          });
        };


         $scope.getNotif = function(){
          FCMPlugin.getToken(function(token) {
               console.log(token);  window.alert(token);
              localStorage.setItem("TokenData", token);
              var myToken = localStorage.getItem("TokenData");
              window.alert(myToken);

              $http.post('https://lineups-adminone.herokuapp.com/tokenReturned', {token: localStorage.getItem("TokenData")})
                 .then(function(data) {
                      alert('worked');   alert(data);
                      $scope.getToken = data;
                     //$scope.content = response.data;
                 }, function() { alert('didnt work'); });

                   FCMPlugin.onNotification(function(data) {
                      console.log(data);
                      window.alert('THIS WAS SELECTED ON NOTIFICATION!!')
                      window.alert(data);
                  });
              });
            };


          $rootScope.goback2 = function(){ console.log('clicked'); $state.go('home'); };
            //LOCALSTOREAGE IN ANGULARJS:
          $scope.setLocal = function () { localStorage.setItem("Name", "John");  };

          $scope.getLocal = function () { console.log(localStorage.getItem("Name"));  };

          $scope.removeLocal = function () { localStorage.removeItem("Name");   };

          $scope.getLocalbyKey = function () { console.log(localStorage.getItem("Name"));  };


              $scope.noteToken = localStorage.getItem("TokenData");

              console.log($scope.noteToken);

        $scope.fname = "Jarred"; $scope.lname = "Latouf"; $scope.email = "jlatouf2@gmail.com";
        $scope.password = "jarredl"; $scope.passwordConf = "jarredl";

        $scope.fname = {fname1 : "Jarred"};
        $scope.lname = {lname1 : "Latouf"};
        $scope.email = {email1 : "jlatouf2@gmail.comsadfasfafda"};
        $scope.password = {password1 : "jarredl"};
        $scope.passwordConf = {passwordConf1 : "jarredl"};


        $scope.ServiceFunction4 = function () {
        //  document.addEventListener("deviceready", function() {

            document.addEventListener("deviceready", function() {


              window.FirebasePlugin.getToken(function(token) {
              // save this server-side and use it to push notifications to this device
              // save this server-side and use it to push notifications to this device
              window.alert(token);
             localStorage.setItem("TokenData", token);
             var myToken = localStorage.getItem("TokenData");
             $rootScope.noteToken = myToken;
             window.alert(myToken);

              window.alert(token);
          }, function(error) {
              window.alert(error);
          });
                        }, false);


          AuthService.RegisterExample4($scope.fname.fname1, $scope.lname.lname1, $scope.email.email1,
          $scope.password.password1, $scope.passwordConf.passwordConf1, $scope.noteToken );
        };

       /*  $scope.ServiceFunction5 = function () {console.log("clicked22");AuthService.LoginExample3($scope.email, $scope.password);}; */


      //FACEBOOK SERVICE.JS LOGIN:
      $scope.Servicefacebook = function () { AuthService.facebookLogin(); };


    // function myFunction6(){
       $scope.gettoken = function(){   alert(localStorage.getItem("Token"));  };


       $scope.foodItems = [{   name:'Noodles', price:'10', quantity:'1' },
          { name:'Pasta', price:'20',  quantity:'2'   },
          { name:'Pizza', price:'30',  quantity:'1'  },
          { name:'Chicken tikka',  price:'100',  quantity:'1'  }];


      })


.controller('ProfileCtrl', function($scope, $location, $http, $rootScope, AuthService) {

  $rootScope.token = localStorage.getItem("ok");

      console.log(localStorage.getItem("ok"));
      console.log($rootScope.token);


      $scope.$on('$stateChangeSuccess', function () {
        console.log($rootScope.token);
          if (  $rootScope.token !== 'true') {
            $location.path('/admin');
          }
        });

        //THIS CONFIRMS THE LOGIN FOR FACEBOOK
        /*
        setTimeout(function() {    AuthService.confirm();

          var bob2 = "http://graph.facebook.com/" +$scope.userid+ "/picture?type=square";
          console.log("This is the data that I am goign to pass: "+ bob2);
          console.log($scope.userid);
          $scope.black2 = bob2;
        }, 1000);
        */


          AuthService.confirm(); console.log($scope.userid);
          console.log($rootScope.useremail); console.log($scope.imageSaved);

        /*
        You can use following urls to obtain different sizes of profile images. Please make sure to add Facebook id to url.
        Large size photo https://graph.facebook.com/{facebookId}/picture?type=large
        Medium size photo https://graph.facebook.com/{facebookId}/picture?type=normal
        Small size photo https://graph.facebook.com/{facebookId}/picture?type=small
        Square photo https://graph.facebook.com/{facebookId}/picture?type=square

        //  http://graph.facebook.com/" +profile.id+ "/picture?type=square
        var bob = "http://graph.facebook.com/" +$scope.userid+ "/picture?type=square";
        console.log("This is the data that I am goign to pass: "+ bob);


          //THIS WAS POSTED IN APP UNTIL I TOOK IT OUT
        //https://graph.facebook.com/{facebookId}/picture?type=large&w‌​idth=720&height=720
        var bob2 = "https://graph.facebook.com/" +$scope.userid+ "/picture?type=large&w‌​idth=150&height=200";
        console.log("This is the data that I am goign to pass: "+ bob2);

        $scope.black = bob;
        console.log($scope.black);
        $scope.black2 = bob2;
        console.log($scope.black2);
        */

        //https://graph.facebook.com/{facebookId}/picture?type=large&w‌​idth=720&height=720
        var bob2 = "http://graph.facebook.com/" +$scope.userid+ "/picture?type=square";
        console.log("This is the data that I am goign to pass: "+ bob2);
        console.log($scope.userid); $scope.black2 = bob2; console.log($scope.black2);

        })




.controller('storeNamesCtrl', function($scope, $location, $http, $timeout, $cordovaGeolocation, $rootScope, $state, $ionicModal, $ionicHistory, AuthService) {

        /*   --------BACK BUTTON-----------     */

          $rootScope.goback2 = function(){
            console.log('clicked1'); $ionicHistory.goBack();
         };

         /*   --------STATECHANGE-----------     */

         $scope.$on('$stateChangeSuccess', function () {
           socket.emit('storeName', {postal: $scope.postal },function (data) {
                 console.log(data);    console.log(data[0].store);
                  $timeout(function () { $scope.numberLinesZero = false; $scope.storewithNames = data; }, 0);

            });
          });

         /*   --------MODALS-----------     */

          // Template for Storenames Modal
          $ionicModal.fromTemplateUrl('templates/modals/storemodal1.html', { scope: $scope
          }).then(function(modal) { $scope.modal2 = modal; });
          $scope.closestoremodal1 = function() { $scope.modal2.hide(); };
           $scope.openstoremodal1 = function() { $scope.modal2.show(); };


          // Template for Storenames Modal
          $ionicModal.fromTemplateUrl('templates/modals/storemodal2.html', { scope: $scope
          }).then(function(modal) { $scope.modal3 = modal; });
           $scope.closestoremodal2 = function() { $scope.modal3.hide(); };
           $scope.openstoremodal2 = function() { $scope.modal3.show(); };


      //    $timeout(function(){ $scope.modal2.show();   },0);


          /*   --------COORDINATES-----------     */

          $scope.findGPS = function(){
            $timeout(function() {
              // Do something every 3 seconds
              var posOptions = {timeout: 10000, enableHighAccuracy: false};
                 $cordovaGeolocation.getCurrentPosition(posOptions)

                 .then(function (position) {
                    var lat22  = position.coords.latitude; var long22 = position.coords.longitude;

          //    $scope.$applyAsync(function () {
               $timeout(function () {

              $scope.latitude = lat22; $scope.longitude = long22; $scope.numberLinesZero = false;

                // NOTE: THIS STOPS THE LOADER
              // document.getElementById("loader").style.display = "none";
               $scope.words = '';
               $scope.wordspace = false;

               //saves coordinates in localstorage:
               localStorage.setItem("StoreLatitude", lat22);
               localStorage.setItem("StoreLongitude", long22);
                console.log(localStorage.getItem("StoreLatitude"));
                console.log(localStorage.getItem("StoreLongitude"));

          //    });
              }, 0);
                   console.log(lat22 + '   ' + long22);
               }, function(err) {
                  console.log(err);
               });
             }, 0);
          };



      /*     socket.on('updateStores', function (data) {
                 $timeout(function () {$scope.numberLinesZero = false; $scope.storewithNames = data;  }, 0);

         });
      */

          /*   --------STARTPAGE FUNCTION-----------     */
                startPage();

          function startPage () {
              $scope.numberLinesZero = true;   $scope.findGPS();
              $rootScope.words = 'Please wait a moment for coordinates';  $rootScope.wordspace = true;
          }


          /*   --------GETS STORES-----------
          function getStoreNamesAfterCoordinates () {
                 socket.emit('storeName', {postal: $scope.postal },function (data) {
                     console.log(data); console.log(data[0].store);
                    $timeout(function () {
                       $scope.numberLinesZero = false;
                      $scope.storewithNames = data;
                    }, 0);
                 });
            }
      */

      /*      socket.on('updateStores', function (data) {
                   console.log(data);  $scope.numberLinesZero = false;
                //  $scope.$apply(function () {  $scope.storewithNames = data;  });
                  $timeout(function () { $scope.storewithNames = data;  }, 0);
            });
      */

            /*   --------SEARCHES STORES-----------     */
          $scope.searchStores = function(){
                socket.emit('storenameSearch',  {store: $scope.storesearchName },function (data) {
                  console.log("Data is returned: " + data);
                      $timeout(function () { $scope.storewithNames = data;  }, 0);
                });
            };


                $scope.storeName ={sname:""};

              /*   --------ADDS STORE TO DB-----------     */
            $scope.addStore1 = function(name){
                  if ( $scope.storeName.sname == '') {

                   $timeout(function () { $scope.failedLogin = true;  $scope.failedData = 'Please enter a name'; }, 0);
                   $timeout(function () { $scope.failedLogin = false;  }, 3000);

                    console.log('Please enter a name');
                      } else{
                      socket.emit('addStore',  {store : $scope.storeName.sname, email: $scope.useremail, postal: $scope.postal, latitude: localStorage.getItem("StoreLatitude"),
                        longitude: localStorage.getItem("StoreLongitude"), Adminpassword: $scope.usertoken },function (data) {
                            console.log(data);

                      $timeout(function () {   $scope.failedData = data;   $scope.failedLogin = true; }, 0);

                              $timeout(function () { $scope.failedLogin = false; }, 3000);
                          //  $scope.storeName.sname == '';
                      });
                   }
              };

          socket.on('addStorename', function (data) {
                 console.log($scope.storewithNames); console.log(data);
                 $timeout(function () {
                   $scope.successMessage = true;
                      $scope.successData = data.store;
                      $scope.storewithNames.push(data);
                    },
                   0);
                $timeout(function () { $scope.successMessage = false;   }, 3000);

          });

            /*   --------DELETENAME-----------     */

          $scope.deleteName2 = function(name) {
             $scope.storeName2 = name;
               socket.emit('deletestoreAdmin',  {store:  $scope.storeName2  },function (data) {
               console.log(data); alert(data);
             });
           };

        socket.on('deleteUpdate', function (data) {
               $timeout(function () { console.log(data); $scope.storewithNames = data;  }, 0);
        });


          /*   --------DELETE MODE TOGGLE-----------     */
          $scope.deleteMode = function(){   $rootScope.deleteButton = true; $scope.closestoremodal2();   };

            /* ----------EXIT DELETE MODE -------------- */
           $scope.exitDeleteMode = function(){    $rootScope.deleteButton = false;  };

             /*   --------LOCATION DATA ON PAGE-----------     */
          $scope.grabStuff = function(names){
              $rootScope.grabStorename = names; console.log('GrabStuff');
              localStorage.setItem("StoreName", $scope.grabStorename);
               console.log(localStorage.getItem("StoreName"));
            };

            $scope.selected = false;

            $scope.button3 = function () {
                //do logic for button 1
                $scope.selected = !$scope.selected;    console.log('btn3 clicked');
                console.log('THE AUTOMATIC BUTTON IS TURNED ON!');
                $rootScope.textgoesAway = false;
                  /*
                  IF YOU WANT TO KEEP THE LOOP GOING WHEN THIS IS ON: ALL I HAVE TO DO:
                  1) ADD AN  if($scope.notifyloop == true) { $scope.autoNotify();  }
                      in the $stateChangeSuccess function below. */
            };

            $scope.button4 = function () {
                //do logic for button 2
                $scope.selected = !$scope.selected;   console.log('btn4 clicked');
                console.log('AUTOMATION TURNED OFF');
                $rootScope.textgoesAway = true;

             };


     })


.controller('StorelinesCtrl', function($scope, $location, $ionicModal, $timeout, $cordovaGeolocation, $http, $rootScope, $state, $ionicHistory, AuthService) {


  /*   --------LOGOUT MODAL-----------     */
  $scope.logoutFunction = function(){  AuthService.logout(); };


          console.log(localStorage.getItem("StoreName"));
          console.log(localStorage.getItem("StoreLatitude"));
          console.log(localStorage.getItem("StoreLongitude"));
          $scope.grabStorename = localStorage.getItem("StoreName");


         $rootScope.goback2 = function(){ console.log('clicked2');  $ionicHistory.goBack(); };


         /*   --------STATE CHANGE-----------     */

         $scope.$on('$stateChangeSuccess', function () {
           console.log('STATECHANGE ON!!!' + localStorage.getItem("StoreName"));
           socket.emit('numberofLines',  {store:  localStorage.getItem("StoreName")  },function (data) {
             console.log(data); console.log(data.length);

               $timeout(function () {
                 $rootScope.numberLines= data.length;  $scope.countries = data; $scope.whiteLines();
                 }, 0);

            /*   $rootScope.numberLines= data.length;   $scope.countries = data;
               $scope.$apply(function () {   $scope.whiteLines();   });
                  */
           });
          });


        // Template for Storenames Modal
        $ionicModal.fromTemplateUrl('templates/modals/linemodal1.html', { scope: $scope
        }).then(function(modal) { $scope.modal4 = modal; });
        $scope.closelinemodal1 = function() {   $scope.modal4.hide(); };
        $scope.openlinemodal1 = function() { $scope.modal4.show(); };


        // Template for Storenames Modal
        $ionicModal.fromTemplateUrl('templates/modals/linemodal2.html', {
          scope: $scope
        }).then(function(modal) { $scope.modal5 = modal; });
        $scope.closelinemodal2 = function() {  $scope.modal5.hide(); };
        $scope.openlinemodal2 = function() { $scope.modal5.show();  };


        $scope.whiteLines = function(){
          //THIS WILL ALLOW THE TABLE TO BE EMPTY

          if ($scope.numberLines === 0) {
              $rootScope.numberLinesZero = true;
              console.log('data length is 0');
           } else if($scope.numberLines > 0) {
              $rootScope.numberLinesZero = false;
             }

         };


           /*   --------DELETE MODE-----------     */
           $scope.deleteMode = function(){     $rootScope.deleteButton = true; $scope.closelinemodal1();    };

           /* ----------EXIT DELETE MODE -------------- */
            $scope.exitDeleteMode = function(){     $rootScope.deleteButton = false;    };

           /*   --------LINE NUMBERS-----------     */

          $scope.One = function(){     $rootScope.addNumberDB = 1;  $scope.addLine1(); $scope.closelinemodal2();  };

          $scope.Two = function(){    $rootScope.addNumberDB = 2;   $scope.addLine1(); $scope.closelinemodal2();   };

          $scope.Three = function(){   $rootScope.addNumberDB = 3;   $scope.addLine1(); $scope.closelinemodal2();   };

          $scope.Four = function(){    $rootScope.addNumberDB = 4;    $scope.addLine1(); $scope.closelinemodal2();  };

          $scope.Five = function(){     $rootScope.addNumberDB = 5;   $scope.addLine1(); $scope.closelinemodal2();   };


            /*   --------LINE FCN-----------     */

       $scope.addLine1 = function(){
         $rootScope.numberLinesZero = false;
            console.log("Number chosen: " + $scope.addNumberDB);   console.log("Token: " + $scope.usertoken);
              //           if ( $scope.grabStorename == undefined) {
             if ( localStorage.getItem("StoreName") == undefined || null) {
               console.log('Please get store name!');
               $timeout(function () { $scope.failedData = 'Please get store name!'; $scope.failedLog = true; }, 0);

                 } else{
                socket.emit('addLine1',  {store : localStorage.getItem("StoreName"),
                line: $scope.addNumberDB, lineAdmin: "1" },function (data) {
                  console.log(data);
                 //    $scope.failedData = data; $scope.failedLog = true;
                    $timeout(function () { $scope.failedData = data; $scope.failedLog = true; }, 0);

                  //  setTimeout(function(){ stopFailureBar(); }, 3000);
                    $timeout(function () { $scope.failedLog = false; }, 3000);
                 });
               }
         };

         /*   NOTE THIS MAY CAUSE SOME PROBLEMS IF SAVED NAME DOES NOT EQUAL DATA.STORE   */

         socket.on('addLineStuff', function (data) {
           if(localStorage.getItem("StoreName") == data.store) {
              //  console.log(data); $rootScope.successful = true;  $scope.countries.push(data)
                $timeout(function () { $rootScope.successful = true;  $scope.countries.push(data); }, 0);
                $timeout(function () { $rootScope.successful = false; }, 3000);
                }
         });

         /*   --------TIMEOUT-----------     */
         function stopSuccessBar () { $scope.$apply(function () { $rootScope.successful = false; });  }


         /*   --------DELETE LINE-----------     */
          $scope.deleteLine = function(name) {
            console.log("line is: "+name);   console.log("store name: "+ $scope.grabStorename);
               socket.emit('deleteselectedLineAdmin',  {line : name, store: localStorage.getItem("StoreName")},function (data) {
              console.log(data);  alert(data);
              });
          };

          socket.on('deleteLinesUpdate', function (data) {
              console.log(data);  console.log($scope.grabStorename);
              if (data === '') {
                console.log('the data was deleted!');
              //  $scope.$apply(function () { $scope.countries = data;  });
                $timeout(function () { $scope.countries = data; }, 0);

              } else if (localStorage.getItem("StoreName") === data[0].store ) {
              //  $scope.$apply(function () { $scope.countries = data;    });
                $timeout(function () { $scope.countries = data; }, 0);

              }
          });


              /*   --------GRABS LINE NAME & CHECKS ADMIN-----------     */
        	$scope.checkLineAdminFcn = function(names){
            $rootScope.grabLineNumber = names;
            console.log (" LINE NUMBER: " + $scope.grabLineNumber);

            localStorage.setItem("LineNumber", $scope.grabLineNumber);
             console.log(localStorage.getItem("LineNumber"));

         		};

            $scope.selected = false;

            $scope.button3 = function () {
                //do logic for button 1
                $scope.selected = !$scope.selected;    console.log('btn3 clicked');
                console.log('THE AUTOMATIC BUTTON IS TURNED ON!');
                $rootScope.textgoesAway = false;
                  /*
                  IF YOU WANT TO KEEP THE LOOP GOING WHEN THIS IS ON: ALL I HAVE TO DO:
                  1) ADD AN  if($scope.notifyloop == true) { $scope.autoNotify();  }
                      in the $stateChangeSuccess function below. */
            };

            $scope.button4 = function () {
                //do logic for button 2
                $scope.selected = !$scope.selected;   console.log('btn4 clicked');
                console.log('AUTOMATION TURNED OFF');
                $rootScope.textgoesAway = true;

             };

             $scope.makeAlert = function(arg) {
              alert(arg);
            }


       })


.controller('PeoplelineCtrl', function($scope, $location, $http, $ionicModal, $interval, $ionicHistory, $rootScope, $timeout, $state, $cordovaGeolocation) {


  window.addEventListener("focus", () => socket.connect());

  console.log('THIS IS THE LINENUMBER: '+localStorage.getItem("LineNumber"));
   console.log('THIS IS THE STORENAME: '+localStorage.getItem("StoreName"));


   /* ----------STATE CHANGE -------------- */

   $scope.$on('$stateChangeSuccess', function () {
         socket.emit('getPeopleLine', {store : localStorage.getItem("StoreName"),
         line: localStorage.getItem("LineNumber"), Adminpassword: $scope.usertoken },function (data) {
             $scope.$apply(function () {
               console.log(data);  $scope.people = data;

             //   data.put("value1", 1);
             //I FINALLY FIGURED OUT HOW TO ADD DATA TO EACH ROW OF AN OBJECT:
             // THEN USE: {{person.propertyTwo}}
               //  data[0]['propertyTwo'] = 'wait time: '+5+' min';
               //  data[1]['addstuff'] = 'sounds good';
               //  data[1]['email'] = 'jayjay';
               //  console.log(data);
           });

       /*vTO MAKE THE AUTO MESSAGE:
         1) HAVE TO TAKE DATA IN ARRAY, THEN MANUALLY SORT THE DATA BASED ON WHICH BUTTON IS PRESSED....
             IE... IF POSITION BUTTON IS PRESS AND IF DISPLACEMENT BUTTON IS PRESSED....
         2) press button, then it passes info*/

           //THIS GETS THE DATA BACK AND THEN SORTS IT TO CHECK FOR THE FIRST PERSON IN LINE POSITION,
           //THEN GETS IT FOR THE AUTONOTIFY
         console.log(data);
         data.sort(function (a, b) {
             return a.created.localeCompare(b.created);
         });
           console.log(data); console.log(data[0]);
             $rootScope.emailNotify = data[0].email;
             $rootScope.notificationNotify = data[0].notificationkey;

            $scope.findGPS();
            //$timeout(function () { $scope.autoNotify();  }, 3000);

        });
   });

  /* ----------NOTE: REFER TO README FILE FOR CLOCK 1 -------------- */

/* ----------CLOCK 2 -------------- */

  var tick = function() { $scope.clock = Date.now() ;  }
  tick();
  $interval(tick, 1000);

  //THIS IS AN EXAMPLE I MADE TO SHOW THAT I COULD ADD TO CLOCK VALUE
  var blue = Date.now();    console.log(blue * 30);

  var d = new Date();    var v = new Date();
  v.setMinutes(d.getMinutes()+30);    console.log(v);


  $scope.message = {time :''};

/* ----------ADDS WAITTIME MESSAGE TO PAGE -------------- */

  $scope.addWait_time = function(name){
     if ( $scope.message.time ==='') {
       console.log('Please enter a time');
     }  else if ( $scope.message.time === 0 || $scope.message.time ===  null) {
       $scope.yellow = "";
       console.log('Please enter a time');
         } else{
           localStorage.setItem("wait_time", $scope.message.time);
           console.log("Waittime!:"+ localStorage.getItem("wait_time"));

          // $scope.yellow = 5+' minutes';
           $scope.yellow = "AVERAGE WAIT TIME IS: " + localStorage.getItem("wait_time") + " minutes";

      }
  };


  /* ----------CLOCK 3 -------------- */

  var add_minutes =  function (dt, minutes) {   return new Date(dt.getTime() + minutes*60000); }
    console.log(add_minutes(new Date(2014,10,2), 30).toString());


      /* ----------MODALS -------------- */

    $rootScope.goback2 = function(){ console.log('clicked3'); $ionicHistory.goBack(); };

    // Template for Storenames Modal
    $ionicModal.fromTemplateUrl('templates/modals/peoplemodal1.html', {   scope: $scope
    }).then(function(modal) { $scope.modal6 = modal; });
    $scope.closepeoplemodal1 = function() { $scope.modal6.hide();  };
    $scope.openpeoplemodal1 = function() { $scope.modal6.show();  };

    // Template for Storenames Modal
    $ionicModal.fromTemplateUrl('templates/modals/peoplemodal2.html', { scope: $scope
    }).then(function(modal) {   $scope.modal7 = modal; });
    $scope.closepeoplemodal2 = function() { $scope.modal7.hide(); };
    $scope.openpeoplemodal2 = function() { $scope.modal7.show(); };


    // Template for Storenames Modal
    $ionicModal.fromTemplateUrl('templates/modals/peoplemodal3.html', { scope: $scope
    }).then(function(modal) { $scope.modal8 = modal; });
    $scope.closepeoplemodal3 = function() { $scope.modal8.hide(); };
    $scope.openpeoplemodal3 = function() { $scope.modal8.show(); };


     /* ----------GET PEOPLE FCN -------------- */

   console.log(localStorage.getItem("StoreName"));    console.log(localStorage.getItem("StoreLatitude"));
   console.log(localStorage.getItem("StoreLongitude"));  console.log(localStorage.getItem("LineNumber"));

   $rootScope.grabStorename = localStorage.getItem("StoreName");
      $rootScope.grabLineNumber = localStorage.getItem("LineNumber");


      /* ----------ON/OFF BUTTON -------------- */

      $scope.selected = false;

  $scope.button1 = function () {
      //do logic for button 1
      $scope.selected = !$scope.selected;    console.log('btn1 clicked');
      console.log('THE AUTOMATIC BUTTON IS TURNED ON!');
        /*
        IF YOU WANT TO KEEP THE LOOP GOING WHEN THIS IS ON: ALL I HAVE TO DO:
        1) ADD AN  if($scope.notifyloop == true) { $scope.autoNotify();  }
            in the $stateChangeSuccess function below. */
  };

  $scope.button2 = function () {
      //do logic for button 2
      $scope.selected = !$scope.selected;   console.log('btn2 clicked');
      console.log('AUTOMATION TURNED OFF');
      $scope.autoNotify();
  };


  $scope.brightMan22 = function () {
    console.log('BLACKBOY');
   };


  $scope.button3 = function () {
      //do logic for button 1
      $scope.selected = !$scope.selected;    console.log('btn3 clicked');
      console.log('THE AUTOMATIC BUTTON IS TURNED ON!');
      $rootScope.textgoesAway = false;
        /*
        IF YOU WANT TO KEEP THE LOOP GOING WHEN THIS IS ON: ALL I HAVE TO DO:
        1) ADD AN  if($scope.notifyloop == true) { $scope.autoNotify();  }
            in the $stateChangeSuccess function below. */
  };

  $scope.button4 = function () {
      //do logic for button 2
      $scope.selected = !$scope.selected;   console.log('btn4 clicked');
      console.log('AUTOMATION TURNED OFF');
      $rootScope.textgoesAway = true;

   };



//THIS IS CALLED FROM JAVASCRIPT:
$scope.myfunction22 = function () {  confirm('CLICKED FROM JAVASCRIPT!');  };


/* ----------AUTO NOTIFY LOOP -------------- */

  $scope.autoNotify = function() {
    console.log($scope.emailNotify); console.log($scope.notificationNotify);
     var not = $scope.notificationNotify;

          if (window.confirm("Are you sure you would like to send a notification to !" +  $scope.emailNotify) === true) {
              console.log( "You pressed OK!");
                $http({
                url : "https://fcm.googleapis.com/fcm/send",
                method : 'POST',
                headers : { 'Content-Type' : 'application/json',
                'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
                data: ({"to": not, "notification": {"title":"Lineups","body": "Your next in line", "sound":"default"}})
                        //"Your Turn is up"
                }).success(function(data){
                    alert("Successfully Passed Notification");
                    console.log(data);

                }).error(function(error){
                    alert("That user does not have a notifivation key:");
                    console.log(error);
                });
          } else {   console.log( "You pressed Cancel!");   }

    };

    $scope.notifyDeleteperson = function() {
          console.log("Email: " + $scope.emailNotify);
        socket.emit('deletePersonnotify', {email : $scope.emailNotify, store : $scope.grabStorename,
          line: $scope.grabLineNumber },function (data) {
         $scope.$apply(function () { console.log(data);
            //$scope.people = data;
         });
      });
    };


    socket.on('deletePersonback', function (data) {
        console.log(data);  console.log($scope.grabStorename);
        if (data === '') {
          console.log('the data was deleted!');   $scope.$apply(function () { $scope.people = data; });
        } else if ($scope.grabStorename === data[0].store && $scope.grabLineNumber === data[0].line) {
      /*    $scope.$apply(function () { $scope.people = data;
              NOTE: //THIS RETURNS THE PEOPLE AFTER DELETE AND STARTS THE LOOPS AGAIN!
            $scope.autoNotify();
          });
*/
          $timeout(function () { $scope.people = data;   $scope.autoNotify(); }, 0);
        }
    });

  $scope.findDistance22 = function(index, email, store, line, created, notificationkey){

      $rootScope.detailEmail = email;  $rootScope.detailStore = store;
      $rootScope.detailLine = line;  $rootScope.detailCreated = created;
      $rootScope.detailNotification = notificationkey;

      console.log(index);
      if (index === 0) {
            console.log('the number is 0');
            /*
            $scope.grabStuff = function(notificationkey, email){
                  console.log( notificationkey);   console.log( email);
                    var not = notificationkey; console.log(not);
                  if (window.confirm("Are you sure you would like to send a notification to !") == true) {
                      console.log( "You pressed OK!");
                        $http({
                        url : "https://fcm.googleapis.com/fcm/send",
                        method : 'POST',
                        headers : { 'Content-Type' : 'application/json',
                        'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
                        data: ({"to": not, "notification": {"title":"Lineups","body":localStorage.getItem("messageBody"), "sound":"default", "click_action":"FCM_PLUGIN_ACTIVITY"}})
                                //"Your Turn is up"
                        }).success(function(data){
                            alert("Successfully Passed Notification");
                            console.log(data);

                        }).error(function(error){
                            alert("That user does not have a notifivation key:");
                            console.log(error);
                        });
                  } else {
                      console.log( "You pressed Cancel!");
                  }
             };
            */
      }
  };

  //$timeout(function () { $scope.findDistance22();  }, 3000);


    /*      1)----------GETS COORDINATES OF LINE -------------- */

      socket.emit('getLineCoordinates', {store : $scope.grabStorename},function (data) {
            console.log(data); // $scope.places = data;
            if (data !== '') {
              console.log(localStorage.getItem("StoreLatitude"));
              console.log(localStorage.getItem("StoreLongitude"));
              $rootScope.storelatitude = localStorage.getItem("StoreLatitude");
               $rootScope.storelongitude = localStorage.getItem("StoreLongitude");

          //  $rootScope.storelatitude = data[0].latitude;
          //  $rootScope.storelongitude = data[0].longitude;
            console.log('storelatitude: '+ $scope.storelatitude);
            console.log('storelongitude: '+ $scope.storelongitude);
          }
        });

        /*  4 ----------CALCULATES DISTANCE BETWEEN COORDINATES -------------- */

      $scope.findDistance = function(){
        if ($scope.storelatitude !== null) {
     var newPoint33 = distance($scope.storelatitude, $scope.storelongitude,
       $scope.latitude33, $scope.longitude33, 'K'); console.log(newPoint33);

       $scope.DisplacementCalc = true;
       $scope.showfinalCalc = true; $scope.finalCalc = newPoint33;

       $timeout(function () { $scope.DisplacementCalc = false;  }, 3000);

     } else  if ($scope.storelatitude === null){
          $scope.failedLog = true;
          $scope.failedData = 'This line does not have starting coordinates!';
            $timeout(function () { $scope.failedLog = false;  }, 3000);
     }
   };

   /*   3)    ----------COORDS FCN -------------- */

     $scope.findGPS = function(){
        setTimeout(function() {
         // Do something every 3 seconds
         var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation.getCurrentPosition(posOptions)

            .then(function (position) {
               var lat33  = position.coords.latitude;  var long33 = position.coords.longitude;

    //   $scope.$applyAsync(function () {
         $rootScope.latitude33 = lat33;        $rootScope.longitude33 = long33;
        console.log(lat33 + '   ' + long33);
        $scope.findDistance();

          }, function(err) {  console.log(err)  });
        }, 1000);
       };

       // 2)   STARTS DISTANCE CALC:
       $scope.findGPS();

  $scope.getStoreCords = function() {
    socket.emit('getLineCoordinates', {store : $scope.grabStorename},function (data) {
      $timeout(function () { console.log(data);    $scope.places = data;  }, 0);
    //  $scope.$apply(function () { console.log(data);    $scope.places = data;  });
   });
 };

 $scope.addnameLine ={line:""};
 $scope.addnameLine ={person:'jlatouf33@gmail.com'};

/* ----------ADDPEOPLE FUNCTION 2 -------------- */

$scope.addpersonAfter = function(){    console.log($scope.addnameLine.line); console.log($scope.addnameLine.person);
 socket.emit('addPerson244', {store : $scope.grabStorename, line: $scope.grabLineNumber,
        email: $scope.addnameLine.person, fullname: $scope.fullName,  longitude: $scope.longitude,
        latitude: $scope.latitude, distance: $scope.finalCalc, number: $scope.addnameLine.line,
        Adminpassword: $scope.usertoken },function (data) {
  //  $scope.$apply(function () {  console.log(data);   console.log(data.email);   $scope.people.push(data);  });
    $timeout(function () { console.log(data);   console.log(data.email);   $scope.people.push(data);  }, 0);
    });
     $scope.closepeoplemodal1();
};


  /* ----------DISTANCE BETWEEN 2 SETS OF COORDINATES -------------- */
  $scope.distanceCalc2 = function() {
  //  var newPoint33 = distance($scope.storelatitude, $scope.storelongitude,
  //    $rootScope.latitude22, $rootScope.longitude22, 'K');
  //  console.log(newPoint33);
    //  $scope.finalCalc = newPoint33;

  };


  /* ----------DISTANCE FORMULA -------------- */

  function distance(lat1, lon1, lat2, lon2, unit) {
          var radlat1 = Math.PI * lat1/180;
          var radlat2 = Math.PI * lat2/180;
          var radlon1 = Math.PI * lon1/180;
          var radlon2 = Math.PI * lon2/180;
          var theta = lon1-lon2;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          if (unit==="K") { dist = dist * 1.609344; }
          if (unit==="N") { dist = dist * 0.8684; }
          return dist;
  }


       /* ----------GET PICTURE FOR EACH PERSON --------------
  setTimeout(function() {    AuthService.confirm();
    var bob2 = "http://graph.facebook.com/" +$scope.userid+ "/picture?type=square";
    console.log("This is the data that I am goign to pass: "+ bob2);
    console.log($scope.userid);  $scope.black2 = bob2;
  }, 1000);
*/


     if ($scope.showfinalCalc === true) {   $scope.finalCalc =$rootScope.finalCalc ; }


    /* ----------ADDPEOPLE FUNCTION 2 -------------- */

   $scope.addPeopletoDB = function(){
      console.log("finalCalc: "+ $scope.finalCalc);
      socket.emit('addperson11', {store : $scope.grabStorename, line: $scope.grabLineNumber,
             email: $scope.useremail, fullname: $scope.fullName,  longitude: $scope.longitude,
             latitude: $scope.latitude, distance: $scope.finalCalc,  notificationkey: $rootScope.usertoken,
             Adminpassword: $scope.usertoken },function (data) {

    $scope.failedData = data;
          $scope.failedLog = true;
                $timeout(function () {
                          $scope.failedLog = false;
                      }, 3000);

         });
          $scope.closepeoplemodal1();
     };


   socket.on('updatePeople', function (data) {
         console.log($scope.grabStorename);  console.log(data.store);
       if ($scope.grabStorename === data.store && $scope.grabLineNumber === data.line) {
         $scope.$apply(function () { console.log(data); $scope.people.push(data); });
          $scope.successful = true;
         $timeout(function () { $scope.successful = false;  }, 3000);
       }
   });


   $scope.removeName = function(name) { var i = $scope.names.indexOf(name); $scope.names.splice(i, 1);  };


   //optimaze fcn
   $scope.optimizeStart2 = function(){
       for (i = 0; i < $scope.people.length; i++) {
            if ($scope.people[i].email == 'jlatouf3@mgmail.com') {
              $scope.people[i].distance = '0.888';
            }
       }
   };

          //THIS WORKS:
   $scope.optimizeStart = function(){
        setInterval(function(){
        $cordovaGeolocation.getCurrentPosition()
        .then(function (position) {
           var lat55  = position.coords.latitude;  var long55 = position.coords.longitude;
           $scope.latitude33 = lat55;        $scope.longitude33 = long55;
        $rootScope.latitude55 = lat55;        $rootScope.longitude55 = long55;
        console.log(lat55 + '   ' + long55);
         $scope.findDistance();

        //ADDS DATA TO BACKEND:
        socket.emit('optimizeData', {store : $scope.grabStorename, line: $scope.grabLineNumber,
               email: 'jlatouf2@gmail.com', distance: $scope.finalCalc },function (data) {
                 console.log(data);
                 for (i = 0; i < $scope.people.length; i++) {
                      if ($scope.people[i].email == 'jlatouf2@gmail.com') {
                        $scope.people[i].distance =  $scope.finalCalc;
                      }
                 }
            $scope.$apply(function () {  /* console.log(data.email); $scope.people.push(data); */ });
           });
        }, function(err) {  console.log(err);  });
      }, 5000);
    };


     socket.on('optimizeReturned', function (data) {
           console.log(data);
         if ($scope.grabStorename == data[0].store && $scope.grabLineNumber == data[0].line) {
           console.log(data);

           for (i = 0; i < $scope.people.length; i++) {
                if ($scope.people[i].email == data[0].email) {
                    //$scope.people[i] = data;
                    $scope.people[i].distance = data[0].distance;
                }
           }
         }
     });


   /* ----------DELETE MODE -------------- */

  $scope.deleteMode = function(){  $rootScope.deleteButton = true; $scope.closepeoplemodal1();  };

   $scope.exitDeleteMode = function(){ $rootScope.deleteButton = false; };

    /* ----------OPTIONS MODAL -------------- */
   $scope.optionsModa22 = function(){ $("#optionsModa22").modal("show"); }

     /* ----------ADDYOURSELF MODAL -------------- */
     $scope.AddYourselfModal= function(){ $("#AddYourselfModal").modal("show"); }

     /* ----------POSITION BUTTON! -------------- */
     $scope.positionButton = function(){ $rootScope.numberLinesZero2 = false; };

     /* ----------DISPLACEMENT BUTTON! -------------- */
     $scope.displacementButton = function(){ $rootScope.numberLinesZero2 = true; };

      /* ----------DELETE PEOPLE FUNCITON -------------- */
      $scope.deletePeople2 = function(email) { console.log("Email: " + email);
          socket.emit('deletePeopleLine55', {email : email, store : $scope.grabStorename, line: $scope.grabLineNumber },function (data) {
        //   $scope.$apply(function () { console.log(data);   $scope.people = data; });
           $timeout(function () { console.log(data);   $scope.people = data; }, 0);

        });
      };


    socket.on('deletePeople55', function (data) {
        console.log(data);  console.log($scope.grabStorename);
        if (data == '') {
          console.log('the data was deleted!');   $scope.$apply(function () { $scope.people = data; });
        } else if ($scope.grabStorename == data[0].store && $scope.grabLineNumber == data[0].line) {
          //$scope.$apply(function () { $scope.people = data;  });
          $timeout(function () {  $scope.people = data;  }, 0);

        }
    });

    //Grabs Storename to pass to next page
    $scope.checkPeopleFcn = function(names){
           socket.emit('checkPeopleAdmin', {store : $scope.grabStorename,
         line: $scope.grabLineNumber, Adminpassword: $scope.usertoken },function (data) {
           $timeout(function () {  console.log(data);  $scope.countries = data;  }, 0);

      //     $scope.$apply(function () { console.log(data);  $scope.countries = data;  });

          });
    };

    })

.controller('MessagingCtrl', function($scope, $location, $rootScope, $http, $timeout, AuthService ) {

  //https://thawing-ocean-11742.herokuapp.com/findUserTokens
        $scope.$on('$stateChangeSuccess', function () {
             socket.emit('findUserTokens', {},function (data) {
                $timeout(function () {
                 console.log('worked');  console.log(data);
                 $scope.usercontents = data;
                }, 0);
            });
         });

          $scope.message ={body:"Your turn is up!"};

          $scope.addStore1 = function(name){
             if ( $scope.message.body ==='') {
               console.log('Please enter a name');
                 } else{
                   localStorage.setItem("messageBody", $scope.message.body);
                   console.log("MESSAGE ADDED!:"+ localStorage.getItem("messageBody"));
              }
          };


        $scope.messageAll = function(){
          if (window.confirm("Are you sure you would like to send this notification: " +
            localStorage.getItem("messageBody") + " to All Users?") === true) {

          socket.emit('findUserTokens', {},function (data) {
             $scope.$apply(function () {
               console.log('worked');  console.log(data);
               $rootScope.messageAlldata = data;
               $scope.usercontents = data;

                //loops through json array data to get notification keys:
                 for(var i = 0; i < data.length; i++) {
                   var obj = data[i];
               //  console.log(obj.notificationkey);

                   if (obj.notificationkey !== undefined || null) {
                         $rootScope.noteSaveddata = obj.notificationkey;
                         console.log($scope.noteSaveddata);


                         $rootScope.noteArrray = obj.notificationkey;
                         $rootScope.noteName = obj.email;

                               $http({
                               url : "https://fcm.googleapis.com/fcm/send",
                               method : 'POST',
                               headers : { 'Content-Type' : 'application/json',
                               'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
                               data: ({"to": $rootScope.noteArrray, "notification": {"title":"Lineups","body":localStorage.getItem("messageBody"), "sound":"default" },
                             "data":{ "message":"value33"}})
                                       //"Your Turn is up"
                               }).success(function(data){
                                   console.log("Successfully Passed Notification"); console.log(data);
                               }).error(function(error){
                                   console.log("That user does not have a notifivation key:"); console.log(error);
                               });
                         }
                    }
                });
                console.log($rootScope.noteArrray);
            });
          } else {  console.log( "You pressed Cancel!");   }

        };


          $scope.grabStuff = function(notificationkey, email){
                console.log( notificationkey);   console.log( email);
                  var not = notificationkey; console.log(not);
                if (window.confirm("Are you sure you would like to send a notification to "+ email +"!") === true) {
                    console.log( "You pressed OK!");
                      $http({
                      url : "https://fcm.googleapis.com/fcm/send",
                      method : 'POST',
                      headers : { 'Content-Type' : 'application/json',
                      'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
                      data: ({"to": not, "notification": {"title":"Lineups","body":localStorage.getItem("messageBody"), "sound":"default"},
                      "data":{ "message":"value44"}})
                              //"Your Turn is up"
                      }).success(function(data){
                          alert("Successfully Passed Notification"); console.log(data);
                      }).error(function(error){
                          alert("That user does not have a notifivation key:"); console.log(error);
                      });
                } else {  console.log( "You pressed Cancel!");   }
           };

     })

.controller('AnalyticsCtrl', function($scope, $location, $timeout, $http, $rootScope ) {


  socket.emit('findUserTokensPeopleLine', {},function (data) {
    $timeout(function () {
      console.log('worked'); console.log(data);
      $scope.usercontents = data;  $rootScope.numberLinesAnalytics = true;
    }, 0);
 });

  /* ----------POSITION BUTTON! -------------- */
  $scope.positionButton = function(){
       socket.emit('findUserTokensPeopleLine', {},function (data) {

         $timeout(function () {
           console.log('worked'); console.log(data);
           $scope.usercontents = data;  $rootScope.numberLinesAnalytics = true;
         }, 0);

      });
   };

  /* ----------DISPLACEMENT BUTTON! -------------- */
  $scope.displacementButton = function(){
        socket.emit('findUserTokens', {},function (data) {
          $timeout(function () {
            console.log('worked'); console.log(data);
            $scope.usercontents = data;  $rootScope.numberLinesAnalytics = false;
          }, 0);
      });
  };

      })

 .controller('LoginCtrl', function($scope, $location, $http, $rootScope, AuthService ) {

                 $scope.noteToken = localStorage.getItem("TokenData");
                $scope.email = {email1 : "jlatouf2@gmail.com333"};
                $scope.password = {password1 : "jarredl"};

                    /*   --------LOGIN FUNCTION-----------     */
               $scope.ServiceFunction5 = function () {
                 document.addEventListener("deviceready", function() {


                   window.FirebasePlugin.getToken(function(token) {
                   // save this server-side and use it to push notifications to this device
                   // save this server-side and use it to push notifications to this device
                   window.alert(token);
                  localStorage.setItem("TokenData", token);
                  var myToken = localStorage.getItem("TokenData");
                  $rootScope.noteToken = myToken;
                  window.alert(myToken);

                   window.alert(token);
               }, function(error) {
                   window.alert(error);
               });
                             }, false);

                              AuthService.LoginExample3($scope.email.email1, $scope.password.password1, $scope.noteToken);
               };
                        //FACEBOOK SERVICE.JS LOGIN:
               $scope.Servicefacebook = function () {

                 FCMPlugin.getToken(function(token) {
                          window.alert(token);
                        localStorage.setItem("TokenData", token);
                        var myToken = localStorage.getItem("TokenData");
                        $rootScope.noteToken = myToken;
                        window.alert(myToken);
                         if (token == null) {
                             alert('there is no token')
                             //this gets new token if you dont have one.
                             FCMPlugin.onTokenRefresh(function(token){
                                alert( token );
                                localStorage.setItem("TokenData", token);
                                var myToken = localStorage.getItem("TokenData");
                                $rootScope.noteToken = myToken;
                                window.alert(myToken);
                             });

                          } else if (token != null) {

                         } alert('there is a token present')

                     });

                 AuthService.facebookLogin();
               };
       })


 .controller('DetailsCtrl', function($scope, $location, $http, $rootScope ) {

       $scope.$on('$stateChangeSuccess', function () {
         if (  $rootScope.token !== 'true') {
           $location.path('/admin');
         }

         });

          console.log($scope.detailEmail); console.log($scope.detailStore);
          console.log($scope.detailLine);  console.log($scope.detailNotification);

           //THIS IS MESSAGE TEXTAREA
           $scope.message ={body:"Your turn is up!"};

           $scope.addStore1 = function(){
              if ( $scope.message.body === '') {
                console.log('Please enter a name');
                  } else{
                    localStorage.setItem("messageBody", $scope.message.body);
                    console.log("MESSAGE ADDED!:"+ localStorage.getItem("messageBody"));
               }
           };

           //THIS IS MESSAGE BUTTON:
         $scope.sendMessage = function(){
                 var not = $scope.detailNotification; console.log(not);
               if (window.confirm("Are you sure you would like to send a notification to !") === true) {
                   console.log( "You pressed OK!");
                     $http({
                     url : "https://fcm.googleapis.com/fcm/send",
                     method : 'POST',
                     headers : { 'Content-Type' : 'application/json',
                     'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
                     data: ({"to": not, "notification": {"title":"Lineups","body":localStorage.getItem("messageBody"), "sound":"default"},
                   "data":{ "message":"value1"}})
                             //"Your Turn is up"
                     }).success(function(data){
                         alert("Successfully Passed Notification");  console.log(data);
                     }).error(function(error){
                         alert("That user does not have a notifivation key:"); console.log(error);
                     });
               } else {
                   console.log( "You pressed Cancel!");

               }
          };

    })


.controller('AdminCtrl', function($scope, $location, $http, $rootScope, AuthService ) {

                 $scope.noteToken = localStorage.getItem("TokenData");
                $scope.email = {email1 : "example@google.com"};
                $scope.password = {password1 : "adminlogin"};

                    /*   --------LOGIN FUNCTION-----------     */
               $scope.ServiceFunction5 = function () { AuthService.AdminLogin($scope.email.email1, $scope.password.password1, $scope.noteToken); };

     })


 .controller('ChartCtrl', function($scope, $location, $timeout, $rootScope ) {

           /*   --------GRAPH DATA:-----------     */


           $scope.$on('$stateChangeSuccess', function () {
               socket.emit('storeName', {postal: $scope.postal },function (data) {
                     console.log(data);    console.log(data[0].store);
                     console.log(data.length);
                     $scope.storeAvailable = data.length;
                      $timeout(function () { $scope.numberLinesZero = false; $scope.storewithNames = data; }, 0);
                });

                socket.emit('numberofLines',  {store:  localStorage.getItem("StoreName")  },function (data) {
                 console.log(data); console.log(data.length);
                   $timeout(function () { $rootScope.numberLines= data.length;  $scope.countries = data;
                     }, 0);
                });

                socket.emit('getAllPeople', {store : localStorage.getItem("StoreName")},function (data) {
                        console.log(data);
                        console.log(data.length);

                        $rootScope.whiteArray = [];

                        //NOTE: THIS LOGS OUT THE VALUE THAT YOU NEED:  console.log(data[key].created);
                          for (var key in data) { $scope.whiteArray.push(data[key].created ); }

                            console.log($scope.whiteArray);
                            console.log($scope.whiteArray.length);

                        //NOTE: THIS IS FOR CREATING ARRAY WITH ALL TIMES WITH 2018
                            $rootScope.yearArray1 = [];
                            $rootScope.yearArray2 = [];
                            $rootScope.monthArray1 = [];

                             $rootScope.one = []; $rootScope.two = []; $rootScope.three = [];
                             $rootScope.four = []; $rootScope.five = []; $rootScope.six = [];
                             $rootScope.seven = []; $rootScope.eight = []; $rootScope.nine = [];
                             $rootScope.ten = []; $rootScope.eleven = []; $rootScope.twelve = [];

                              /******************THIS IS FOR SEEING THE MONTH DATA**********************/

                            for (var i = 0; i < $scope.whiteArray.length; i++) {
                                   var d2 = new Date($scope.whiteArray[i]);
                                  var d3 = d2.getFullYear();
                                      if (d3 == 2018) { $rootScope.yearArray1.push($scope.whiteArray[i]) }
                                //    if (d3 == 2017) {   $rootScope.yearArray2.push($scope.whiteArray[i]) }
                               }

                               console.log($scope.yearArray1);  console.log($scope.yearArray1.length);
                              // console.log($scope.yearArray2);   console.log($scope.yearArray2.length);

                              for (var i = 0; i < $scope.yearArray1.length; i++) {
                                var d4 = new Date($scope.yearArray1[i]);
                               var d5 = d4.getMonth();
                               console.log(d5);
                               // NOTE:  REMEMBER 0 IS A MONTH [ITS THE FIRST MONTH]

                                    if (d5 == 0) {   $rootScope.one.push($scope.yearArray1[i]) }
                                    if (d5 == 1) {   $rootScope.two.push($scope.yearArray1[i]) }
                                    if (d5 == 2) {   $rootScope.three.push($scope.yearArray1[i]) }
                                    if (d5 == 3) {   $rootScope.four.push($scope.yearArray1[i]) }
                                    if (d5 == 4) {   $rootScope.five.push($scope.yearArray1[i]) }
                                    if (d5 == 5) {   $rootScope.six.push($scope.yearArray1[i]) }
                                    if (d5 == 6) {   $rootScope.seven.push($scope.yearArray1[i]) }
                                    if (d5 == 7) {   $rootScope.eight.push($scope.yearArray1[i]) }
                                    if (d5 == 8) {   $rootScope.nine.push($scope.yearArray1[i]) }
                                    if (d5 == 9) {   $rootScope.ten.push($scope.yearArray1[i]) }
                                    if (d5 == 10) {   $rootScope.eleven.push($scope.yearArray1[i]) }
                                    if (d5 == 11) {   $rootScope.twelve.push($scope.yearArray1[i]) }
                               }

                          /*     console.log($rootScope.monthArray1);  console.log($rootScope.monthArray1.length);

                               console.log($rootScope.one);  console.log($rootScope.two); console.log($rootScope.three);
                               console.log($rootScope.four); console.log($rootScope.five); console.log($rootScope.six);
                               console.log($rootScope.seven); console.log($rootScope.eight); console.log($rootScope.nine);
                               console.log($rootScope.ten); console.log($rootScope.eleven); console.log($rootScope.twelve);
                               */

                                      //GRAPH:
                               var ctx2 = document.getElementById('myChart2').getContext('2d');
                               var myChart2 = new Chart(ctx2, {
                                 type: 'bar',
                                 data: {
                                   //THESE ARE MONTHS:
                                   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                                   datasets: [{
                                     label: 'People',
                                     data: [$rootScope.one.length, $rootScope.two.length, $rootScope.three.length , $rootScope.four.length,
                                       $rootScope.five.length, $rootScope.six.length, $rootScope.seven.length, $rootScope.eight.length,
                                       $rootScope.nine.length, $rootScope.ten.length, $rootScope.eleven.length, $rootScope.twelve.length],
                                     backgroundColor: "rgba(153,255,51,0.4)"
                                   }  /*,  { label: 'oranges',  data: [2, 29, 5, 5, 2, 3, 10], backgroundColor: "rgba(255,153,0,0.4)" } */

                                 ]
                                 }, options: { title: { display: true, text: 'Year of 2018 Data' } }
                                });

              });

           });

            /***************THIS IS FUNTION FOR YEAR *****************/

     function chart1Data(parameter1) {

       socket.emit('getAllPeople', {store : localStorage.getItem("StoreName")},function (data) {
               console.log(data);
               console.log(data.length);

               $rootScope.whiteArray = [];

               //NOTE: THIS LOGS OUT THE VALUE THAT YOU NEED:  console.log(data[key].created);
                 for (var key in data) { $scope.whiteArray.push(data[key].created ); }

                   console.log($scope.whiteArray);
                   console.log($scope.whiteArray.length);

               //NOTE: THIS IS FOR CREATING ARRAY WITH ALL TIMES WITH 2018
                   $rootScope.yearArray1 = [];
                   $rootScope.yearArray2 = [];
                   $rootScope.monthArray1 = [];

                    $rootScope.one = []; $rootScope.two = []; $rootScope.three = [];
                    $rootScope.four = []; $rootScope.five = []; $rootScope.six = [];
                    $rootScope.seven = []; $rootScope.eight = []; $rootScope.nine = [];
                    $rootScope.ten = []; $rootScope.eleven = []; $rootScope.twelve = [];

                     /******************THIS IS FOR SEEING THE MONTH DATA**********************/

                   for (var i = 0; i < $scope.whiteArray.length; i++) {
                          var d2 = new Date($scope.whiteArray[i]);
                         var d3 = d2.getFullYear();
                             if (d3 == parameter1) { $rootScope.yearArray1.push($scope.whiteArray[i]) }
                       //    if (d3 == 2017) {   $rootScope.yearArray2.push($scope.whiteArray[i]) }
                      }

                      console.log($scope.yearArray1);  console.log($scope.yearArray1.length);
                     // console.log($scope.yearArray2);   console.log($scope.yearArray2.length);

                     for (var i = 0; i < $scope.yearArray1.length; i++) {
                       var d4 = new Date($scope.yearArray1[i]);
                      var d5 = d4.getMonth();
                      console.log(d5);
                      // NOTE:  REMEMBER 0 IS A MONTH [ITS THE FIRST MONTH]

                           if (d5 == 0) {   $rootScope.one.push($scope.yearArray1[i]) }
                           if (d5 == 1) {   $rootScope.two.push($scope.yearArray1[i]) }
                           if (d5 == 2) {   $rootScope.three.push($scope.yearArray1[i]) }
                           if (d5 == 3) {   $rootScope.four.push($scope.yearArray1[i]) }
                           if (d5 == 4) {   $rootScope.five.push($scope.yearArray1[i]) }
                           if (d5 == 5) {   $rootScope.six.push($scope.yearArray1[i]) }
                           if (d5 == 6) {   $rootScope.seven.push($scope.yearArray1[i]) }
                           if (d5 == 7) {   $rootScope.eight.push($scope.yearArray1[i]) }
                           if (d5 == 8) {   $rootScope.nine.push($scope.yearArray1[i]) }
                           if (d5 == 9) {   $rootScope.ten.push($scope.yearArray1[i]) }
                           if (d5 == 10) {   $rootScope.eleven.push($scope.yearArray1[i]) }
                           if (d5 == 11) {   $rootScope.twelve.push($scope.yearArray1[i]) }
                      }

                      console.log($rootScope.monthArray1);  console.log($rootScope.monthArray1.length);

                      console.log($rootScope.one);  console.log($rootScope.two); console.log($rootScope.three);
                      console.log($rootScope.four); console.log($rootScope.five); console.log($rootScope.six);
                      console.log($rootScope.seven); console.log($rootScope.eight); console.log($rootScope.nine);
                      console.log($rootScope.ten); console.log($rootScope.eleven); console.log($rootScope.twelve);


                             //GRAPH:
                      var ctx2 = document.getElementById('myChart2').getContext('2d');
                      var myChart2 = new Chart(ctx2, {
                        type: 'bar',
                        data: {
                          //THESE ARE MONTHS:
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                          datasets: [{
                            label: 'People',
                            data: [$rootScope.one.length, $rootScope.two.length, $rootScope.three.length , $rootScope.four.length,
                              $rootScope.five.length, $rootScope.six.length, $rootScope.seven.length, $rootScope.eight.length,
                              $rootScope.nine.length, $rootScope.ten.length, $rootScope.eleven.length, $rootScope.twelve.length],
                            backgroundColor: "rgba(153,255,51,0.4)"
                          }  /*,  { label: 'oranges',  data: [2, 29, 5, 5, 2, 3, 10], backgroundColor: "rgba(255,153,0,0.4)" } */

                        ]
                      },

                      options: { title: { display: true, text: 'Year of '+ parameter1+ " Data" } }
                       });
     });
    }


    $scope.chart2017 = function(){ chart1Data(2017); }

    $scope.chart2018 = function(){ chart1Data(2018); }



    /***************THIS IS FUNTION FOR YEAR *****************/


    /***************THIS IS FUNTION FOR MONTH *****************/


    $scope.monthData2017 = function(){ monthData(2017, 10); }

    $scope.monthData2018 = function(){ monthData(2018, 0); }


         function monthData(parameter1, parameter2) {

                    /*     TAKES PARAMETER2 AND GET MONTH FOR TITLE         */
                  if(parameter2 == 0) { $rootScope.monthName = 'January';  }
                  if(parameter2 == 1) {  $rootScope.monthName = 'Febuary';  }
                  if(parameter2 == 2) { $rootScope.monthName = 'March';   }
                  if(parameter2 == 3) { $rootScope.monthName = 'April';   }
                  if(parameter2 == 4) { $rootScope.monthName = 'May';   }
                  if(parameter2 == 5) {  $rootScope.monthName = 'June';  }
                  if(parameter2 == 6) { $rootScope.monthName = 'July';   }
                  if(parameter2 == 7) { $rootScope.monthName = 'Augest';    }
                  if(parameter2 == 8) { $rootScope.monthName = 'September';   }
                  if(parameter2 == 9) { $rootScope.monthName = 'October';   }
                  if(parameter2 == 10) { $rootScope.monthName = 'November';   }
                  if(parameter2 == 110) { $rootScope.monthName = 'December';   }


                socket.emit('getAllPeople', {store : localStorage.getItem("StoreName")},function (data) {
                   console.log(data);
                   console.log(data.length);

                   $rootScope.whiteArray = [];

                   //NOTE: THIS LOGS OUT THE VALUE THAT YOU NEED:  console.log(data[key].created);
                     for (var key in data) { $scope.whiteArray.push(data[key].created ); }

                       console.log($scope.whiteArray);
                       console.log($scope.whiteArray.length);

                   //NOTE: THIS IS FOR CREATING ARRAY WITH ALL TIMES WITH 2018
                       $rootScope.yearArray1 = []; $rootScope.yearArray2 = []; $rootScope.monthArray1 = [];

                       $rootScope.twoa = []; $rootScope.threea = [];
                     $rootScope.foura = []; $rootScope.fivea = []; $rootScope.sixa = [];
                     $rootScope.sevena = []; $rootScope.eighta = []; $rootScope.ninea = [];
                     $rootScope.tena = []; $rootScope.elevena = []; $rootScope.twelvea = [];

                     $rootScope.thirteena = []; $rootScope.fourteena = []; $rootScope.fifteena = [];
                     $rootScope.sixteena = []; $rootScope.seventeena = []; $rootScope.eightteena = [];
                     $rootScope.nineteena = []; $rootScope.twentya = []; $rootScope.twentyonea = []; $rootScope.twentytwoa = [];
                     $rootScope.twentythreea = []; $rootScope.twentyfoura = []; $rootScope.twentyfivea = [];

                     $rootScope.twentysixa = []; $rootScope.twentysevena = []; $rootScope.twentyeighta= [];
                     $rootScope.twentyninea = [];  $rootScope.thirtya = [];
                     $rootScope.thirtyonea = []; $rootScope.thirtytwoa = [];

                         /******************THIS IS FOR SEEING THE MONTH DATA**********************/
                         //CHECK WHAT THE YEAR IS:
                       for (var i = 0; i < $scope.whiteArray.length; i++) {
                              var d2 = new Date($scope.whiteArray[i]);
                             var d3 = d2.getFullYear();
                                 if (d3 == parameter1) { $rootScope.yearArray1.push($scope.whiteArray[i]) }
                           //    if (d3 == 2017) {   $rootScope.yearArray2.push($scope.whiteArray[i]) }
                          }

                          console.log($scope.yearArray1);  console.log($scope.yearArray1.length);
                         // console.log($scope.yearArray2);   console.log($scope.yearArray2.length);

                         //CHECK WHAT THE MONTH IS:
                         for (var i = 0; i < $scope.yearArray1.length; i++) {
                           var d4 = new Date($scope.yearArray1[i]);
                          var d5 = d4.getMonth();
                        //  console.log(d5);
                                if (d5 == parameter2) {   $rootScope.monthArray1.push($scope.yearArray1[i]) }
                           }

                          console.log($rootScope.monthArray1);  console.log($rootScope.monthArray1.length);




                       for (var i = 0; i < $scope.monthArray1.length; i++) {
                         var d8 = new Date($scope.monthArray1[i]);
                        var d9 = d8.getDate();
                        console.log(d9);
                        // NOTE:  REMEMBER 0 IS A MONTH [ITS THE FIRST MONTH]

                              if (d9 == 1) {   $rootScope.twoa.push($scope.monthArray1[i]) }
                            if (d9 == 2) {   $rootScope.threea.push($scope.monthArray1[i]) }
                             if (d9 == 3) {   $rootScope.foura.push($scope.monthArray1[i]) }
                             if (d9 == 4) {   $rootScope.fivea.push($scope.monthArray1[i]) }
                             if (d9 == 5) {   $rootScope.sixa.push($scope.monthArray1[i]) }
                             if (d9 == 6) {   $rootScope.sevena.push($scope.monthArray1[i]) }
                             if (d9 == 7) {   $rootScope.eighta.push($scope.monthArray1[i]) }
                             if (d9 == 8) {   $rootScope.ninea.push($scope.monthArray1[i]) }
                             if (d9 == 9) {   $rootScope.tena.push($scope.monthArray1[i]) }
                             if (d9 == 10) {   $rootScope.elevena.push($scope.monthArray1[i]) }
                             if (d9 == 11) {   $rootScope.twelvea.push($scope.monthArray1[i]) }
                            if (d9 == 12) {   $rootScope.thirteena.push($scope.monthArray1[i]) }
                             if (d9 == 13) {   $rootScope.fourteena.push($scope.monthArray1[i]) }
                             if (d9 == 14) {   $rootScope.fifteena.push($scope.monthArray1[i]) }
                             if (d9 == 15) {   $rootScope.sixteena.push($scope.monthArray1[i]) }
                             if (d9 == 16) {   $rootScope.seventeena.push($scope.monthArray1[i]) }
                             if (d9 == 17) {   $rootScope.eightteena.push($scope.monthArray1[i]) }
                             if (d9 == 18) {   $rootScope.nineteena.push($scope.monthArray1[i]) }
                             if (d9 == 19) {   $rootScope.twentya.push($scope.monthArray1[i]) }
                             if (d9 == 20) {   $rootScope.twentyonea.push($scope.monthArray1[i]) }
                             if (d9 == 21) {   $rootScope.twentytwoa.push($scope.monthArray1[i]) }
                             if (d9 == 22) {   $rootScope.twentythreea.push($scope.monthArray1[i]) }
                             if (d9 == 23) {   $rootScope.twentyfoura.push($scope.monthArray1[i]) }
                             if (d9 == 24) {   $rootScope.twentyfivea.push($scope.monthArray1[i]) }
                             if (d9 == 25) {   $rootScope.twentysixa.push($scope.monthArray1[i]) }
                             if (d9 == 26) {   $rootScope.twentysevena.push($scope.monthArray1[i]) }
                             if (d9 == 27) {   $rootScope.twentyeighta.push($scope.monthArray1[i]) }
                             if (d9 == 28) {   $rootScope.twentyninea.push($scope.monthArray1[i]) }
                             if (d9 == 29) {   $rootScope.thirtya.push($scope.monthArray1[i]) }
                             if (d9 == 30) {   $rootScope.thirtyonea.push($scope.monthArray1[i]) }
                             if (d9 == 31) {   $rootScope.thirtytwoa.push($scope.monthArray1[i]) }
                          }

                                 //GRAPH:
                      /*    var ctx2 = document.getElementById('myChart2').getContext('2d');
                          var myChart2 = new Chart(ctx2, {
                            type: 'bar',
                            data: {
                              //THESE ARE MONTHS:
                              labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                                       '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                              datasets: [  { label: 'People',  data: [  $rootScope.twoa.length, $rootScope.threea.length , $rootScope.foura.length,
                                $rootScope.fivea.length, $rootScope.sixa.length, $rootScope.sevena.length, $rootScope.eighta.length,
                                $rootScope.ninea.length, $rootScope.tena.length, $rootScope.elevena.length, $rootScope.twelvea.length,

                                $rootScope.thirteena.length, $rootScope.fourteena.length, $rootScope.fifteena.length , $rootScope.sixteena.length,
                                 $rootScope.seventeena.length, $rootScope.eightteena.length, $rootScope.nineteena.length,  $rootScope.twentya.length,
                                 $rootScope.twentyonea.length, $rootScope.twentytwoa.length, $rootScope.twentythreea.length, $rootScope.twentyfoura.length,
                                 $rootScope.twentyfivea.length, $rootScope.twentysixa.length, $rootScope.twentysevena.length, $rootScope.twentyeighta.length,
                                 $rootScope.twentyninea.length, $rootScope.thirtya.length, $rootScope.thirtyonea.length ], backgroundColor: "rgba(255,153,0,0.4)" }

                            ]
                          },
                          options: { title: { display: true, text: $rootScope.monthName+ ' of '+ parameter1+ " Data" } }
                           });
                           */

                           var ctx = document.getElementById("myChart");
                           var myChart = new Chart(ctx, {
                               type: 'bar',
                               data: {
                                 labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                                          '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                                   datasets: [{
                                       label: '# of Votes',
                                       data: [  $rootScope.twoa.length, $rootScope.threea.length , $rootScope.foura.length,
                                         $rootScope.fivea.length, $rootScope.sixa.length, $rootScope.sevena.length, $rootScope.eighta.length,
                                         $rootScope.ninea.length, $rootScope.tena.length, $rootScope.elevena.length, $rootScope.twelvea.length,

                                         $rootScope.thirteena.length, $rootScope.fourteena.length, $rootScope.fifteena.length , $rootScope.sixteena.length,
                                          $rootScope.seventeena.length, $rootScope.eightteena.length, $rootScope.nineteena.length,  $rootScope.twentya.length,
                                          $rootScope.twentyonea.length, $rootScope.twentytwoa.length, $rootScope.twentythreea.length, $rootScope.twentyfoura.length,
                                          $rootScope.twentyfivea.length, $rootScope.twentysixa.length, $rootScope.twentysevena.length, $rootScope.twentyeighta.length,
                                          $rootScope.twentyninea.length, $rootScope.thirtya.length, $rootScope.thirtyonea.length ],
                                       backgroundColor:  'skyblue',  borderWidth: 1 }]
                               },
                               options: { title: { display: true, text: $rootScope.monthName+ ' of '+ parameter1+ " Data" } }

                           });


           });
        }



        /***************THIS IS FUNTION FOR DAY *****************/


        $scope.dayData2017 = function(){ dayData(2017, 10, 9); }

        $scope.dayData2018 = function(){ dayData(2018, 0, 11); }


             function dayData(parameter1, parameter2, parameter3) {

                        /*     TAKES PARAMETER2 AND GET MONTH FOR TITLE         */
                      if(parameter2 == 0) { $rootScope.monthName = 'January';  }
                      if(parameter2 == 1) {  $rootScope.monthName = 'Febuary';  }
                      if(parameter2 == 2) { $rootScope.monthName = 'March';   }
                      if(parameter2 == 3) { $rootScope.monthName = 'April';   }
                      if(parameter2 == 4) { $rootScope.monthName = 'May';   }
                      if(parameter2 == 5) {  $rootScope.monthName = 'June';  }
                      if(parameter2 == 6) { $rootScope.monthName = 'July';   }
                      if(parameter2 == 7) { $rootScope.monthName = 'Augest';    }
                      if(parameter2 == 8) { $rootScope.monthName = 'September';   }
                      if(parameter2 == 9) { $rootScope.monthName = 'October';   }
                      if(parameter2 == 10) { $rootScope.monthName = 'November';   }
                      if(parameter2 == 110) { $rootScope.monthName = 'December';   }


                    socket.emit('getAllPeople', {store : localStorage.getItem("StoreName")},function (data) {
                       console.log(data);
                       console.log(data.length);

                       $rootScope.whiteArray = [];

                       //NOTE: THIS LOGS OUT THE VALUE THAT YOU NEED:  console.log(data[key].created);
                         for (var key in data) { $scope.whiteArray.push(data[key].created ); }

                           console.log($scope.whiteArray);
                           console.log($scope.whiteArray.length);

                       //NOTE: THIS IS FOR CREATING ARRAY WITH ALL TIMES WITH 2018
                           $rootScope.yearArray1 = []; $rootScope.yearArray2 = []; $rootScope.monthArray1 = [];
                           $rootScope.hourArray = [];

                          $rootScope.onea = []; $rootScope.twoa = []; $rootScope.threea = [];
                         $rootScope.foura = []; $rootScope.fivea = []; $rootScope.sixa = [];
                         $rootScope.sevena = []; $rootScope.eighta = []; $rootScope.ninea = [];
                         $rootScope.tena = []; $rootScope.elevena = []; $rootScope.twelvea = [];

                         $rootScope.thirteena = []; $rootScope.fourteena = []; $rootScope.fifteena = [];
                         $rootScope.sixteena = []; $rootScope.seventeena = []; $rootScope.eightteena = [];
                         $rootScope.nineteena = []; $rootScope.twentya = []; $rootScope.twentyonea = []; $rootScope.twentytwoa = [];
                         $rootScope.twentythreea = []; $rootScope.twentyfoura = []; $rootScope.twentyfivea = [];

                         $rootScope.twentysixa = []; $rootScope.twentysevena = []; $rootScope.twentyeighta= [];
                         $rootScope.twentyninea = [];  $rootScope.thirtya = [];
                         $rootScope.thirtyonea = []; $rootScope.thirtytwoa = [];

                             /******************THIS IS FOR SEEING THE MONTH DATA**********************/
                             //CHECK WHAT THE YEAR IS:
                           for (var i = 0; i < $scope.whiteArray.length; i++) {
                                  var d2 = new Date($scope.whiteArray[i]);
                                 var d3 = d2.getFullYear();
                                     if (d3 == parameter1) { $rootScope.yearArray1.push($scope.whiteArray[i]) }
                               //    if (d3 == 2017) {   $rootScope.yearArray2.push($scope.whiteArray[i]) }
                              }

                              console.log($scope.yearArray1);  console.log($scope.yearArray1.length);
                             // console.log($scope.yearArray2);   console.log($scope.yearArray2.length);

                             //CHECK WHAT THE MONTH IS:
                             for (var i = 0; i < $scope.yearArray1.length; i++) {
                               var d4 = new Date($scope.yearArray1[i]);
                              var d5 = d4.getMonth();
                            //  console.log(d5);
                                    if (d5 == parameter2) {   $rootScope.monthArray1.push($scope.yearArray1[i]) }
                               }

                              console.log($rootScope.monthArray1);  console.log($rootScope.monthArray1.length);

                            for (var i = 0; i < $scope.monthArray1.length; i++) {
                             var d8 = new Date($scope.monthArray1[i]);
                            var d9 = d8.getDate();
                            console.log(d9);

                            //CHECHS WHAT DAY IT IS:
                                  if (d9 == parameter3) {   $rootScope.hourArray.push($scope.monthArray1[i]) }
                               }

                               console.log($rootScope.hourArray);
                              //getHours()	Returns the hour (from 0-23)
                              //NOTE: THIS GETS THE HOUR:
                              for (var i = 0; i < $scope.hourArray.length; i++) {
                               var h1 = new Date($scope.hourArray[i]);
                              var h2 = h1.getHours();
                              console.log(h2);

                              //CHECHS WHAT DAY IT IS:
                                    if (h2 == 0) {   $rootScope.onea.push($scope.hourArray[i]) }
                                    if (h2 == 1) {   $rootScope.twoa.push($scope.hourArray[i]) }
                                   if (h2 == 2) {   $rootScope.threea.push($scope.hourArray[i]) }
                                   if (h2 == 3) {   $rootScope.foura.push($scope.hourArray[i]) }
                                   if (h2 == 4) {   $rootScope.fivea.push($scope.hourArray[i]) }
                                   if (h2 == 5) {   $rootScope.sixa.push($scope.hourArray[i]) }
                                   if (h2 == 6) {   $rootScope.sevena.push($scope.hourArray[i]) }
                                   if (h2 == 7) {   $rootScope.eighta.push($scope.hourArray[i]) }
                                   if (h2 == 8) {   $rootScope.ninea.push($scope.hourArray[i]) }
                                   if (h2 == 9) {   $rootScope.tena.push($scope.hourArray[i]) }
                                   if (h2 == 10) {   $rootScope.elevena.push($scope.hourArray[i]) }
                                   if (h2 == 11) {   $rootScope.twelvea.push($scope.hourArray[i]) }
                                  if (h2 == 12) {   $rootScope.thirteena.push($scope.hourArray[i]) }
                                   if (h2 == 13) {   $rootScope.fourteena.push($scope.hourArray[i]) }
                                   if (h2 == 14) {   $rootScope.fifteena.push($scope.hourArray[i]) }
                                   if (h2 == 15) {   $rootScope.sixteena.push($scope.hourArray[i]) }
                                   if (h2 == 16) {   $rootScope.seventeena.push($scope.hourArray[i]) }
                                   if (h2 == 17) {   $rootScope.eightteena.push($scope.hourArray[i]) }
                                   if (h2 == 18) {   $rootScope.nineteena.push($scope.hourArray[i]) }
                                   if (h2 == 19) {   $rootScope.twentya.push($scope.hourArray[i]) }
                                   if (h2 == 20) {   $rootScope.twentyonea.push($scope.hourArray[i]) }
                                   if (h2 == 21) {   $rootScope.twentytwoa.push($scope.hourArray[i]) }
                                   if (h2 == 22) {   $rootScope.twentythreea.push($scope.hourArray[i]) }
                                   if (h2 == 23) {   $rootScope.twentyfoura.push($scope.hourArray[i]) }

                                  }

                               console.log($rootScope.twoa);



                               var ctx55 = document.getElementById("myChart55");
                               var myChart = new Chart(ctx55, {
                                   type: 'bar',
                                   data: {
                                     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3',
                                              '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
                                       datasets: [{
                                           label: 'People per hour',
                                           data: [ $rootScope.onea.length, $rootScope.twoa.length, $rootScope.threea.length , $rootScope.foura.length,
                                             $rootScope.fivea.length, $rootScope.sixa.length, $rootScope.sevena.length, $rootScope.eighta.length,
                                             $rootScope.ninea.length, $rootScope.tena.length, $rootScope.elevena.length, $rootScope.twelvea.length,

                                             $rootScope.thirteena.length, $rootScope.fourteena.length, $rootScope.fifteena.length , $rootScope.sixteena.length,
                                              $rootScope.seventeena.length, $rootScope.eightteena.length, $rootScope.nineteena.length,  $rootScope.twentya.length,
                                              $rootScope.twentyonea.length, $rootScope.twentytwoa.length, $rootScope.twentythreea.length, $rootScope.twentyfoura.length
                                                ],
                                           backgroundColor:  'skyblue',  borderWidth: 1 }]
                                   },
                                   options: { title: { display: true, text:'Hours of ' +$rootScope.monthName+ " " + parameter1 } }

                               });



               });
            }


             /*


             getDate()	Returns the day of the month (from 1-31)
            getDay()	Returns the day of the week (from 0-6)
            getFullYear()	Returns the year
            getHours()	Returns the hour (from 0-23)
            getMilliseconds()	Returns the milliseconds (from 0-999)
            getMinutes()	Returns the minutes (from 0-59)
            getMonth()	Returns the month (from 0-11)
            getSeconds()	Returns the seconds (from 0-59)
            getTime()	Returns the number of milliseconds since midnight Jan 1 1970, and a specified date

              1) add coordinates to each peice of data that is added to the DATABASE
              2) when you get data back:
              EX: getting all people back from database:
              -take all the times and on x axis of graph: have the days of month (1,2,3,4 --> 31)
              3)y axis:
              */

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                }
            }
        });





        var ctx55 = document.getElementById("myChart55");
        var myChart = new Chart(ctx55, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                }
            }
        });



 /*
var ctx2 = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "rgba(153,255,51,0.4)"
    }, {
      label: 'oranges',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "rgba(255,153,0,0.4)"
    }]
  },
  options: {
          showLines: false, // disable for all datasets
      }
});
*/




var ctx3 = document.getElementById("myChart3");
var myChart3 = new Chart(ctx3, {
  type: 'radar',
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      label: 'apples',
      backgroundColor: "rgba(153,255,51,0.4)",
      borderColor: "rgba(153,255,51,1)",
      data: [12, 19, 3, 17, 28, 24, 7]
    }, {
      label: 'oranges',
      backgroundColor: "rgba(255,153,0,0.4)",
      borderColor: "rgba(255,153,0,1)",
      data: [30, 29, 5, 5, 20, 3, 10]
    }]
  }
});


var ctx4 = document.getElementById("myChart4").getContext('2d');
var myChart4 = new Chart(ctx4, {
  type: 'polarArea',
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [12, 19, 3, 17, 28, 24, 7]
    }],

  }
});



var ctx5 = document.getElementById("myChart5").getContext('2d');
var myChart5 = new Chart(ctx5, {
  type: 'pie',
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [12, 19, 3, 17, 28, 24, 7]
    }]
  },
  options: {
  cutoutPercentage: 10,
}

});


/*
var ctx6 = document.getElementById("myChart6").getContext('2d');

var chart6 = new Chart(ctx6, {
    type: 'line',
    data: [{
        x: new Date('2000, 8, 5'),
        y: 1
    }, {
        t: new Date('2003, 8, 5'),
        y: 10
    }],

    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'month'
                }
            }]
        }
    }
})
*/





/*


console.log($rootScope.dateArray1);



var blueblack = [23, 33, 44, 55, 67, 66 ,55];
console.log(blueblack);




        $scope.bluetwo = 'black';

           $scope.line = {
             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Augest"],
             series: ['Series A', 'Series B'],

            data: [
              blueblack,
              [28, 48, 40, 19, 86, 27, 90]
            ],
          //  labelsSaved: [$rootScope.blueArray2],

            onClick: function (points, evt) {
              console.log(points, evt);
            }

           };

console.log(line.data);

           $scope.line23 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Augest"],
            series: ['Series A', 'Series B'],
            data: [
              [100, 2, 2, 2, 2, 100, 40],
              [28, 100, 100, 19, 86, 27, 90]
            ],
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
            onClick: function (points, evt) {
              console.log(points, evt);
            }
           };




           $scope.bar = {
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
          series: ['Series A', 'Series B'],

          data: [
             [65, 59, 65, 59, 56, 55, 40],
             [28, 48, 40, 19, 86, 27, 90]
          ]

           };

           $scope.donut = {
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data: [300, 500, 100]
           };

           $scope.radar = {
            labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

            data:[
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ]
           };

           $scope.pie = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data : [300, 500, 100]
           };

           $scope.polar = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data : [300, 500, 100, 40, 120]
           };

           $scope.dynamic = {
            labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data : [300, 500, 100, 40, 120],
            type : 'PolarArea',

            toggle : function ()
            {
              this.type = this.type === 'PolarArea' ?
                'Pie' : 'PolarArea';
          }
           };


           $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
           $scope.series = ['Series A', 'Series B'];
           $scope.data = [
               [65, 59, 2, 2, 2, 55, 40],
               [28, 48, 40, 19, 86, 27, 90]
           ];


           */

    })


.controller('InputCtrl', function($scope, $location, $http, $rootScope, AuthService ) {


          /*   --------PUSH ARRAY-----------     */

          $scope.pushArray = function(dataExample) {

            console.log(dataExample);
            var obj = JSON.parse(dataExample);
            console.log(obj);

                var foo = { "results": [
              { "id": 12, "name": "Test" },
              { "id": 2, "name": "Beispiel" },
              { "id": 3,  "name": "Sample" } ] };

                $http.post('http://192.168.1.115:3000/getArray',
                { foo: dataExample } )
                .success(function( data) {
                  console.log (data);
                  console.log(data.results);
                  console.log(data.results[0]);
                  console.log(data.results[name]);
                  console.log(data.results[1].name);

                  //  data[1]['addstuff'] = 'sounds good';

                 })
                 .error(function (data) {   console.log(data);  });

            };

      })

.controller('DashboardCtrl', function($scope ) {



            })


.controller('CombinedCtrl', function($scope, $timeout, $http, $rootScope, AuthService ) {

              $scope.whiteLines = function(){
                 if ($scope.numberLines === 0) { $rootScope.numberLinesZero1 = true;
                 } else if($scope.numberLines > 0) { $rootScope.numberLinesZero1 = false;  }
               };

              $scope.$on('$stateChangeSuccess', function () {
                socket.emit('storeName', {postal: $scope.postal },function (data) {
                      console.log(data);    console.log(data[0].store);
                      console.log(data.length);
                      $scope.storeAvailable = data.length;
                       $timeout(function () { $scope.numberLinesZero = false; $scope.storewithNames = data; }, 0);
                 });

                 socket.emit('numberofLines',  {store:  localStorage.getItem("StoreName")  },function (data) {
                  console.log(data); console.log(data.length);
                    $timeout(function () { $rootScope.numberLines= data.length;  $scope.countries = data; $scope.whiteLines();
                      }, 0);
                 });


                 socket.emit('getPeopleLine', {store : localStorage.getItem("StoreName"),
                 line: localStorage.getItem("LineNumber"), Adminpassword: $scope.usertoken },function (data) {
                     $scope.$apply(function () {
                       console.log(data);  $scope.people = data;
                    });
                });


              });


                /*   --------LOCATION DATA ON PAGE-----------     */
             $scope.grabStuff = function(names){
                 $rootScope.grabStorename = names; console.log('GrabStuff');
                 localStorage.setItem("StoreName", $scope.grabStorename);
                  console.log(localStorage.getItem("StoreName"));

                  socket.emit('numberofLines',  {store:  localStorage.getItem("StoreName")  },function (data) {
                   console.log(data); console.log(data.length);
                     $timeout(function () {
                       $rootScope.numberLines= data.length;  $scope.countries = data; $scope.whiteLines();
                       }, 0);
                  });
               };

               /*   --------GRABS LINE NAME & CHECKS ADMIN-----------     */
          $scope.checkLineAdminFcn = function(names){
             $rootScope.grabLineNumber = names;
             console.log (" LINE NUMBER: " + $scope.grabLineNumber);

             localStorage.setItem("LineNumber", $scope.grabLineNumber);
              console.log(localStorage.getItem("LineNumber"));

              socket.emit('getPeopleLine', {store : localStorage.getItem("StoreName"),
              line: localStorage.getItem("LineNumber"), Adminpassword: $scope.usertoken },function (data) {
                  $scope.$apply(function () {
                    console.log(data);  $scope.people = data;
                 });
             });

          };

       });
