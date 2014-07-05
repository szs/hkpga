/* global app:true */
'use strict';

app.controller('AdminCtrl', function($scope, User){

	$scope.resources = {
		'press/magazine' : 'Magazine',
		'press/releases' : 'Press Release',
		'press/media' : 'Media Coverage',
		'events' : 'Event',
	}

});
