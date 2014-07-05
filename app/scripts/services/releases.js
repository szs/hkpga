'use strict';

app.factory('Release', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'releases');
    var releases = $firebase(ref);
 
    var Release = {
      all: releases,
      create : function(release){
        
        releases[release.created_at] = release;
        
        return releases.$save(release.created_at).then(function(){
          console.log('released ' + release.title.en);
        });

      },
      find : function(releaseId){
        return releases.$child(releaseId);
      },
      delete : function(releaseId){
        return releases.$remove(releaseId);
      },
      new : function(){
        return {
          title: {
            "en": "",
            "zh-cn": "",
            "zh-hk": ""
          },
          author: '',
          url :  {
            "en": "",
            "zh-cn": "",
            "zh-hk": ""
          },
          publish_date: Date.now(),
          created_at: Date.now(),
          updated_at: Date.now(),
        };
      }
    };

    return Release;
})
