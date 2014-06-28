'use strict';

app.factory('Page', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'pages');
    var pages = $firebase(ref);
 
    function checkIfPageExists(page, cb) {
      ref.child(page).once('value', function(snapshot) {
        cb(snapshot.val());
      });
    }

    var Page = {
      all: pages,
      create : function(page){
        pages[page.slug] = page;
        pages.$save(page.slug).then(function(){
          console.log('created ' + page.slug);
        });

      },
      current : function(page, cb){
        return checkIfPageExists(page, function(result){
          cb(result);
        });
      },
      find : function(pageId){
        return pages.$child(pageId);
      },
      delete : function(pageId){
        return pages.$remove(pageId);
      },
      new : function(){
        return {
          title : {
            'en': '',
            'zh-hk': '',
            'zh-cn': ''
          },
          category: '',
          slug: '',
          author: '',
          html: {
            'en': '',
            'zh-hk': '',
            'zh-cn': ''
          },
          timestamp: Date.now()
        };
      }
    };

    return Page;
     
  }
)
