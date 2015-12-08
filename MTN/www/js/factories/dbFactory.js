angular.module('app')
  .factory('dbFactory', function(pouchdb) {
    var DB_NAME = 'hellocrowd';
    var DB_URL = 'https://couchdb-c29371.smileupps.com/' + DB_NAME;

    return {
      db: pouchdb.create('hellocrowd'),
      name: DB_NAME,
      url: DB_URL
    };
  });