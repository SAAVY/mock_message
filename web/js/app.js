'use strict';

var blogfiles = [
  'home',
  'bloomberg-internship'
];

// TODO: Remove the fucking hashtag from the URL
// Declare app level module which depends on views, and components
angular.module('personalWebsite', [
  'personalWebsite.controllers',
  'personalWebsite.directives',
  'ngRoute',
  'ngAnimate',
  'ui.router'
])
.config(['$routeProvider', '$locationProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $urlRouterProvider) {
  $routeProvider
	.when("/", {templateUrl: "partials/home.html"})
	.when("/resume", {templateUrl: "partials/resume.html"})
  .when("/blog", {templateUrl: "blog/home.html"})
  .when("/blog/:name", {
    templateUrl: function(urlattr) {
      if(blogfiles.indexOf(urlattr.name.toLowerCase()) >= 0) {
        return '/blog/' + urlattr.name.toLowerCase() + '.html';
      } else {
        return 'blog/home.html';
      }
    }
  })
	.otherwise({redirectTo: '/'});
}]);
