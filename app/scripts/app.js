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
  'truncate',
]);

app.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
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
        .when('/magazines', {
          templateUrl: 'views/magazines.html',
          controller: 'MagazineCtrl',
        })
        .when('/magazines/:year', {
          templateUrl: 'views/magazines.html',
          controller: 'MagazineCtrl',
        })
        .when('/tournaments', {
          templateUrl: 'views/tournaments.html',
          controller: 'TournamentsCtrl',
        })
        .when('/about/partners', {
          templateUrl: 'views/partners.html',
          controller: 'PartnersCtrl',
        })
        .when('/professionals', {
          templateUrl: 'views/professionals.html',
          controller: 'ProfessionalsCtrl'
        })
        .when('/professionals/:username', {
          templateUrl: 'views/professionals.html',
          controller: 'ProfessionalsCtrl'
        })
        .when('/professionals/new', {
          templateUrl: 'views/register.html',
          controller: 'AuthCtrl'
        })
        .when('/juniors', {
          templateUrl: 'views/juniors.html',
          controller: 'JuniorsCtrl',
        })
        .when('/events', {
          templateUrl: 'views/events.html',
          controller: 'EventsCtrl',
        })
        .when('/pressreleases', {
          templateUrl: 'views/pressreleases.html',
          controller: 'PressReleaseCtrl',
        })
        .when('/:contentType/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl',
        })
        .when('/about', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .when('/:page', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .when('/:page/:action', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .otherwise({
          redirectTo: '/',
        });
    })
  .config(function ($translateProvider) {
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('zh-hk', translationsZHHK);
    $translateProvider.translations('zh-cn', translationsZHCN);
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  })
  .constant('FIREBASE_URL', 'https://hkpga.firebaseio.com/');