'use strict';

// Declare app level module which depends on views, and components
angular.module('ngFriend', [
  'ngRoute',
  'ngFriend.view1',
  'ngFriend.view2',
  'ngFriend.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  // $locationProvider.hashPrefix('');
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
