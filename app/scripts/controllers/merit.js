/* global app:true */
'use strict';

app.controller('MeritCtrl', function($scope){

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

  var pointsScored = function(position, days){
    position = position - 1;
    position = Math.min(Math.max(position, 0), 44)
    return percentage[position] * pointsAvailable(days) / 100;
  }

});
