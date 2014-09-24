/* global app:true */
'use strict';

app.controller('CoverageCtrl', function($scope, $routeParams, $location, Utils, Coverage){

  $scope.coverages = Coverage.all;


  $scope.reset = function (){
    $scope.coverage = Coverage.new();
  };

  if ($routeParams.id){
    $scope.edit = true
    $scope.coverage = Coverage.find($routeParams.id);
  } else {
    $scope.reset();
  }

  $scope.submit = function(c){
    var c = c || $scope.coverage;

    c.publish_date = Utils.unixEpoch(c.publish_date);

    Coverage.create(c).then(function(){
      $scope.reset();
      $location.path('/press/media');
    });
  };

  $scope.delete = function(c){
    var c = c || $scope.coverage;

    Coverage.delete(c.created_at).then(function(){
      $location.path('/press/media/new');
    });
  };

  $scope.update = function (coverage) {
    coverage.publish_date = Utils.unixEpoch(coverage.publish_date);
    Coverage.update(coverage);
    $location.path('/press/media');
  };

  $scope.edit = function (coverage) {
    $location.path('/press/media/' + coverage.created_at + '/edit');
  };


});
