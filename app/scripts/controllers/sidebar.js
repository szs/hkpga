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
      'about-us' : 'Us',
      partners : 'Partners',
      'committee-honorary' : 'Committee & Honorary Members',
    },
    tournaments : {
      merit : 'Order of Merit'
    },
    honorary : {
      directory : 'Directory',
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
      magazine : 'Magazine'
    },
    contact : {},
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
    if ($scope.category == 'tournaments' && page != 'merit') {
      var categories = $scope.archives.$getIndex();
      categories.forEach(function(key){
        var years = {};
        $scope.archives[key].forEach(function(i){
            years[i] = i;
          });
        menuStructure[key] = years;
      });
      $scope.pages = menuStructure[$scope.category];
    } else if (page == 'merit'){
      var categories = $scope.archives.$getIndex();
      categories.forEach(function(key){
        var years = {};
        // Add links to the static pages which don't have tournament info.
        [2004,2005,2006,2007,2008,2009].forEach(function(i){
            years[page + '/' + i] = i;
        });
        $scope.archives[key].forEach(function(i){
          years[page + '/' + i] = i;
        });
        menuStructure[key] = years;
      });
      $scope.pages = menuStructure[$scope.category];

    } else {
      var categories = $scope.archives.$getIndex();
      categories.forEach(function(key){
        if (key != 'tournaments'){
          var years = {};
          $scope.archives[key].forEach(function(i){
              years['archive/'+ i] = i;
            });
          menuStructure[key] = years;
        }
      });
      $scope.pages = menuStructure[$scope.category];
    }
  }

})
