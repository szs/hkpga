/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope){
  $scope.articles = [];
  $scope.article = {
    title: '',
    body: '',
    draft: true
  };

  $scope.submitArticle = function(){
    $scope.articles.push($scope.article);
    $scope.article = {
      title: '',
      body: '',
      draft: true
    };
  };

  $scope.publishArticle = function(index){
    $scope.articles[index].draft = false;
  };

  $scope.retractArticle = function(index){
    $scope.articles[index].draft = true;
  };

  $scope.deleteArticle = function(index) {
      $scope.articles.splice(index, 1);
    };

});
