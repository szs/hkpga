'use strict';

app.factory('Utils',
  function ($rootScope, $location) {

  var nestedObject = function( base, names, value ) {
    var lastName = arguments.length === 3 ? names.pop() : false;

    for( var i = 0; i < names.length; i++ ) {
        base = base[ names[i] ] = base[ names[i] ] || {};
    }

    if( lastName ) base = base[ lastName ] = value;

    return base;
};

  var sumObj = function(obj){
    var values = [];
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          values.push(obj[k]);
        }
      }
    return values.reduce(function(a,b){return a + b});
  }

  var sortByKey = function(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
  }


  var goHome = function(){
    $location.path('/')
  }

  var createSlug = function(str) {
    var slug = '';
    var trimmed = str.trim();
    slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');

    return slug.toLowerCase();
  }

  var getCurrentUser = function (prop){
    var userProperty = $rootScope.currentUser[prop] || null;
    return userProperty;
  }

  var logUpdate = function(obj){
    return angular.extend(obj, {
      author: getCurrentUser('username'),
      updated_at: Date.now()
    });
  }
  var countInArray = function(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

  var extractImg = function(html) {
    var regex = /<img.*?src="(.*?)"/;
    try {
      var src = regex.exec(html)[1];
    } catch (e) {
      var src = ""
    }
    return src;
  }

    var Utils = {
      extractImg : extractImg,
      getCurrentUser : getCurrentUser,
      logUpdate : logUpdate,
      slugify : createSlug,
      nestedObject : nestedObject,
      sumObj : sumObj,
      sortByKey : sortByKey,
      valuesToArray : valuesToArray,
      countInArray: countInArray
    };

    return Utils;
})
