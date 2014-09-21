/* global app:true */
'use strict';

app.controller('FeedbackCtrl', function ($location, $scope, Feedback){

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

    $scope.delete = function(feedback){
        Feedback.delete(feedback.created_at)
            .then(function(){
                $location.path('/feedback');
        });
    }
});
