angular.module('ResourceFilters', []).filter('DriveOrUrl', function() {
  return function(input) {
    var isUrl = input.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    var drivePrefix = 'http://drive.google.com/uc?export=view&id='
    return isUrl ? input : drivePrefix + input;
  };
});