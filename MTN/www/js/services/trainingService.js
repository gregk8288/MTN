angular.module('app.services')
  .service('trainingService', function(dbFactory) {
    var DOCUMENT_TYPE = "training";
    var db = dbFactory.db;

    this.getTrainings = function() {
      return db.query({
        map: function(doc, emit) {
          if(doc.type === DOCUMENT_TYPE) {
            emit(doc.type, doc);
          }
        }
      });
    };
  });


