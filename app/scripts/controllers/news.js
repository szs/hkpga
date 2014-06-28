/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope, $rootScope, $location, Article){
  
  $scope.articles = Article.all;

  $scope.article = Article.new();
    
  var getSlug = function(str) {
    var slug = '';
    var trimmed = str.trim();
    slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');
    
    return slug.toLowerCase();
  }

  var getCoverImage = function(html) {
    var regex = /<img.*?src="(.*?)"/;
    try {
      var src = regex.exec(html)[1];
    } catch (e) {
      var src = ""
    }
    return src;
  }

  $scope.reset = function (){
    $scope.article = Article.new();
  };

  $scope.save = function (){

    angular.extend($scope.article, {
      author: $rootScope.currentUser.username,
      slug: getSlug($scope.article.title_en),
      $priority : Date.now(),
      cover: getCoverImage($scope.article.en),
      timestamp: Date.now()
    });
  
    Article.create($scope.article)
  };

  $scope.publish = function (){
    $scope.article.draft = false;
    $scope.save();
    $location.path('news/' + $scope.article.slug);
  };
  
  $scope.submitArticle = function(){
    Article.create($scope.article).then(function(){
      $scope.article = Article.new();
    });
  };

  // $scope.publishArticle = function(articleID){
    // $scope.articles[articleID].draft = false;
    // Articles.update($scope.article);
  // };

  // $scope.retractArticle = function(articleID){
    // $scope.articles[articleID].draft = true;
  // };

  $scope.deleteArticle = function(articleID) {
    Article.delete(articleID);
  };

});
