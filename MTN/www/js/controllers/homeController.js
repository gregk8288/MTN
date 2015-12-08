angular.module('app')

  .controller('HomeCtrl', function ($scope, $ionicPopover, $state, $ionicPopup, $ionicLoading, trainingService, userService, $rootScope) {
    var user = $rootScope.user;

    $scope.goBack = function () {
      $state.go('profile');
    };

    $scope.getMyTrainingData = function () {
      userService.getUsersTrainings(user._id).then(function(result) {
        $scope.myTraining = result.rows.map(function(row) {
          return row.doc;
        });
      });
    };

    var getTrainings = (function () {
      $ionicLoading.show({ template: 'Loading...' });
      trainingService.getTrainings().then(function(docs) {
        $scope.trainings= docs.rows.map(function(doc) {
          return doc.value;
        });
        $ionicLoading.hide();
      });
    })();

    $scope.GoToMessaging = function (training) {
      $state.go('training');
      $rootScope.selectedTraining = training;
    }

    $scope.showConfirm = function (training) {
      userService.addUserTraining(user, training._id)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        });
      //   var currentPlatform = ionic.Platform.platform();
      //   console.log(currentPlatform);
      //   var isIOS = ionic.Platform.isIOS();
      //     var isAndroid = ionic.Platform.isAndroid();
      //     if (isIOS == true || isAndroid ==true) {
      //   $ionicPlatform.ready(function() {
      //   navigator.notification.confirm("By adding this training to your profile you will receive any notification / updates sent to this group.", function(buttonIndex) {
      //               switch(buttonIndex) {
      //                   case 1:

      //                       break;
      //                   case 2:
      //                       training.user_id = $rootScope.user._id;
      //                       var dbName = 'trainingrrrelected';
      //                       $scope.tasks = pouchCollection(dbName);
      //                       $scope.tasks.$add(training);

      //                         $scope.sync = $scope.tasks.$db.replicate.sync('http://localhost:5984/' + dbName, {live: true})
      //                           .on('error', function (err) {
      //                             console.log("Syncing stopped");
      //                             console.log(err);
      //                           });
      //                       break;

      //               }
      //           }, "add " + $rootScope.selectedTraining.title + "?", [ "Dismiss", "Accept" ]);

      //  });
      // } else {
      //     training.user_id = $rootScope.user._id;
      //     var dbName = 'trainingrrrelected';
      //     $scope.tasks = pouchCollection(dbName);
      //     $scope.tasks.$add(training);

      //       $scope.sync = $scope.tasks.$db.replicate.sync('http://localhost:5984/' + dbName, {live: true})
      //         .on('error', function (err) {
      //           console.log("Syncing stopped");
      //           console.log(err);
      //         });
      // }

    };

  });