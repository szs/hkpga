'use strict';

app.factory('Article', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'articles');
    var articles = $firebase(ref);

    var slug = function(str) {
      var slug = '';
      var trimmed = str.trim();
      slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
        replace(/-+/g, '-').
        replace(/^-|-$/g, '');
      
      return slug.toLowerCase();
  }


    
    var Article = {
      all: articles,
      create : function(article){
        
        articles[article.slug] = article;
        
        articles.$save(article.slug).then(function(){
          console.log('published ' + article.slug);
        });

      },
      publish : function(article){
        
        angular.extend(article, {
          draft: false
        });

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
          slug: '',
          author: '',
          en: '',
          zh: '',
          cover: 'http://www.decoco.co/wp/wp-content/uploads/2013/06/surrey-national-golf-club-placeholder.jpeg',
          draft: true,
          timestamp: Date.now()
        };
      }
    };


    return Article;
})
