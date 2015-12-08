angular.module('app.services')
  .service('userService', function(dbFactory) {
    var DOCUMENT_TYPE = "user";

    this.getUsers = function() {
      return dbFactory.query({
        map: function(doc, emit) {
          if(doc.type === DOCUMENT_TYPE) {
            emit(doc.type, doc);
          }
        }
      });
    };

    this.getUserByEmail = function(email) {
      return dbFactory.query({
        map: function(doc, emit) {
          if(doc.type === DOCUMENT_TYPE && doc.email === email) {
            emit(doc.type, doc);
          }
        }
      });
    }
  });


