/* global app:true */
'use strict';

app.controller('SidebarCtrl', function ($scope, $location, $routeParams, Archive){

  $scope.archives = Archive.all;

  $scope.archives.$on("loaded", function(e) {
    addArchives();
  });

  var menuStructure = {
    news : {},
    about : {
      us : 'Us',
      partners : 'Partners',
      'committee-honorary' : 'Committee & Honorary Members',
    },
    tournaments : {
      merit : 'Order of Merit',
      member : 'Members',
      trainee : 'Trainees'
    },
    pros : {
      directory : 'Directory',
      'training-program'  : 'Training Programme'
    },
    community : {
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

  // $scope.subLevel = {
  //   community : {
  //     'project-skyhigh' : ['news']
  //   }
  // }

  $scope.category = $location.path().split('/')[1]

  $scope.pages = menuStructure[$scope.category]

  var page = $location.path().split('/')[2]

  $scope.page = $scope.pages[page] || page;

  var addArchives = function (){
    var categories = $scope.archives.$getIndex();
    categories.forEach(function(key){
      var years = {};
      $scope.archives[key].forEach(function(i){
          years[i] = i;
        });
      menuStructure[key] = years;
    });
    $scope.pages = menuStructure[$scope.category];
  }

})
