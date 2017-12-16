'use strict';

angular.module('starter').factory('AuthService' ,
  function ($rootScope, $http, $location) {

    $rootScope.lineups2 = ['Jarred', 'Jacob', 'Johna!']; $rootScope.storesAvailable = ['BestBuy', 'Kmart', 'Target', 'Zehrs'];
    $rootScope.peopleLine = ['Marcus', 'Dom', 'Brain'];     $rootScope.lineNumber = [1, 2, 3];

        return ({
          RegisterExample4: RegisterExample4,
          LoginExample3: LoginExample3,
          logout: logout,
          confirm: confirm,
          facebookLogin: facebookLogin
        });


    function RegisterExample4(fname, lname, email, password,  passwordConf, noteToken){
          console.log('fname: ' + fname); console.log('lname: ' + lname);
          console.log('email: ' + email); console.log('password: ' + password);
          console.log('passwordConf: ' + passwordConf); console.log('noteToken: ' + noteToken);
//http://192.168.1.115:3000/signup22
//https://thawing-ocean-11742.herokuapp.com/signup22
            $http.post('http://192.168.1.115:3000/signup22', { fname: fname, lname: lname, email : email, password : password, passwordConf: passwordConf, noteToken: noteToken } )
            .success(function( data) {
              console.log (data);
              $location.path('/profile');

              console.log(data.user_id); console.log(data.firstname);
              console.log(data.email); console.log(data.password);

              $rootScope.userdata = data;
              $rootScope.fullName= data.firstname +" "+ data.lastname;
              $rootScope.userid= data._id;  $rootScope.useremail = data.email;
              $rootScope.userPassword = data.password;
              $rootScope.usertoken = data.notificationkey;
              $rootScope.failedLogin = false;
            }).error(function (data) {
                          console.log(data);
                          $rootScope.failedLogin = true;
                            $rootScope.message = data;
             });
        }


    function facebookLogin(){

         document.addEventListener("deviceready", function() {
           try {
           if (window.cordova.platformId === "browser") {
                 var appId = xxxx6138889xxxx; var version = "v2.0";      //tried for v.2.0 to v.2.7
                facebookConnectPlugin.browserInit(appId, version);
              }

        //STEP 2)  LOGIN SUCCESS, WHICH THEN GETS FACEBOOK USER INFORMATION:
         var fbLoginSuccess = function (userData) {
          //  window.alert("worked" + JSON.stringify(userData));
            facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],

            function (userData) {
               window.alert(userData.id);
               window.alert(userData.name);
               window.alert(userData.email);
               $rootScope.userID = userData.id;
               $rootScope.name = userData.name;
               $rootScope.email = userData.email;

        //STEP 3)  POSTS DATA TO BACKEND TO CHECK IF IN DATABASE:
         $http.post('http://192.168.1.115:3000/facebookSignupLogin',
         {userID: $rootScope.userID, name: $rootScope.name, email: $rootScope.email})
             .success(function(data) {
                 window.alert(data);
                 window.alert(data.email);
                 window.alert(data.firstname);
                 window.alert(data._id);

                  //PLEASE NOTE: TO GET THE FACEBOOK PICTURE THIS WAY I NEEDS
                  //TO GET THE USERID, BUT I DONT HAVE USERID SAVED IN THIS DATABASE
                  //SO
                     $location.path('/profile');
                     $rootScope.userdata = data;
                 $rootScope.useremail = data.email;   $rootScope.fullName = data.firstname;
                 $rootScope.userid = data._id;
                  //$rootScope.usertoken = data.user.notificationkey;

                }).error(function (data) { console.log(data); });
              },
                 function (error) { console.error(error);  }  );
        };

       //STEP 1) FACEBOOK LOGIN SCREEN:
        facebookConnectPlugin.login(["email" ], fbLoginSuccess,
            function (error) { window.alert("" + error); } );

        } catch (e){ window.alert(e); }
        }, false);

    }



  //  var socket = io.connect('https://thawing-ocean-11742.herokuapp.com/#/:3000');
    //http://192.168.1.115: THIS WORKS FOR MOBILE LOGIN.
    //var socket = io.connect('http://192.168.1.115:3000');
//https://thawing-ocean-11742.herokuapp.com/#/home

    function LoginExample3(email, password, noteToken){
        console.log('email: ' + email); console.log('password: ' + password); console.log('noteToken: ' + noteToken);
//'http://192.168.1.115:3000/login22999'
//'https://thawing-ocean-11742.herokuapp.com/login22999'
      $http.post('http://192.168.1.115:3000/login22999', {email : email, password : password, noteToken : noteToken} )
         .success(function( data) {
           console.log (data);
           console.log (data.user);
           console.log (data.token);
           console.log ('THIS WORKED REALLY WELL OK BIG FELLA!');

           $location.path('/profile');

            $rootScope.userdata = data;
            //Its refered to as local because its stored in the database as local:
            $rootScope.fullName= data.user.firstname +" "+ data.user.lastname;
            $rootScope.userid= data.user._id; $rootScope.useremail = data.user.email;
            $rootScope.userPassword = data.user.password;
          //  $rootScope.usertoken = data.token;
          $rootScope.usertoken = data.user.notificationkey;

          $rootScope.failedLogin = false;

        }).error(function (data) {
                      console.log(data);
                      $rootScope.failedLogin = true;
                        $rootScope.message = data;
         });
    }


    function logout() {
            $rootScope.userdata = null;
            $rootScope.useremail = null;  $rootScope.username = null;
            $rootScope.userid = null;     $rootScope.usertoken = null;
            $rootScope.useremail = null;  $rootScope.fullName = null;
            $rootScope.userid = null;     $rootScope.userPassword = null;

            $rootScope.imageSaved = false;
            $http.get('/logout')
              .success(function () {    console.log('LOGGED OUT!');    })
              .error(function () {      console.log('NOT LOGGED OUT!');   });
              $location.path('/app/home');
    }


  function confirm() {
    console.log('USER HIT CONFIRM:');
      $http.get('/confirm-login')
      .success(function (data) {
         console.log(data);

        // console.log(contains(arr, "google", "Blofeld")); //true
  //       console.log(contains(data, "google")); //true
         if (data.hasOwnProperty('google')) {
           console.log('GOOGLE DATA');   console.log(data);
           $rootScope.userdata = data;
           $rootScope.useremail = data.google.email;   $rootScope.fullName = data.google.name;
           $rootScope.userid = data.google.id;  $rootScope.usertoken = data.google.token;

           console.log("email"+data.google.email);  console.log("token"+data.google.token);
           console.log("id"+data.google.id);

         }  else if (data.hasOwnProperty('facebook')) {
           console.log('FACEBOOK DATA');   console.log(data);
           $rootScope.userdata = data;
              $rootScope.useremail = data.facebook.email;   $rootScope.fullName = data.facebook.name;
              $rootScope.userid = data.facebook.id;  $rootScope.usertoken = data.facebook.token;

              console.log("email"+data.facebook.email);  console.log("token"+data.facebook.token);
              console.log("id"+data.facebook.id);

              //THIS WILL SHOW THE CORRECT IMAGE:
              $rootScope.imageSaved = true;

        }  else if (data.hasOwnProperty('twitter')) {
          console.log('TWITTER');   console.log(data);
          $rootScope.userdata = data;
          $rootScope.useremail = data.twitter.username;   $rootScope.fullName = data.twitter.displayName;
          $rootScope.userid = data.twitter.id;  $rootScope.usertoken = data.twitter.token;

            console.log("token"+data.twitter.token);   console.log("id"+data.twitter.id);
            console.log("name"+data.twitter.displayName);  console.log("username"+data.twitter.username);
                  }  else {
                   console.log("Not logged in yet!");
              }
                    });
      }



    var People = [
      {   name: "Joe Watkins",   position: "UX Developer", skills: "HTML CSS Javascript" },
      { name: "Jen Smithers",  position: "Dev Ops", skills: "Alien Server Technology"  },
      { name: "Paul Anderson",  position: "Designer",    skills: "UI & UX Design"  },
      {  name: "Samantha Barton",  position: "Javascript Ninja",  skills: "All things JS" }
    ];

    return People;
});
