/* global app:true */
'use strict';

app.controller('AdminCtrl', function($scope, User){

	$scope.resources = {
		'events' : 'Event',
		'press/releases' : 'Press Release',
		'press/magazines' : 'Magainze',
		'press/media' : 'Media Coverage'
	}

});
