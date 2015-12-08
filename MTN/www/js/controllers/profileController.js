angular.module('app')
    .controller('ProfileCtrl', function ($scope, $state, $rootScope, userService, $ionicLoading) {

      $scope.user = $rootScope.user;

      $scope.goHome = function (user) {
        $ionicLoading.show({ template: 'Loading...' });

        userService.addUser(user).then(function(result) {
          $state.go('home');
          $ionicLoading.hide();
        });
      }
    });
