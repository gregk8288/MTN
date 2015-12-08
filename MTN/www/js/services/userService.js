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

    this.addUser = function(doc) {
      doc.type = 'user';
      return db.post(angular.copy(doc)).then(function(res) {
        doc._rev = res.rev;
        doc._id = res.id;
      });
    };

    this.getUsersTrainings = function(userId) {
      return db.query({
        map: function(doc, emit) {
          if(doc.type === DOCUMENT_TYPE && doc._id === userId) {
            if(doc.trainings) {
              for(var i in doc.trainings){
              var trainingId = doc.trainings[i];
              emit(trainingId,{_id:trainingId});}
            }
          }
        }
      }, { include_docs: true });
    };

    this.addUserTraining = function(user, trainingId) {
      var trainingExists;
      user.trainings = user.trainings || [];
      trainingExists = user.trainings.find(function(existingTrainingId) {
        return existingTrainingId === trainingId;
      });

      if(!trainingExists) {
        user.trainings.push(trainingId);
        return this.addUser(user);
      }

      return $q(function(resolve, reject) {
        reject('Training already been added');
      });
    };
  });


