'use strict';

app.factory('PressRelease', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'pressreleases');
    var pressreleases = $firebase(ref);
 
    var PressRelease = {
      all: pressreleases,
      create : function(release){
        
        pressreleases[release.timestamp] = release;
        
        return pressreleases.$save(release.timestamp).then(function(){
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
          title_en: '',
          title_zh_hk: '',
          title_zh_cn: '',
          author: '',
          url_en: '',
          url_zh_hk: '',
          url_zh_cn: '',
          timestamp: Date.now()
        };
      }
    };

    return PressRelease;
})
