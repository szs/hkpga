/* global app:true */
'use strict';

app.controller('LangCtrl', function ($scope, $rootScope, $translate) {
 
  $scope.changeLanguage = function (langKey) {
    $rootScope.$broadcast('Lang:changeLanguage', langKey); // $rootScope.$on && $scope.$on
    $translate.use(langKey);
  };

  $rootScope.getCurrentLanguage = function () {
    return $translate.use();
  };
});