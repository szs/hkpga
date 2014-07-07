angular.module('DateFilters', []).filter('filterYear', function() {
  return function (objects, archiveYear, dateKey) {
    var filtered_list = [];
    for (var i = 0; i < objects.length; i++) {
      var year = new Date(objects[i][dateKey]).getFullYear();
      if (year === archiveYear) {
        filtered_list.push(objects[i]);
      }
    }
    return filtered_list;
  }
});