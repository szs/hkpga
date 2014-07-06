/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope, $rootScope, $routeParams, $location, Utils, Article, Archive){
  
  $scope.articles = Article.all;
   
  $scope.reset = function (){
    $scope.article = Article.new();
  };

  if ($routeParams.id){
    $scope.article = Article.find($routeParams.id);
  } else {
    $scope.reset();
  }

  $scope.year = $routeParams.year || false;
  $scope.category = $location.path().split('/')[1];
  

  $scope.save = function (){

    angular.extend($scope.article, {
      author: $rootScope.currentUser.username,
      slug: Utils.slugify($scope.article.title.en),
      $priority : Date.now(),
      cover: Utils.extractImg($scope.article.html.en),
      updated_at: Date.now()
    });

    var archiveItem = {
      year : new Date($scope.article.publish_date).getFullYear(),
      category : $scope.article.category
    }
    Archive.create(archiveItem);
  
    Article.create($scope.article);
  };

  $scope.publish = function (){
    $scope.article.draft = false;
    $scope.save();
    $location.path($scope.article.category + '/' + $scope.article.slug);
  };
  
  $scope.delete = function(articleID) {
    Article.delete(articleID);
  };

});
