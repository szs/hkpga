/* global app:true */
'use strict';

app.controller('TournamentsCtrl', function($scope, $location, $routeParams, Utils, Tournament){
  
  $scope.tournaments = Tournament.all;
  
  $scope.reset = function (){
    $scope.tournament = Tournament.new();
  };

  $scope.reset();

  $scope.publish = function(t){
    var t = t || $scope.tournament;

    t = Utils.logUpdate(t);

    t.slug = Utils.slugify(t.name.en);

    $scope.tournaments[t.slug] = t;

    Tournament.create(t).then(function(obj){
      $scope.reset();
      $location.path('/tournaments/'+ t.slug);
    })
  };
});
