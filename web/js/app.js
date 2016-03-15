'use strict';

// Declare app level module which depends on views, and components
angular.module('magpieDemo', [
  'magpieDemo.controllers',
  'magpieDemo.directives',
  'ngRoute',
  'ngAnimate',
  'ui.router'
])
.config(['$routeProvider', '$locationProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $urlRouterProvider) {
  $routeProvider
	.when("/", {templateUrl: "partials/home.html"})
	.otherwise({redirectTo: '/'});
}]);
