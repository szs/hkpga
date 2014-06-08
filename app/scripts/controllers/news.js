/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope, News){
  $scope.articles = News.get()
  $scope.article = {
    title: '',
    body: '',
    draft: true
  };

  $scope.submitArticle = function(){
    News.save($scope.article, function(ref){
      $scope.articles[ref.name] = $scope.article;
      $scope.article = {
        title: '',
        body: '',
        draft: true
      };
    });
  };

  $scope.publishArticle = function(articleID){
    // $scope.articles[articleID].draft = false;
    // News.update($scope.article);
  };

  $scope.retractArticle = function(articleID){
    // $scope.articles[articleID].draft = true;
  };

  $scope.deleteArticle = function(articleID) {
    Post.delete({id: articleID}, function(){
      delete $scope.articles[articleID];
    });
    };

});
