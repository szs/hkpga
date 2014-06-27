/* global app:true */
'use strict';

app.controller('StaticCtrl', function($scope, $rootScope, $routeParams, Page){
  
  var pageExists = function(page){
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

  $scope.pages = Page.all;

  $scope.page = pageExists();

  console.log($scope.page)

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
