/* global app:true */
'use strict';

app.controller('TournamentsCtrl', function($scope, $modal, $rootScope, $q, $timeout, $location, $routeParams, Utils, Tournament, User, Archive){

  $scope.tournaments = Tournament.all;
  $scope.upcoming = Tournament.upcoming;

  $scope.divisions = ['open','ladies','senior','trainee'];
  $scope.status = ['signedup','registered','played','cancelled','forfeited','disqualified'];

  $scope.category = $location.path().split('/')[1];
  $scope.archiveYear = $location.path().split('/')[2];
  $scope.view = $location.path().split('/')[4];
  $scope.now = Date.now();

  $scope.reset = function (){
    $scope.tournament = Tournament.new();
  };

  $scope.tournaments.$on('loaded',function(){

    angular.forEach($scope.tournaments, function(tournament, created_at){
      tournament.year = new Date(tournament.start_date).getFullYear();
    })

    if ($routeParams.id){
      $scope.edit = true
      angular.forEach($scope.tournaments, function(value, key) {
          if (value.slug == $routeParams.id){
            $scope.tournament = $scope.tournaments[key];
          }
       })
      if ($scope.view =='score'){
        firebase2grid();
        setGridOptions()
      }
    } else {
      $scope.reset();
    }
  })

  var archives = Archive.all;

  archives.$on('loaded', function(){
    if ($scope.archiveYear == 'latest') {
      $scope.archiveYear = archives[$scope.category].sort().reverse()[0];
    } else {
      $scope.archiveYear = parseInt($scope.archiveYear);
    }
  })

  // Points Calculation

  var calculateRank = function(){
    var promises = [];

    angular.forEach($scope.tournament.results, function(players, division){
     var deferred = $q.defer();
      players = Utils.valuesToArray(players);
      orderByRank(
        Utils.sortByKey(players, 'totalScore'), division).then(function(data){
            deferred.resolve(data);
        })

      promises.push(deferred.promise);
    })

    return $q.all(promises);
  }

  var orderByRank = function(scores, division){
    var deferred = $q.defer()

    var playerOrder = [];
    scores.forEach(function(player){
      playerOrder.push(player.username)
    });

    var currentScore = 0
    var currentRank = 0
    var firstPlace = 1
    playerOrder.forEach(function(username, index){
        var usr = $scope.tournament.results[division][username]
        if (usr.totalScore > currentScore){
          currentScore = usr.totalScore;
          currentRank = index + 1;
        } else if (currentRank == 1){
          firstPlace++;
        }
        usr.rank = currentRank;
    })

    var first = playerOrder.slice(0,firstPlace);
    var players = []
    first.forEach(function(username){
      players.push($scope.tournament.results[division][username])
    })
    if (firstPlace > 1){
      resolveTiedFirst(players).then(function(){
        deferred.resolve();
      })
    } else {
      markWinner(players[0])
      deferred.resolve();
    }
    return deferred.promise;
  }

  var resolveTiedFirst = function(players){
    var deferred = $q.defer()

    $scope.tiedFirst = players;
    markRunnerUp(players);
    $scope.openModal('lg').then(
      function(msg){
        $scope.winner = msg.winner;
        markWinner(msg.winner);
        deferred.resolve();
    });

    return deferred.promise;
  }

  var markWinner = function(player){
    player.rank = 1;
    player.isWinner = true;
  }

  var markRunnerUp = function(players){
    players.forEach(function(player){
      player.rank = 2;
      player.isWinner = false;
    })
  }

  var calculatePoints = function(){
    var promises = [];

    angular.forEach($scope.tournament.results, function(players, division){
      var deferred = $q.defer();
      var ranks = []
      angular.forEach(players, function(player, username){
        ranks.push(player.rank);
      })
      angular.forEach(players, function(player, username){
        var split = Utils.countInArray(ranks, player.rank);
        var points = pointsScored(player.rank, $scope.tournament.no_days, split)

        console.log(points)
        player.points = points;
        deferred.resolve();
      })
      promises.push(deferred.promise);
    })

    return $q.all(promises);
  }

  // Modal

  $scope.openModal = function (size) {
    var deferred = $q.defer()

    var modalInstance = $modal.open({
      templateUrl: 'views/suddendeath.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        players: function () {
          return $scope.tiedFirst;
        }
      }
    });

    modalInstance.result
      .then(function (selectedItem) {
        $scope.winner = selectedItem;
        deferred.resolve({ winner: selectedItem });
      }, function () {
        deferred.reject();
      });
      return deferred.promise;
  };

  $scope.printScore = function(){
    console.log($scope.tournament.results)
    console.log($scope.toScore)
  }

  // ng-grid

  var grid2Firebase = function(){
    var promises = [];

    angular.forEach($scope.toScore,
      function(players, division){
        var deferred = $q.defer();
        players.forEach(function(player, index){
          var scores = roundsObj($scope.tournament.no_days, player);
          $scope.tournament.results[division][player.username]['rounds'] = scores;
          $scope.tournament.results[division][player.username]['totalScore'] = Utils.sumObj(scores);
          deferred.resolve();
        });
      promises.push(deferred.promise);
      }
    );

    console.log(promises);
    return $q.all(promises);
  };

  var firebase2grid = function(){
    var tournamentScores = {}
    var width = $scope.tournament.no_days

    angular.forEach($scope.tournament.results, function(players, division){
      var scores = [];
      angular.forEach(players, function(player, id){
        var scoreRow = {
          name: player.name.en,
          username: player.username,
          rank: player.rank,
          points: player.points
        };
        player.rounds = player.rounds || roundsObj(width);

        angular.forEach(player.rounds, function(score, round){
          this[round] = score;
        }, scoreRow)

        this.push(scoreRow)
      }, scores)
      this[division] = scores
    }, tournamentScores);

    $scope.toScore = tournamentScores;
  };

  $scope.getTableStyle= function(division) {
     var rowHeight=30;
     var headerHeight=45;
     return {
        height: ($scope.toScore[division].length * rowHeight + headerHeight) + "px"
     };
  };

  function setGridOptions(){
    var r1 = hasRound(1)
    var r2 = hasRound(2)
    var r3 = hasRound(3)
    var r4 = hasRound(4)
    $scope.tournament.scored

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
                  {field: 'rank', displayName: 'Rank', enableCellEdit: false, visible:$scope.tournament.scored},
                  {field: 'points', displayName: 'Points', enableCellEdit: false, visible:$scope.tournament.scored},
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
                  {field: 'rank', displayName: 'Rank', enableCellEdit: false, visible:$scope.tournament.scored},
                  {field: 'points', displayName: 'Points', enableCellEdit: false, visible:$scope.tournament.scored},
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
                  {field: 'rank', displayName: 'Rank', enableCellEdit: false, visible:$scope.tournament.scored},
                  {field: 'points', displayName: 'Points', enableCellEdit: false, visible:$scope.tournament.scored},
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
                  {field: 'rank', displayName: 'Rank', enableCellEdit: false, visible:$scope.tournament.scored},
                  {field: 'points', displayName: 'Points', enableCellEdit: false, visible:$scope.tournament.scored},
                  {field:'username', displayName:'Username', enableCellEdit: false, visible:false}]
            },
    }
  };

  // tournament helpers

  var hasRound = function(round){
    var x = ($scope.tournament.no_days >= round);
    return x;
  };

  var roundsObj = function(days, player){
    var rounds = {};
    var player = player || {};
    for (var i = 0; i < days; i++) {
      rounds[i+1] = parseInt(player[i+1]) || 0
    };
    return rounds;
  };

  // actions

  $scope.submitScores = function (){
    grid2Firebase()
      .then(calculateRank)
      .then(calculatePoints)
      .then(function(){
      console.log($scope.tournament.results)
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
        .then(function(){
          Tournament.setScored($scope.tournament)
        })
        .then($scope.printScore)
      });
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

  var percentage = [
    15.85,
    10.85,
    6.1,
    4.93,
    4.1,
    3.39,
    2.91,
    2.51,
    2.2,
    1.97,
    1.8,
    1.68,
    1.57,
    1.5,
    1.44,
    1.38,
    1.32,
    1.26,
    1.21,
    1.17,
    1.14,
    1.11,
    1.08,
    1.05,
    1.02,
    0.99,
    0.96,
    0.93,
    0.9,
    0.87,
    0.84,
    0.81,
    0.79,
    0.77,
    0.75,
    0.73,
    0.71,
    0.69,
    0.67,
    0.65,
    0.63,
    0.61,
    0.59,
    0.57,
    0.55
  ];

  var pointsAvailable = function(days){
    return days * 50000;
  }

  var pointsScored = function(rank, days, split){
    var prize = [];

    for (var i = 0; i < split; i++) {
      var r = (rank - 1 + i);
      r = Math.min(Math.max(r, 0), 44)
      prize.push(Math.floor(percentage[r] * pointsAvailable(days) / 100));
    };

    var sum = 0;
    for(var i = 0; i < split; i++){
        sum += prize[i];
    }

    return (sum/split);
  }

});
