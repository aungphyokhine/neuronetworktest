"use strict";

angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage" ])
// ngTouch is No Longer Supported by Angular-Material

.run(function($rootScope, $cordovaDevice, $cordovaStatusbar){
  document.addEventListener("deviceready", function () {
    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#E53935'); // Status Bar With Red Color, Using Angular-Material Style
    window.plugins.orientationLock.lock("portrait");
  }, false);
  /* Hijack Android Back Button (You Can Set Different Functions for Each View by Checking the $state.current)
  document.addEventListener("backbutton", function (e) {
      if($state.is('init')){
        navigator.app.exitApp();
      }  else{
        e.preventDefault();
      }
    }, false);*/
})
.run(function () {
    //Parse.initialize('myAppId');

    ////Parse.serverURL = 'https://smsio-gistracker.rhcloud.com/parse';
    //Parse.serverURL = 'http://localhost:1337/parse';
    ////Parse.liveQueryServerURL = 'ws://smsio-gistracker.rhcloud.com:8000/parse'


    //Parse.FacebookUtils.init({
    //    appId: '373608282980540',
    //    status: false,
    //    cookie: true,
    //    xfbml: true,
    //    version: 'v2.4'
    //});


})
.config(function($mdThemingProvider, $mdGestureProvider) { // Angular-Material Color Theming
  $mdGestureProvider.skipClickHijack();

  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
}).config(function ($cordovaInAppBrowserProvider) {
    var options = {
        location: "no",
        toolbar: "yes"
    };

    $cordovaInAppBrowserProvider.setDefaultOptions(options);
});
