/* global app:true */
'use strict';

app.controller('MembersCtrl', function($scope, $translate, User, Lang){
  $scope.members = User.all;
  $scope.lang = function() {
    return Lang.current()
  }

  $scope.getCurrentLanguage = function () {
    return $translate.use();
  };

 });
