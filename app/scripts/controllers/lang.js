/* global app:true */
'use strict';

app.controller('LangCtrl', ['$translate', '$scope', function ($translate, $scope) {
 
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
 
}]);