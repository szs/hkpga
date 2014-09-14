/* global app:true */
'use strict';

app.controller('LangCtrl', function ($scope, $rootScope, $translate) {
 
  var fallback = {
    "zh-hk" : "en",
    "zh-cn" : "en",
    "en" : "zh-hk"
  }

  $scope.changeLanguage = function (langKey) {
    $rootScope.$broadcast('Lang:changeLanguage', langKey); // $rootScope.$on && $scope.$on
    $translate.use(langKey);
  };

  $rootScope.l10n = function (langObj) {
    if (langObj[$translate.use()] == ""){
      return langObj[fallback[$translate.use()]];
    } else {
      return langObj[$translate.use()];
    }
  };

  $rootScope.currentLanguage = function(){
    return $translate.use();
  }

});
