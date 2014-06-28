/* global app:true */
'use strict';

app.controller('NewsArchiveCtrl',
  function($scope, Article){
    $scope.articles = Article.all;
    $scope.years = [2014,2013,2012];
  }
);