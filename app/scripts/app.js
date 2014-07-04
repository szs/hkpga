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
  'frapontillo.bootstrap-switch',
]);

app.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl'
        })
        .when('/contact/:action', {
          redirectTo: '/contact',
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
          redirectTo: '/news/archive',
        })
        .when('/news/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/news/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/news/:articleId', {
          templateUrl: 'views/article.html',
          controller: 'NewsViewCtrl'
        })
        .when('/news/archive/:year', {
          templateUrl: 'views/archive.html',
          controller: 'NewsCtrl'
        })
        .when('/about', {
          redirectTo: '/about/us',
        })
        .when('/about/partners', {
          templateUrl: 'views/partners.html',
          controller: 'PartnersCtrl',
        })
        .when('/about/committee-honorary', {
          templateUrl: 'views/committee.html',
          controller: 'CommitteeCtrl'
        })
        .when('/tournaments', {
          redirectTo: '/tournaments/merit',
        })
        .when('/tournaments/merit', {
          templateUrl: 'views/merit.html',
          controller: 'TournamentCtrl',
        })
        .when('/tournaments/member', {
          templateUrl: 'views/tournaments.html',
          controller: 'TournamentCtrl',
        })
        .when('/tournaments/trainee', {
          templateUrl: 'views/tournaments.html',
          controller: 'TournamentCtrl',
        })
        .when('/tournaments/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/pros', {
          redirectTo: '/pros/directory',
        })
        .when('/pros/directory', {
          templateUrl: 'views/pros.html',
          controller: 'ProsCtrl'
        })
        .when('/pros/training-program', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .when('/pros/training-program/:action', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .when('/pros/:username', {
          templateUrl: 'views/pro.html',
          controller: 'ProCtrl'
        })
        .when('/pros/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/community', {
          redirectTo: '/community/project-skyhigh',
        })
        .when('/events', {
          templateUrl: 'views/events.html',
          controller: 'EventsCtrl',
        })
        .when('/pros/:id/:action', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/press', {
          redirectTo: '/press/releases',
        })
        .when('/press/releases', {
          templateUrl: 'views/pressreleases.html',
          controller: 'ReleasesCtrl',
        })
        .when('/press/magazines', {
          templateUrl: 'views/magazines.html',
          controller: 'MagazineCtrl',
        })
        .when('/press/magazines/:year', {
          templateUrl: 'views/magazines.html',
          controller: 'MagazineCtrl',
        })
        .when('/press/:contentType/edit', {
          redirectTo: '/press',
        })
        .when('/press/:contentType/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl',
        })
        .when('/press/:category/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/:contentType/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl',
        })
        .when('/:category/:page', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .when('/:category/:page/:action', {
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