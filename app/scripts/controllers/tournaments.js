/* global app:true */
'use strict';

app.controller('TournamentsCtrl', function($scope, $modal, $rootScope, $q, $timeout, $location, $routeParams, Utils, Tournament, User, Archive){

  $scope.tournaments = Tournament.all;

  $scope.upcoming = Tournament.upcoming;

  $scope.recent = Tournament.recent;

  $scope.divisions = ['open','ladies','senior','trainee'];
  $scope.status = ['signedup','registered','played','cancelled','forfeited','disqualified'];

  $scope.reset = function (){
    $scope.tournament = Tournament.new();
  };

  $scope.tournaments.$on('loaded',function(){
    if ($routeParams.id){
      $scope.edit = true
      angular.forEach($scope.tournaments, function(value, key) {
          if (value.slug == $routeParams.id){
            $scope.tournament = $scope.tournaments[key];
          }
       })

      $scope.mapScoreData();

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

  $scope.mapScoreData = function(){
    var tournamentScores = {}
    var width = $scope.tournament.no_days
    // console.log(width)

    angular.forEach($scope.tournament.results, function(players, division){
      // console.log(players)
      var scores = [];

      angular.forEach(players, function(player, id){
        // console.log(player);

        var scoreRow = {
          name: player.name.en,
          username: player.username
        };

        player.rounds = player.rounds || roundsObj(width);

        angular.forEach(player.rounds, function(score, round){
          // console.log(score)

          this[round] = score;
        }, scoreRow)

        this.push(scoreRow)

      }, scores)

      this[division] = scores

    }, tournamentScores)

    $scope.toScore = tournamentScores;

    var r1 = hasRound(1)
    var r2 = hasRound(2)
    var r3 = hasRound(3)
    var r4 = hasRound(4)

    // $scope.gridOptions = { data: 'toScoreOpen' }
    $scope.gridOptions = {
      open : {  data: 'toScore.open',
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEditOnFocus: true,
                columnDefs: [
                  {field:'name', displayName:'Name', enableCellEdit: false},
                  {field: '1', displayName: 'Round 1', enableCellEdit: true, visible:r1},
                  {field: '2', displayName: 'Round 2', enableCellEdit: true, visible:r2},
                  {field: '3', displayName: 'Round 3', enableCellEdit: true, visible:r3},
                  {field: '4', displayName: 'Round 4', enableCellEdit: true, visible:r4},
                  {field:'username', displayName:'Username', enableCellEdit: false, visible:false}]
            },
      ladies : { data: 'toScore.ladies',
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEditOnFocus: true,
                columnDefs: [
                  {field:'name', displayName:'Name', enableCellEdit: false},
                  {field: '1', displayName: 'Round 1', enableCellEdit: true, visible:r1},
                  {field: '2', displayName: 'Round 2', enableCellEdit: true, visible:r2},
                  {field: '3', displayName: 'Round 3', enableCellEdit: true, visible:r3},
                  {field: '4', displayName: 'Round 4', enableCellEdit: true, visible:r4},
                  {field:'username', displayName:'Username', enableCellEdit: false, visible:false}]
            },
      senior : { data: 'toScore.senior',
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEditOnFocus: true,
                columnDefs: [
                  {field:'name', displayName:'Name', enableCellEdit: false},
                  {field: '1', displayName: 'Round 1', enableCellEdit: true, visible:r1},
                  {field: '2', displayName: 'Round 2', enableCellEdit: true, visible:r2},
                  {field: '3', displayName: 'Round 3', enableCellEdit: true, visible:r3},
                  {field: '4', displayName: 'Round 4', enableCellEdit: true, visible:r4},
                  {field:'username', displayName:'Username', enableCellEdit: false, visible:false}]
            },
      trainee : { data: 'toScore.trainee',
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEditOnFocus: true,
                columnDefs: [
                  {field:'name', displayName:'Name', enableCellEdit: false},
                  {field: '1', displayName: 'Round 1', enableCellEdit: true, visible:r1},
                  {field: '2', displayName: 'Round 2', enableCellEdit: true, visible:r2},
                  {field: '3', displayName: 'Round 3', enableCellEdit: true, visible:r3},
                  {field: '4', displayName: 'Round 4', enableCellEdit: true, visible:r4},
                  {field:'username', displayName:'Username', enableCellEdit: false, visible:false}]
            },
    }
  }

  $scope.calculateRank = function(){
    user.status == 'played'
  }

  $scope.calculatePoints = function(){

  }

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.openModal = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/suddendeath.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.printScore = function(){
    console.log($scope.tournament.results)
    console.log($scope.toScore)
  }

  $scope.getTableStyle= function(division) {
     var rowHeight=30;
     var headerHeight=45;
     return {
        height: ($scope.toScore[division].length * rowHeight + headerHeight) + "px"
     };
  };

  var hasRound = function(round){
    var x = ($scope.tournament.no_days >= round);
    return x;
  }

  var roundsObj = function(days, player){
    var rounds = {};
    var player = player || {};
    for (var i = 0; i < days; i++) {
      rounds[i+1] = parseInt(player[i+1]) || 0
    };
    return rounds;
  }


  $scope.submitScores = function (){

    angular.forEach($scope.toScore,
      function(players, division){
        players.forEach(function(player, index){
          var scores = roundsObj($scope.tournament.no_days, player);
          $scope.tournament.results[division][player.username]['rounds'] = scores;
          $scope.tournament.results[division][player.username]['totalScore'] = Utils.sumObj(scores);
        })
      }
    );

    Tournament.updateResults($scope.tournament)
      .then(function(){
        angular.forEach($scope.tournament.results,
          function(players, division){
            angular.forEach(players,
              function(player, username){
                User.updateResults(player, $scope.tournament)
            })
          })
      })
      .then($scope.printScore)
  }

  $scope.addParticipant = function(t, division, user){
    var t = $scope.tournament;
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

    Utils.nestedObject($scope.tournaments[t.created_at], ['results', division, participant.username], participant);

    $timeout(function() {
      Tournament.addParticipant(t, division, participant)
        .then(function(){
          User.addTournament(user, tournament);
        }).then(function(){
          $scope.tournaments[t.created_at] = t
        })
      });
  }

  $scope.removeParticipant = function(t, division, p){
    delete $scope.tournaments[t.created_at]['results'][division][p.username]
    Tournament.removeParticipant(t, division, p)
      .then(function(){
        User.removeTournament(p, t);
      }).then(function(){
        $scope.tournaments[t.created_at] = t
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

   $scope.delete = function(t){
    var t = t || $scope.tournament;
    Tournament.delete(t.created_at)
      .then(function(){
        $location.path('/admin');
      });
  };

  $scope.nextStatus = function(player, tournament, division){
    var next = ($scope.status.indexOf(player.status) + 1) % $scope.status.length;
    Tournament.updatePlayerStatus(player, tournament, division)
      .then(function(){
        player.status = $scope.status[next];
      })
  }

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
