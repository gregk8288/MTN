angular.module('app.controllers', ['pouchdb'])

 
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



