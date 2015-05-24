'use strict';

app.factory('Committee',
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'committee');
    var comittees = $firebase(ref);

    var Committee = {
      all: comittees,
      create : function(comittee){

        comittees[comittee.created_at] = comittee;

        return comittees.$save(comittee.created_at).then(function(){
          console.log('Registered ' + comittee.term.en);
        });

      },
      find : function(comitteeId){
        return comittees.$child(comitteeId);
      },
      delete : function(comitteeId){
        return comittees.$remove(comitteeId);
      },
      new : function(){
        return {
          term : {
            'en': '',
            'zh-hk': '',
            'zh-cn': ''
          }
          updated_at: Date.now(),
          created_at: Date.now()
        };
      },
      update : function (comittee){
        comittees[comittee.created_at] = comittee;
        comittees.$save(comittee.created_at);
      }
    };

    return Committee;
})
