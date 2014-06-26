/* global app:true */
'use strict';

app.controller('NewsArchiveViewCtrl',
  function($scope, $routeParams, Article, Lang){
    $scope.lang = function() {
      return Lang.current()
    }
    $scope.articles = Article.all;
    $scope.years = [2014,2013,2012,2011,2010,2009,2008];
  }
);