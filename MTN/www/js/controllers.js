angular.module('app.controllers', ['pouchdb'])

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

  })

  .controller('ProfileCtrl', function ($scope, $state, $rootScope, pouchCollection) {
      //var userEmail = $rootScope.email;
      //$scope.user = "test@test.com";
    var db = new PouchDB('users');
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      // handle result

      for (var i = 0; i < result.rows.length; i++) {

        //console.log(result.rows[i].doc.email);
        if ($rootScope.email == result.rows[i].doc.email) {

          $scope.user = result.rows[i].doc;
          $rootScope.user = result.rows[i].doc;
          $rootScope.initials = $rootScope.user.firstname.charAt(0) + $rootScope.user.lastname.charAt(0);
          $scope.$apply();
          return
        } 

      }

    }).catch(function (err) {
      console.log(err);
    });


    $scope.goHome = function (user) {
      console.log(user);
      var dbName = 'users';
      $scope.tasks = pouchCollection(dbName);

      $scope.tasks.$add(user);
      
        $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
          .on('error', function (err) {
            console.log("Syncing stopped");
            console.log(err);
          });
     
      $state.go('home');
    }

  })

  .controller('SigninCtrl', function ($scope, $state) {
    $scope.goToProfile = function () {
      $state.go('profile');
    }
  })

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
  .controller('TrainingCtrl', function ($scope, $state, $ionicPopover, $ionicScrollDelegate, $timeout, $rootScope, pouchCollection) {
    console.log($rootScope.selectedTraining);
    $scope.title = $rootScope.selectedTraining.title;
    $scope.chat = {};

    $scope.goBackt = function () {
      $state.go('home');
    }


    $scope.user.picture = "http://ionicframework.com/img/docs/mcfly.jpg";
    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');

    $scope.$on('$ionicView.enter', function () {

      var db = new PouchDB('messages');
      db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        // handle result
        var allMessages = [];
        for (var i = 0; i < result.rows.length; i++) {
          if ($rootScope.selectedTraining._id == result.rows[i].doc.trainingId) {
            allMessages.push(result.rows[i].doc);
          }
        }
        $scope.messages = allMessages;
         $scope.$apply();
        console.log($scope.messages);

      }).catch(function (err) {
        console.log(err);
      });


    });

    $scope.sendMessage = function (chatMessage) {
      


      var message = {};

      message.username = $rootScope.user.firstname + " " + $rootScope.user.lastname;
      message.userId = $rootScope.selectedTraining.user_id;
      message.trainingId = $rootScope.selectedTraining._id;
      message.pic = $scope.user.picture;
      message.text = chatMessage;
      message.datetime = Date.now();
      $scope.messages.push(message);
      $scope.$apply();
      var dbName = 'messages';
      $scope.tasks = pouchCollection(dbName);
      $scope.tasks.$add(message);
      $scope.online = !$scope.online;
     
        $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
          .on('error', function (err) {
            console.log("Syncing stopped");
            console.log(err);
          });
      
      $scope.chat.message = "";


    };
  })



