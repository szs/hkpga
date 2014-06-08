'use strict';

/**
 * @ngdoc overview
 * @name hkpgaApp
 * @description
 * # hkpgaApp *
 * Main module of the application.
 */

var app = angular.module('hkpgaApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'firebase'
]);

app.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/admin', {
          templateUrl: 'views/admin.html',
          controller: 'AdminCtrl'
        })
        .when('/news', {
          templateUrl: 'views/news.html',
          controller: 'NewsCtrl'
        })
        .when('/news/:articleId', {
          templateUrl: 'views/shownews.html',
          controller: 'NewsViewCtrl'
        })
        .when('/tournaments', {
          templateUrl: 'views/tournaments.html',
          controller: 'TournamentsCtrl',
          controllerAs: 'tournaments'
        })
        .when('/members', {
          templateUrl: 'views/members.html',
          controller: 'MembersCtrl',
          controllerAs: 'members'
        })
        .when('/juniors', {
          templateUrl: 'views/juniors.html',
          controller: 'JuniorsCtrl',
          controllerAs: 'juniors'
        })
        .when('/events', {
          templateUrl: 'views/events.html',
          controller: 'EventsCtrl',
          controllerAs: 'events'
        })
        .when('/press', {
          templateUrl: 'views/press.html',
          controller: 'PressCtrl',
          controllerAs: 'press'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl',
          controllerAs: 'contact'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
  .constant('FIREBASE_URL', 'https://hkpga.firebaseio.com/');