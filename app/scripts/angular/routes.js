(function() {
    'use strict';

    angular.module('client').config([

        '$locationProvider','$stateProvider', '$urlRouterProvider',

        function($locationProvider, $stateProvider, $urlRouterProvider) {

            $locationProvider.html5Mode(true).hashPrefix('!');

            $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'partials/home.html',
                controller: 'home',
            })

            .state('404', {
                url: '/404',
                templateUrl: 'partials/404.html'
            });

            $urlRouterProvider.otherwise('/404');
        }
    ]);
})();
