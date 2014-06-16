/* global app:true */
'use strict';

app.factory('User', function ($firebase, $rootScope, FIREBASE_URL, Auth){
  var ref = new Firebase(FIREBASE_URL + 'users');

  var users = $firebase(ref);

  var slug = function(str) {
    var slug = '';
    var trimmed = str.trim();
    slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');
    return slug.toLowerCase();
  }

  var User = {
    create : function (authUser, english_name){
      var idx = slug(english_name);
      users[idx] = {
        md5_hash: authUser.md5_hash,
        slug: idx,
        $priority: authUser.uid
      };
      users.$save(idx).then(function(){
          setCurrentUser(idx);
      });
    },
    findBySlug: function (idx) {
      if (idx) {
        return users.$child(idx);
      }
    },
    getCurrent: function () {
      return $rootScope.currentUser;
    },
    signedIn: function () {
      return $rootScope.currentUser !== undefined;
    }
  }

  function setCurrentUser (idx) {
    $rootScope.currentUser = User.findBySlug(idx);
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