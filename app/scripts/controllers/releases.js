/* global app:true */
'use strict';

app.controller('ReleasesCtrl', function($scope, $rootScope, $routeParams, $location, Utils, Release){
  $scope.releases = Release.all;

  $scope.reset = function (){
    $scope.release = Release.new();
  };

  if ($routeParams.id){
    $scope.edit = true
    $scope.release = Release.find($routeParams.id);
  } else {
    $scope.reset();
  }

  $scope.submit = function(r){
    var r = r || $scope.release;

    r = Utils.logUpdate(r);

    Release.create(r).then(function(){
      $scope.reset();
      $location.path('/press/releases');
    });
  };

  $scope.delete = function(r){
    var r = r || $scope.releases;

    Release.delete(r.created_at).then(function(){
      $location.path('/press/releases/new');
    });
  };

  $scope.update = function (release) {
    Release.update(release);
    $location.path('/press/releases');
  };

  $scope.edit = function (release) {
    $location.path('/press/releases/' + release.created_at + '/edit');
  };
});
