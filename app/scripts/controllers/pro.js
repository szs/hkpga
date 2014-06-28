/* global app:true */
'use strict';

app.controller('ProCtrl', function($scope, $routeParams, User){
  $scope.pro = User.findByUsername($routeParams.username)
});
