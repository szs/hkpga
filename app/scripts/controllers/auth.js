/* global app:true */
'user strict'

app.controller('AuthCtrl', function($scope, $location, User, Auth){
  if (Auth.signedIn()){
    $location.path('/');
  }

  $scope.$on('$firebaseSimpleLogin:login', function () {
    $location.path('/');
  });

  $scope.login = function () {
    Auth.login($scope.user).then(function () {
      $location.path('/');
    }, function(error){
      $scope.error = error.toString().split(':')[3];
    });
  };
  
  $scope.register = function() {
    Auth.register($scope.user).then(function(authUser){
      User.create(authUser, $scope.user.email);
      $location.path('/');
    }, function(error){
      console.log(error);
      $scope.error = error.toString().split(':')[3];
    });
  };
});