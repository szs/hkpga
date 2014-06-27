/* global app:true */
'use strict';

app.controller('MagazineCtrl', function($scope, $rootScope, $translate, $location, Magazine, Lang){
  $scope.magazines = Magazine.all;

  $scope.magazine = Magazine.new();
    
  $scope.lang = function() {
    return Lang.current()
  }

  $scope.reset = function (){
    $scope.magazine = Magazine.new();
  };

  $scope.submit = function(){

    $scope.magazine.author = $rootScope.currentUser;

    Magazine.create($scope.magazine).then(function(){
      $scope.reset();
      $location.path('#/magazines');
    });
  };


});
