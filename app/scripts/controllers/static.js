/* global app:true */
'use strict';

app.controller('StaticCtrl', function($scope, $rootScope, $routeParams, Page){
  
  $scope.pages = Page.all;
  
  $scope.page = Page.new()

  var pageExists = function(){
    Page.current($routeParams.page, function(p){
      if (p === null){
        $scope.page = Page.new()
      } else {
        $scope.page = p;
      }
    })
  }

  var getSlug = function(str) {
    var slug = '';
    var trimmed = str.trim();
    slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
      replace(/-+/g, '-').
      replace(/^-|-$/g, '');
    
    return slug.toLowerCase();
  }

  $scope.page = pageExists();

  $scope.editable = ($routeParams.action === 'edit');

  $scope.save = function (){
    angular.extend($scope.page, {
      author: $rootScope.currentUser.username,
      slug: getSlug($scope.page.title.en),
      $priority : Date.now(),
      last_edited: Date.now()
    });

    Page.create($scope.page);
  };


});
