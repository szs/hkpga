/* global app:true */
'use strict';

app.controller('NewsViewCtrl',
  function($scope, $routeParams, Article){
    $scope.article = Article.find($routeParams.articleId);
  }
);