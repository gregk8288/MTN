angular.module('app')

    .controller('SigninCtrl', function ($scope, $state) {
      $scope.goToProfile = function () {
        $state.go('profile');
      }
    })