/* global app:true */
'use strict';

app.controller('CoverageCtrl', function($scope, $location, Utils, Coverage){

  $scope.coverages = Coverage.all;

  $scope.reset = function (){
    $scope.coverage = Coverage.new();
  };

  $scope.reset()

  $scope.submit = function(c){
    var c = c || $scope.coverage;
    
    c = Utils.logUpdate(c);

    Coverage.create(c).then(function(){
      $scope.reset();
      $location.path('/press/media');
    });
  };
});
