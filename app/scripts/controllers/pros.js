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
      {id : 2, name : 'All', status: 4 },
      {id : 3, name : 'Qualified Professionals', status: 3 },
      {id : 4, name : 'Certified Instructors', status: 2 },
      {id : 5, name : 'Trainees', status: 1 }
    ],
    committee: [
      {value : false, name : 'No'},
      {value : 'chairperson', name : 'Chairman'},
      {value : 'vice-chairperson', name : 'Vice Chairman'},
      {value : 'captain-open', name : 'Captain Open'},
      {value : 'vice-captain-open', name : 'Vice Captain Open'},
      {value : 'captain-senior', name : 'Senior Captain'},
      {value : 'vice-captain-senior', name : 'Vice Senior Captain'},
      {value : 'captain-ladies', name : 'Ladies Captain'},
      {value : 'vice-captain-ladies', name : 'Vice Ladies Captain'},
      {value : 'committee', name : 'Committee'},
      {value : 'treasurser', name : 'Honorary Treasurer'},
    ],
    honorary: [
      {value : false, name : 'No'},
      {value : 'founder', name : 'Founder'},
      {value : 'permanent-honorary-president', name : 'Permanent Honorary President'},
      {value : 'honorary-president', name : 'Honorary President'},
      {value : 'honorary-vice-president', name : 'Honorary Vice President'},
      {value : 'legal-advisor', name : 'Legal Advisor'},
      {value : 'advisor', name : 'Advisor'},
      {value : 'advisor-constitution', name : 'Advisor Constitution'},
      {value : 'honorary-member', name : 'Honorary Member'},
      {value : 'founder-member', name : 'Founder Member'},
    ],
  };

  $scope.filterItem = {
    pro: $scope.filterOptions.pros[0]
  }
  
  $scope.statusFilter = function (pro) {
    var memberStatus =  {
      'full' : 3,
      'tournament' : 3,
      'associate' : 3,
      'member' : 3,
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
