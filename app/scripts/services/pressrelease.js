'use strict';

app.factory('PressRelease', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'pressreleases');
    var pressreleases = $firebase(ref);
 
    var PressRelease = {
      all: pressreleases,
      create : function(release){
        
        pressreleases[release.created_at] = release;
        
        return pressreleases.$save(release.created_at).then(function(){
          console.log('released ' + release.title_en);
        });

      },
      find : function(releaseId){
        return pressreleases.$child(releaseId);
      },
      delete : function(releaseId){
        return pressreleases.$remove(releaseId);
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
          created_at: Date.now(),
          updated_at: Date.now()
        };
      }
    };

    return PressRelease;
})
