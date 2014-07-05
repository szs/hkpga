angular.module('DateFilters', []).filter('filterYear', function() {
  return function (objects, archiveYear) {
    var filtered_list = [];
    for (var i = 0; i < objects.length; i++) {
      var year = new Date(objects[i].publish_date).getFullYear();
      if (year == archiveYear) {
        filtered_list.push(objects[i]);
      }
    }
    return filtered_list;
  }
});