/* global app:true */
'use strict';

app.factory('Auth',
  function ($firebase, $q, $firebaseSimpleLogin, FIREBASE_URL, $rootScope){

    // $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    //   console.log("User " + user.id + " successfully logged in!");
    // });

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error !== null) {
        // console.log("Error authenticating:", error);
      } else if (user !== null) {
        // console.log("User is logged in:", user);
      } else {
        // console.log("User is logged out");
      }
    });

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
      },
      changePassword: function(email, oldPass, newPass){
        var deferred = $q.defer()

        authClient.changePassword(email, oldPass, newPass, function(error) {
            if (error === null) {
              deferred.resolve();
            } else {
              deferred.resolve(error);
            }
          });

        return deferred.promise;
      },
      passwordReset: function(email){
        return auth.$sendPasswordResetEmail(email, function(error) {
          if (error === null) {
            console.log("Password reset email sent successfully");
          } else {
            console.log("Error sending password reset email:", error);
          }
        });
      }
    };

    return Auth;
  }
);
