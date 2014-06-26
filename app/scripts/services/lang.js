/* global app:true */
'use strict';

app.factory('Lang', function ($firebase, $rootScope, $translate){

  var Lang = {
    current : function () {
      return $translate.use();
    },
    languages : ['en', 'zh-HK', 'zh-CN']
  };

  return Lang;
});
