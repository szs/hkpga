/* global app:true */
'user strict'

app.controller('AuthCtrl', function($scope, $location, User, Auth){
  if (Auth.signedIn()){
    $location.path('/');
  }

  $scope.$on('$firebaseSimpleLogin:login', function () {
    $location.path('/');
  });

  var createUsername = function(str) {
    console.log(str);
    var username = '';
    var trimmed = str.trim();
    username = trimmed.replace(/[^a-z0-9-]/gi, '');
    return username.toLowerCase();
  }

  $scope.login = function () {
    Auth.login($scope.user).then(function () {
      $location.path('/');
    }, function(error){
      $scope.error = error.toString().split(':')[3];
    });
  };

  $scope.register = function () {
    Auth.register($scope.user).then(function (authUser){
      $scope.user.username = createUsername($scope.user.name_en);
      User.create(authUser, $scope.user);
      $location.path('#/admin');
    }, function (error){
      console.log(error);
      $scope.error = error.toString().split(':')[3];
    });
  };
});
