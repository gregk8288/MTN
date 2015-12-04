angular.module('app.controllers', ['firebase'])

.controller('loginCtrl', function($scope, $state) {

  $scope.goTosignin = function () {
    $state.go('signin');
  }

})

.controller('profileCtrl', function($scope, $state) {

  $scope.goToMtnAcademy= function () {
    $state.go('mTNAcadamy');
  }

})

.controller('signinCtrl', function($scope, $state) {
  $scope.goToProfile= function () {
    $state.go('profile');
  }
})

.controller('mTNAcadamyCtrl', function($scope, $ionicPopover, $state, $ionicPopup, Training) {

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


  var promise = Training.getAllTrainings();
  promise.then(function (data) {
    $scope.trainings = [];
    var item;

    for(var i = 0; i<data.length;i++){
      item = data[i];
      $scope.trainings.push(item);
    }
  });


})
  .controller('trainingCtrl', function($scope, $state, $ionicPopover, /*$firebaseArray,*/ MockService, $ionicScrollDelegate, $timeout){


    $scope.goBackt = function(){
      $state.go('mTNAcadamy');
    }

    /////chat part //////
    //
    //var ref = new Firebase('https://hel.firebaseio.com/');
    //var sync = $firebaseArray(ref);
    //$scope.chats = sync;
    //
    //$scope.sendChat = function(chat){
    //  $scope.chats.$add({
    //    user:"Tangent Solutions",
    //    message: chat.message
    //  });
    //  chat.message = "";
    //}

    $scope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: 'http://ionicframework.com/img/docs/venkman.jpg',
      username: 'Ruaan'
    }

    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
      username: 'Tangent solutions'
    };

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');

    $scope.$on('$ionicView.enter', function() {

        MockService.getUserMessages({toUserId: $scope.toUser._id}).then(function(data) {
          $scope.doneLoading = true;
          $scope.messages = data.messages;
          $timeout(function() {
            viewScroll.scrollBottom();
          }, 0);
        });
    });

    $scope.sendMessage = function(chatMessage) {

      $scope.input = chatMessage;

      localStorage.setItem('senderMessage', JSON.stringify($scope.input));

      $scope.input.senderMessage = JSON.parse(localStorage.getItem('senderMessage'));

        console.log("=======", $scope.input.senderMessage);

      var message = {
        toId: $scope.toUser._id,
        text:  $scope.input.senderMessage
      };

      $scope.input.message = '';

      message.username = $scope.user.username;
      message.userId = $scope.user._id;
      message.pic = $scope.user.picture;

      $scope.messages.push(message);

      $timeout(function() {
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        $scope.messages.push(MockService.getMockMessage());
        viewScroll.scrollBottom(true);
      }, 2000);
    };
  })

  .factory('MockService', ['$http', '$q',
    function($http, $q) {
      var me = {};
      me.getUserMessages = function(d) {
        var deferred = $q.defer();

        setTimeout(function() {
          deferred.resolve(getMockMessages());
        }, 500);

        return deferred.promise;
      };

      me.getMockMessage = function() {
        return {
          userId: '534b8e5aaa5e7afc1b23e69b',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        };
      }

      return me;
    }
  ])

function getMockMessages() {
  return {"messages":[{"_id":"535d625f898df4e80e2a125e","text":"Ionic has changed the game for hybrid app development.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-04-27T20:02:39.082Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},
    {"_id":"535f13ffee3b2a68112b9fc0","text":"I like Ionic better than ice cream!","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-04-29T02:52:47.706Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"546a5843fd4c5d581efa263a","text":"Lorem ipsum dolor sit amet.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-17T20:19:15.289Z","read":true,"readDate":"2014-12-01T06:27:38.328Z"},
    {"_id":"54764399ab43d1d4113abfd1","text":"Am I dreaming?","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-26T21:18:17.591Z","read":true,"readDate":"2014-12-01T06:27:38.337Z"},{"_id":"547643aeab43d1d4113abfd2","text":"Is this magic?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-26T21:18:38.549Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"547815dbab43d1d4113abfef","text":"Gee wiz, this is something special.","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:27:40.001Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781c69ab43d1d4113abff0","text":"I think I like Ionic more than I like ice cream!","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T06:55:37.350Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Yea, it's pretty sweet","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"5478df86ab43d1d4113abff4","text":"Wow, this is really something huh?","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T20:48:06.572Z","read":true,"readDate":"2014-12-01T06:27:38.339Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Create amazing apps - ionicframework.com","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-29T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"}],"unread":0};
}
