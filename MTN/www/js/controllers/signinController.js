angular.module('app.controllers')

    .controller('SigninCtrl', function ($scope, $state,$stateParams, azureClient) {
        console.log($stateParams.email);
        $scope.user = {};
        $scope.registerFacebook = function(){
        	azureClient.login("facebook").done(function (results) {

        		azureClient.invokeApi('userInfo', { method : 'GET' })
        			.done(function (profile) {
                        
        		        //$scope.user.socialmediaID = results.userId;
                        $scope.user.firstname = profile.result.facebook.name.substr(0,profile.result.facebook.name.indexOf(' '));
                        $scope.user.lastname = profile.result.facebook.name.substr(profile.result.facebook.name.indexOf(' ')+1);
                        $scope.user.pic = profile.result.facebook.picture.data.url;
                    
                            $scope.user.email = $stateParams.email;
                       
                        
        				$scope.$apply();
        				
                         $state.go('profile',$scope.user);
        			},
        			function (err) {
        				alert("Error on fb profile fetch: " + err);
        				
        			});
        	}, function (err) {
        		alert("Error on auth: " + err);
        	});
         }
         
         $scope.registerTwitter = function(){
             $scope.user = {};
         	azureClient.login("twitter").done(function (results) {

         		azureClient.invokeApi('userInfo', { method : 'GET' })
         			.done(function (profile) {
                        
         		         // $scope.user.socialmediaID = results.userId;
                         var str = profile.result.twitter.name;
                          $scope.user.firstname = str.substr(0,str.indexOf(' '));
                          $scope.user.lastname = str.substr(str.indexOf(' ')+1);
                          $scope.user.email = $stateParams.email;
                          $scope.user.pic = profile.result.twitter.profile_image_url;
                     
                         
         				$scope.$apply();
        				
                          $state.go('profile',$scope.user);
         			},
         			function (err) {
         				alert("Error on fb profile fetch: " + err);
         				
         			});
         	}, function (err) {
         		alert("Error on auth: " + err);
         	});
          }
         
         
      $scope.goToProfile = function () {
        $state.go('profile',{firstname : "",lastname : "", email : $stateParams.email, pic : ""});
      }
    })