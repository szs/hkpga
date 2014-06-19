'use strict';

app.factory('Article', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'articles');
    var articles = $firebase(ref);
 
    var Article = {
      all: articles,
      create : function(article){
        
        articles[article.slug] = article;
        
        articles.$save(article.slug).then(function(){
          console.log('published ' + article.slug);
        });

      },
      find : function(articleId){
        return articles.$child(articleId);
      },
      delete : function(articleId){
        return articles.$remove(articleId);
      },
      new : function(){
        return {
          title_en: '',
          title_zh: '',
          slug: '',
          author: '',
          en: '',
          zh: '',
          cover: '',
          draft: true,
          timestamp: Date.now()
        };
      }
    };

    return Article;
})
