angular.module('app')
  .controller('LoginCtrl', function ($scope, $state, $rootScope, $ionicLoading, userService, dbSyncService) {

    $scope.email = function (email) {
      $ionicLoading.show({ template: 'Loading...' });
      $rootScope.email = "";
      userService.getUserByEmail(email).then(function(result) {
          
        if(result.rows.length > 0) {
            if (email == result.rows[0].value.email){
                 $rootScope.user = result.rows[0].value;
                 $rootScope.email = result.rows[0].value.email;
            } else {
                $rootScope.email = email; 
                $rootScope.user = {};
            }
        }else {
          $rootScope.email = email;
          $rootScope.user = {};
        }

        $state.go('signin');
        $ionicLoading.hide();
      });
    };
  });
