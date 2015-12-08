angular.module('app')
  .controller('LoginCtrl', function ($scope, $state, $rootScope, $ionicLoading, userService) {
    $scope.email = function (email) {
      $ionicLoading.show({ template: 'Loading...' });

      userService.getUserByEmail(email).then(function(result) {
        if(result.rows.length > 0) {
          $rootScope.user = result.rows[0].value;
        }

        $state.go('signin');
        $ionicLoading.hide();
      });
    };
  });