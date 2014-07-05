/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope, $rootScope, $routeParams, $location, Article, Archive){
  
  $scope.articles = Article.all;
   
  $scope.reset = function (){
    $scope.article = Article.new();
  };

  if ($routeParams.id){
    $scope.article = Article.find($routeParams.id);
  } else {
    $scope.reset();
  }
  
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


  $scope.save = function (){

    angular.extend($scope.article, {
      author: $rootScope.currentUser.username,
      slug: getSlug($scope.article.title.en),
      $priority : Date.now(),
      cover: getCoverImage($scope.article.html.en),
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
