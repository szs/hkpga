/* global app:true */
'use strict';

app.controller('NewsArchiveCtrl',
  function($scope, $routeParams, Article, Lang){
    $scope.lang = function() {
      return Lang.current()
    }
    $scope.articles = Article.all;
    $scope.years = [2014,2013,2012];
  }
);