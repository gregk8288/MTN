angular.module('app')

  .controller('HomeCtrl', function ($scope, $ionicPopover, $state, $ionicPopup, $ionicLoading, trainingService, userService, $rootScope) {
    var user = $rootScope.user;
    $scope.hasImage = $rootScope.hasImage;
    $scope.image = $rootScope.image;
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
    
    $scope.addTraining = function (training) {
      userService.addUserTraining(user, training._id)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        });
    }
    
    $scope.getpopup = function(training){
              if (ionic.Platform.isIOS() == true || ionic.Platform.isAndroid() ==true) {
                  var message = "By adding this training to your profile you will receive any notification / updates sent to this group.";
                    navigator.notification.confirm(message, function(buttonIndex) {
                    switch(buttonIndex) {
                        case 1:
                            break;
                        case 2:
                            $scope.addTraining(training);
                            break;
                    }
                },
                 "add " + $rootScope.selectedTraining.title + "?", [ "Dismiss", "Accept" ]);
             } else {
                 $scope.addTraining(training);
             }
        
    }
    
    $scope.showConfirm = function (training) {
        $scope.getpopup(training);

    };

  });