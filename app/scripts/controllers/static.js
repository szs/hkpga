/* global app:true */
'use strict';

app.controller('StaticCtrl', function($scope, $rootScope, $location, $routeParams, Utils, Page){
  
  $scope.pages = Page.all;
  
  $scope.page = Page.new()

  var pageExists = function(){
    var page = $routeParams.page || $location.path().split('/')[2]
    Page.current(page, function(p){
      if (p === null){
        $scope.page = Page.new()
      } else {
        $scope.page = p;
      }
    })
  }

  pageExists();

  $scope.editable = ($routeParams.action === 'edit');

  $scope.save = function (){
    angular.extend($scope.page, {
      author: $rootScope.currentUser.username,
      slug: Utils.slugify($scope.page.title.en),
      $priority : Date.now(),
      update_at: Date.now()
    });

    Page.create($scope.page);
  };
});
