/* global app:true */
'use strict';

app.controller('ChartCtrl', function ($scope, $timeout){

    $scope.tournaments.$on('loaded',function(){
        angular.forEach($scope.currentUser.results, function(tournamentResults, year){
            var labels = [];
            var rank = [];
            var totalScore = [];
            var dataPoints = [];
            var points = [];
            var counter = 1;
            angular.forEach(tournamentResults,function(tournament, id){
                if (tournament.status == 'played' || tournament.status == 'missedcut'){
                    if ($scope.tournaments[id].slug.indexOf('champ') > -1){
                      labels.push('Champ')
                    } else if ($scope.tournaments[id].slug.indexOf('leg') > -1){
                      labels.push('Leg ' + counter)
                      counter++;
                    } else if ($scope.tournaments[id].slug.indexOf('invitational') > -1){
                      labels.push('Invitational')
                    } else {
                        labels.push('Leg ' + counter)
                        counter++;
                    }
                    dataPoints.push(tournament.rank);
                    totalScore.push(tournament.totalScore);
                    points.push(tournament.points);
                }
            });

            var datasets = [points];

            $scope.lineChartData[year] = {labels:labels, datasets:datasets}
            console.log($scope.lineChartData[year])
        });
    });

    $scope.lineChartData = {}

})
