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

   $rootScope.yearArray1.push($scope.whiteArray[i])

   var d4 =   $rootScope.yearArray1;
   var d5 = d4.getFullYear();

   if (d5 == 11) {
     $rootScope.monthArray1.push($scope.yearArray1[i])
   }


   for (var i = 0; i < $scope.whiteArray.length; i++) {
        if ($scope.whiteArray[i].includes("2018")) {
          $rootScope.blueArray.push($scope.whiteArray[i]);
         }
      }
      //THIS RETURNS ALL DATES WITH 2018
      console.log($scope.blueArray);
      console.log($scope.blueArray.length);

      $rootScope.blueArray2 = []; $rootScope.dateArray1 = [];  $rootScope.dateArray4 = [];


//NOTE: THIS USES getDate() and gets day (1-31) of month,
//THEN FINDS DATES FOR DAY ELEVEN

  for (i = 0; i < $scope.blueArray.length; i++) {
    var d2 = new Date($scope.blueArray[i]);
    var d3 = d2.getDate();

       if (d3 == 11) {
         $rootScope.blueArray2.push($scope.blueArray[i]);
      }

   }
   //THIS RETURNS ALL DATES WITH 2018 AND 01 month
     console.log($scope.blueArray2);
     console.log($scope.blueArray2.length);


          ***************NOTE:  JUST HAVE TO WORK THOUGH IT, IT WILL WORK***************
          YEAR:
        1) http for dates in specific year
        2) take those dates back and graph them with x:axis being the 12 months
        and Y-axis being the numbers of people per month.
        [NO TIME IN THIS]

          MONTH:
        1) http for dates in specific month
        2) take those dates back and graph them with x:axis being the 31 days
        and Y-axis being the numbers of people per day.
        [NO TIME IN THIS]


          DAY:
          1) http for dates in specific day
          2) take those dates back and graph them with x:axis being the 24 hours
          and Y-axis being the numbers of people per hour.
          [TIME IS INVOLVED]


          YEAR:
        1)  for (var key in data) { $scope.whiteArray.push(data[key].created )  }

        2)
        for (var i = 0; i < $scope.whiteArray.length; i++) {
             if ($scope.whiteArray[i].includes("2018")) {
               $rootScope.blueArray.push($scope.whiteArray[i]);
              }
           }

        3)
        for (i = 0; i < $scope.blueArray.length; i++) {
          var d2 = new Date($scope.blueArray[i]);
          var d3 = d2.getMonth();
          //THIS NEEDS TO HAVE FOR LOOP THAT GOES THROUGH 12 TIMES [FOR 12 MONTHS] AND ADDS EACH MONTH
          //TO DIFFERENT ARRAY.

            if (d3 == 11) {
               $rootScope.blueArray2.push($scope.blueArray[i]);
            }
         }






    getDate()	Returns the day of the month (from 1-31)
   getDay()	Returns the day of the week (from 0-6)
   getFullYear()	Returns the year
   getHours()	Returns the hour (from 0-23)
   getMilliseconds()	Returns the milliseconds (from 0-999)
   getMinutes()	Returns the minutes (from 0-59)
   getMonth()	Returns the month (from 0-11)
   getSeconds()	Returns the seconds (from 0-59)
   getTime()	Returns the number of milliseconds since midnight Jan 1 1970, and a specified date

   //  console.log("User " + data[created].created + " is #" + created); // "User john is #234"


    if ($scope.blueArray[i].includes("2018-01")) {
      $scope.whiteman2 = $scope.blueArray[i];

      $rootScope.blueArray2.push($scope.whiteman2);

      //TURNS INTO DATE OBJECT:
      var d2 = new Date($scope.whiteman2);
      console.log(d2);

      $scope.whiteman777 = d2;
      //console.log($scope.whiteman44);

      $rootScope.dateArray4.push($scope.whiteman777);
      $scope.whiteman44 = d2.getTime();
      //console.log($scope.whiteman44);
      $rootScope.dateArray1.push($scope.whiteman44);

       xValueType: "dateTime",
   var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + "/" + month + "/" + day;

        console.log($scope.blueArray3);

        //NOTE: YOU CAN STILL LOOP THROUGH AND USE:
        getMonth, getDate, getyear and then get the counts for EACH
        and use that data for something.

   LOOPS THROUGH AND FINDS HOW MANY PEOPLE USED THE TECH THAT MONTH:
   [SO: REFER TO THE FOR LOOP ABOVE THAT CHECKS FOR MONTHS USED:
   -use for loop that goes from 1=12 that loops through months

   LOOPS THROUGH AND FINDS HOW MANY PEOPLE USED THE TECH THAT days:
   [SO: REFER TO THE FOR LOOP ABOVE THAT CHECKS FOR MONTHS USED:
   -use for loop that goes from 1-31 that loops through days
                           ]
        */






                    $scope.getPeopleButton44 = function(){

                          socket.emit('getAllPeople33', {year: "2018", month:"01"},function (data) {
                            console.log(data);
                            console.log(data.length);
                            /******************THIS IS FOR SEEING THE MONTH DATA**********************/

                           $rootScope.whiteArray55 = [];

                           //NOTE: THIS LOGS OUT THE VALUE THAT YOU NEED:  console.log(data[key].created);
                             for (var key in data) { $scope.whiteArray55.push(data[key].created ); }


                             console.log($scope.whiteArray55);
                             console.log($scope.whiteArray55.length);



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


                             for (var i = 0; i < $scope.whiteArray55.length; i++) {
                               var d8 = new Date($scope.whiteArray55[i]);


                              var d9 = d8.getDate();
                              console.log(d9);
                              // NOTE:  REMEMBER 0 IS A MONTH [ITS THE FIRST MONTH]

                                   //if (d9 == 12) {   $rootScope.onea.push($scope.whiteArray55[i]) }
                                   if (d9 == 1) {   $rootScope.twoa.push($scope.whiteArray55[i]) }
                                   if (d9 == 2) {   $rootScope.threea.push($scope.whiteArray55[i]) }
                                   if (d9 == 3) {   $rootScope.foura.push($scope.whiteArray55[i]) }
                                   if (d9 == 4) {   $rootScope.fivea.push($scope.whiteArray55[i]) }
                                   if (d9 == 5) {   $rootScope.sixa.push($scope.whiteArray55[i]) }
                                   if (d9 == 6) {   $rootScope.sevena.push($scope.whiteArray55[i]) }
                                   if (d9 == 7) {   $rootScope.eighta.push($scope.whiteArray55[i]) }
                                   if (d9 == 8) {   $rootScope.ninea.push($scope.whiteArray55[i]) }
                                   if (d9 == 9) {   $rootScope.tena.push($scope.whiteArray55[i]) }
                                   if (d9 == 10) {   $rootScope.elevena.push($scope.whiteArray55[i]) }
                                   if (d9 == 11) {   $rootScope.twelvea.push($scope.whiteArray55[i]) }
                                  if (d9 == 12) {   $rootScope.thirteena.push($scope.whiteArray55[i]) }
                                   if (d9 == 13) {   $rootScope.fourteena.push($scope.whiteArray55[i]) }
                                   if (d9 == 14) {   $rootScope.fifteena.push($scope.whiteArray55[i]) }
                                   if (d9 == 15) {   $rootScope.sixteena.push($scope.whiteArray55[i]) }
                                   if (d9 == 16) {   $rootScope.seventeena.push($scope.whiteArray55[i]) }
                                   if (d9 == 17) {   $rootScope.eightteena.push($scope.whiteArray55[i]) }
                                   if (d9 == 18) {   $rootScope.nineteena.push($scope.whiteArray55[i]) }
                                   if (d9 == 19) {   $rootScope.twentya.push($scope.whiteArray55[i]) }
                                   if (d9 == 20) {   $rootScope.twentyonea.push($scope.whiteArray55[i]) }
                                   if (d9 == 21) {   $rootScope.twentytwoa.push($scope.whiteArray55[i]) }
                                   if (d9 == 22) {   $rootScope.twentythreea.push($scope.whiteArray55[i]) }
                                   if (d9 == 23) {   $rootScope.twentyfoura.push($scope.whiteArray55[i]) }
                                   if (d9 == 24) {   $rootScope.twentyfivea.push($scope.whiteArray55[i]) }
                                   if (d9 == 25) {   $rootScope.twentysixa.push($scope.whiteArray55[i]) }
                                   if (d9 == 26) {   $rootScope.twentysevena.push($scope.whiteArray55[i]) }
                                   if (d9 == 27) {   $rootScope.twentyeighta.push($scope.whiteArray55[i]) }
                                   if (d9 == 28) {   $rootScope.twentyninea.push($scope.whiteArray55[i]) }
                                   if (d9 == 29) {   $rootScope.thirtya.push($scope.whiteArray55[i]) }
                                   if (d9 == 30) {   $rootScope.thirtyonea.push($scope.whiteArray55[i]) }
                                   if (d9 == 31) {   $rootScope.thirtytwoa.push($scope.whiteArray55[i]) }

                                }

                            /*         console.log($rootScope.twoa); console.log($rootScope.threea);
                                  console.log($rootScope.foura); console.log($rootScope.fivea); console.log($rootScope.sixa);
                                  console.log($rootScope.sevena); console.log($rootScope.eighta); console.log($rootScope.ninea);
                                  console.log($rootScope.tena); console.log($rootScope.elevena); console.log($rootScope.twelvea);

                                 console.log($rootScope.thirteena);  console.log($rootScope.fourteena); console.log($rootScope.fifteena);
                                  console.log($rootScope.sixteena); console.log($rootScope.seventeena); console.log($rootScope.eightteena);
                                  console.log($rootScope.nineteena); console.log($rootScope.twentya); console.log($rootScope.twentyonea);
                                  console.log($rootScope.twentytwoa); console.log($rootScope.twentythreea); console.log($rootScope.twentyfoura);

                                  console.log($rootScope.twentyfivea); console.log($rootScope.twentysixa); console.log($rootScope.twentysevena);
                                  console.log($rootScope.twentyeighta); console.log($rootScope.twentyninea); console.log($rootScope.thritya);
                                  console.log($rootScope.thrityonea);  console.log($rootScope.thritytwoa);  */


                                  //GRAPH:
                           var ctx2 = document.getElementById('myChart2').getContext('2d');
                           var myChart2 = new Chart(ctx2, {
                             type: 'bar',
                             data: {
                               //THESE ARE MONTHS:
                               labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                                        '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                               datasets: [{
                                 label: 'People',
                                 data: [  ],
                                 backgroundColor: "rgba(153,255,51,0.4)"
                               }  ,  { label: 'oranges',  data: [  $rootScope.twoa.length, $rootScope.threea.length , $rootScope.foura.length,
                                 $rootScope.fivea.length, $rootScope.sixa.length, $rootScope.sevena.length, $rootScope.eighta.length,
                                 $rootScope.ninea.length, $rootScope.tena.length, $rootScope.elevena.length, $rootScope.twelvea.length,

                                 $rootScope.thirteena.length, $rootScope.fourteena.length, $rootScope.fifteena.length , $rootScope.sixteena.length,
                                  $rootScope.seventeena.length, $rootScope.eightteena.length, $rootScope.nineteena.length,  $rootScope.twentya.length,
                                  $rootScope.twentyonea.length, $rootScope.twentytwoa.length, $rootScope.twentythreea.length, $rootScope.twentyfoura.length,
                                  $rootScope.twentyfivea.length, $rootScope.twentysixa.length, $rootScope.twentysevena.length, $rootScope.twentyeighta.length,
                                  $rootScope.twentyninea.length, $rootScope.thirtya.length, $rootScope.thirtyonea.length ], backgroundColor: "rgba(255,153,0,0.4)" }

                             ]
                             }
                            });


                              });

                       };


                  //FOR COORDINATES LINE GROUP:

                 // NOTE: MAY NEED TO HAVE TWO DIFFERENT DATABASES, ONE FOR POSITION,
                 AND ONE FOR COORDINATE POSITION....
                 //THIS WAY WHEN YOU PRESS BUTTON TO ADD YOURSELF, YOU WILL ADD YOURSELF TO
                 BOTH :
                  1) CHECK IF NAME IS IN DB
                  2) GETS POST ARRAY DATA OF PEOPLE IN PARTICULAR Line
                  3) CHECK IF ITS WITHIN 5 min
                  4) IF FALSE JUST ADD ALL PERSONS' DATA INCLUDING COORDINATE POSITION, AND COORDINATE group
                  5) IF TRUE [ WILL TAKE LONGER B/C MUST LOOP THROUGH DATA, GET DISTANCE MEASUREMENT FOR each
                  PERSON AND COMPARE TO YOURS, WHICH WILL THEN GIVE YOU THE COORDINATE POSITION THAT YOU NEED ]

                   socket.on('addperson11', function (data, callback) {
                     console.log(data.notificationkey);
                     PeopleLine.findOne({store: data.store, line: data.line, email: data.email}).exec(function(err, posts) {
                           if (err) { return next(err); }
                             if (posts) {
                               console.log(posts);
                               callback('SORRY! THAT EMAIL IS ALREADY IN THE DATABASE!');

                             } else {

                                PeopleLine.find({ $and: [{store: req.body.store}, {line: req.body.line}]})
                                 .exec(function(err, posts) {
                                     if (err) { return next(err); }
                                   //callback(posts);
                                   console.log(posts);
                                 //  console.log(posts[posts.length].created);

                                 //THIS CHECKS IF YOU ARE FIRST PERSON:
                                if (posts.length == 0) {
                                  posts.coordinatesGrounp = 1;
                                  posts.coordinatesPosition = 1;
                                     //    posts.save();
                                } else {

                                       var numbers = posts.length;
                                    var blueman = posts[posts.length - 1].created;
                                    console.log(blueman);

                                    var d2 = new Date(blueman);
                                   var d3 = d2.getTime();
                                   console.log(d3);

                                   var oldDate = d2;
                                    var newDate   = new Date();
                                   var difference = newDate.getTime() - oldDate.getTime(); // This will give difference in milliseconds
                                   var resultInMinutes = Math.round(difference / 60000);

                                   console.log(resultInMinutes);
                                   //var resultInHours= resultInMinutes / 60;   console.log(resultInHours);
                                 //  var resultInDays= resultInHours / 24;     console.log(resultInDays);

                                       if (resultInMinutes < 5) {

                                         /*
                                           //the distance calculation is already done in front end,
                                             //so you just have to add it to DB.
                                       -  you may have to loop through the numbers and see if the distances are
                                       higher or lower to get the right position number.
                                       - if you are within the 5 min (TRUE) THEN you are in same group
                                         as the others; this limits the distance calculations
                                         -YOU ADD NUMBER FOR coordinatesGroup and coordinatesPosition
                                         so that you can get timestamps you need to loop through and check distances,
                                         then you can add coordinatePosition and allow that to pass to frontend table.
                                       */

                                        var newUser2 = PeopleLine({
                                         email : data.email, line: data.line,
                                         position: data.position,  store: data.store,
                                         fullname : data.fullName,  longitude: data.longitude,
                                         latitude: data.latitude,  distance: data.distance,
                                         notificationkey: data.notificationkey
                                       });

                                       newUser2.save(function (err, post) {
                                         if (err) {return next(err); }
                                       //  callback(post);
                                           io.emit('updatePeople', post);
                                         console.log(post);
                                       });

                                        } else {
                                         /*   if you are outside the 5 min (FALSE) THEN you are in different
                                           group as others, ex: Coordinategroup = group1 + 1;
                                         */

                                           var newUser2 = PeopleLine({
                                            email : data.email, line: data.line,
                                            position: data.position,  store: data.store,
                                            fullname : data.fullName,  longitude: data.longitude,
                                            latitude: data.latitude,  distance: data.distance,
                                            notificationkey: data.notificationkey
                                          });

                                          newUser2.save(function (err, post) {
                                            if (err) {return next(err); }
                                          //  callback(post);
                                              io.emit('updatePeople', post);
                                            console.log(post);
                                          });


                                         posts.coordinatesGrounp = 1 + 1;
                                         posts.save();

                                       }

                                   res.send(posts);
                                     }
                                   });

                             }
                           });
                   });
