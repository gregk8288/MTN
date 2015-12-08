angular.module('app')

    .controller('LoginCtrl', function ($scope, $state, $rootScope, pouchCollection) {
       
      var dbName = 'users';
      $scope.tasks = pouchCollection(dbName);

      $scope.email = function (user) {
        $rootScope.email = user;

        $scope.goTosignin(user);
      };

        $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
          .on('error', function (err) {
            console.log("Syncing stopped");
            console.log(err);
          });


      $scope.goTosignin = function (user) {
        $state.go('signin');
      }
      
    });