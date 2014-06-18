/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope, $rootScope, $translate, Article, Lang){
  $scope.articles = Article.all;
  
  $scope.article = Article.new();

  $scope.lang = function() {
    return Lang.current()
  }

  var slug = function(str) {
    var slug = '';
    var trimmed = str.trim();
    slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');
    
    return slug.toLowerCase();
}

  $scope.reset = function (){
    $scope.article = Article.new();
  };

  $scope.save = function (){

    console.log($scope.article);
    console.log($rootScope.currentUser);

    angular.extend($scope.article, {
      author: $rootScope.currentUser,
      slug: slug($scope.article.title_en),
      timestamp: Date.now()
    });

    console.log($scope.article);
    
    Article.create($scope.article).then(function(e){
      console.log(e);
    });
  };

  $scope.publish = function (){
    return Article.publish($scope.article);
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

  $scope.getCurrentLanguage = function () {
    return $translate.use();
  };

});
