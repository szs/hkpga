/* global app:true */
'use strict';

app.controller('NewCtrl', function($scope, $routeParams){
  $scope.subview = $routeParams.contentType;
  $scope.subviewurl = 'views/' + $routeParams.contentType + '-new.html';
});
