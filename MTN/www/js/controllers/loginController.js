angular.module('app')

    .controller('LoginCtrl', function ($scope, $state, $rootScope, pouchCollection, userService, dbSyncService) {
      userService.getUserByEmail('eruaan@gmail.com').then(function(result) {
        console.log(result);
      });




      // var db = new PouchDB('hellocrowd');
      // db.query({
      //   map: function(doc, emit) {
      //     if(doc.email === 'eruaan@gmail.com') {
      //       emit(doc.email, doc);
      //     }
      //   }
      // }).then(function(result) {
      //   console.log(result);
      // });

      // var dbName = 'users';
      // $scope.tasks = pouchCollection(dbName);

      // $scope.email = function (user) {
      //   $rootScope.email = user;

      //   $scope.goTosignin(user);
      // };

      //   $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
      //     .on('error', function (err) {
      //       console.log("Syncing stopped");
      //       console.log(err);
      //     });


      // $scope.goTosignin = function (user) {
      //   $state.go('signin');
      // }

    });