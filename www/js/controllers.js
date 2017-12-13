'use strict';
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
          $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
          $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
          console.log('Doing login', $scope.loginData);

          // Simulate a login delay. Remove this and replace with your login
          // code if using a login system
          $timeout(function() {
            $scope.closeLogin();
          }, 1000);
        };

})

.controller('firstController', function($scope, $location, $http, $rootScope, $ionicModal, AuthService) {

  //alert(localStorage.getItem("TokenData"));

      //  NOTE: THIS IS THE NOTIFICAITON KEY:
    // localStorage.setItem("TokenData", 'blackbox');

        $scope.noteToken = localStorage.getItem("TokenData");
      //     $scope.noteToken ="BLACK";

          $scope.email = "jlatouf2@gmail.com";
          $scope.password = "jarredl";
          $scope.blue = function(){  console.log('white;');};
            /*   --------LOGIN MODAL-----------     */
        $scope.loginModal = function(){  $("#myModal").modal("show"); };

          /*   --------LOGIN FUNCTION-----------     */
        $scope.ServiceFunction5 = function () { AuthService.LoginExample3($scope.email, $scope.password, $scope.noteToken); $scope.closeLogin1(); };

        $scope.ServiceFunction2 = function () { AuthService.loginExample2($scope.firstname, $scope.lastnamE); };

        /*   --------LOGOUT MODAL-----------     */
        $scope.logoutFunction = function(){  AuthService.logout(); };

        /*   --------SOCKET EX-----------     */
        $scope.socketData = function(){ socket.emit('clientEvent', 'Sent an event from the client!'); };

        var currentLocation = window.location;
        console.log(currentLocation);



            // Template for Modal
        $ionicModal.fromTemplateUrl('templates/modals/loginmodal.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal1 = modal;
        });

        $scope.closeLogin1 = function() {
          $scope.modal1.hide();
        };

        // Open the login modal
        $scope.loginMod = function() {
          $scope.modal1.show();
        };

    })

.controller('ContactController', function($scope, $location, $http,  $state, $rootScope, AuthService, $cordovaDialogs, $cordovaToast, $ionicPlatform, $cordovaLocalNotification) {

        //  $cordovaDialogs.beep(3);


          $scope.dialog = function(){
          $cordovaDialogs.alert('message', 'title', 'button name')
             .then(function() {
              });
        };

        /*
        curl -X POST --header "Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ" \
            --Header "Content-Type: application/json" \
            https://fcm.googleapis.com/fcm/send \
            -d "{\"to\":\"eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S\",\"notification\":{\"title\":\"Its your turn in line\", \"body\": \"Your turn\"},\"priority\":10}"


            $scope.sendHttpFirebase33 = function(){
              $http({
              url : "https://fcm.googleapis.com/fcm/send",
              method : 'POST',
              headers : { Content-Type : 'application/json', Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ   }
              }).success(function(data){
                  alert("login Successfully");
              }).error(function(error){
                  alert("login error");
              });

            };

            req.setRequestHeader('Authorization', 'Basic [base64 encoded password here]' );

            var req = {
             method: 'POST',
             url: 'http://example.com',
             headers: {
               'Content-Type': undefined
             },
             data: { test: 'test' }
            }

            $http(req).then(function(){...}, function(){...});

        */

        $scope.sendHttpFirebase = function(){
          $http.post('https://fcm.googleapis.com/fcm/send', {  username: 'some username',  password: 'some password' },
          {  headers: { 'Content-Type': 'application/json', 'Authorization': 'key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ'  } })
          .success(function(data){
              alert("login Successfully");
          }).error(function(error){
            console.log(error);
              alert("login error");
          });

        };


        $scope.sendHttpFirebase33 = function(){
          $http({
          url : "https://fcm.googleapis.com/fcm/send",
          method : 'POST',
          headers : { 'Content-Type' : 'application/json',
          'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   }
          }).success(function(data){
              alert("login Successfully");
              console.log(data);

          }).error(function(error){
              alert("login error");
          });

        };

        //data: JSON.stringify({"to": "<instance ID>", "notification": {"title":"Test","body":"Test"}}),

        //      NOTE: THIS WORKED!!!!

        $scope.sendHttpFirebase44 = function(){
          $http({
          url : "https://fcm.googleapis.com/fcm/send",
          method : 'POST',
          headers : { 'Content-Type' : 'application/json',
          'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
          data: ({"to": "eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S", "notification": {"title":"Test","body":"Test"}})

          }).success(function(data){
              alert("login Successfully");
              console.log(data);

          }).error(function(error){
              alert("login error");
              console.log(error);

          });
        };


        /*
        https://gcm-http.googleapis.com/gcm/send
        Content-Type:application/json
        Authorization:key=AIzaSyZ-1u...0GBYzPu7Udno5aA

        { "data": {
            "score": "5x1",
            "time": "15:10"
          },
          "to" : "eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S"
        }
        */

         $scope.getNotif = function(){

          FCMPlugin.getToken(function(token) {

               console.log(token);
              window.alert(token);

              localStorage.setItem("TokenData", token);


              var myToken = localStorage.getItem("TokenData");
              window.alert(myToken);

              $http.post('http://192.168.1.115:3000/tokenReturned', {token: localStorage.getItem("TokenData")})
                 .then(function(data) {
                     //First function handles success
                     alert('worked');
                     alert(data);

                     $scope.getToken = data;
                     //$scope.content = response.data;
                 }, function() {
                     //Second function handles error
                     alert('didnt work');

                 });

                   FCMPlugin.onNotification(function(data) {
                      console.log(data);
                      window.alert(data);

                  });
          });

        };


          $rootScope.goback2 = function(){ console.log('clicked'); $state.go('home'); };
            //LOCALSTOREAGE IN ANGULARJS:
          $scope.setLocal = function () {
            localStorage.setItem("Name", "John");
          };

          $scope.getLocal = function () {
            console.log(localStorage.getItem("Name"));
          };

          $scope.removeLocal = function () {
            localStorage.removeItem("Name");
          };

          $scope.getLocalbyKey = function () {
            console.log(localStorage.getItem("Name"));
          };


              $scope.noteToken = localStorage.getItem("TokenData");

              console.log($scope.noteToken);

        $scope.fname = "Jarred"; $scope.lname = "Latouf"; $scope.email = "jlatouf2@gmail.com";
        $scope.password = "jarredl"; $scope.passwordConf = "jarredl";

        $scope.fname = {fname1 : "Jarred"};
        $scope.lname = {lname1 : "Latouf"};
        $scope.email = {email1 : "jlatouf2@gmail.comsadfasfafda"};
        $scope.password = {password1 : "jarredl"};
        $scope.passwordConf = {passwordConf1 : "jarredl"};

         // AuthService.loginExample($scope.loginForm.username, $scope.loginForm.password)

        //THESE PASS TO SERVICES.JS
        $scope.ServiceFunction2 = function () { AuthService.loginExample2($scope.firstname, $scope.lastname); };

        $scope.ServiceFunction3 = function () { AuthService.RegisterExample($scope.firstname, $scope.lastname); };

        $scope.ServiceFunction4 = function () { AuthService.RegisterExample4($scope.fname.fname1, $scope.lname.lname1, $scope.email.email1,
          $scope.password.password1, $scope.passwordConf.passwordConf1, $scope.noteToken ); };

       /*  $scope.ServiceFunction5 = function () {console.log("clicked22");AuthService.LoginExample3($scope.email, $scope.password);}; */





//FACEBOOK GETS USERDATA, BUT NEEDS TO BE LOGGED IN FIRST!!!

  //   function myFunction4() {
   $scope.savetoken = function(){
       document.addEventListener("deviceready", function() {   alert("device ready");

       try {
       if (window.cordova.platformId === "browser") {
                var appId = xxxx6138889xxxx;
                var version = "v2.0";      //tried for v.2.0 to v.2.7
               facebookConnectPlugin.browserInit(appId, version);
       }
       var fbLoginSuccess = function (userData) {
           //alert(userData.email);
           alert("worked" + JSON.stringify(userData));
           alert(userData.id);
           alert(userData.name);
           alert(userData.email);

           $scope.userID = userData.id;
           $scope.name = userData.name;
           $scope.email = userData.email;

//THIS IS THE DATA THAT WILL SEND TO BACKEND!

          //    $scope.back();    store : $scope.storeName.sname, postal: $scope.postal,

          $http.post('http://192.168.1.115:3000/facebookSignupLogin', {userID: $scope.userID, name: $scope.name, email: $scope.email})
             .then(function(data) {
                 //First function handles success
                 alert('worked');
                 alert(data);
                 //$scope.content = response.data;
             }, function() {
                 //Second function handles error
                 alert('didnt work');

             });

               facebookConnectPlugin.getAccessToken(function(token) {
                 alert("Token: " + token);
                 localStorage.setItem("Token", token);
               });
       };

       facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'], fbLoginSuccess,
         function (error) {
           console.error(error);
         }
       );
         } catch (e){
         alert(e);
       }
       }, false);
  };




      $scope.notification_message = function(){
        $scope.blue = 'WORK';
        document.addEventListener("deviceready", function() {
           alert("device ready");

        $cordovaToast
          .show('Here is a message', 'long', 'center')
          .then(function(success) {
            // success

          }, function (error) {
            // error
          });

      }, false);

      };




      //FACEBOOK SERVICE.JS LOGIN:
      $scope.Servicefacebook = function () { AuthService.facebookLogin(); };


      //FACEBOOK LOGIN!!!

      // function myFunction() {
      $scope.myFunction = function(){
       console.log('worked');

       document.addEventListener("deviceready", function() {
        //   alert("device ready");
       try {
       if (window.cordova.platformId === "browser") {
                var appId = xxxx6138889xxxx;
                var version = "v2.0";      //tried for v.2.0 to v.2.7
               facebookConnectPlugin.browserInit(appId, version);
       }

       //STEP 2)  LOGIN SUCCESS, WHICH THEN GETS FACEBOOK USER INFORMATION:
        var fbLoginSuccess = function (userData) {
             alert("worked" + JSON.stringify(userData));

         facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],

             function (userData) {
                alert(userData.id);
               alert(userData.name);
               alert(userData.email);

               $scope.userID = userData.id;
               $scope.name = userData.name;
               $scope.email = userData.email;

       //STEP 3)  POSTS DATA TO BACKEND TO CHECK IF IN DATABASE:

        $http.post('http://192.168.1.115:3000/facebookSignupLogin', {userID: $scope.userID, name: $scope.name, email: $scope.email})
          .then(function(data) {
              //First function handles success
              alert('worked');
              alert(data);
              //$scope.content = response.data;
          }, function() {
              //Second function handles error
              alert('didnt work');

          });
                },

               function (error) {
                 console.error(error);
               }
             );

        };
        //STEP 1) FACEBOOK LOGIN SCREEN:
         facebookConnectPlugin.login(["email" ], fbLoginSuccess,
             function (error) { alert("" + error); } );
       } catch (e){
         alert(e);
       }
       }, false);
     };





    // function myFunction6(){
       $scope.gettoken = function(){   alert(localStorage.getItem("Token"));  };


       $scope.foodItems = [{   name:'Noodles', price:'10', quantity:'1' },
          { name:'Pasta', price:'20',  quantity:'2'   },
          { name:'Pizza', price:'30',  quantity:'1'  },
          { name:'Chicken tikka',  price:'100',  quantity:'1'  }];


      })


.controller('ProfileCtrl', function($scope, $location, $http, $rootScope, AuthService) {


        //THIS CONFIRMS THE LOGIN FOR FACEBOOK
        /*
        setTimeout(function() {    AuthService.confirm();

          var bob2 = "http://graph.facebook.com/" +$scope.userid+ "/picture?type=square";
          console.log("This is the data that I am goign to pass: "+ bob2);
          console.log($scope.userid);
          $scope.black2 = bob2;
        }, 1000);
        */


          AuthService.confirm();
          console.log($scope.userid);
          console.log($rootScope.useremail);
          console.log($scope.imageSaved);

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
        console.log($scope.userid);
        $scope.black2 = bob2;
        console.log($scope.black2);


        })




.controller('storeNamesCtrl', function($scope, $location, $http, $timeout, $cordovaGeolocation, $rootScope, $state, $ionicModal, $ionicHistory, AuthService) {

  /*
  ALL THAT HAS TO BE DONE IS TO:
  1) USE THE DISTANCE FORMULA FOR THIS ONE JUST LIKE IN peopleLine
  2) THE SMALLEST NUMBER IS THE CLOSEST TO YOU, AND THEN YOU JUST ARRANGE THEM
      LIKE PEOPLELINE AS WELL

  */


          $rootScope.goback2 = function(){
            console.log('clicked1');
            $ionicHistory.goBack();
            //$state.go('home')
            //  $location.path('/home');
          //  window.location.href = "#/home";
          //  window.location.replace("#/home");
        };

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


          $timeout(function(){
          $scope.modal2.show();
        },0);



          $scope.findGPS = function(){
            setTimeout(function() {
              // Do something every 3 seconds
              var posOptions = {timeout: 10000, enableHighAccuracy: false};
                 $cordovaGeolocation.getCurrentPosition(posOptions)

                 .then(function (position) {
                    var lat22  = position.coords.latitude; var long22 = position.coords.longitude;

              $scope.$applyAsync(function () {
              $scope.latitude = lat22; $scope.longitude = long22; $scope.numberLinesZero = false;

                // NOTE: THIS STOPS THE LOADER
               document.getElementById("loader").style.display = "none";
               $rootScope.words = ''; $rootScope.wordspace = false;

               //saves coordinates in localstorage:
               localStorage.setItem("StoreLatitude", lat22);
               localStorage.setItem("StoreLongitude", long22);
                console.log(localStorage.getItem("StoreLatitude"));
                console.log(localStorage.getItem("StoreLongitude"));

              });
                   console.log(lat22 + '   ' + long22);
               }, function(err) {
                  console.log(err);
               });

              }, 3000);
          };


          $scope.$on('$stateChangeSuccess', function () {
            console.log('statechange');

            console.log('THIS IS THE LINENUMBER: '+localStorage.getItem("LineNumber"));
            console.log('THIS IS THE STORENAME: '+localStorage.getItem("StoreName"));

            socket.emit('storeName', {postal: $scope.postal },function (data) {
                  console.log(data);    console.log(data[0].store);
                  $scope.numberLinesZero = false;
                  $scope.$apply(function () {   $scope.storewithNames = data;  });
             });


          });



          /*
          $http.post('http://192.168.1.115:3000/storeName', {postal: $scope.postal }).success(function( data)
         {
           $scope.numberLinesZero = false;
           console.log("Data is returned: " + data);
           $scope.storewithNames = data;
         }, function(posts) {});
        */


         socket.on('updateStores', function (data) {
                console.log(data);
                  $scope.numberLinesZero = false;
               $scope.$apply(function () {
                   $scope.storewithNames = data;
                  });
         });


          /*   --------STARTPAGE FUNCTION-----------     */
                startPage();

          function startPage () {
              $scope.numberLinesZero = true;   $scope.findGPS();
              $rootScope.words = 'Please wait a moment for coordinates';  $rootScope.wordspace = true;
          }


          /*   --------GETS STORES-----------     */
          function getStoreNamesAfterCoordinates () {
                 socket.emit('storeName', {postal: $scope.postal },function (data) {
                     console.log(data); console.log(data[0].store);
                   $scope.numberLinesZero = false;
                   $scope.$apply(function () { $scope.storewithNames = data; });
                 });
            }


            socket.on('updateStores', function (data) {
                   console.log(data);  $scope.numberLinesZero = false;
                  $scope.$apply(function () {  $scope.storewithNames = data;  });
            });


            /*   --------SEARCHES STORES-----------     */
          $scope.searchStores = function(){
                socket.emit('storenameSearch',  {store: $scope.storesearchName },function (data) {
                  console.log("Data is returned: " + data);
                     $scope.$apply(function () { $scope.storewithNames = data; });
                });
            };


               $scope.storeName ={sname:""};

              /*   --------ADDS STORE TO DB-----------     */
            $scope.addStore1 = function(name){
                  if ( $scope.storeName.sname == '') {
                    console.log('Please enter a name');
                      } else{
                      socket.emit('addStore',  {store : $scope.storeName.sname, postal: $scope.postal, latitude: localStorage.getItem("StoreLatitude"),
                        longitude: localStorage.getItem("StoreLongitude"), Adminpassword: $scope.usertoken },function (data) {
                          console.log(data.store);

                          $scope.$apply(function () {
                            $rootScope.successful = true;
                               console.log($scope.successful);
                               console.log('$scope.storewithName is this: '+$scope.storewithNames);
                               $scope.storewithNames.push(data);
                           $scope.storeName.sname = '';
                          });

                        setTimeout(function(){ stopSuccessBar(); }, 3000);
                      });
                   }
              };

              socket.on('addStorename', function (data) {
                     console.log($scope.storewithNames);
                     console.log(data);

                     $scope.$apply(function () {

                      $scope.storewithNames.push(data);
                       });
              });


              /*   --------TIMEOUT FCN-----------     */
              function stopSuccessBar () {
                  $scope.$apply(function () { $rootScope.successful = false; console.log($scope.successful); });
              }

            /*   --------DELETENAME-----------     */

          $scope.deleteName2 = function(name) {
              console.log("name is: "+name);  $scope.storeName2 = name;
              console.log($scope.storeName2);
               socket.emit('deleteStore44',  {store:  $scope.storeName2  },function (data) {
               console.log(data);
                $scope.$apply(function () { $scope.storewithNames = data; });
             });

        };

        socket.on('deleteUpdate', function (data) {
              $scope.$apply(function () {
                console.log(data);
                $scope.storewithNames = data;
                 });
        });

          /*   --------DELETE MODE TOGGLE-----------     */
          $scope.deleteMode = function(){   $rootScope.deleteButton = true; $scope.closestoremodal2();   };

            /* ----------EXIT DELETE MODE -------------- */
           $scope.exitDeleteMode = function(){    $rootScope.deleteButton = false;  };

             /*   --------LOCATION DATA ON PAGE-----------     */
        	$scope.grabStuff = function(names){
              $rootScope.grabStorename = names;
              console.log('GrabStuff');

              localStorage.setItem("StoreName", $scope.grabStorename);
               console.log(localStorage.getItem("StoreName"));
        		};

    })


.controller('StorelinesCtrl', function($scope, $location, $ionicModal, $cordovaGeolocation, $http, $rootScope, $state, $ionicHistory, AuthService) {

        console.log(localStorage.getItem("StoreName"));
        console.log(localStorage.getItem("StoreLatitude"));
        console.log(localStorage.getItem("StoreLongitude"));

        $scope.grabStorename = localStorage.getItem("StoreName");
/*    NOTE:     IF ANYTHING GOES WRONG: CHANGE ALL localStorage.getItem("StoreName") to $scope.grabStorename
and all localStorage.getItem("LineNumber") to $scope.grabLinenumber  $state.go('storeNames')  */

       $rootScope.goback2 = function(){ console.log('clicked2');  $ionicHistory.goBack(); };

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

      if ($scope.numberLines == 0) {
          $rootScope.numberLinesZero = true;
          console.log('data length is 0');
       } else if($scope.numberLines > 0) {
          $rootScope.numberLinesZero = false;
         }

     };


     $scope.$on('$stateChangeSuccess', function () {
       console.log('STATECHANGE ON!!!' + localStorage.getItem("StoreName"));
       socket.emit('numberofLines',  {store:  localStorage.getItem("StoreName")  },function (data) {
         console.log(data); console.log(data.length);
           $rootScope.numberLines= data.length;   $scope.countries = data;
           $scope.$apply(function () {
                    $scope.whiteLines();
              });
       });
      });


/*
    socket.emit('numberofLines',  {store:  localStorage.getItem("StoreName")  },function (data) {
      console.log(data); console.log(data.length);
        $rootScope.numberLines= data.length;   $scope.countries = data;
        $scope.$apply(function () {
                 $scope.whiteLines();
           });
    });
    */

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
               } else{

              socket.emit('addLine1',  {store : localStorage.getItem("StoreName"), line: $scope.addNumberDB, Adminpassword: $scope.usertoken },function (data) {
                console.log(data);
                //    THIS ADD SUCCESS BAR:
                $rootScope.successful = true; $scope.countries.push(data);
              setTimeout(function(){ stopSuccessBar(); }, 3000);
              });
             }
       };

       /*   NOTE THIS MAY CAUSE SOME PROBLEMS IF SAVED NAME DOES NOT EQUAL DATA.STORE   */

       socket.on('addLineStuff', function (data) {
         if(localStorage.getItem("StoreName") == data.store) {
              console.log(data); $rootScope.successful = true;  $scope.countries.push(data)
               setTimeout(function(){ stopSuccessBar(); }, 3000);
              }
       });


       /*   --------TIMEOUT-----------     */
       function stopSuccessBar () {
         $scope.$apply(function () { $rootScope.successful = false; });
       }


       /*   --------DELETE MODE-----------     */
        $scope.deleteLine = function(name) {
          console.log("line is: "+name);   console.log("store name: "+ $scope.grabStorename);
             socket.emit('deleteselectedLine',  {line : name, store: localStorage.getItem("StoreName")},function (data) {
            console.log(data);
                $scope.$apply(function () {  $scope.countries = data;  });
            });
        };


        socket.on('deleteLinesUpdate', function (data) {
            console.log(data);
            console.log($scope.grabStorename);
            if (data == '') {
              console.log('the data was deleted!');
              $scope.$apply(function () {
              $scope.countries = data;
                    });
            } else if (localStorage.getItem("StoreName") == data[0].store ) {
              $scope.$apply(function () { $scope.countries = data;    });
            }
        });


            /*   --------GRABS LINE NAME & CHECKS ADMIN-----------     */
      	$scope.checkLineAdminFcn = function(names){
          $rootScope.grabLineNumber = names;
          console.log (" LINE NUMBER: " + $scope.grabLineNumber);

          localStorage.setItem("LineNumber", $scope.grabLineNumber);
           console.log(localStorage.getItem("LineNumber"));

            socket.emit('checkLineAdmin',  {store : $scope.grabStorename, line: $scope.grabLineNumber,
                Adminpassword: $scope.usertoken },function (data) {
            console.log(data);
           });
      		};

       })


.controller('PeoplelineCtrl', function($scope, $location, $http, $ionicModal, $ionicHistory, $rootScope, $state, $cordovaGeolocation, AuthService) {

  window.addEventListener("focus", () => socket.connect());

  console.log('THIS IS THE LINENUMBER: '+localStorage.getItem("LineNumber"));


  console.log('THIS IS THE STORENAME: '+localStorage.getItem("StoreName"));

  $scope.myObj = {
    "color" : "white",
    "background-color" : "coral"
  };


  $scope.nodeValidation = function(){
    $http.post('http://192.168.1.115:3000/polling', {"email": "jlatouf2@gmail.com"})
 .then(function(data) {
     //First function handles success
     console.log('worked');
      console.log(data);

     //$scope.content = response.data;
 }, function(data) {

 });

   };
   $scope.nodeValidation();


/*
   $scope.pollingStuff = function(){
     $http.post('http://192.168.1.115:3000/getPeopleLine', {})
     .then(function(data) {
       console.log('THIS IS CORRECT CLIENT SIDE DATA:');   console.log(data);
   }, function(data) { });  };
*/



    setTimeout(function() {
    //  $scope.pollingStuff();
    }, 3000);




   socket.emit('poll', {},function (data) {
      console.log('worked!');
       console.log(data); // $scope.places = data;


     });


          /*      NOTE:   SOLUTION TO THIS PAGE PROBLEM: MAKE THE PERSON GO BACK  STORENAME SCREEN
          WITH ALERT TELLING THEM THEY NEED TO SIGN IN TO ADD THEMSELVES TO LINE
          $ionicHistory.goBack();
          //  $location.path('/home');
        //  window.location.href = "#/home";


        $http.get("wrongfilename.htm")
   .then(function(response) {
       //First function handles success
       $scope.content = response.data;
   }, function(response) {
       //Second function handles error
       $scope.content = "Something went wrong";
   });
   keytool -genkey -v -keystore myproject3.keystore -alias myproject3 -keyalg RSA -keysize 2048 -validity 10000
   jarsigner -keystore myproject3.keystore apkname.apk myproject3
          */

          $scope.nodeValidation = function(){
            $http.post('http://192.168.1.115:3000/stuffwhite', {"email": "jlatouf2@gmail.com"})
         .then(function(data) {
             //First function handles success
             console.log('worked');
              console.log(data);
              console.log(data.data);
              console.log(data.data[0]);
              console.log(data.data[1]);
              $scope.validationData = data.data;

             //$scope.content = response.data;
         }, function(data) {
             //Second function handles error
             console.log('didnt work');
             console.log(data);
             console.log(data.data);
             console.log(data.data[0]);
             console.log(data.data[1]);
             $scope.validationData = data.data;


         });

           };



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

           console.log(localStorage.getItem("StoreName"));
           console.log(localStorage.getItem("StoreLatitude"));
           console.log(localStorage.getItem("StoreLongitude"));
           console.log(localStorage.getItem("LineNumber"));

            $rootScope.grabStorename = localStorage.getItem("StoreName");
            $rootScope.grabLineNumber = localStorage.getItem("LineNumber");

/*
            This is what I do and it works for me:

            $scope.$on('$routeChangeSuccess', function () {
              // do something
            });
            Unless you're using ui-router. Then it's:

            $scope.$on('$stateChangeSuccess', function () {
              // do something
            });
*/


$scope.$on('$stateChangeSuccess', function () {
  console.log('statechange');

  console.log('THIS IS THE LINENUMBER: '+localStorage.getItem("LineNumber"));
  console.log('THIS IS THE STORENAME: '+localStorage.getItem("StoreName"));

  socket.emit('getPeopleLine', {store : localStorage.getItem("StoreName"), line: localStorage.getItem("LineNumber"),
    Adminpassword: $scope.usertoken },function (data) {
      $scope.$apply(function () { console.log(data);    $scope.people = data; });


 });
});



              /*
              setTimeout(function() {
                }, 3000);


           socket.emit('getPeopleLine', {store : $scope.grabStorename, line: $scope.grabLineNumber,
             Adminpassword: $scope.usertoken },function (data) {
               $scope.$apply(function () { console.log(data);    $scope.people = data; });

          });
                */

          /*      1)----------GETS COORDINATES OF LINE -------------- */

            socket.emit('getLineCoordinates', {store : $scope.grabStorename},function (data) {

                console.log(data); // $scope.places = data;

                if (data != '') {
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
              if ($scope.latitude33 != undefined) {
           var newPoint33 = distance($scope.storelatitude, $scope.storelongitude,
             $scope.latitude33, $scope.longitude33, 'K'); console.log(newPoint33);
             $scope.showfinalCalc = true; $scope.finalCalc = newPoint33;
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
              console.log(lat33 + '   ' + long33);    $scope.findDistance();

                }, function(err) {  console.log(err)  });
              }, 1000);
             };


             // 2)   STARTS DISTANCE CALC:
             $scope.findGPS();

        $scope.getStoreCords = function() {
          socket.emit('getLineCoordinates', {store : $scope.grabStorename},function (data) {
            $scope.$apply(function () { console.log(data);    $scope.places = data;  });
         });
       };


       $scope.addnameLine ={line:""};

      /* ----------ADDPEOPLE FUNCTION 2 -------------- */

    $scope.addpersonAfter = function(){    console.log($scope.addnameLine.line);
       socket.emit('addPerson244', {store : $scope.grabStorename, line: $scope.grabLineNumber,
              email: 'jlatouf33@gmail.com', fullname: $scope.fullName,  longitude: $scope.longitude,
              latitude: $scope.latitude, distance: $scope.finalCalc, number: $scope.addnameLine.line,
              Adminpassword: $scope.usertoken },function (data) {

          $scope.$apply(function () {  console.log(data);   console.log(data.email);   $scope.people.push(data);  });
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


           if ($scope.showfinalCalc == true) {   $scope.finalCalc =$rootScope.finalCalc ; }


          /* ----------ADDPEOPLE FUNCTION 2 -------------- */

         $scope.addPeopletoDB = function(){
            console.log("finalCalc: "+ $scope.finalCalc);
            socket.emit('addperson11', {store : $scope.grabStorename, line: $scope.grabLineNumber,
                   email: $scope.useremail, fullname: $scope.fullName,  longitude: $scope.longitude,
                   latitude: $scope.latitude, distance: $scope.finalCalc,
                   Adminpassword: $scope.usertoken },function (data) {

                     $scope.$apply(function () {
                       console.log(data);   console.log(data.email);
                        $scope.people.push(data);
                      });
               });
                $scope.closepeoplemodal1();
           };


         socket.on('updatePeople', function (data) {
               console.log($scope.grabStorename);  console.log(data.store);
             if ($scope.grabStorename == data.store && $scope.grabLineNumber == data.line) {
               $scope.$apply(function () { console.log(data); $scope.people.push(data); });
             }
         });


         /* ----------ADDPEOPLE FUNCTION 2 -------------- */
         /*   ADD ANOTHER SECTION OF THE APP, THE OPTIMIZE SECTION,  IT WATCHES EACH PERSONS GPS Position
         IN REAL TIME,

         1) POSTION: TIME : WHEN YOU ADD YOURSELF TO THE LINEUP
         2) COORDINATES :  CALCS THE DISTANCE BETWEEN THE LINE CREATOR AND THE PERSON

         3) OPTIMIZE: - time when you add yourself (position).
                      - calc distance when add yourself (coordinates)
                      -
                      1) could just track coordinates then closest people will be top of list.
                        -but this would occlued the (position) people.
                      2) could track coordinates + LIMIT ONLY THE TOP 10, 20 PEOPLE WHO ADDED THEMSELFVES
                      BASED ON (position)


                      // Options: throw an error if no update is received every 30 seconds.
//


$scope.optimizeStart = function(){
     setInterval(function(){
     $cordovaGeolocation.getCurrentPosition()

     .then(function (position) {
        var lat55  = position.coords.latitude;  var long55 = position.coords.longitude;

        $scope.latitude33 = lat55;        $scope.longitude33 = long55;

     $rootScope.latitude55 = lat55;        $rootScope.longitude55 = long55;
     console.log(lat55 + '   ' + long55);    $scope.findDistance();


     }, function(err) {  console.log(err)  });
   }, 5000);

  }


var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 7000 });

var watch;
var watchOptions = {
  timeout : 5000,
  maximumAge: 3000,
  enableHighAccuracy: true // may cause errors if true
};


var watchCurrentLocation = function() {
  watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
      console.log("watch error", err);
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude

      console.log('lat long', lat, long);
      $scope.lastLocation.lat = $scope.currentLocation.lat;
      $scope.lastLocation.long = $scope.currentLocation.long;

      $scope.currentLocation.lat = lat;
      $scope.currentLocation.long = long;
  });
};



setInterval(function() {
    // Do something every 3 seconds
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
       $cordovaGeolocation.getCurrentPosition(posOptions)

       .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          console.log(lat + '   ' + long)
       }, function(err) {
          console.log(err)
       });

}, 3000);

    IF YOU ADD OPTIMIZE:
          1)TAKE DATE EVERY 30 SECONDS
          2) HAVE FUNCTION ADD DATA TO BACKEND
          3) INBACKEND:
              -FCN CHECKS IF USER EXISTS;
              -THEN IF YES THEN ADD NEW POSITION COORDINATES
              -
         */


         $scope.removeName = function(name) {
           var i = $scope.names.indexOf(name);
           $scope.names.splice(i, 1);
         };


         //optimaze fcn
         $scope.optimizeStart2 = function(){
             for (i = 0; i < $scope.people.length; i++) {
                  if ($scope.people[i].email == 'jlatouf3@mgmail.com') {
                    $scope.people[i].distance = '0.888';

                  }
             }
         };

         /*
          THIS WORKS!!!:
          console.log($scope.people);
             delete $scope.people[i].distance;
             //delete $scope.people[i].distance;
             $scope.people[i].distance = "0.888";
         */

                //THIS WORKS:
         $scope.optimizeStart = function(){
              setInterval(function(){
              $cordovaGeolocation.getCurrentPosition()
              .then(function (position) {
                 var lat55  = position.coords.latitude;  var long55 = position.coords.longitude;
                 $scope.latitude33 = lat55;        $scope.longitude33 = long55;
              $rootScope.latitude55 = lat55;        $rootScope.longitude55 = long55;
              console.log(lat55 + '   ' + long55);    $scope.findDistance();

              //ADDS DATA TO BACKEND:
              socket.emit('optimizeData', {store : $scope.grabStorename, line: $scope.grabLineNumber,
                     email: 'jlatouf2@gmail.com', distance: $scope.finalCalc },function (data) {
                       console.log(data);

                       for (i = 0; i < $scope.people.length; i++) {
                            if ($scope.people[i].email == 'jlatouf2@gmail.com') {
                              $scope.people[i].distance =  $scope.finalCalc;

                            }
                       }

                       $scope.$apply(function () {
                         //console.log(data.email); $scope.people.push(data);
                        });

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
               $scope.$apply(function () { console.log(data);   $scope.people = data; });
            });
          };


          socket.on('deletePeople55', function (data) {
              console.log(data);  console.log($scope.grabStorename);
              if (data == '') {
                console.log('the data was deleted!');   $scope.$apply(function () { $scope.people = data; });
              } else if ($scope.grabStorename == data[0].store && $scope.grabLineNumber == data[0].line) {
                $scope.$apply(function () { $scope.people = data;  });
              }
          });


        //Grabs Storename to pass to next page
        $scope.checkPeopleFcn = function(names){
               socket.emit('checkPeopleAdmin', {store : $scope.grabStorename,
             line: $scope.grabLineNumber, Adminpassword: $scope.usertoken },function (data) {
               $scope.$apply(function () { console.log(data);  $scope.countries = data;  });
              });
        };

    })

.controller('MessagingCtrl', function($scope, $location, $http, $timeout,  $state ) {

          console.log('this worked!');

        //  $scope.email = "jlatouf2@gmail.com";
        //  $scope.password = "jarredl";
        //CHANGE LOGIN AND SIGNUP FORMS TO HAVE ANOTHER VALUE: NOTIFICATIONKEY, THEN IT WORKS FINE, SO
        //YOU MUST GET IT IN THE HOME SCREEN., AND I ALREADY DO....
        //notificationkey
      //  $scope.storeName ={sname:"blue"};





        $scope.sendFirebasehttp = function(){
          $http({
          url : "https://fcm.googleapis.com/fcm/send",
          method : 'POST',
          headers : { 'Content-Type' : 'application/json',
          'Authorization': "key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"   },
          data: ({"to": "eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S", "notification": {"title":"Test","body":"Test"}})

          }).success(function(data){
              alert("login Successfully");
              console.log(data);

          }).error(function(error){
              alert("login error");
              console.log(error);

          });
        };

/*
        $timeout(function(){
          $http.post('http://192.168.1.115:3000/findUserTokens', {})
           .then(function(data) {
               //First function handles success
               console.log('worked');
               console.log(data.data);
              // alert(data);
               $scope.usercontents = data.data;
           }, function() {
               //Second function handles error
               alert('didnt work');
             });
      },1000);
*/

$http.post('http://192.168.1.115:3000/findUserTokens', {})
 .then(function(data) {
     //First function handles success
     console.log('worked');
     console.log(data.data);
    // alert(data);
     $scope.usercontents = data.data;
 }, function() {
     //Second function handles error
     console.log('didnt work');
   });


        $scope.getTokenFirebase = function(){

              FCMPlugin.getToken(function(token) {

                   console.log(token);     window.alert(token);

                  localStorage.setItem("TokenData", token);

                  var myToken = localStorage.getItem("TokenData");
                  window.alert(myToken);

                  $http.post('http://192.168.1.115:3000/addNotificationtoken', {token: localStorage.getItem("TokenData")})
                     .then(function(data) {
                         //First function handles success
                         alert('worked');
                         alert(data);
                         $scope.getToken = data;
                         //$scope.content = response.data;
                     }, function() {
                         alert('didnt work');
                     });



                       FCMPlugin.onNotification(function(data) {
                          console.log(data);
                          window.alert(data);
                      });
              });

        };


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
                    data: ({"to": not, "notification": {"title":"Lineups","body":"Your Turn is up!"}})

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


     })

.controller('AnalyticsCtrl', function($scope, $location, $http, $rootScope ) {



            /* ----------POSITION BUTTON! -------------- */
            $scope.positionButton = function(){

              $http.post('http://192.168.1.115:3000/findUserTokensPeopleLine', {})
               .then(function(data) {
                   //First function handles success
                   console.log('worked');
                   console.log(data.data);
                  // alert(data);
                   $scope.usercontents = data.data;
                   $rootScope.numberLinesAnalytics = true;

               }, function() {
                   //Second function handles error
                   console.log('didnt work');
                 });
             };

            /* ----------DISPLACEMENT BUTTON! -------------- */
            $scope.displacementButton = function(){

              $http.post('http://192.168.1.115:3000/findUserTokens', {})
               .then(function(data) {
                   //First function handles success
                   console.log('worked');
                   console.log(data.data);
                  // alert(data);
                   $scope.usercontents = data.data;
                   $rootScope.numberLinesAnalytics = false;

               }, function() {
                   //Second function handles error
                   console.log('didnt work');
                 });
            };


            $http.post('http://192.168.1.115:3000/findUserTokensPeopleLine', {})
             .then(function(data) {
                 //First function handles success
                 console.log('worked');
                 console.log(data.data);
                // alert(data);
                 $scope.usercontents = data.data;
                 $rootScope.numberLinesAnalytics = true;
             }, function() {
                 //Second function handles error
                 console.log('didnt work');
               });



     });
