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
1)ionic cordova build android --release -- -- --versionCode=8
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
