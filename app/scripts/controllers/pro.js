/* global app:true */
'use strict';

app.controller('ProCtrl', function($scope, $translate, $routeParams, User){
  
  $scope.pro = User.findByUsername($routeParams.username)

});
