'use strict';

app.factory('Coverage', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'coverage');
    var coverages = $firebase(ref);
 
    var Coverage = {
      all: coverages,
      create : function(coverage){
        
        coverages[coverage.created_at] = coverage;
        
        return coverages.$save(coverage.created_at).then(function(){
          console.log('Released ' + coverage.title);
        });

      },
      find : function(coverageId){
        return coverages.$child(coverageId);
      },
      delete : function(coverageId){
        return coverages.$remove(coverageId);
      },
      new : function(){
        return {
          title : {
            'en': '',
            'zh-hk': '',
            'zh-cn': ''
          },
          publication : {
            'en': '',
            'zh-hk': '',
            'zh-cn': ''
          },
          url: '',
          cover: '',
          publish_date: Date.now(),
          updated_at: Date.now(),
          created_at: Date.now()
        };
      }
    };

    return Coverage;
})
