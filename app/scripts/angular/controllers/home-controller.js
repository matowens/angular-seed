(function() {
    'use strict';

    angular.module('client').controller('home', [
        '$scope', 'ngNotify', function($scope, ngNotify) {

            NProgress.start();
            NProgress.done();

            ngNotify.set('Welcom to the home page.');
        }
    ]);
})();
