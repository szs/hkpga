/* global app:true */
'use strict';

app.controller('NewCtrl', function($scope, $routeParams, $location){
	var category = $routeParams.contentType || $location.path().split('/')[1]
 	$scope.subview = category;
  	$scope.subviewurl = 'views/' + category + '-new.html';
});
