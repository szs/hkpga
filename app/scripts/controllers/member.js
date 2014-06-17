/* global app:true */
'use strict';

app.controller('MembersCtrl', function($scope, User, Lang){
  $scope.members = User.all;
  
  console.log($scope.members);
  
  $scope.lang = Lang.current();

  var Member = User;
    
  Member.name = User['name_' + $scope.lang];
  Member.qualifications = User['qualifications_' + $scope.lang];
  Member.achievements = User['achievements_' + $scope.lang];
  Member.teaching_experience = User['teaching_experience_' + $scope.lang];

  return Member;

 });
