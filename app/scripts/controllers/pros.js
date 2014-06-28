/* global app:true */
'use strict';

app.controller('ProsCtrl', function($scope, $translate, User, Lang){
  
  $scope.pros = User.all;

  User.all.$bind($scope, 'pros').then(function() {
    var usernames = $scope.pros.$getIndex();
    var alphaPro = {}
    
    angular.forEach(usernames, function(username) {
      var alpha = $scope.pros[username].name.en[0];
      if (alphaPro.hasOwnProperty(alpha)){
        alphaPro[alpha].push($scope.pros[username]);
      } else {
        alphaPro[alpha] = [$scope.pros[username]];
      }
    });

    $scope.alphaPro = alphaPro;

  });
});
