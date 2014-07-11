/* global app:true */
'use strict';

app.controller('ReleasesCtrl', function($scope, $rootScope, $location, Utils, Release){
  $scope.releases = Release.all;

  $scope.reset = function (){
    $scope.release = Release.new();
  };

  $scope.reset()

  $scope.submit = function(r){
    var r = r || $scope.release;

    r = Utils.logUpdate(r);

    Release.create(r).then(function(){
      $scope.reset();
      $location.path('/press/releases');
    });
  };

});
