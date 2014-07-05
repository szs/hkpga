/* global app:true */
'use strict';

app.controller('MagazineCtrl', function($scope, $rootScope, $location, Magazine){

  $scope.magazines = Magazine.all;

  $scope.magazines.$on("loaded", function(e) {
    $scope.magazineCount = $scope.magazines.$getIndex().length;
  });

  $scope.reset = function (){
    $scope.magazine = Magazine.new();
  };

  $scope.reset()

  $scope.submit = function(){

    $scope.magazine.author = $rootScope.currentUser.username;
    $scope.magazine.updated_at = Date.now();

    Magazine.create($scope.magazine).then(function(){
      $scope.reset();
      $location.path('/press/magazine');
    });
  };
});
