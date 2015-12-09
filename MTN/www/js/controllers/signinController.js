angular.module('app')
    .controller('SigninCtrl', function ($scope, $state,$stateParams,$rootScope, azureClient, $ionicHistory) {
       
       $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
           $ionicHistory.clearHistory();
           viewData.enableBack = false;
         });
        $scope.user = {};
        $scope.registerFacebook = function(){
        	azureClient.login("facebook").done(function (results) {

        		azureClient.invokeApi('userInfo', { method : 'GET' })
        			.done(function (profile) {
                        console.log(profile);
                        $scope.user.firstname = profile.result.facebook.name.substr(0,profile.result.facebook.name.indexOf(' '));
                        $scope.user.lastname = profile.result.facebook.name.substr(profile.result.facebook.name.indexOf(' ')+1);
                        $scope.user.pic = profile.result.facebook.picture.data.url;
                        $scope.user.email = $rootScope.email;
                        $rootScope.user = $scope.user;
                        $state.go('profile');
        			},
        			function (err) {
        				alert("Error on fb profile fetch: " + err);
        				
        			});
        	}, function (err) {
        		alert("Error on auth: " + err);
        	});
         }
         
         $scope.registerTwitter = function(){
         	azureClient.login("twitter").done(function (results) {
         		azureClient.invokeApi('userInfo', { method : 'GET' })
         			.done(function (profile) {
                        console.log(profile);
         		         // $scope.user.socialmediaID = results.userId;
                         var str = profile.result.twitter.name;
                          $scope.user.firstname = str.substr(0,str.indexOf(' '));
                          $scope.user.lastname = str.substr(str.indexOf(' ')+1);
                          $scope.user.email = $rootScope.email;
                          $scope.user.pic = profile.result.twitter.profile_image_url;
                          $rootScope.user = $scope.user;
                          $state.go('profile');
         			},
         			function (err) {
         				alert("Error on fb profile fetch: " + err);
         				
         			});
         	}, function (err) {
         		alert("Error on auth: " + err);
         	});
          }
         
         
      $scope.goToProfile = function () {
        $state.go('profile');
      }
    })