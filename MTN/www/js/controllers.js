angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $state) {

  $scope.goTosignin = function () {
    $state.go('signin');
  }

})

.controller('profileCtrl', function($scope) {

})

.controller('signinCtrl', function($scope) {

})

.controller('mTNAcadamyCtrl', function($scope) {

})
