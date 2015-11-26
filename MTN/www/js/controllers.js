angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $state) {

  $scope.goTosignin = function () {
    $state.go('signin');
  }

})

.controller('pageCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('mTNAcadamyCtrl', function($scope) {

})
