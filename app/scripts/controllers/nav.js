/* global app:true */
'use strict';

app.controller('NavCtrl', function ($scope, $translate, Auth){
  
  $scope.logout = function(){
    Auth.logout();
  };

  $scope.getCurrentLanguage = function () {
    return $translate.use();
  };
});