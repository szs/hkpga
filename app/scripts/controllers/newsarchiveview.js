/* global app:true */
'use strict';

app.controller('NewsArchiveViewCtrl',
  function($scope, $routeParams, Article){
    $scope.articles = Article.all;
    $scope.years = [2014,2013,2012,2011,2010,2009,2008];
  }
);