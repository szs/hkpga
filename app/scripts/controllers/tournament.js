/* global app:true */
'use strict';

app.controller('TournamentCtrl', function($scope, Article){
  $scope.articles = Article.all;
  
  $scope.article = Article.new();

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
