'use strict';

app.factory('Archive', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'archives');
    var archives = $firebase(ref);

    var Archive = {
      all: archives,
      create : function(archive){
        archives[archive.category]

        if (!archives.hasOwnProperty(archive.category)) {
          archives[archive.category] = [];
        }

        if (archives[archive.category].indexOf(archive.year) == -1) {
          archives[archive.category].push(archive.year);
          return archives.$save(archive.category).then(function(){
            console.log('Added ' + archive.year + ' to ' + archive.category);
          });
        } else {
          return false;
        }
      },
      find : function(category){
        return archives.$child(category);
      },
      delete : function(category){
        return archives.$remove(category);
      },
      new : function(){
        return {
          category : '',
          year: 2014
        };
      }
    };

    return Archive;
})