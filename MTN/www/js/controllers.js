angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $state) {

  $scope.goTosignup = function () {
    $state.go('signup');
  }

})

.controller('pageCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('mTNAcadamyCtrl', function($scope) {

})
