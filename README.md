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




    TO MAKE THE FACEBOOK LOGIN RUN:

1) cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="2042335766002685" --variable APP_NAME="Androidexample02"
2) create ionic project
3) add Android
4) facebookConnectPlugin.login(["email" ], first THEN:
5) facebookConnectPlugin.api('me/?fields=id,name,email', ['email','public_profile'],


## Using this project

We recommend using the [Ionic CLI](https://github.com/ionic-team/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic cordova
```

Then run:

```bash
$ ionic start myProject tabs --type=ionic1
```

More info on this can be found on the Ionic [Getting Started](https://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/ionic-team/ionic-cli) repo.

## Issues

Issues have been disabled on this repo. If you do find an issue or have a question, consider posting it on the [Ionic Forum](https://forum.ionicframework.com/). If there is truly an error, follow our guidelines for [submitting an issue](https://ionicframework.com/submit-issue/) to the main Ionic repository.
