/* global app:true */
'use strict';

app.controller('NewsCtrl', function($scope, $q, $routeParams, $location, Utils, Article, Archive){

  $scope.articles = Article.all;

  $scope.reset = function (){
    $scope.article = Article.new();
  };

  if ($routeParams.id){
    $scope.article = Article.find($routeParams.id);
  } else {
    $scope.reset();
  }

  $scope.year = parseInt($routeParams.year) || false;
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

    Article.create(a)
      .then(updateArchives)
      .then(function(){
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

  function updateArchives(){
      var deferred = $q.defer()

      var archiveItem = {
        year : new Date($scope.article.publish_date).getFullYear(),
        category : $scope.article.category
      }

      Archive.create(archiveItem).then(function(){
        deferred.resolve();
      })

      return deferred.promise;
    }


});
