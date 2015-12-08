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

    this.addTraining = function(doc) {
      doc.type = 'training';
      return db.post(angular.copy(doc)).then(function(res) {
        doc._rev = res.rev;
        doc._id = res.id;
      });
    };

    this.getTrainingMessages = function(trainingId) {
      return db.query({
        map: function(doc, emit) {
          if(doc.type === DOCUMENT_TYPE && doc._id === trainingId) {
            if(doc.messages) {
              for(var i in doc.messages) {
                var userid = doc.messages[i].userid;
                emit(userid,{_id: userid, message:  doc.messages[i]});
              }
            }
          }
        }
      }, { include_docs: true });
    };

    this.addUserMessage = function(training, message) {
      training.messages = training.messages || [];
      training.messages.push(message);

      console.log(training);

      return this.addTraining(training);
    };
  });


