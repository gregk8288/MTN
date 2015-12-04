angular.module('app.controllers', ['firebase'])

.controller('loginCtrl', function($scope, $state, $rootScope, $firebase) {

  $scope.goTosignin = function () {
    $state.go('signin');
  }
    
  $scope.user = "";
    // var ref = new Firebase("https://mtn.firebaseio.com/");
 //
 //    ref.createUser({
 //      email    : "eruaanndd@gmail.com",
 //      password : "test",
 //        username: "ruaan"
 //    }, function(error, userData) {
 //      if (error) {
 //        console.log("Error creating user:", error);
 //      } else {
 //        console.log("Successfully created user account with uid:", userData.uid);
 //      }
 //    });

    

    $scope.loginEmail = function(user){
        console.log(user.email);
       var ref = new Firebase("https://mtn.firebaseio.com/");
 
      ref.authWithPassword({
        email    : user.email,
        password : "test"
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $rootScope.uid = authData.uid;
           $state.go('signin');
        }
      });
      
    };

})

.controller('profileCtrl', function($scope, $state, $rootScope, $firebase, $firebaseArray) {
    console.log($rootScope.uid);
    
    var ref = new Firebase('https://mtn.firebaseio.com/');
    var sync = $firebaseArray(ref);
    $scope.userDetails = sync;
    
    $scope.userDetails.$add({
            user: $rootScope.uid,
            firstname:"Ruaan",
            lastname:"Eramus",
            email:"eruaan@gmail.com",
            jobTitle:"senior develper"
          });
          
    $scope.goToMtnAcademy= function () {
    $state.go('mTNAcadamy');
  }

})

.controller('signinCtrl', function($scope, $state) {
  $scope.goToProfile= function () {
    $state.go('profile');
  }
})

.controller('mTNAcadamyCtrl', function($scope, $ionicPopover, $state, $ionicPopup) {

  $scope.goBack = function(){
    $state.go('profile');
  };

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Add Excel training',
      template: 'By adding this training to your profile you will receive any notifications / updates send to this group'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

})
  .controller('trainingCtrl', function($scope, $state, $ionicPopover, $firebaseArray){

    $scope.goBackt = function(){
      $state.go('mTNAcadamy');
    }

    /////chat part //////

    var ref = new Firebase('https://mtn.firebaseio.com/');
    var sync = $firebaseArray(ref);
    $scope.chats = sync;

    $scope.sendChat = function(chat){
      $scope.chats.$add({
        user:"Tangent Solutions",
        message: chat.message
      });
      chat.message = "";
    }
  })
