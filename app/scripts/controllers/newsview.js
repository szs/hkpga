/* global app:true */
'use strict';

app.controller('NewsViewCtrl',
  function($scope, $routeParams, Article, Lang){
    $scope.lang = function() {
      return Lang.current()
    }
    $scope.article = Article.find($routeParams.articleId);
  }
);