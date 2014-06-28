/* global app:true */
'use strict';

app.controller('ProsCtrl', function($scope, $translate, User, Lang){
  
  $scope.pros = User.all;

  // syncData('users').$bind($scope, 'professionals').then(function() {
  User.all.$bind($scope, 'pros').then(function() {
    var usernames = $scope.pros.$getIndex();
    var alphaPro = {}
    
    angular.forEach(usernames, function(username) {
      var alpha = username[0];
      if (alphaPro.hasOwnProperty(alpha)){
        alphaPro[alpha].push($scope.everyone[username]);
      } else {
        alphaPro[alpha] = [$scope.everyone[username]];
      }
    });

    $scope.alphaPro = alphaPro;

  });

  $scope.lang = function() {
    return Lang.current()
  }

  $scope.getCurrentLanguage = function () {
    return $translate.use();
  };

 });
