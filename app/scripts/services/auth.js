/* global app:true */
'use strict';

app.factory('Auth',
  function ($firebase, $firebaseSimpleLogin, FIREBASE_URL, $rootScope){

    // $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    //   console.log("User " + user.id + " successfully logged in!");
    // });

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
      register: function (user){
        var password = user.password || Math.random().toString(36).substring(7);
        return auth.$createUser(user.email, password);
      },
      signedIn: function (){
        return auth.user !== null;
      },
      login: function (user){
        return auth.$login('password', user);
      },
      logout: function (){
        return auth.$logout();
      }
    };

    return Auth;
  }
);
