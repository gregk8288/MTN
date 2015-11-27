angular.module('app.controllers', [])

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

})
