/* global app:true */
'use strict';

app.controller('PressReleaseCtrl', function($scope, $rootScope, $translate, $window, $location, PressRelease, Lang){
  $scope.releases = PressRelease.all;

  $scope.release = PressRelease.new();
    
  $scope.lang = function() {
    return Lang.current()
  }

  $scope.l10n = function(key, val) {
    return PressRelease.find(key)[val  + '_' + $scope.lang()] ;
  }

  $scope.reset = function (){
    $scope.release = PressRelease.new();
  };

  $scope.submit = function(){

    $scope.release.author = $rootScope.currentUser;

    PressRelease.create($scope.release).then(function(){
      $scope.reset();
      $location.path('#/pressreleases');
    });
  };

  $scope.getCurrentLanguage = function () {
    return $translate.use();
  };

});
