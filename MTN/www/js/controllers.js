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

.controller('mTNAcadamyCtrl', function($scope, $ionicPopover) {

  //// Menu Popover
  $ionicPopover.fromTemplateUrl('my-menu.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover= function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });


})
  .controller('trainingCtrl', function($scope, $ionicPopover, $firebaseArray){
    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('my-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });



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
