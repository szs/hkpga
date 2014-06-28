'use strict';

app.factory('Magazine', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'magazines');
    var magazines = $firebase(ref);
 
    var Magazine = {
      all: magazines,
      create : function(magazine){
        
        magazines[magazine.created_at] = magazine;
        
        return magazines.$save(magazine.created_at).then(function(){
          console.log('magazined ' + magazine.coverstory);
        });

      },
      find : function(magazineId){
        return magazines.$child(magazineId);
      },
      delete : function(magazineId){
        return magazines.$remove(magazineId);
      },
      new : function(){
        return {
          coverstory : {
            'en': '',
            'zh-hk': '',
            'zh-cn': ''
          },
          cover: '',
          url: '',
          author: '',
          updated_at: Date.now(),
          created_at: Date.now()
        };
      }
    };

    return Magazine;
})
