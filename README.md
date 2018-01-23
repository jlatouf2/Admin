Ionic App Base
==============
  TO DELETE PEOEPLE FROM PERSON LINE:
NOTE:     1) CHECK IF YOUR StoreAdmin
          2) CHECK IF YOUR LineAdmin
          3) Check your email with email of person you select....



A starting project for Ionic that optionally supports using custom SCSS.

1) generates apk file:
   ionic cordova build --release android
2)keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
   -generates keystore file
3)remane keystore to: HelloWorld-release-unsigned.apk
4)  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
    -signs keystore.
5) /Users/jarredlatouf/zipalign-master/zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk


-       To update the app for future releases:

******  REMEMBER TO CHANGE THE VERSIONCODE TO A HIGHER NUMBER, MAY NEED HIGHER THAN 3******
1)ionic cordova build android --release -- -- --versionCode=9
[change name to HelloWorld]

2)Sign your release build with the key from your keystore. In below example the keystore is in the root of your project, but of course it's also possible to define another path:

 jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name

 3)Zipalign your signed APK:

/Users/jarredlatouf/zipalign-master/zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk


then go to:
https://play.google.com/apps/testing/com.tested.myapp2439485068
This is the alpha code so that someone can download the application.

/Users/jarredlatouf/Library/Android/sdk/build-tools/22.0.1/zipalign


heroku create example
Creating ⬢ example... done
https://example.herokuapp.com/ | https://git.heroku.com/example.git


-TO MAKE IOS BUILDS:
1) ionic cordova build IOS
2)1) ionic cordova run IOS
3) if signing error: click on xcode.project file and it go to xcode to add it then it will work



-TO MAKE NOTIFICATION PUSHES RUN:
https://medium.com/@t1tan1um/fcm-integration-for-cordova-hybrid-apps-c679f5fc1988
cordova create pushSample
cd pushSample
cordova platform add android
- cordova plugin add cordova-plugin-fcm

-make sure has right plist file
-make sure copy plist file into other plist file:-TURN ON NOTIFICATIONS WITH XCODE platforms/ios/myprojectname/resorces/resorces/plist
-TURN ON NOTIFICATIONS WITH XCODE

****ALSO FOR THIS MASTER TO WORK YOU PROB HAVE TO GO OVER THE MEDIUM STEPS AGAIN,
ADD THE API KEYS TO THE DIFFERENT PROJECT, AND THEN REPLACE THE PLIST FILE IN IOS.****


APP ID PREFIX: LJ4JD54F4Q

Name:  IosAuthKey
Key ID: AVPRLXTSK8
Services APN


FOLLOW THE MEDIUM PROJECT AND REBUILD THE APP TO WORK AGAIN:
[ALSO MAY HAVE TO ADD PHONEGAP PUSH PLUGIN WITH THE FIREBASE SENDER ID,
IT DOES NOT SAY TO DO THIS BUT YOU MAY HAVE TO DO IT ANYWAY.]

ionic plugin add phonegap-plugin-push --variable SENDER_ID="739224829678"
-TO PUT ON IOS APP STORE:
1) MAKE APP WORK ON TEST PHONE
2) GO TO CODE AND CLICK ON PRODUCT, ARCHIVE THEN UPLOAD TO APP STORE.

-TO UPDATE VERSION:
-JUST GO TO NEW VERSION IN XCODE AND USE ARCHIVE AGAIN, THEN SELECT IT IN BUILD ON ITUNES CONNECT


    TO MAKE IOS NOTIFICATIONS WORK:
    [make sure to follow the medium website instructions to build another one.]
1) ADD IONIC PROJECT [make sure bundle id is equal to id in config.xml for both ios and android]
2) REPLACE WWW WITH PROJECT WWW
3) ADD PROJECT TO FIREBASE, THEN DOWNLOAD PLIST FILE, THEN ADD CORDOVA-PLUGIN-FCM
4) GO TO XCODE TO MAKE SURE PROJECT IS SIGNED [PROVISIONAL FILES ARE GENERATED FOR You
   , ALSO MAKE SURE TO TURN ON PUSH NOTIFICATIONS]
   [THIS WILL ALSO GENERATE APP ID IN APPLE DEVELOPER ADD ID SECTION]
5) ADD App ID Prefix FROM TEAM ID FROM APPLE DEVELOPER,
6) ADD AUTH Key [TRY TO BUILD IOS, AND IT SHOULD WORK, THEN UPDATE PLIST FILE That
WILL NOT AUTO GENERATE IN PLATFORMS/IOS/MYAPP/RESOURSES/RESEARSES]
7) SEND PUSH WITH FIREBASE CONSOLE.....



    TO MAKE THE FACEBOOK LOGIN RUN:
1) cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="2042335766002685" --variable APP_NAME="Androidexample02"
2) create ionic project
3) add Android
4) facebookConnectPlugin.login(["email" ], first THEN:
5) facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],





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



      MAKE ANGULAR FUNCTION FIRE FROM JAVASCRIPT:
https://itsolutionstuff.com/post/how-to-call-angularjs-controller-function-in-jqueryexample.html

      1)ADD TO JAVASCRIPT
      $("button").click(function(){
          angular.element(document.getElementById('mainController')).scope().makeAlert('This is for Test');
      });

      2)ADD TO CONTROLLER:
      $scope.makeAlert = function(arg) {
       alert(arg);
     }

      3)ADD TO TEMPLATE:

    <div   ng-controller="StorelinesCtrl" id="mainController">
        <button>Click Here</button>
    </div>












    <ion-view view-title="Analytics">
        <ion-content style="margin-top:50px;  ">

          <h1 class="page-header">Data</h1>


        <div class = "row responsive-sm">
             <div class = "col ">
               <div class="card">

                          <div class="container table-responsive" ng-show="numberLinesAnalytics"  >
                            <ul class="nav nav-tabs"  style="text-align:center;">
                             <li class="active" style=" width:50%;"><a data-toggle="tab" ng-click="positionButton()" href="">PEOPLE DATA</a></li>
                             <li style=" width:50%;"><a data-toggle="tab" href="" ng-click="displacementButton()">USER DATA</a></li>
                           </ul>

                           <table class="table-responsive table-striped">
                             <thead>
                               <tr>
                                 <th  style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                   Identification</th>
                                 <th style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                   Email</th>
                                 <th style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                   Store</th>
                               <th  style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                 Line</th>
                                 <th  style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                   Created</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr style="" ng-repeat="usercontent in usercontents | filter:search | orderBy:'usercontent._id'">
                                 <td style="width:20%; text-align: center; max-width:200px; border: 1px solid black; border-collapse: collapse;">{{ usercontent._id }}</td>
                                 <td style="width:20%; text-align: center;  border: 1px solid black; border-collapse: collapse;">{{ usercontent.email }}</td>
                                 <td style="width:20%; text-align: center; max-width:200px; border: 1px solid black; border-collapse: collapse;">{{ usercontent.store }}</td>
                                 <td style="width:20%; text-align: center;  border: 1px solid black; border-collapse: collapse;">{{ usercontent.line }}</td>
                                 <td style="width:20%; text-align: center;  border: 1px solid black; border-collapse: collapse;">{{ usercontent.created }}</td>
                               </tr>

                             </tbody>
                           </table>
                         </div>


                         <div class="container table-responsive"  ng-hide="numberLinesAnalytics"  >
                            <ul class="nav nav-tabs"  style="text-align:center;">
                             <li class="active" style=" width:50%;"><a data-toggle="tab" ng-click="positionButton()" href="">PEOPLE DATA</a></li>
                             <li style=" width:50%;"><a data-toggle="tab" href="" ng-click="displacementButton()">USER DATA</a></li>
                           </ul>
                           <table class="table table-striped">
                             <thead>
                               <tr>
                                 <th  style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                   Identification</th>
                                 <th style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                   Email</th>
                                 <th style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                   Firstname</th>
                               <th  style="text-align: center; background-color: black; color: white; border: 1px solid black; border-collapse: collapse;">
                                 Lastname</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr  style="" ng-repeat="usercontent in usercontents | filter:search | orderBy:'usercontent._id'">
                                 <td style="width:25%; text-align: center; max-width:200px; border: 1px solid black; border-collapse: collapse;">{{ usercontent._id }}</td>
                                 <td style="width:25%; text-align: center;  border: 1px solid black; border-collapse: collapse;">{{ usercontent.email }}</td>
                                 <td style="width:25%; text-align: center;  border: 1px solid black; border-collapse: collapse;">{{ usercontent.firstname }}</td>
                                 <td style="width:25%; text-align: center; max-width:200px; border: 1px solid black; border-collapse: collapse;">{{ usercontent.lastname }}</td>
                               </tr>
                             </tbody>
                           </table>
                         </div>

             </div>
          </div>
        </div>




    <div style="margin-bottom:40px;">
    </div>


    </ion-content>
    </ion-view>







    $(document).ready(function() {
       renderChartJS("line", "playerChartLine", ["2017-07-04T01:51:02-06:00", "2017-07-04T10:51:03-06:00"], [240, 150], "Total Number of Players Playing", "Date", "Players", "188,4,0", 0); // Number of players
       renderChartJS("bar", "playerChartBar", ["2017-07-04T01:51:02-06:00", "2017-08-04T01:59:02-06:00"], [240, 150], "Total Number of Players Playing", "Date", "Players", "188,4,0", 0); // Number of players
    });

    function renderChartJS(chartType, elemId, labels, data, title, xAxisLabel, yAxisLabel, rgbaColorStr, yMax) {

       var ticksObj = {
          suggestedMin: 0,
          beginAtZero: true,
          stepValue: 50,
       }

       if (yMax != 0) {
          ticksObj.max = yMax;
       }

       if (data.length) {
          var ctx = document.getElementById(elemId).getContext('2d');
          var myChart = new Chart(ctx, {
             type: chartType,
             data: {
                labels: labels,
                datasets: [{
                   label: yAxisLabel,
                   data: data,
                   borderColor: "rgba(" + rgbaColorStr + ",1)",
                   backgroundColor: "rgba(" + rgbaColorStr + ",0.5)"
                }],
             },
             options: {
                responsive: false,
                maintainAspectRatio: true,
                scaleBeginAtZero: true,
                title: {
                   display: true,
                   text: title
                },
                scales: {
                   xAxes: [{
                      type: "time",
                      display: true,
                      scaleLabel: {
                         display: true,
                         labelString: xAxisLabel
                      },
                      ticks: {
                         minRotation: 90,
                         maxRotation: 90,
                         stepValue: 10,
                         autoSkip: true,
                         maxTicksLimit: 50
                      },
                      time: {
                         unit: 'minute',
                         unitStepSize: 10,
                         max: data[data.length - 1].x
                      }
                   }],
                   yAxes: [{
                      display: true,
                      scaleLabel: {
                         display: true,
                         labelString: yAxisLabel
                      },
                      ticks: ticksObj
                   }]
                }

             }
          });
       }
    }







     var speedCanvas = document.getElementById("speedChart");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    function hoursEarlier(hours) {
      return moment().subtract(hours, 'h').toDate();
    };

    var speedData = {
      labels: [hoursEarlier(20), hoursEarlier(9.4), hoursEarlier(8), hoursEarlier(7), hoursEarlier(6), hoursEarlier(5), hoursEarlier(4)],
      datasets: [{
        label: "Car Speed",
        data: [0, 59, 75, 20, 20, 55, 40],
        lineTension: 0.25,
        fill: false,
        borderColor: 'orange',
        backgroundColor: 'transparent',
        pointBorderColor: 'orange',
        pointBackgroundColor: 'rgba(255,150,0,0.5)',
        borderDash: [5, 5],
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rectRounded'
      }]
    };

    var chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      },
      scales: {
        xAxes: [{
          type: "time",
          time: {
            unit: 'hour',
            unitStepSize: 1.5,
            round: 'hour',
            tooltipFormat: "h:mm:ss a",
            displayFormats: {
              hour: 'MMM D, h:mm A'
            }
          }
        }],
        yAxes: [{
          gridLines: {
            color: "black",
            borderDash: [2, 5],
          },
          scaleLabel: {
            display: true,
            labelString: "Speed in Miles per Hour",
            fontColor: "green"
          }
        }]
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      data: speedData,
      options: chartOptions
    });



    <canvas id='playerChartLine' width='800' height='400'></canvas>
    <canvas id='playerChartBar' width='800' height='400'></canvas>



    <canvas id="speedChart" width="600" height="400"></canvas>
