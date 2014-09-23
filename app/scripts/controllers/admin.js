/* global app:true */
'use strict';

app.controller('AdminCtrl', function($scope, Auth, User){

	var users = User.all

	$scope.resources = {
		'press/magazine' : 'Magazine',
		'press/releases' : 'Press Release',
		'press/media' : 'Media Coverage',
		'events' : 'Event',
	}

	$scope.createSimpleLoginAccounts = function(){
		var usernames = User.all.$getIndex()
		usernames.forEach(function(key){
			if (User.all.$child(key).md5_hash == ''){
				Auth.register(User.all.$child(key))
					.then(function (authUser){
						User.create(authUser, User.all.$child(key));
		    	}, function (error){
		      		console.log(error);
		    	});
			}
		})
	}
});
