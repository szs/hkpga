/* global app:true */
'use strict';

app.factory('User', function ($firebase, $rootScope, FIREBASE_URL, Utils, Auth){
  
  var ref = new Firebase(FIREBASE_URL + 'users');

  var users = $firebase(ref);

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));

    query.$on('loaded', function () {
      setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    delete $rootScope.currentUser;
  });

  function setCurrentUser (usr) {
    $rootScope.currentUser = User.findByUsername(usr);
  }

  var pointsEligible = ['full','associate','tournament','member'];

  var User = {
    all: users,
    isEligable: function(user){
      return pointsEligible.indexOf(user.status) > -1 && user.active;
    },
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
    addTournament : function(user, tournament){

        Utils.nestedObject( users[user.username], ['results', tournament.year, tournament.id, 'status'], 'signedup');
        
        return users.$save(user.username);
    },
    new : function(){
      return {
        "username": "",
        "achievements": {
          "en": "",
          "zh-cn": "",
          "zh-hk": ""
        },
        "active": true,
        "email": "",
        "md5_hash": "",
        "member_number": null,
        "member_since": new Date().getFullYear(),
        "name": {
          "en": "",
          "zh-cn": "",
          "zh-hk": ""
        },
        "phone": "",
        "pro_since": null,
        "profile_picture": "",
        "qualifications": {
          "en": "",
          "zh-cn": "",
          "zh-hk": ""
        },
        "role": "member",
        "sex": "",
        "status": "",
        "teaching_experience": {
          "en": "",
          "zh-cn": "",
          "zh-hk": ""
        },
        "introduction" : {
          "en": "",
          "zh-cn": "",
          "zh-hk": ""
        },
        "committee" : false,
        "honorary" : false,
        "updated_at": Date.now(),
        "created_at": Date.now(),
      }
    }
  };

  return User;
});
