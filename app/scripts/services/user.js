/* global app:true */
'use strict';

app.factory('User', function ($firebase, $rootScope, FIREBASE_URL, Auth){
  var ref = new Firebase(FIREBASE_URL + 'users');

  var users = $firebase(ref);

  var User = {
    create : function (authUser, user){
      var userObj = user;
      userObj.md5_hash = authUser.md5_hash;
      userObj.$priority = authUser.uid;
      users[userObj.username] = userObj;
      users.$save(userObj.username).then(function(){
          setCurrentUser(userObj.username);
      });
    },
    findByUsername: function (usr) {
      if (usr) {
        return users.$child(usr);
      }
    },
    getCurrent: function () {
      return $rootScope.currentUser;
    },
    signedIn: function () {
      return $rootScope.currentUser !== undefined;
    }
  }

  function setCurrentUser (usr) {
    $rootScope.currentUser = User.findByUsername(usr);
  }

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));

    query.$on('loaded', function () {
      setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    delete $rootScope.currentUser;
  });

  return User;
});
