/* global app:true */
'use strict';

app.controller('NewCtrl', function($scope, $routeParams, $location){
	var category = $routeParams.contentType || $location.path().split('/')[1];
  if (category == 'press'){
    category = $location.path().split('/')[2];
  }
  console.log(category)
 	$scope.subview = category;
  $scope.subviewurl = 'views/' + category + '-new.html';
  console.log($scope.subviewurl)
});
