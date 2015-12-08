angular.module('app.controllers', ['pouchdb'])
    .controller('ProfileCtrl', function ($scope, $state, $rootScope, pouchCollection) {
        //var userEmail = $rootScope.email;
        $scope.user = "test@test.com";
      var db = new PouchDB('users');
      db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        // handle result
    
        for (var i = 0; i < result.rows.length; i++) {
    
          //console.log(result.rows[i].doc.email);
          if ($rootScope.email == result.rows[i].doc.email) {
    
            $scope.user = result.rows[i].doc;
            $rootScope.user = result.rows[i].doc;
            $rootScope.initials = $rootScope.user.firstname.charAt(0) + $rootScope.user.lastname.charAt(0);
            $scope.$apply();
            return
          } 
    
        }
    
      }).catch(function (err) {
          
        console.log(err);
      });
      
      $scope.goHome = function (user) {
        console.log(user);
        var dbName = 'users';
        $scope.tasks = pouchCollection(dbName);

        $scope.tasks.$add(user);
      
          $scope.sync = $scope.tasks.$db.replicate.sync('https://couchdb-c29371.smileupps.com/' + dbName, {live: true})
            .on('error', function (err) {
              console.log("Syncing stopped");
              console.log(err);
            });
     
        $state.go('home');
      }

    })
      