angular.module('app.services', [])
.service('BlankService', [function($http, $q){
  var jsonfile = {};
  /*Returns trainings*/
  jsonfile.getAllTrainings = function() {
    var deferred = $q.defer();
    $http({
      method: 'get',
      url: 'templates/file/trainings.json',
      responseType: "json"
    }).
    success(function(data) {
      deferred.resolve(data);
    }).
    error(function(data) {
      console.log("errroe");
    });

    return deferred.promise;
  };

  return jsonfile;

}]);

