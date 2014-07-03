/* global app:true */
'use strict';

app.controller('SidebarCtrl', function ($scope, $location, $routeParams){

  var menuStructure = {
    news : {},
    about : {
      us : 'About Us',
      partners : 'Partners',
      'committee-honorary' : 'Committee & Honorary Members',
    },
    tournaments : {
      merit : 'Order of Merit',
      member : 'Members',
      trainee : 'Trainees'
    },
    pro : {
      directory : 'Directory',
      'training-program'  : 'Training Programme'
    },
    juniors : {
      'project-skyhigh' : 'Project Skyhigh'  
    },
    events : {},
    press : {
      releases : 'Releases',
      media : 'Media Coverage',
      magazine : 'Magazines'
    }
  }

  var archiveList = {
    news : [],
    tournaments : [
      'merit',
      'member',
      'trainee'
    ],
    events : [],
  }

  var subLevel = {
    juniors : {
      'project-skyhigh' : ['news']
    }
  }

  $scope.category = $location.path().split('/')[1]

  $scope.pages = menuStructure[$scope.category]

  $scope.page = $scope.pages[$location.path().split('/')[2]]
    
})