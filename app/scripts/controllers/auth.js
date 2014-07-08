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
    // honorary members don't have logins
    $scope.user.role = $scope.user.honorary ? 'resource' : $scope.user.role;
    if ($scope.user.role != 'resource'){
      Auth.register($scope.user).then(function (authUser){

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
    User.update(user);
    $location.path('/admin');
  };

  $scope.signedIn = function (){
    return Auth.signedIn();
  };

});
