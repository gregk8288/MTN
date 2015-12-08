angular.module('app')

  .controller('TrainingCtrl', function ($scope, $state, $ionicPopover, $ionicScrollDelegate, $timeout, trainingService, $rootScope, pouchCollection) {
    var selectedTraining = $rootScope.selectedTraining;
    $scope.title = $rootScope.selectedTraining.title;
    $scope.chat = {};


    trainingService.getTrainingMessages(selectedTraining._id).then(function(results) {
      console.log(results);
      $scope.messages = results.rows.map(function(row) {
        return {
           username: row.doc.firstname + row.doc.lastname,
           userId: row.doc._id,
           pic: row.doc.picture,
           text: row.value.message.text,
           datetime: row.value.message.datetime
        };
      });
    });

    $scope.goBackt = function () {
      $state.go('home');
    }

    $scope.sendMessage = function (chatMessage) {
      var message = {
        text: chatMessage,
        datetime: Date.now(),
        userid: $rootScope.user._id
      };

      trainingService.addUserMessage(selectedTraining, message);
      $scope.messages.push(message);
      $scope.chat.message = "";
    };
  });

