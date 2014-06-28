/* global app:true */
'use strict';

app.controller('MagazineCtrl', function($scope, $rootScope, $location, Magazine, Lang){

  $scope.magazines = Magazine.all;

  $scope.reset = function (){
    $scope.magazine = Magazine.new();
  };

  $scope.reset()

  $scope.submit = function(){

    $scope.magazine.author = $rootScope.currentUser;

    Magazine.create($scope.magazine).then(function(){
      $scope.reset();
      $location.path('#/magazines');
    });
  };
});
