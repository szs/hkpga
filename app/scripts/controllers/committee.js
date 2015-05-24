/* global app:true */
'use strict';

app.controller('CommitteeCtrl', function($scope, $location, Committee){

  $scope.committee = Committee.committee;

  $scope.update = function () {
    Committee.update($scope.committee);
    $location.path('/about/committee-honorary');
  };

  $scope.edit = function () {
    $location.path('/about/committee-honorary/edit');
  };

});
