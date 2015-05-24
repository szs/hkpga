/* global app:true */
'use strict';

app.controller('StaticCtrl', function($scope, $location, $routeParams, Utils, Page){

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

  $scope.edit = function(page){
    $location.path('/'+ page.category +'/'+ page.slug +'/edit');
  }

  $scope.save = function (p){
    var p = p || $scope.page;

    p = Utils.logUpdate(p);

    angular.extend(p, {
      slug: Utils.slugify(p.title.en),
      $priority : Date.now(),
    });

    Page.create(p);
  };
});
