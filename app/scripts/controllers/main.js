/* global app:true */
'use strict';

angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
  .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
  }]).directive('carousel', [function() {
      return { }
}]);

app.controller('MainCtrl', function($scope, User){

  $('.carousel').carousel({
    interval: 6000,
  });

  $('#carousel').on('slide.bs.carousel', function (e) {
    if (e.type == "slide" && e.direction == "right" && e.relatedTarget.className != "item"){
      return e.preventDefault()
    }
  })

});

$(function(){
  $('body').on('click', '.navbar-collapse li.open ul.dropdown-menu li a, .navbar-nav > li > a[href]', function(event) {
    $('.navbar-collapse.in').removeClass('in');
  });

})


