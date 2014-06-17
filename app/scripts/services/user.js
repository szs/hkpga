/* global app:true */
'use strict';

app.factory('User', function ($firebase, $rootScope, FIREBASE_URL, Auth, Lang){
  var ref = new Firebase(FIREBASE_URL + 'users');

  var users = $firebase(ref);

  var User = {
    all: users,
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
    },
    na : this['name_' + Lang.current()],
    nam : this['name_' + Lang.current()],
    name : function() {
      return this['name_' + Lang.current()]
    },
    qualifications : function() {
      this['qualifications_' + Lang.current()]
    },
    achievements : function() {
      this['achievements_' + Lang.current()]
    },
    teaching_experience : function() {
      this['teaching_experience_' + Lang.current()]
    },
    new : function(){
        return {
          username: '',
          password: '',
          name_en: '',
          name_zh: ''
        };
      }
  }

  function setCurrentUser (usr) {
    $rootScope.currentUser = User.findByUsername(usr);
  }

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    console.log(authUser);
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
    console.log(query);

    query.$on('loaded', function () {
      setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    delete $rootScope.currentUser;
  });

  return User;
});
