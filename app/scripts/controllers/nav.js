/* global app:true */
'use strict';

app.controller('NavCtrl', function ($scope, $translate){

  $scope.getCurrentLanguage = function () {
    return $translate.use();
  };
});