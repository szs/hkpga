/* global app:true */
'use strict';

app.controller('ProCtrl', function($scope, $translate, $routeParams, User, Lang){
  
  $scope.pro = User.findByUsername($routeParams.username)

});
