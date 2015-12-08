angular.module('app')
  .factory('dbFactory', function(pouchdb) {
    var db = pouchdb.create('hellocrowd');
    return db;
  });