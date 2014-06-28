/* global app:true */
'use strict';

app.controller('ReleasesCtrl', function($scope, $rootScope, $location, PressRelease){
  $scope.releases = PressRelease.all;

  $scope.reset = function (){
    $scope.release = PressRelease.new();
  };

  $scope.reset()

  $scope.submit = function(){

    $scope.release.author = $rootScope.currentUser;

    PressRelease.create($scope.release).then(function(){
      $scope.reset();
      $location.path('#/press/releases');
    });
  };

});
