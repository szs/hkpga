'use strict';

app.factory('Article', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'articles');
    var articles = $firebase(ref);
    
    var Article = {
      all: articles,
      create : function(article){
        return articles.$add(article);
      },
      find : function(articleId){
        return articles.$child(articleId);
      },
      delete : function(articleId){
        return articles.$remove(articleId);
      },
      new : function(){
        return {
          title: '',
          body: '',
          draft: true,
          timestamp: Date.now()
        };
      }
    };
    
    return Article;
})
