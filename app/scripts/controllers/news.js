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


  if ($scope.year == 'latest'){
    var archives = Archive.all;
    archives.$on('loaded', function(){
      $scope.year = archives[$scope.category].sort().reverse()[0];
    })
  }

  $scope.save = function (a, cb){
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

    Article.create(a).then(function(){
        console.log('published ' + a.slug);
        if (cb){
          cb();
        }
      });
  };

  $scope.publish = function (a){
    var a = a || $scope.article;

    a.draft = false;
    $scope.save(a, function(){
      $scope.reset();
    });
    // $location.path(a.category + '/' + a.slug);
  };

  $scope.delete = function(articleID) {
    Article.delete(articleID);
  };

});
