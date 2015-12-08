angular.module('app.services')
  .service('userService', function(dbFactory, $q) {
    var DOCUMENT_TYPE = "user";
    var db = dbFactory.db;

    this.getUsers = function() {
      return db.query({
        map: function(doc, emit) {
          if(doc.type === DOCUMENT_TYPE) {
            emit(doc.type, doc);
          }
        }
      });
    };

    this.getUserByEmail = function(email) {
      return db.query({
        map: function(doc, emit) {
          if(doc.type === DOCUMENT_TYPE && doc.email === email) {
            emit(doc.type, doc);
          }
        }
      });
    };
  });


