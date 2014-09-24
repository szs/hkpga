  /* global app:true */
'use strict';

app.controller('TournamentsCtrl', function($scope, $modal, $filter, $rootScope, $q, $timeout, $location, $routeParams, Utils, Tournament, User, Archive){

  $scope.tournaments = Tournament.all;

  $scope.pros = User.all;

  $scope.divisions = ['open','ladies','senior','trainee'];
  $scope.status = ['signedup','registered','played','retired','withdrawn','missedcut','disqualified','weathercancel'];

  $scope.category = $location.path().split('/')[1];
  $scope.archiveYear = $location.path().split('/')[2];
  $scope.view = $location.path().split('/')[4];
  $scope.action = $location.path().split('/')[5];
  $scope.now = Date.now();

  $scope.reset = function (){
    $scope.tournament = Tournament.new();
  };

  // Load & Route Logic

  $scope.tournaments.$on('loaded',function(){

    angular.forEach($scope.tournaments, function(tournament, created_at){
      if (created_at[0] != '$'){
        tournament.year = new Date(tournament.start_date).getFullYear();
      }
    })

    if ($routeParams.id){
      $scope.edit = true;
      angular.forEach($scope.tournaments, function(value, key) {
        if (key[0] != '$'){
          if (value.slug == $routeParams.id){
            $scope.tournament = $scope.tournaments[key];
          }
        }
       })
      if ($scope.view =='score'){
        firebase2grid();
        setGridOptions();
      }
      if ($scope.view =='prizemoney'){
        money2grid();
        setGridMoneyOptions();
      }
    } else if ($scope.archiveYear == 'merit' || $scope.category == ""){
      $scope.archiveYear = $location.path().split('/')[3];
      if ($scope.archiveYear == 'latest' || $scope.category == "") {
        $scope.archiveYear = archives['tournaments'].sort().reverse()[0];
      } else {
        $scope.archiveYear = parseInt($scope.archiveYear);
      }
      calculateMerit();
      setGridMeritOptions();
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
        Utils.sortByKey(players, 'totalScore'), division, 'rank').then(function(data){
            deferred.resolve(data);
        })

      promises.push(deferred.promise);
    })

    return $q.all(promises);
  }

  var calculateShadowRank = function(){
    var promises = [];

    angular.forEach($scope.tournament.results, function(players, division){
      var deferred = $q.defer();
      players = Utils.valuesToArray(players);
      var eligiblePlayers = [];

      players.forEach(function(user,i){
        if (User.isEligable($scope.pros[user.username])){
          eligiblePlayers.push(user)
        } else {
          user.shadowRank = '-';
        }
      })
      orderByRank(
        Utils.sortByKey(eligiblePlayers, 'totalScore'), division, 'shadowRank').then(function(data){
            deferred.resolve(data);
        })


      promises.push(deferred.promise);
    })

    return $q.all(promises);
  }

  var orderByRank = function(scores, division, key){
    var deferred = $q.defer()

    var playerOrder = [];
    scores.forEach(function(player){
      playerOrder.push(player.username)
    });

    var currentScore = 0;
    var currentRank = 0;
    var firstPlace = 1;
    var userRank = 0;
    playerOrder.forEach(function(username, index){
      var usr = $scope.tournament.results[division][username]
      if (typeof usr.totalScore === 'string'){
        userRank = usr.totalScore;
      }

      else if (usr.totalScore > currentScore){
        currentScore = usr.totalScore;
        currentRank = index + 1;
        userRank = currentRank;
      } else if (currentRank == 1){
        firstPlace++;
        userRank = currentRank;
      }
      usr[key] = userRank;
    })

    var first = playerOrder.slice(0,firstPlace);
    var players = [];
    first.forEach(function(username){
      players.push($scope.tournament.results[division][username])
    })
    if (firstPlace > 1){
      resolveTiedFirst(players).then(function(){
        deferred.resolve();
      })
    } else {
      markWinner(players[0]);
      deferred.resolve();
    }
    return deferred.promise;
  }

  var orderMeritByRank = function(points){
    var currentPoints = 1000000
    var currentRank = 0
    var scale = points;
    scale.forEach(function(user, index){
        if (parseInt(user.points) < currentPoints){
          currentPoints = user.points;
          currentRank = index + 1;
        }
        user.rank = currentRank;
        scale[index]['rank'] = currentRank;
    })
    return scale;
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
      var ranks = [];
      angular.forEach(players, function(player, username){
        ranks.push(player.shadowRank);
      })
      angular.forEach(players, function(player, username){
        if (player.shadowRank == '-'){
          var points = 0;
        } else {
          var split = Utils.countInArray(ranks, player.shadowRank);
          var rawPoints = pointsScored(player.shadowRank, $scope.tournament.no_days, split);
          var points = Math.round(rawPoints * 10) / 10;
        }

        player.points = points;
        deferred.resolve();
      })
      promises.push(deferred.promise);
    })

    return $q.all(promises);
  }

  // Merit

  var calculateMerit = function(){
    var merit = {};

    $scope.divisions.forEach(function (division) {
      var meritSum = {}
      merit[division] = []
      angular.forEach($scope.pros, function(pro, username){
        if (username[0] != '$'){
          if (pro.hasOwnProperty('results') && pro['results'].hasOwnProperty($scope.archiveYear)){
            angular.forEach(pro['results'][$scope.archiveYear], function(result, tournament){
              if (result.hasOwnProperty('points') && result['points'] > 0 && result.hasOwnProperty('division') && result['division'] == division) {
                if (meritSum.hasOwnProperty(username)) {
                  meritSum[username].points += result.points;
                } else {
                  meritSum[username] = meritObj(result, username, pro);
                }
              }
            });
          };
        };
      });

      merit[division].push($filter('orderByPriority')(meritSum));
      var order = Utils.sortByKey(merit[division][0], 'points').reverse()
      merit[division] = orderMeritByRank(order)
    });

    $scope.merit = merit;

  };

  var meritObj = function(result, username, pro){
    return {
        points: result.points,
        username: username,
        name: pro.name,
        getName : function () {
          return $rootScope.l10n(this.name);
        },
        getPoints : function () {
          var points = this.points | 0;
          return points;
        }
     };
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

  // ng-grid Scores

  var firebase2grid = function(){
    var tournamentScores = {}
    var width = $scope.tournament.no_days;

    angular.forEach($scope.tournament.results, function(players, division){
      var scores = [];
      angular.forEach(players, function(player, id){
        var scoreRow = {
          name: player.name,
          username: player.username,
          rank: player.rank,
          status: player.status,
          points: player.points,
          totalScore: player.totalScore,
          relation: $scope.pros[player.username].relation,
          active: player.active,
          getName: function () {
            return $rootScope.l10n(this.name);
          }
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

  var grid2Firebase = function(){
    var promises = [];

    angular.forEach($scope.toScore,
      function(players, division){
        var deferred = $q.defer();
        players.forEach(function(player, index){
          var scores = roundsObj($scope.tournament.no_days, player);
          $scope.tournament.results[division][player.username]['rounds'] = scores;
          $scope.tournament.results[division][player.username]['totalScore'] = Utils.sumObjOrStr(scores);
          deferred.resolve();
        });
      promises.push(deferred.promise);
      }
    );

    return $q.all(promises);
  };

  var ScoreGrid = function(division){
    var columnDefs = [{field:'getName()', displayName:'Name', width: "**", enableCellEdit: false}];

    columnDefs = columnDefs.concat(RoundSubGrid($scope.tournament.no_days));

    columnDefs = columnDefs.concat([
      {field:'totalScore', displayName:'Total Score', width: "*", enableCellEdit: false, visible:$scope.tournament.scored, sortFn: alphanumericSortFN},
      {field:'rank', displayName:'Rank', width: "*", enableCellEdit: false, visible:$scope.tournament.scored, sortFn: alphanumericSortFN},
      {field:'points', displayName:'Points', width: "*", enableCellEdit: false, visible:$scope.tournament.scored, sortFn: alphanumericSortFN},
      {field:'relation', displayName:'Relation', width: "*", enableCellEdit: false, visible:false},
      {field:'username', displayName:'Username', width: "*", enableCellEdit: false, visible:false}
    ])

    return {
      data: 'toScore.' + division,
      enableCellSelection: true,
      enableRowSelection: false,
      enableCellEditOnFocus: true,
      rowTemplate:'<div style="height: 100%" ng-class="row.getProperty(\'relation\')"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                  '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                  '<div ng-cell></div>' +
                  '</div></div>{{row}}',
      columnDefs: columnDefs,
      sortInfo: {fields: ['rank','getName()'],directions:['asc','asc']},
      noTabInterference: true
    }
  }

  var setGridOptions = function(){
    $scope.gridOptions = {
      open : ScoreGrid('open'),
      ladies : ScoreGrid('ladies'),
      senior : ScoreGrid('senior'),
      trainee : ScoreGrid('trainee'),
    }
  }

  var RoundSubGrid = function(days){
    var rounds = [];
    for (var i = 1; i <= days; i++) {
      rounds.push({field: '' + i, displayName: 'Round ' + i, enableCellEdit: isAdmin(), sortFn: alphanumericSortFN})
    };
    return rounds;
  };

  var isAdmin = function(){
    return $rootScope.hasOwnProperty('currentUser') && $rootScope.currentUser.role == 'admin';
  }

    // custom sort
  var alphanumericSortFN = function(a,b){
    var isAString = typeof a === 'string' || b === undefined;
    var isBString = typeof b === 'string' || a === undefined;
    if (isAString && isBString){
      return 0;
    } else if (isAString){
      return 1;
    } else if (isBString){
      return -1;
    }
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

    // data Object

  var roundsObj = function(days, player){
    var rounds = {};
    var player = player || {};
    for (var i = 0; i < days; i++) {
      var score = parseInt(player[i+1]) || 0;
      if (player.hasOwnProperty('status') && (score === 0 || typeof score === 'string')){
        score = statusMap[player.status];
      }
      rounds[i+1] = score;
    };
    return rounds;
  };

  // Participant Tournament Status

  var statusMap = {
    'signedup':'NP',
    'registered':'NP',
    'played':0,
    'retired':'RTD',
    'withdrawn':'WD',
    'missedcut':'MC',
    'disqualified':'DQ',
    'weathercancel':'WC'
  }

  // ng-grid Money

  var money2grid = function(){
    var prizePots = {}

    if (!$scope.tournament.hasOwnProperty('prize_money')){
      $scope.tournament['prize_money'] = {};
      angular.forEach($scope.tournament.divisions, function(hasDivision, division){
        if (hasDivision){
          $scope.tournament.prize_money[division] = moneyObj(10);
        }
      })
    }

    angular.forEach($scope.tournament.prize_money, function(prizes, division){
      var prizeGrid = [];
      angular.forEach(prizes, function(prize, rank){
        var prizeRow = {
          rank: rank,
          prize: prize,
        };
        this.push(prizeRow)
      }, prizeGrid)
      this[division] = prizeGrid;
    }, prizePots);

    $scope.money = prizePots;
  };

  var money2Firebase = function(){
    var promises = [];

    angular.forEach($scope.money,
      function(prizes, division){
        var deferred = $q.defer();
        prizes.forEach(function(prize){
          $scope.tournament.prize_money[division][prize.rank] = parseInt(prize.prize);
          deferred.resolve();
        });
      promises.push(deferred.promise);
      }
    );

    return $q.all(promises);
  };

  $scope.addMoneyRow = function(division) {
      var lastRank = parseInt($scope.money[division][parseInt($scope.money[division].length) -1].rank);
      $scope.money[division].push({rank: lastRank + 1, prize: 0});
  };

  var MoneyGrid = function(division){
    return {
      data: 'money.' + division,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
          {field:'rank', displayName:'Rank', enableCellEdit: false},
          {field: 'prize', displayName: 'Prize', enableCellEdit: "currentUser.role == 'admin'"},
          {field:'username', displayName:'Username', enableCellEdit: false, visible:false}]
    }
  }

  var setGridMoneyOptions = function(){
    $scope.gridMoneyOptions = {
      open : MoneyGrid('open'),
      ladies : MoneyGrid('ladies'),
      senior : MoneyGrid('senior'),
      trainee : MoneyGrid('trainee'),
    };
  }

    // data Object

  var moneyObj = function(splits){
    var prizePot = {}
    for (var i = 0; i < splits; i++) {
      prizePot[i+1] = 0;
    };
    return prizePot;
  }

  // ng-grid merit

  var setGridMeritOptions = function(){
    $scope.gridMeritOptions = {
      open : MeritGrid('open'),
      ladies : MeritGrid('ladies'),
      senior : MeritGrid('senior'),
      trainee : MeritGrid('trainee'),
    }
  }

  var MeritGrid = function(division){
    return {
      data: 'merit.' + division,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: false,
        columnDefs: [
          {field: 'rank', displayName: 'Rank', width: "*", cellClass: 'center-text', enableCellEdit: "currentUser.role == 'admin'"},
          {field:'getName()', displayName:'Name', width: "****", cellClass: 'center-text', enableCellEdit: false},
          {field: 'getPoints()', displayName: 'Points', width: "****", cellClass: 'center-text', enableCellEdit: "currentUser.role == 'admin'"},
          {field:'username', displayName:'Username', cellClass: 'center-text', enableCellEdit: false, visible:false}]
    }
  }

  // ng-grid Helper

  $scope.getTableStyle= function(container, division) {
     var rowHeight=30;
     var headerHeight=45;
     return {
        height: ($scope[container][division].length * rowHeight + headerHeight) + "px"
     };
  };

  // actions

  $scope.submitScores = function (){
    grid2Firebase()
      .then(calculateRank)
      .then(calculateShadowRank)
      .then(calculatePoints)
      .then(function(){
      Tournament.updateResults($scope.tournament)
        .then(function(){
          angular.forEach($scope.tournament.results,
            function(players, division){
              angular.forEach(players,
                function(player, username){
                  User.updateResults(player, $scope.tournament, division)
              })
            })
        })
        .then(function(){
          Tournament.setScored($scope.tournament)
        })
        .then($location.path('/tournaments/' + $scope.tournament.year + '/' + $scope.tournament.slug));
      });
  }

  $scope.submitMoney = function(){
    money2Firebase()
      .then(function(){
        Tournament.setPrizePot($scope.tournament)
      }).then(
        $location.path('/tournaments/' + $scope.tournament.year + '/' + $scope.tournament.slug)
      );
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
        id : t.created_at,
        division: division
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

  $scope.signUp = function(t, division, user){
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
          $scope.tournaments[t.created_at] = t;
          $location.path('/tournaments/' + tournament.year + '/' + t.slug);
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

    t.start_date = Utils.unixEpoch(t.start_date);
    t.signup_before = Utils.unixEpoch(t.signup_before);

    t = Utils.logUpdate(t);

    t.slug = Utils.slugify(t.name.en);
    t.$priority = t.start_date;

    $scope.tournaments[t.created_at] = t;

    Tournament.create(t)
      .then(updateArchives)
      .then(function(){
        $scope.reset();
        $location.path('/tournaments/'+ t.year + '/' + t.slug);})
  };


  $scope.delete = function(t){
    var t = t || $scope.tournament;
    removeTournamentFromAllPlayers(t)
      .then(function(){
        Tournament.delete(t.created_at)
      .then(function(){
        $location.path('/admin');
      });
    });
  };

  var removeTournamentFromAllPlayers = function(t){
    var promises = [];
    var t = t || $scope.tournament;

    angular.forEach(t.results, function(players, division){
      var deferred = $q.defer();

      angular.forEach(players, function(player, username){

        User.removeTournament(player, t);
        deferred.resolve();
      })

      promises.push(deferred.promise);
    })

    return $q.all(promises);
  }

  $scope.nextStatus = function(player, tournament, division, status){
    var deferred = $q.defer()
    var nxtStatus = status || $scope.status[($scope.status.indexOf(player.status) + 1) % $scope.status.length];
    Tournament.updatePlayerStatus(player, nxtStatus, tournament, division)
      .then(function(){
        User.updateStatus(player, nxtStatus, tournament)
      })
      .then(function(){
        deferred.resolve();
        player.status = nxtStatus;
      })

    return deferred.promise;
  }

  $scope.setPlayedStatus = function (player, tournament, division) {
    var deferred = $q.defer()

    $scope.nextStatus(player, tournament, division, 'played')
      .then(function(){
        deferred.resolve();
      })

    return deferred.promise;
  }

  $scope.setPlayed = function(stage){
    var promises = [];

    angular.forEach($scope.tournament.results, function(players, division){
      var deferred = $q.defer();

      angular.forEach(players, function(player, username){
        if (player.status == stage){
          $scope.setPlayedStatus(player, $scope.tournament, division)
            .then(function(){
              deferred.resolve();
            })
        }
      })

      promises.push(deferred.promise);
    })

    return $q.all(promises);

  }

  $scope.recent = function() {
    return function( item ) {
      return Date.now() > item.start_date;
    };
  };

  $scope.upcoming = function() {
    return function( item ) {
      return Date.now() < item.start_date;
    };
  };

  $scope.isUpcoming = function(tournament) {
    return Date.now() < tournament.start_date;
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

  var percentage = [15.85, 10.85, 6.1, 4.93, 4.1, 3.39, 2.91, 2.51, 2.2, 1.97, 1.8, 1.68, 1.57, 1.5, 1.44, 1.38, 1.32,
                    1.26, 1.21, 1.17, 1.14, 1.11, 1.08, 1.05, 1.02, 0.99, 0.96, 0.93, 0.9, 0.87, 0.84, 0.81, 0.79, 0.77,
                    0.75, 0.73, 0.71, 0.69, 0.67, 0.65, 0.63, 0.61, 0.59, 0.57, 0.55];

  var pointsAvailable = function(days){
    return days * 50000;
  }

  var pointsScored = function(rank, days, split){
    if (typeof rank == 'string'){
      return 0;
    }
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
