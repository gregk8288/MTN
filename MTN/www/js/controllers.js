angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $state) {

  $scope.goTosignin = function () {
    $state.go('signin');
  }

})

.controller('profileCtrl', function($scope) {

})

.controller('signinCtrl', function($scope, $state) {
  $scope.goToProfile= function () {
    $state.go('profile');
  }
})

.controller('mTNAcadamyCtrl', function($scope) {

})
