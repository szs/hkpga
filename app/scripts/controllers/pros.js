/* global app:true */
'use strict';

app.controller('ProsCtrl', function($scope, User){
  
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

  $scope.filterOptions = {
    pros: [
      {id : 2, name : 'Show All', status: 4 },
      {id : 3, name : 'Qualified Professionals', status: 3 },
      {id : 4, name : 'Certified Instructors', status: 2 },
      {id : 5, name : 'Trainees', status: 1 }
    ]
  };

  $scope.filterItem = {
    pro: $scope.filterOptions.pros[0]
  }
  
  $scope.statusFilter = function (pro) {
    var memberStatus =  {
      'full' : 3,
      'tournament' : 3,
      'associate' : 3,
      'trainer' : 2,
      'trainee' : 1
    }

    if (memberStatus[pro.status] === $scope.filterItem.pro.status) {
      return true;
    } else if ($scope.filterItem.pro.status === 4) {
      return true;
    } else {
      return false;
    }
  };  
});
