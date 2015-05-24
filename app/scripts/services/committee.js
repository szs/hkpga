'use strict';

app.factory('Committee',
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'committee');
    var committees = $firebase(ref);

    var Committee = {
      committee: committees,
      update : function (c){
        console.log(c);
        committees = c;
        committees.$save();
      }
    };

    return Committee;
})
