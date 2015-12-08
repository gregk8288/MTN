angular.module('app.services', [])
.service('Training',function($http, $q){
  var jsonfile = {};
  /*Returns trainings*/
  jsonfile.getAllTrainings = function() {
    var deferred = $q.defer();
    $http({
      method: 'get',
      url: 'templates/file/training.json',
      responseType: "json"
    }).
    success(function(data) {
      deferred.resolve(data);
    }).
    error(function(data) {
      console.log("error", data);
    });

    return deferred.promise;
  };

  return jsonfile;

});

