"use strict";
//window.alert('message');






document.addEventListener("deviceready", function() {
  // navigator.notification.beep(2);
//THER IS PERMISSIOSN AS WELL [ONLY IF NEEDED] READ THE DOCS!!
//1) ONE POSSIBLE SOLUTION TO NOTIFICATION NOT BEING CALLED IF APP IS IN BACKGROUND:
//NGCORDOVA HAS BACKGROUND GEOLOCATION THAT CAN REMAIN ON, SO APP REMAINS ON
//THIS ALLOWS THE NOTIFICAITON TO BE ABLE TO PASSED AND WORKS!!!!

/*
window.cordova.plugins.notification.local.schedule([{
   text:"test",
   at: new Date(new Date().getTime() + 5*1000)
}])

cordova-plugin-background-push [COULD TRY THIS TOO!!!
HTML5 Web Workers]




window.alert("calling push init");

       console.log('calling push init');
       var push = PushNotification.init({
           "android": {
               "senderID": "901561854903"
           },
           "browser": {},
           "ios": {
               "sound": true,
               "vibration": true,
               "badge": true
           },
           "windows": {}
       });
       console.log('after init');
       window.alert("after init");

       push.on('registration', function(data) {
           console.log('registration event: ' + data.registrationId);
           window.alert("registration event: " + data.registrationId);

           var oldRegId = localStorage.getItem('registrationId');
           if (oldRegId !== data.registrationId) {
               // Save new registration ID
               localStorage.setItem('registrationId', data.registrationId);
               // Post registrationId to your app server as the value has changed
           }

           var parentElement = document.getElementById('registration');
           var listeningElement = parentElement.querySelector('.waiting');
           var receivedElement = parentElement.querySelector('.received');

           listeningElement.setAttribute('style', 'display:none;');
           receivedElement.setAttribute('style', 'display:block;');
       });

       push.on('error', function(e) {
           console.log("push error = " + e.message);
           window.alert("push error = " + e.message);

       });

       push.on('notification', function(data) {
           console.log('notification event');
           window.alert("notification event");

           navigator.notification.alert(
               data.message,         // message
               null,                 // callback
               data.title,           // title
               'Ok'                  // buttonName
           );
      });


      cordova.plugins.notification.local.schedule({
          title: 'My first notification',
          text: 'Thats pretty easy...',
          foreground: true
      });

      localStorage.setItem("Name", "John");
      };

      $scope.getLocal = function () {
      console.log(localStorage.getItem("Name"));
      };

*/


    FCMPlugin.getToken(function(token) {
        //this is the fcm token which can be used
        //to send notification to specific device
        console.log(token);
        window.alert(token);

        localStorage.setItem("TokenData", token);

        var myToken = localStorage.getItem("TokenData");
        window.alert(myToken);

        //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //Here you define your application behaviour based on the notification data.
        FCMPlugin.onNotification(function(data) {
            console.log(data);
            window.alert(data);

            /*  NOTE:  HERE IS WHERE YOU WOULD HAVE YOUR CONDITIONAL
            STATMENT THAT COULD THEN SEND THE DATA [or registration tokens]
            BACK TO THE SERVER WITH AN HTTP REQUEST:
            ex: if (data.username == 'John') {http data back}
            */

            //data.wasTapped == true means in Background :  Notification was received on device tray and tapped by the user.
            //data.wasTapped == false means in foreground :  Notification was received in foreground. Maybe the user needs to be notified.
            // if (data.wasTapped) {
            //     //Notification was received on device tray and tapped by the user.
            //     alert(JSON.stringify(data));
            // } else {
            //     //Notification was received in foreground. Maybe the user needs to be notified.
            //     alert(JSON.stringify(data));
            // }
        });
    });

}, false);

//I THINK THAT THIS WILL CALL THE PERSON WITH THE APP WHEN ITS IN THE BACKGROUND:
  document.addEventListener("pause", function pauseCallback() {
    isAppInForeground = false;
  }, false);



/*
  document.addEventListener("deviceReady", function readyCallback() {
  var isAppInForeground = true;


  phonegap plugin add phonegap-plugin-push --variable SENDER_ID="901561854903"


  curl -X POST -H "Authorization: Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA" -H "Content-Type: application/json" -d '{
    "notification": {
      "title": "FCM Message",
      "body": "This is an FCM Message",
    },    "token": "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1..."
  }' "https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1"

eFK_hHP3Rm4:APA91bHXo_G

One way to do that is to make all your users' devices subscribe to a topic. That way when you
 target a message to a specific topic, all devices will get it. I think this how the Notifications s
 ection in the Firebase console does it.

THIS WORKED FOR SENDING TO ALL:
 {
  "notification":
  {
    "title": "Firebase -  Test",
    "text": "Firebase Test from Advanced Rest Client"
  },
    "to":"/topics/all"
 }

 Your can send notification to all devices using "/topics/all"

 https://fcm.googleapis.com/fcm/send
 Content-Type:application/json
 Authorization:key=AIzaSyZ-1u...0GBYzPu7Udno5aA

 {
   "to": "/topics/all",
   "notification":{ "title":"Notification title", "body":"Notification body", "sound":"default", "click_action":"FCM_PLUGIN_ACTIVITY", "icon":"fcm_push_icon" },
   "data": {
     "message": "This is a Firebase Cloud Messaging Topic Message!",
    }
 }


 curl -X POST --header "Authorization: key=<API_ACCESS_KEY>" \
     --Header "Content-Type: application/json" \
     https://fcm.googleapis.com/fcm/send \
     -d "{\"to\":\"<YOUR_DEVICE_ID_TOKEN>\",\"notification\":{\"body\":\"Yellow\"},\"priority\":10}"



  });
*/


  document.addEventListener("resume", function resumeCallback() {
    //isAppInForeground = true;
     window.alert("DEVICE RESUMED3333");
    var socket = io.connect('http://192.168.1.115:3000');
    window.location.href = "#/home";
  }, false);





function myFunction() {
console.log('worked');

document.addEventListener("deviceready", function() {
    alert("device ready");
try {
if (window.cordova.platformId == "browser") {
         var appId = xxxx6138889xxxx;
         var version = "v2.0";      //tried for v.2.0 to v.2.7
        facebookConnectPlugin.browserInit(appId, version);
}
 var fbLoginSuccess = function (userData) {
      //console.log("UserInfo: " + JSON.stringify(userData));
      alert("worked" + JSON.stringify(userData));
      //alert("worked" + userData.email.userID);
    //  alert("worked" + userData);

 }
  facebookConnectPlugin.login(["email" ],
      fbLoginSuccess,
      function (error) { alert("" + error) } );
} catch (e){
  alert(e);
}
}, false);
}

//'/me?fields=email', ["email"]
//              localStorage.setItem("StoreName", $scope.grabStorename);
//  console.log(localStorage.getItem("StoreName"));

function getUserInfo22(){
    facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],
    function (result) {
    console.log(result);
    },
    function (error) {
    console.log(error);
    });
}

      /*        THIS WORKED!!!!         */

function myFunction3() {
    document.addEventListener("deviceready", function() {
        alert("device ready");

    try {
    if (window.cordova.platformId == "browser") {
             var appId = xxxx6138889xxxx;
             var version = "v2.0";      //tried for v.2.0 to v.2.7
            facebookConnectPlugin.browserInit(appId, version);
    }
    var fbLoginSuccess = function (userData) {
        //alert(userData.email);
        alert("worked" + JSON.stringify(userData));

      facebookConnectPlugin.getAccessToken(function(token) {
        alert("Token: " + token);
      });
    }

    facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'], fbLoginSuccess,
      function (error) {
        console.error(error)
      }
    );
      } catch (e){
      alert(e);
    }
    }, false);

}


function myFunction4() {

  document.addEventListener("deviceready", function() {
      alert("device ready");

  try {
  if (window.cordova.platformId == "browser") {
           var appId = xxxx6138889xxxx;
           var version = "v2.0";      //tried for v.2.0 to v.2.7
          facebookConnectPlugin.browserInit(appId, version);
  }
  var fbLoginSuccess = function (userData) {
      //alert(userData.email);
      alert("worked" + JSON.stringify(userData));

    facebookConnectPlugin.getAccessToken(function(token) {
      alert("Token: " + token);
      localStorage.setItem("Token", token);
    });
  }

  facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'], fbLoginSuccess,
    function (error) {
      console.error(error)
    }
  );
    } catch (e){
    alert(e);
  }
  }, false);


}

/*
HAVE TO EITHER MAKE A BACKEND FOR THIS DATA TO CHECK, OR COULD SEE IF IT FITS
IN WITH THE REGULAR SIGN IN THAT I BUILT ALREADY***
*/

//  console.log(localStorage.getItem("StoreName"));

function myFunction6(){
alert(localStorage.getItem("Token"));

}


/*
$http.post('/storeName', {postal: $scope.postal }).success(function( data)
               {
                 $scope.numberLinesZero = false;
                 console.log("Data is returned: " + data);
                 $scope.countries = data;
               }, function(posts) {});


function myFunction5(){
    facebookConnectPlugin.login(['email', 'public_profile'],
    fbLoginSuccess,
    function (error){
    console.log(error);
    }
    );
}

function getUserInfo(){
  facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],
  function (result) {
  console.log(result);
  },
  function (error) {
  console.log(error);
  });
}


_below is what I did and it works
function initApp(){
facebookConnectPlugin.login(['email', 'public_profile'],
fbLoginSuccess,
function (error){
console.log(error);
}
);
}
function getUserInfo(){
facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],
function (result) {
console.log(result);
},
function (error) {
console.log(error);
});
}



function myFunction2() {

facebookConnectPlugin.getLoginStatus(
  function(response){
      if(response.status === 'connected'){
          me.logged_in = true;
      }else{
          me.logged_in = false;
      }
  },
  function(err){
      me.logged_in = false;
      alert('Error while trying to check login status');
      RequestsService.sendData(err);
  }
);
}

*/
