/* global app:true */
'user strict'

app.controller('AuthCtrl', function($scope, $location, $cookieStore, User, Auth){
  $scope.$on('$firebaseSimpleLogin:login', function () {
    // $location.path('/');
  });

  var createUsername = function(str) {
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

  $scope.logout = function(){
    return Auth.logout();
  }

  $scope.register = function () {
    Auth.register($scope.user).then(function (authUser){
      $scope.user.username = createUsername($scope.user.name.en);

      // honorary members don't have logins
      $scope.user.role = $scope.user.honorary ? 'resource' : $scope.user.role;

      User.create(authUser, $scope.user);
      $location.path('/admin');
    }, function (error){
      console.log(error);
      $scope.error = error.toString().split(':')[3];
    });
  };

  $scope.signedIn = function (){
    return Auth.signedIn();
  };

});
