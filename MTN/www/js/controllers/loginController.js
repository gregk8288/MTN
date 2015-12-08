angular.module('app.controllers')

    .controller('LoginCtrl', function ($scope, $state, $rootScope, pouchCollection) {
        
      var dbName = 'users';
      $scope.tasks = pouchCollection(dbName);

      $scope.email = function (user) {
        $rootScope.email = user;

        $scope.goTosignin(user);
      };

        $scope.sync = $scope.tasks.$db.replicate.sync('http://localhost:5984/' + dbName, {live: true})
          .on('error', function (err) {
            console.log("Syncing stopped");
            console.log(err);
          });
          $scope.sync = $scope.tasks.$db.replicate.sync('http://localhost:5984/' + "messages", {live: true})
                    .on('error', function (err) {
                      console.log("Syncing stopped");
                      console.log(err);
                    });
                    $scope.sync = $scope.tasks.$db.replicate.sync('http://localhost:5984/' + "training", {live: true})
                              .on('error', function (err) {
                                console.log("Syncing stopped");
                                console.log(err);
                              });
                              $scope.sync = $scope.tasks.$db.replicate.sync('http://localhost:5984/' + "trainingrrrelected", {live: true})
                                        .on('error', function (err) {
                                          console.log("Syncing stopped");
                                          console.log(err);
                                        });
                              


      $scope.goTosignin = function (user) {
        $state.go('signin',{email: user});
      }
      
    });