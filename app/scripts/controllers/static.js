/* global app:true */
'use strict';

app.controller('StaticCtrl', function($scope, $rootScope, $routeParams, Page){
  
  var getSlug = function(str) {
    var slug = '';
    var trimmed = str.trim();
    slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');
    
    return slug.toLowerCase();
  }

  $scope.pages = Page.all;

  $scope.page = Page.find($routeParams.page);

  $scope.editable = ($routeParams.action === 'edit');

  $scope.save = function (){
    angular.extend($scope.page, {
      author: $rootScope.currentUser.username,
      slug: getSlug($scope.page.title.en),
      $priority : Date.now(),
      last_edited: Date.now()
    });

    console.log($scope.page);

    Page.create($scope.page);
  };
});
