angular.module('app.controllers', ['pouchdb'])

    .controller('SigninCtrl', function ($scope, $state) {
      $scope.goToProfile = function () {
        $state.go('profile');
      }
    })