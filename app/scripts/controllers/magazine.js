/* global app:true */
'use strict';

app.controller('MagazineCtrl', function($scope, $location, Utils, Magazine){

  $scope.magazines = Magazine.all;

  $scope.magazines.$on("loaded", function(e) {
    $scope.magazineCount = $scope.magazines.$getIndex().length;
  });

  $scope.reset = function (){
    $scope.magazine = Magazine.new();
  };

  $scope.reset()

  $scope.submit = function(m){
    var m = m || $scope.magazine;

    m = Utils.logUpdate(m);

    Magazine.create(m).then(function(){
      $scope.reset();
      $location.path('/press/magazine');
    });
  };
});
