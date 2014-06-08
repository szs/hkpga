'use strict';

app.factory('News', function($resource) {
  return $resource('https://hkpga.firebaseio.com/news/:id.json')
})
