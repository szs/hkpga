angular.module('TournamentFilters', []).filter('tournamentType', function() {
  return function (objects, view) {
    var filtered_list = [];
    for (var i = 0; i < objects.length; i++) {
      var o = objects[i].divisions;
      var v = (o.open || o.senior || o.ladies);
      if (view === 'member' && v) {
        filtered_list.push(objects[i]);
      } else if (view === 'trainee' && o.trainee) {
        filtered_list.push(objects[i]);
      }
    }
    return filtered_list;
  }
});