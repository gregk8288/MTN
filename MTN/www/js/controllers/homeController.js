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
          console.log("all data");
          console.log(docs);
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
                 "add " + training.title + "?", [ "Dismiss", "Accept" ]);
             } else {
                 var confirmPopup = $ionicPopup.confirm({
                   title:  "add " + training.title + "?",
                   template: 'By adding this training to your profile you will receive any notification / updates sent to this group.'
                 });
                 confirmPopup.then(function(res) {
                   if(res) {
                     $scope.addTraining(training);
                   } else {
              
                   }
                 });
             }
        
    }
    
    $scope.showConfirm = function (training) {
        $scope.getpopup(training);

    };

  });