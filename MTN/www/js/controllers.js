angular.module('app.controllers', ['pouchdb'])

.controller('loginCtrl', function($scope, $state,$rootScope, pouchCollection) {
    var dbName = 'users';
    $scope.tasks = pouchCollection(dbName);
   

        
    $scope.email = function(user) {
        $rootScope.email = user.email;
        
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
           
            //console.log(result.rows[i].doc.email);
            if ($rootScope.email == result.rows[i].doc.email) {
               
                $scope.user = result.rows[i].doc; 
                $rootScope.user = result.rows[i].doc; 
                console.log("user");
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
  var db = new PouchDB('trainingxxxelected');
  db.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    // handle result
      var events = [];
      for(var i=0;i<result.rows.length;i++) {
          console.log($rootScope.user._id);
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
     $state.go('training');
     $rootScope.selectedTraining = training;
    }
  $scope.showConfirm = function(training) {
      
      console.log("added:" + $rootScope.user._id);
      training.user_id = $rootScope.user._id;
      var dbName = 'trainingxxxelected';
      $scope.tasks = pouchCollection(dbName);
      $scope.tasks.$add(training);
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
          console.log( $scope.trainings);
          
      });

  


})
  .controller('trainingCtrl', function($scope, $state, $ionicPopover, $ionicScrollDelegate, $timeout, $rootScope, pouchCollection){
      console.log($rootScope.selectedTraining);
      $scope.title = $rootScope.selectedTraining.title;

    $scope.goBackt = function(){
      $state.go('mTNAcadamy');
    }

   
    $scope.user.picture = "http://ionicframework.com/img/docs/mcfly.jpg";
    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    
    $scope.$on('$ionicView.enter', function() {
  
   var db = new PouchDB('testlastmessages');
        db.allDocs({
          include_docs: true,
          attachments: true
        }).then(function (result) {
          // handle result
            var allMessages = [];
            for(var i=0;i<result.rows.length;i++) {
                 if ($rootScope.selectedTraining._id == result.rows[i].doc.trainingId) {
                allMessages.push(result.rows[i].doc);
            }
            }
            $scope.messages = allMessages;
            console.log($scope.messages);
        
        }).catch(function (err) {
          console.log(err);
        });
        
        
    });

    $scope.sendMessage = function(chatMessage) {
        console.log(chatMessage);
       $scope.input.chat.message = '';

      var message = {};

      message.username = $rootScope.user.firstname + " " + $rootScope.user.lastname;
      message.userId = $rootScope.selectedTraining.user_id;
      message.trainingId = $rootScope.selectedTraining._id;
      message.pic = $scope.user.picture;
      message.text = chatMessage;
      message.datetime = Date.now();
      $scope.messages.push(message);

      var dbName = 'testlastmessages';
      $scope.tasks = pouchCollection(dbName);
      $scope.tasks.$add(message);
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
   

  
    };
  })

  

