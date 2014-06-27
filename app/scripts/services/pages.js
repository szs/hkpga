'use strict';

app.factory('Page', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'pages');
    var pages = $firebase(ref);
 
    var Page = {
      all: pages,
      create : function(page){
        
        pages[page.slug] = page;
        
        pages.$save(page.slug).then(function(){
          console.log('created ' + page.slug);
        });

      },
      current : function(page, cb){
        checkIfPageExists(page, function(d){
          cb(d);
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

    function pageExistsCallback(page, exists) {
      if (exists) {
        console.log(page);
        return page;
      } else {
        console.log(page)
        return Page.new();
      }
    }
     
    // Tests to see if /users/<userId> has any data. 
    function checkIfPageExists(page, cb) {
      ref.child(page).once('value', function(snapshot) {
        cb(snapshot.val());
        // var exists = (snapshot.val() !== null);
        // return pageExistsCallback(snapshot.val(), exists);
      });
    }
  }
)
