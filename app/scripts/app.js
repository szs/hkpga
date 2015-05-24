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
  'ngGrid',
  'firebase',
  'angular-redactor',
  'pascalprecht.translate',
  'ui.bootstrap',
  'truncate',
  'frapontillo.bootstrap-switch',
  'DateFilters',
  'TournamentFilters',
  'angucomplete-alt',
  'ResourceFilters',
  'chart.js'
]);

app.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
        })
        .when('/terms', {
          templateUrl: 'views/terms.html',
          controller: 'ContactCtrl'
        })
        .when('/contact/:action', {
          redirectTo: '/contact',
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'AuthCtrl'
        })
        .when('/resetpassword', {
          templateUrl: 'views/resetpassword.html',
          controller: 'AuthCtrl'
        })
        .when('/changepassword', {
          templateUrl: 'views/changepassword.html',
          controller: 'AuthCtrl'
        })
        .when('/admin', {
          templateUrl: 'views/admin.html',
          controller: 'AdminCtrl'
        })
        .when('/admin/people', {
          templateUrl: 'views/people.html',
          controller: 'ProsCtrl'
        })
        .when('/dashboard', {
          templateUrl: 'views/dashboard.html',
          controller: 'AdminCtrl'
        })
        .when('/feedback', {
          templateUrl: 'views/feedback.html',
          controller: 'FeedbackCtrl'
        })
        .when('/news', {
          redirectTo: '/news/archive/latest',
        })
        .when('/news/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/news/:id', {
          templateUrl: 'views/article.html',
          controller: 'NewsCtrl'
        })
        .when('/news/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/news/archive', {
          redirectTo: '/news/archive/latest',
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
          controller: 'ProsCtrl'
        })
        .when('/about/committee-honorary/edit', {
          templateUrl: 'views/committee-new.html',
          controller: 'CommitteeCtrl',
        })
        .when('/tournaments', {
          redirectTo: '/tournaments/latest',
        })
        .when('/tournaments/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/tournaments/merit', {
          redirectTo: '/tournaments/merit/latest',
        })
        .when('/tournaments/:year', {
          templateUrl: 'views/tournaments.html',
          controller: 'TournamentsCtrl',
        })
        .when('/tournaments/merit/2004', {
            templateUrl: 'views/merit2004.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2005', {
            templateUrl: 'views/merit2005.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2006', {
            templateUrl: 'views/merit2006.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2007', {
            templateUrl: 'views/merit2007.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2008', {
            templateUrl: 'views/merit2008.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2009', {
            templateUrl: 'views/merit2009.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2010', {
            templateUrl: 'views/merit2010.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2011', {
            templateUrl: 'views/merit2011.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2012', {
            templateUrl: 'views/merit2012.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/2013', {
            templateUrl: 'views/merit2013.html',
            controller: 'TournamentsCtrl',
          })
        .when('/tournaments/merit/:year', {
          templateUrl: 'views/merit.html',
          controller: 'TournamentsCtrl',
        })
        .when('/tournaments/:year/:id/prizemoney', {
          templateUrl: 'views/money.html',
          controller: 'TournamentsCtrl',
        })
        .when('/tournaments/:year/:id/prizemoney/edit', {
          templateUrl: 'views/money.html',
          controller: 'TournamentsCtrl',
        })
        .when('/tournaments/:year/:id', {
          templateUrl: 'views/tournament.html',
          controller: 'TournamentsCtrl',
        })
        .when('/tournaments/:year/:id/checklist', {
          templateUrl: 'views/checklist.html',
          controller: 'ProsCtrl',
        })
        .when('/tournaments/:year/:id/score', {
          templateUrl: 'views/scores.html',
          controller: 'TournamentsCtrl',
        })
        // .when('/tournaments/:year/:id/teeofftime', {
        //   templateUrl: 'views/teeofftime.html',
        //   controller: 'TournamentsCtrl',
        // })
        .when('/tournaments/:year/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/pros', {
          redirectTo: '/pros/directory',
        })
        .when('/pros/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
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
        .when('/pros/:id', {
          templateUrl: 'views/pro.html',
          controller: 'ProsCtrl'
        })
        .when('/pros/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl'
        })
        .when('/honorary', {
          redirectTo: '/about/committee-honorary',
        })
        .when('/honorary/directory', {
          redirectTo: '/about/committee-honorary',
        })
        .when('/honorary/new', {
          redirectTo: '/pros/new',
        })
        .when('/honorary/:id', {
          templateUrl: 'views/pro.html',
          controller: 'ProsCtrl'
        })
        .when('/honorary/:id/edit', {
          redirectTo: '/pros/:id/edit',
        })
        .when('/community', {
          redirectTo: '/community/project-skyhigh',
        })
        .when('/events', {
          templateUrl: 'views/events.html',
          controller: 'NewsCtrl'
        })
        .when('/events/new', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl',
        })
        .when('/events/:id', {
          templateUrl: 'views/event.html',
          controller: 'NewsCtrl',
        })
        .when('/events/:id/edit', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl',
        })
        .when('/events/archive/:year', {
          templateUrl: 'views/archive.html',
          controller: 'NewsCtrl',
        })
        .when('/pros/:id/:action', {
          templateUrl: 'views/new.html',
          controller: 'NewCtrl',
        })
        .when('/press', {
          redirectTo: '/press/releases',
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
        .when('/press/releases', {
          templateUrl: 'views/releases.html',
          controller: 'ReleasesCtrl',
        })
        .when('/press/media', {
          templateUrl: 'views/media.html',
          controller: 'CoverageCtrl',
        })
        .when('/press/magazine', {
          templateUrl: 'views/magazine.html',
          controller: 'MagazineCtrl',
        })
        .when('/press/magazine/:year', {
          templateUrl: 'views/magazine.html',
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
  .constant('FIREBASE_URL', 'https://hkpga.firebaseio.com/')
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });
