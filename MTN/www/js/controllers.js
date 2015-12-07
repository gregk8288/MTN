angular.module('app.controllers', ['pouchdb'])

.controller('loginCtrl', function($scope, $state,$rootScope, pouchCollection) {
    var dbName = 'users';
    $scope.tasks = pouchCollection(dbName);
   

        
    $scope.email = function(user) {
        $rootScope.email = user.email;
        console.log($rootScope.email);
        $scope.goTosignin();
    };
   
      $scope.online = !$scope.online;
      if ($scope.online) {  // Read http://pouchdb.com/api.html#sync
       $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
          .on('error', function (err) {
            console.log("Syncing stopped");
            console.log(err);
          });
      } else {
        $scope.sync.cancel();
      }
    
  $scope.goTosignin = function () {
    $state.go('signin');
  }

})

.controller('profileCtrl', function($scope, $state,$rootScope, pouchCollection) {

    var db = new PouchDB('users');
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      // handle result
        console.log(result.rows);
        console.log(result.rows.length);
        for(var i=0;i<result.rows.length;i++) {
            console.log($rootScope.email = "eruaan@gmail.com");
            console.log(result.rows[i].doc.email);
            if ($rootScope.email == result.rows[i].doc.email) {
               
                $scope.user = result.rows[i].doc; 
                $rootScope.user = result.rows[i].doc; 
                console.log($scope.user);
                return
            }
            
        }
        
    }).catch(function (err) {
      console.log(err);
    });

    
  $scope.goToMtnAcademy= function (user) {
      console.log(user);
      var dbName = 'users';
      $scope.tasks = pouchCollection(dbName);
      
       $scope.tasks.$add(user);
       $state.go('mTNAcadamy');
  }

})

.controller('signinCtrl', function($scope, $state) {
  $scope.goToProfile= function () {
    $state.go('profile');
  }
})

.controller('mTNAcadamyCtrl', function($scope, $ionicPopover, $state, $ionicPopup, Training, pouchCollection, $rootScope) {
  
  $scope.goBack = function(){
    $state.go('profile');
  };
  
  $scope.getMyTrainingData = function() {
  var db = new PouchDB('trainingSelected');
  db.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    // handle result

      var events = [];
      for(var i=0;i<result.rows.length;i++) {

          if ($rootScope.user._id == result.rows[i].doc.user_id) {
              events.push(result.rows[i].doc); 
          }
          
      }
      $scope.myTraining = events;

  }).catch(function (err) {
    console.log(err);
  });
}

    $scope.GoToMessaging = function(training) {
     $state.go('mTNAcadamy');
    }
  $scope.showConfirm = function(training) {
    
      training.user_id = $rootScope.user._id;
      var dbName = 'trainingSelected';
      $scope.tasks = pouchCollection(dbName);
      $scope.tasks.$add(training);
      
       
      };
      
  var db = new PouchDB('training');
  var allevents = []
  
  db.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    // handle result
 
              for(var i=0;i<result.rows.length;i++) {
              allevents.push(result.rows[i].doc); 
          }
          $scope.trainings = allevents;
          
      });

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
