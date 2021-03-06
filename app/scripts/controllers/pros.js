/* global app:true */
'use strict';

app.controller('ProsCtrl', function($scope, $filter, $location, $routeParams, User){

  $scope.pros = User.all;

  $scope.category = $location.path().split('/')[1];
  $scope.view = $location.path().split('/')[2];
  $scope.action = $location.path().split('/')[3];
  $scope.action = $location.path().split('/')[4] || $scope.action;

  if ($routeParams.id){
      $scope.edit = true
      $scope.user = User.findByUsername($routeParams.id)
      $scope.pro = $scope.user;
  }

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

  if ($scope.action == 'checklist'){
    $scope.pros.$on('loaded',function(){
      var nonHonorary = []

      angular.forEach($scope.pros, function(pro, username) {
        if (pro.relation != 'honorary' && username.charAt(0) !== '$'){
          nonHonorary.push(pro)
        }
      });

      nonHonorary.forEach(function(e){
        e['name_en'] = e.name['en'];
        e['name_hk'] = e.name['zh-hk'];
        e['name_ch'] = e.name['zh-cn'];
      });
      $scope.done = nonHonorary;
    });
  }

  $scope.filterOptions = {
    pros: [
      {id : 2, name : 'All', status: 4 },
      {id : 3, name : 'Qualified Professionals', status: 3 },
      {id : 4, name : 'Certified Instructors', status: 2 },
      {id : 5, name : 'Trainees', status: 1 }
    ],
    committee: [
      {value : false, name : 'No'},
      {value : 'CHAIRPERSON', name : 'Chairman'},
      {value : 'VICECHAIRPERSON', name : 'Vice Chairman'},
      {value : 'CAPTAINOPEN', name : 'Captain Open'},
      {value : 'VICECAPTAINOPEN', name : 'Vice Captain Open'},
      {value : 'CAPTAINSENIOR', name : 'Senior Captain'},
      {value : 'VICECAPTAINSENIOR', name : 'Vice Senior Captain'},
      {value : 'CAPTAINLADIES', name : 'Ladies Captain'},
      {value : 'VICECAPTAINLADIES', name : 'Vice Ladies Captain'},
      {value : 'COMMITTEE', name : 'Committee'},
      {value : 'TREASURER', name : 'Honorary Treasurer'},
    ],
    honorary: [
      {value : false, name : 'No'},
      {value : 'FOUNDER', name : 'Founder'},
      {value : 'PERMANENTHONORARYPRESIDENT', name : 'Permanent Honorary President'},
      {value : 'HONORARYPRESIDENT', name : 'Honorary President'},
      {value : 'HONORARYVICEPRESIDENT', name : 'Honorary Vice President'},
      {value : 'LEGALADVISOR', name : 'Legal Advisor'},
      {value : 'ADVISOR', name : 'Advisor'},
      {value : 'ADVISORCONSTITUTION', name : 'Advisor Constitution'},
      {value : 'HONORARYMEMBER', name : 'Honorary Member'},
      {value : 'FOUNDERMEMBER', name : 'Founder Member'},
    ],
    roles : [
      {value : 'admin', name : 'Admin'},
      {value : 'member', name : 'Member'},
      {value : 'user', name : 'User'},
      {value : 'legacy', name : 'Legacy'},
    ],
    relations : [
      {value : 'full', name : 'Full Member'},
      {value : 'tournament', name : 'Tournament Member'},
      {value : 'associate', name : 'Associate Member'},
      {value : 'member', name : 'Member'},
      {value : 'trainer', name : 'Certified Trainer'},
      {value : 'trainee', name : 'Trainee'},
      {value : 'seniortrainee', name : 'Senior Division Trainee'},
      {value : 'honorary', name : 'Honorary'},
      {value : 'none', name : 'None'},
    ]
  };

  $scope.filterItem = {
    pro: $scope.filterOptions.pros[0]
  }

  $scope.statusFilter = function (pro) {
    var memberRelationStatus =  {
      'full' : 3,
      'tournament' : 3,
      'associate' : 3,
      'member' : 3,
      'trainer' : 2,
      'trainee' : 1,
      'seniortrainee' : 1,
      'honorary' : 0,
      'none' : 0,
    }

    if (memberRelationStatus[pro.relation] === $scope.filterItem.pro.status) {
      return true;
    } else if ($scope.filterItem.pro.status === 4) {
      return true;
    } else {
      return false;
    }
  };

  $scope.listed = function() {
    return function( pro ) {
      var entrants = ['full', 'tournament', 'associate', 'member', 'trainer', 'trainee', 'seniortrainee']
      return entrants.indexOf(pro.relation) > -1
    };
  };

});
