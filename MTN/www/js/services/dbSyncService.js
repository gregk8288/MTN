angular.module('app.services')
  .service('dbSyncService', function(dbFactory, $q) {
    var db = dbFactory.db;

    this.startSync = function() {
      return db.replicate.sync(dbFactory.url, {
          live: true,
          retry: true
        });
    };

    this.cancelSync = function(sync) {
      sync.cancel();
    };
  });


