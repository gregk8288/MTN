angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('login', {
      url: '/email',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('page', {
      url: '/social',
      templateUrl: 'templates/page.html',
      controller: 'pageCtrl'
    })

    .state('signup', {
      url: '/page3',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })

    .state('mTNAcadamy', {
      url: '/home',
      templateUrl: 'templates/mTNAcadamy.html',
      controller: 'mTNAcadamyCtrl'
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/email');

});
