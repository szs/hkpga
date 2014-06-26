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
  'firebase',
  'angular-redactor',
  'pascalprecht.translate',
  'ui.bootstrap',
  'truncate'
]);

app.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'AuthCtrl'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'AuthCtrl'
        })
        .when('/admin', {
          templateUrl: 'views/admin.html',
          controller: 'AdminCtrl'
        })
        .when('/news', {
          templateUrl: 'views/news.html',
          controller: 'NewsCtrl'
        })
        .when('/news/archive', {
          templateUrl: 'views/newsarchive.html',
          controller: 'NewsArchiveCtrl'
        })
        .when('/news/archive/:year', {
          templateUrl: 'views/shownewsarchive.html',
          controller: 'NewsArchiveViewCtrl'
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
          controller: 'MembersCtrl'
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
        .otherwise({
          redirectTo: '/'
        });
    })
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('zh', translationsZH);
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }])
  .constant('FIREBASE_URL', 'https://hkpga.firebaseio.com/');