angular.module('app.controllers', ['pouchdb'])

  .controller('HomeCtrl', function ($scope, $ionicPopover, $state, $ionicPopup, Training, pouchCollection, $rootScope) {

    $scope.goBack = function () {
      $state.go('profile');
    };

    $scope.getMyTrainingData = function () {
      var db = new PouchDB('trainingrrrelected');
      db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        // handle result
        var events = [];
        for (var i = 0; i < result.rows.length; i++) {
          
          if ($rootScope.user._id == result.rows[i].doc.user_id) {
            events.push(result.rows[i].doc);
            
          }

        }
        $scope.myTraining = events;
         $scope.$apply();

      }).catch(function (err) {
        console.log(err);
      });
    }

    $scope.GoToMessaging = function (training) {
      $state.go('training');
      $rootScope.selectedTraining = training;
    }
  
    $scope.showConfirm = function (training) {
        var currentPlatform = ionic.Platform.platform();
        console.log(currentPlatform);
        var isIOS = ionic.Platform.isIOS();
          var isAndroid = ionic.Platform.isAndroid();
          if (isIOS == true || isAndroid ==true) {
        $ionicPlatform.ready(function() {
        navigator.notification.confirm("By adding this training to your profile you will receive any notification / updates sent to this group.", function(buttonIndex) {
                    switch(buttonIndex) {
                        case 1:
                            
                            break;
                        case 2:
                            training.user_id = $rootScope.user._id;
                            var dbName = 'trainingrrrelected';
                            $scope.tasks = pouchCollection(dbName);
                            $scope.tasks.$add(training);
     
                              $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
                                .on('error', function (err) {
                                  console.log("Syncing stopped");
                                  console.log(err);
                                });
                            break;
                      
                    }
                }, "add " + $rootScope.selectedTraining.title + "?", [ "Dismiss", "Accept" ]);
      
       });
      } else {
          training.user_id = $rootScope.user._id;
          var dbName = 'trainingrrrelected';
          $scope.tasks = pouchCollection(dbName);
          $scope.tasks.$add(training);

            $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
              .on('error', function (err) {
                console.log("Syncing stopped");
                console.log(err);
              });
      } 

    };
 

    var promise = Training.getAllTrainings();
     promise.then(function (data) {
       $scope.trainings = [];
       var item;

       for(var i = 0; i<data.length;i++){
         item = data[i];
         $scope.trainings.push(item);
       }
     });
    

  })