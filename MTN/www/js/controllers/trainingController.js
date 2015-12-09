angular.module('app')
  .controller('TrainingCtrl', function ($scope, $state, $ionicPopover, $ionicScrollDelegate, $timeout, trainingService, $rootScope, pouchCollection, $location,$anchorScroll, $ionicScrollDelegate) {
    var selectedTraining = $rootScope.selectedTraining;
    
    $scope.title = $rootScope.selectedTraining.title;
    $scope.chat = {};
    $scope.user = $rootScope.user;
    $scope.hasImage = $rootScope.hasImage;
    $scope.image = $rootScope.image;
   
    trainingService.getTrainingMessages(selectedTraining._id).then(function(results) {
      $scope.messages = results.rows.map(function(row) {
        return {
           username: row.doc.firstname + row.doc.lastname,
           userid: row.doc._id,
           pic: row.doc.picture,
           text: row.value.message.text,
           datetime: row.value.message.datetime
        };
      });
      $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom([true]);
    });

    $scope.goBackToTraining = function () {
      $state.go('home');
    }
    $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom([true]);
    $scope.sendMessage = function (chatMessage) {

      var message = {
        text: chatMessage,
        datetime: Date.now(),
        userid: $scope.user._id
      };

      trainingService.addUserMessage(selectedTraining, message);
      $scope.messages.push(message);
      $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom([true]);
      $scope.chat.message = "";
      
    };
    
  });

