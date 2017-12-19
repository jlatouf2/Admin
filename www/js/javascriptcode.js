"use strict";
//window.alert('message');


document.addEventListener("deviceready", function() {
          console.log(token);     window.alert(token);
        FCMPlugin.getToken(function(token) {
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
       window.alert('THIS WAS SELECTED ON NOTIFICATION!!')
       window.alert(data);

   });
 });

}, false);


/*
window.cordova.plugins.notification.local.schedule([{
   text:"test",
   at: new Date(new Date().getTime() + 5*1000)
}])
*/

/*
document.addEventListener("deviceready", function() {




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

            NOTE:  HERE IS WHERE YOU WOULD HAVE YOUR CONDITIONAL
            STATMENT THAT COULD THEN SEND THE DATA [or registration tokens]
            BACK TO THE SERVER WITH AN HTTP REQUEST:
            ex: if (data.username == 'John') {http data back}


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
  */

//I THINK THAT THIS WILL CALL THE PERSON WITH THE APP WHEN ITS IN THE BACKGROUND:
  document.addEventListener("pause", function pauseCallback() {
    isAppInForeground = false;
  }, false);



/*
  document.addEventListener("deviceReady", function readyCallback() {
  var isAppInForeground = true;


  phonegap plugin add phonegap-plugin-push --variable SENDER_ID="901561854903"


  curl -X POST -H "Authorization:AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ" -H "Content-Type: application/json" -d '{
    "notification": {
      "title": "FCM Message",
      "body": "This is an FCM Message",
    },    "token": "eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S"
  }' "https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1"

  curl -X POST --header "Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ" \
      --Header "Content-Type: application/json" \
      https://fcm.googleapis.com/fcm/send \
      -d "{\"to\":\"eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S\",\"notification\":{\"body\":\"Yellow22323\"},\"priority\":10}"

      curl -H "Content-type: application/json" -H "Authorization:key=<AIzaSyAWLhjhbAio0qGVAQuA83QqnR4nwODGCHg>"  -X POST -d '{ "data": { "score": "5x1","time": "15:10"},"to" : "<eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S>"}' https://fcm.googleapis.com/fcm/send

  eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S


  curl -X POST -H "Authorization: AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ " -H "Content-Type: application/json" -d '{ "notification": { "title": "FCM Message",   "body": "This is a Firebase Cloud Messaging Topic Message!", }, "topic" : "foo-bar" }' "https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1"

  curl -X POST --header "Authorization: key=<AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ>"   --Header "Content-Type: application/json"  https://fcm.googleapis.com/fcm/send   -d "{\"to\":\"<eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S>\",\"notification\":{\"body\":\"ENTER YOUR MESSAGE HERE\"}"

  curl -X POST -H "Authorization: key="AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"-H "Content-Type: application/json" -d '{   "notification": {   "title": "FCM Message",   "body": "This is a Firebase Cloud Messaging Topic Message!", },   "topic" : "foo-bar" }' "https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1"


      curl -X POST --header "Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ" \ --Header "Content-Type: application/json" \ https://fcm.googleapis.com/fcm/send \ -d "{\"to\":\"eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S\",\"notification\":{\"title\" : \"Shareurcodes.com\",\"body\":\"A Code Sharing Blog!\",\"icon\": \"icon.png\",\"click_action\": \"http://shareurcodes.com\"}}"


      curl -X POST --header "Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ" \   --Header "Content-Type: application/json" \   https://fcm.googleapis.com/fcm/send \   -d "{\"to\":\"eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S\",\"notification\":{\"body\":\"ENTER YOUR MESSAGE HERE\"}"




//    NOTE: THIS WORKS!!!
      curl -H "Content-type: application/json" -H "Authorization:key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"  -X POST -d '{ "data": { "score": "5x1","time": "15:10"},"to" : "eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S"}' https://fcm.googleapis.com/fcm/send

      curl -H "Content-type: application/json" -H "Authorization:key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ"  -X POST -d '{ "data": { "score": "5x1"},"to" : "eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S"}' https://fcm.googleapis.com/fcm/send


      //    NOTE: THIS WORKS!!!

      curl -X POST --header "Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ" \
          --Header "Content-Type: application/json" \
          https://fcm.googleapis.com/fcm/send \
          -d "{\"to\":\"eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S\",\"notification\":{\"title\":\"Its your turn in line\", \"body\": \"Your turn\"},\"priority\":10}"


          curl -X POST --header "Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ" \
              --Header "Content-Type: application/json" \
              https://fcm.googleapis.com/fcm/send \
              -d "{\"to\":\"eFK_hHP3Rm4:APA91bHXo_G0ivKEQZ9_fLXhg6fCzC3SgeAxiLki0byU5lfOF6r75ZXvuZyINTs5R7LdlfGtTdmVZeYgnWeAToRAIA267FCiU5BxQl30HkZmhkCHTHqHH4KUKwF9vENhgHQCTjVbtH0S\",\"notification\":{\"title\":\"Its your turn in line\", \"body\": \"Your turn\"},\"priority\":10}"


              $http.post('https://fcm.googleapis.com/fcm/send', {token: localStorage.getItem("TokenData")})
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


                 $http({

                 url : "https://fcm.googleapis.com/fcm/send",
                 method : 'POST',
                 headers : {
                       Content-Type : 'application/json',
                       Authorization: key=AAAA0elGK7c:APA91bGMOeIMiLGKsu5EV6zvxdgJgiPJg6a-TBIVy3Uh1ihpAtAxm9EXFPIdVUyJmGRGCc8aD8bbS0R2Y4fGWw7kjwyoZiUmnFrqL83wd3KB0wqnMQRDZwVsrkeHUC4JGJ8RPhUpAelZ
                       }
                 }).success(function(data){
                     alert("login Successfully");
                 }).error(function(error){
                     alert("login error");
                 })


                 Shortcut method

                   $http.post('http://localhost:9191/api/signin', {  username: 'some username',  password: 'some password' },
                   {  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'key': '123'  } })
                   .then(function(response) {  console.log(response)  });


                 Long version

                 $http({
                   method: 'POST',
                   url: 'http://localhost:9191/api/signin',
                   data: {
                     username: 'some username',
                     password: 'some password'
                   },
                   headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                     'key': '123'
                   }
                 }).then(function(response) {
                   console.log(response)
                 });
                 Tested and is working fine.



                 $http.post(urls.getEmployeeInfo, postData,
                  {
                      withCredentials: true,
                      headers:{ 'Authorization':  'Basic ' + btoa(username + ":" + password)}
                  }
              );




                 POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1

                 Content-Type: application/json
                 Authorization: Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA
                 {
                   "message":{
                     "topic" : "foo-bar",
                     "notification" : {
                       "body" : "This is a Firebase Cloud Messaging Topic Message!",
                       "title" : "FCM Message",
                       }
                    }
                 }


              POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1

              Content-Type: application/json
              Authorization: key=""

              {
                "message":{
                  "token" : "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
                  "notification" : {
                    "body" : "This is an FCM notification message!",
                    "title" : "FCM Message",
                    }
                 }
              }




      Examples using curl
      Send messages to specific devices

      To send messages to specific devices, set the to the registration token for the specific app instance

      curl -H "Content-type: application/json" -H "Authorization:key=<Your Api key>"  -X POST -d '{ "data": { "score": "5x1","time": "15:10"},"to" : "<registration token>"}' https://fcm.googleapis.com/fcm/send
      Send messages to topics

      here the topic is : /topics/foo-bar

      curl -H "Content-type: application/json" -H "Authorization:key=<Your Api key>"  -X POST -d '{ "to": "/topics/foo-bar","data": { "message": "This is a Firebase Cloud Messaging Topic Message!"}}' https://fcm.googleapis.com/fcm/send
      Send messages to device groups

      Sending messages to a device group is very similar to sending messages to an individual device. Set the to parameter to the unique notification key for the device group

      curl -H "Content-type: application/json" -H "Authorization:key=<Your Api key>"  -X POST -d '{"to": "<aUniqueKey>","data": {"hello": "This is a Firebase Cloud Messaging Device Group Message!"}}' https://fcm.googleapis.com/fcm/send



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
