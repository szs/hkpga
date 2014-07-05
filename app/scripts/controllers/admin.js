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
		console.log('Creating Simple Logins');
		var usernames = User.all.$getIndex()
		console.log(usernames)
		usernames.forEach(function(key){
			if (User.all.$child(key).md5_hash == ''){
				Auth.register(User.all.$child(key)).then(function (authUser){
					User.create(authUser, User.all.$child(key))
		      		console.log('SIGNED:')
		      		console.log(authUser)
		    	}, function (error){
		      		console.log(error);
		      		console.log(User.all.$child(key).email);
		    	});
			}
		})
	}
});
