/* global app:true */
'use strict';

app.controller('MagazineCtrl', function($scope, $location, $routeParams, Utils, Magazine){

  $scope.magazines = Magazine.all;

  $scope.magazines.$on("loaded", function(e) {
    $scope.magazineCount = $scope.magazines.$getIndex().length;
  });

  $scope.reset = function (){
    $scope.magazine = Magazine.new();
  };

  if ($routeParams.id){
    $scope.edit = true
    $scope.magazine = Magazine.find($routeParams.id);
  } else {
    $scope.reset();
  }

  $scope.submit = function(m){
    var m = m || $scope.magazine;

    m = Utils.logUpdate(m);

    Magazine.create(m).then(function(){
      $scope.reset();
      $location.path('/press/magazine');
    });
  };

  $scope.delete = function(m){
    var m = m || $scope.magazine;

    Magazine.delete(m.created_at).then(function(){
      $location.path('/press/magazine/new');
    });
  };

  $scope.update = function (magazine) {
    Magazine.update(magazine);
    $location.path('/press/magazine');
  };

  $scope.edit = function (magazine) {
    $location.path('/press/magazine/' + magazine.created_at + '/edit');
  };

});
