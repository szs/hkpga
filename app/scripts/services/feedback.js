'use strict';

app.factory('Feedback',
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'feedback');
    var feedback = $firebase(ref);

    var Archive = {
      all: feedback,
      create : function(fb){

        feedback[fb.created_at] = fb;

        feedback.$save(fb.created_at).then(function(){
          // console.log('Feedback delivered on ' + fb.created_at);
        });

      },
      find : function(fb){
        return feedback.$child(fb);
      },
      delete : function(fbID){
        return feedback.$remove(fbID);
      },
      new : function(){
        return {
          text : '',
          updated_at: Date.now(),
          created_at: Date.now()
        };
      }
    };

    return Archive;
})
