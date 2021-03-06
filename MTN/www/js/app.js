
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('app', ['ionic', 'app.routes', 'app.services', 'app.directives', 'tabSlideBox', 'ngCordova', 'pouchdb', 'ngIOS9UIWebViewPatch'])


.run(function($ionicPlatform, $rootScope, dbSyncService) {
   
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
   
  });
  
  dbSyncService.startSync();
  $rootScope.user = {};

})
.config(function($ionicConfigProvider) {
  // remove back button text completely
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
});
