(function() {
    'use strict';

    angular.module('client').config([
        '$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

            $locationProvider.html5Mode(true).hashPrefix('!');

            $routeProvider

            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'home'
            })

            .when('/404', {
                templateUrl: 'partials/404.html'
            })

            .otherwise({
                redirectTo: '/404'
            });
        }
    ]);
})();
