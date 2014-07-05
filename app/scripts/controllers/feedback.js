/* global app:true */
'use strict';

app.controller('FeedbackCtrl', function ($scope, Feedback){

    $scope.fb = Feedback.all;

    $scope.reset = function(){
        $scope.feedback = Feedback.new()
    }
    $scope.reset()

    $scope.post = function(){
        Feedback.create($scope.feedback)
        $scope.isOpen = false;
        $scope.reset()
    };
});