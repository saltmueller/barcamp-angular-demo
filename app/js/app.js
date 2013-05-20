'use strict';


// Declare app level module which depends on directives
angular.module('myApp', ['ngResource', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/crud', {templateUrl: 'partials/crud.html', controller: CRUDCtrl});
    $routeProvider.when('/clock', {templateUrl: 'partials/clock.html', controller: ClockCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
