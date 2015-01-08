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
      },
      changePassword: function(user, oldPass, newPass){
        return auth.$changePassword(user.email, oldPass, newPass, function(error) {
          if (error === null) {
            console.log("Password changed successfully");
          } else {
            console.log("Error changing password:", error);
          }
        });
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
