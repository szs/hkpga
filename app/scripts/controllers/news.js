/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope, $routeParams, $location, Utils, Article, Archive){
  
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
  

  $scope.save = function (a){
    var a = a || $scope.article;
    
    a = Utils.logUpdate(a);

    angular.extend(a, {
      slug: Utils.slugify(a.title.en),
      $priority : Date.now(),
      cover: Utils.extractImg(a.html.en),
    });

    var archiveItem = {
      year : new Date(a.publish_date).getFullYear(),
      category : a.category
    }
    Archive.create(archiveItem);
  
    Article.create(a);
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
