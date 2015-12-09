angular.module('app')
    .controller('ProfileCtrl', function ($scope, $state, $stateParams, $rootScope, userService, $ionicLoading) {
      $scope.user = $rootScope.user;
      
      $scope.setImage = function() {
          if ($scope.user.pic != null){
              $scope.hasImage = true;
              $rootScope.image = $scope.image;
              $rootScope.hasImage = true;
              $scope.image = $scope.user.pic;
            
             
          } else {
              $rootScope.initials = "";
              $rootScope.hasImage = false;
              $scope.hasImage = false;
              $rootScope.initials = $scope.user.firstname.charAt(0) + $scope.user.lastname.charAt(0);
          }
      }
      
      if (Object.keys($rootScope.user).length != 0){
          if ((Object.keys($rootScope.user.firstname).length != 0 && Object.keys($rootScope.user.lastname).length != 0)) {
              $scope.setImage();
          }     
      }
      if (Object.keys($scope.user).length == 0){
          $rootScope.hasImage = false;
          $scope.hasImage = false;
          $scope.user.email = $rootScope.email;
      }
      
      $scope.goHome = function (user) {
        $ionicLoading.show({ template: 'Loading...' });
        
          userService.addUser(user).then(function(result) {
            $scope.setImage();
            $state.go('home');
            $ionicLoading.hide();
          });
      }
    });
