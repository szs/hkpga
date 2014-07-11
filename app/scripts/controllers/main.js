/* global app:true */
'use strict';

app.controller('MainCtrl', function($scope, User){

  User.setMart();
  
  $('.carousel').carousel({
    interval: false
  });
  
});
 


$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
  // Avoid following the href location when clicking
  event.preventDefault();
  // Avoid having the menu to close when clicking
  event.stopPropagation();
  // Toggle menu.
  if ($(this).parent().hasClass('open'))
    $(this).parent().removeClass('open');
  else
    $(this).parent().addClass('open');
  // If children are open, close them.
  $(this).children().removeClass('open');
  // If a sibling menu is already open we close it
  $(this).parent().siblings().removeClass('open').children().removeClass('open');
  $(this).siblings().children().removeClass('open');
  
  var menu = $(this).parent().find("ul");
  var menupos = menu.offset();
  
  if (menupos.left + menu.width() > $(window).width()) {
    var newpos = -$(menu).width();
    menu.css({ left: newpos });
  } else {
    var newpos = $(this).parent().width();
    menu.css({ left: newpos });
  }
});

