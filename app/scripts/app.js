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
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl'
        })
        .when('/about/committee-honorary', {
          templateUrl: 'views/committee.html',
          controller: 'CommitteeCtrl'
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
        .when('/news/archive/:year', {
          templateUrl: 'views/newsarchive.html',
          controller: 'NewsCtrl'
        })
        .when('/news/:articleId', {
          templateUrl: 'views/shownews.html',
          controller: 'NewsViewCtrl'
        })
        .when('/about', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .when('/about/partners', {
          templateUrl: 'views/partners.html',
          controller: 'PartnersCtrl',
        })
        .when('/tournaments', {
          templateUrl: 'views/tournaments.html',
          controller: 'TournamentsCtrl',
        })
        .when('/pros', {
          templateUrl: 'views/pros.html',
          controller: 'ProsCtrl'
        })
        .when('/pros/new', {
          templateUrl: 'views/register.html',
          controller: 'AuthCtrl'
        })
        .when('/pros/training-program', {
          templateUrl: 'views/static.html',
          controller: 'StaticCtrl',
        })
        .when('/pros/:username', {
          templateUrl: 'views/pro.html',
          controller: 'ProCtrl'
        })
        .when('/juniors', {
          redirectTo: '/juniors/skyhigh',
        })
        .when('/juniors/project-skyhigh', {
          templateUrl: 'views/skyhigh.html',
          controller: 'JuniorsCtrl',
        })
        .when('/juniors/project-skyhigh/news', {
          templateUrl: 'views/skyhigh-news.html',
          controller: 'NewsCtrl',
        })
        .when('/events', {
          templateUrl: 'views/events.html',
          controller: 'EventsCtrl',
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