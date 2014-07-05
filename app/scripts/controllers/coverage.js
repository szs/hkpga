/* global app:true */
'use strict';

app.controller('CoverageCtrl', function($scope, $rootScope, $location, Coverage){

  $scope.coverages = Coverage.all;

  $scope.reset = function (){
    $scope.coverage = Coverage.new();
  };

  $scope.reset()

  $scope.submit = function(){

    $scope.coverage.author = $rootScope.currentUser.username;
    $scope.coverage.updated_at = Date.now();

    Coverage.create($scope.coverage).then(function(){
      $scope.reset();
      $location.path('/press/media');
    });
  };
});
