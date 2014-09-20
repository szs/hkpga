/* global app:true */
'user strict'

app.controller('AuthCtrl', function($scope, $location, $cookieStore, User, Auth){
  $scope.$on('$firebaseSimpleLogin:login', function () {
    // $location.path('/');
  });

  $scope.reset = function(){
    $scope.user = User.new();
  }

  $scope.reset();

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

    $scope.user.role = $scope.user.honorary ? 'user' : roleMap[$scope.user.relation];

    if ($scope.user.role == 'member' || $scope.user.isAdmin){
      Auth.register($scope.user).then(function (authUser){

        if ($scope.user.isAdmin){
          $scope.user.role = 'admin'
        }

        $scope.user.username = createUsername($scope.user.name.en);

        User.create(authUser, $scope.user);
        $location.path('/admin');
      }, function (error){
        console.log(error);
        $scope.error = error.toString().split(':')[3];
      });
    } else {
      $scope.user.username = createUsername($scope.user.name.en);
      $scope.update($scope.user);
    }
  };

  $scope.update = function (user) {
    $scope.user.role = $scope.user.honorary ? 'user' : roleMap[$scope.user.relation];
    if ($scope.user.isAdmin){
      $scope.user.role = 'admin'
    }
    User.update(user);
    $location.path('/admin');
  };

  $scope.signedIn = function (){
    return Auth.signedIn();
  };

  var roleMap = {
      'full' : 'member',
      'tournament' : 'member',
      'associate' : 'member',
      'member' : 'member',
      'trainer' : 'user',
      'trainee' : 'user',
      'honorary' : 'user',
      'none' : 'legacy'
  }

});
