angular.module('app.controllers', ['firebase'])

.controller('loginCtrl', function($scope, $state) {

  $scope.goTosignin = function () {
    $state.go('signin');
  }

})

.controller('profileCtrl', function($scope, $state) {

  $scope.goToMtnAcademy= function () {
    $state.go('mTNAcadamy');
  }

})

.controller('signinCtrl', function($scope, $state) {
  $scope.goToProfile= function () {
    $state.go('profile');
  }
})

.controller('mTNAcadamyCtrl', function($scope, $ionicPopover, $state, $ionicPopup) {

  $scope.goBack = function(){
    $state.go('profile');
  };

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Add Excel training',
      template: 'By adding this training to your profile you will receive any notifications / updates send to this group'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

})
  .controller('trainingCtrl', function($scope, $state, $ionicPopover, $firebaseArray){

    $scope.goBackt = function(){
      $state.go('mTNAcadamy');
    }

    /////chat part //////

    var ref = new Firebase('https://hel.firebaseio.com/');
    var sync = $firebaseArray(ref);
    $scope.chats = sync;

    $scope.sendChat = function(chat){
      $scope.chats.$add({
        user:"Tangent Solutions",
        message: chat.message
      });
      chat.message = "";
    }
  })
