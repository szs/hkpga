/* global app:true */
'use strict';

app.controller('ChartCtrl', function ($scope, $rootScope, $timeout){

    $scope.scoreData = {};
    $rootScope.years = [];
    $scope.lineChartData = {};

    var mapSorted = function(mapArr, arr){
        var sortMap = mapArr.slice(0);
        sortMap.sort();
        var result = [];
        for(var i=0; i<arr.length; i++) {
            result.push(arr[mapArr.indexOf(sortMap[i])])
            }
        return result;
    }

    $scope.tournaments.$on('loaded',function(){
        angular.forEach($scope.currentUser.results, function(tournamentResults, year){
            var labels = [];
            var rank = [];
            var totalScore = [];
            var dataPoints = [];
            var timeStamps = [];
            var points = [];

            $scope.years.push(year);
            $scope.scoreData[parseInt(year)] = true;

            angular.forEach(tournamentResults,function(tournament, id){
                if (tournament.status == 'played' || tournament.status == 'missedcut'){
                    if ($scope.tournaments[id].slug.indexOf('champ') > -1){
                      labels.push('Champ')
                    } else if ($scope.tournaments[id].slug.indexOf('invitational') > -1){
                      labels.push('Invitational')
                    } else {
                        labels.push(true)
                    }
                    timeStamps.push($scope.tournaments[id].start_date);
                    dataPoints.push(tournament.rank);
                    totalScore.push(tournament.totalScore);
                    points.push(tournament.points);
                }
            });

            labels = mapSorted(timeStamps, labels);

            var counter = 1
            angular.forEach(labels, function(label, i){
                if (label === true){
                    labels[i] = 'Leg ' + counter;
                    counter++;
                }
            });

            totalScore = mapSorted(timeStamps, totalScore);
            points = mapSorted(timeStamps, points);

            var datasets = [[totalScore], [points]];

            $scope.lineChartData[year] = {labels:labels, datasets:datasets};

            console.log($scope.lineChartData)
        });

        $scope.$emit('calculateGlobalMerit', $scope.years);

    });

    $scope.$on('globalMeritCalculated', function(event, args) {
      $scope.globalMerit = args;
      console.log($scope.globalMerit)
      $scope.playerMerit = getRank()
    });

    var getRank = function(){
        var userRank = [];
        angular.forEach($scope.globalMerit, function(divisions, year){
            angular.forEach(divisions, function(players, division){
                angular.forEach(players, function(player){
                    if (player.username == $scope.currentUser.username){
                        userRank.push({
                            division: division,
                            year: year,
                            rank: player.rank,
                            points: player.points
                        })
                    }
                })
            })
        })
        return userRank;
    }

})
