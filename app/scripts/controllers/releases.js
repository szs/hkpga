/* global app:true */
'use strict';

app.controller('ReleasesCtrl', function($scope, $rootScope, $location, Release){
  $scope.releases = Release.all;

  $scope.reset = function (){
    $scope.release = Release.new();
  };

  $scope.reset()

  $scope.submit = function(){

    $scope.release.author = $rootScope.currentUser;

    Release.create($scope.release).then(function(){
      $scope.reset();
      $location.path('#/press/releases');
    });
  };

});
