/* global app:true */
'use strict';

app.controller('TournamentsCtrl', function($scope, $q, $location, $routeParams, Utils, Tournament, User, Archive){
  
  $scope.tournaments = Tournament.all;
  
  $scope.upcoming = Tournament.upcoming;

  $scope.recent = Tournament.recent;
  
  $scope.divisions = ['open','ladies','senior','trainee'];

  $scope.reset = function (){
    $scope.tournament = Tournament.new();
  };

  $scope.tournaments.$on('loaded',function(){
    if ($routeParams.id){
      angular.forEach($scope.tournaments, function(value, key) {
          if (value.slug == $routeParams.id){
            $scope.tournament = $scope.tournaments[key];
          }
       })
    } else {
      $scope.reset();
    } 
  })

  $scope.category = $location.path().split('/')[1];
  $scope.view = $location.path().split('/')[2];
  $scope.year = $location.path().split('/')[3];
  $scope.now = Date.now();

  var archives = Archive.all;
  archives.$on('loaded', function(){
    if ($scope.year == 'latest') {
      $scope.year = archives[$scope.category].sort().reverse()[0];
    } else {
      $scope.year = parseInt($scope.year);
    }
  })

  $scope.addParticipant = function(t, division, user){
    var t = t || $scope.tournament;
    var user = user.originalObject;

    var participant = {
      status : 'signedup',
      isEligable : User.isEligable(user),
      name : user.name,
      username : user.username,
    }

    var tournament = {
        year : new Date(t.start_date).getFullYear(),
        id : t.start_date,
    }

    Tournament.addParticipant(t, division, participant)
      .then(function(){
        User.addTournament(user, tournament);
      })
  }

  $scope.publish = function(t){
    var t = t || $scope.tournament;

    
    // t.start_date = Date.parse(t.start_date);
    // t.signup_before = Date.parse(t.signup_before);

    t = Utils.logUpdate(t);

    t.slug = Utils.slugify(t.name.en);
    t.$priority = t.start_date;

    $scope.tournaments[t.created_at] = t;

    Tournament.create(t)
      .then(updateArchives)
      .then(function(){
        $scope.reset();
        $location.path('/tournaments/'+ t.slug);})
  };


  function updateArchives(){
    var deferred = $q.defer()

    var archiveItem = {
      year : new Date($scope.tournament.start_date).getFullYear(),
      category : 'tournaments'
    }
        
    Archive.create(archiveItem).then(function(){
      deferred.resolve();
    })

    return deferred.promise;
  }

});
