/* global app:true */
'use strict';

app.controller('ProfessionalsCtrl', function($scope, $translate, User, Lang){
  $scope.professionals = User.all;
  $scope.lang = function() {
    return Lang.current()
  }

  $scope.getCurrentLanguage = function () {
    return $translate.use();
  };

 });
