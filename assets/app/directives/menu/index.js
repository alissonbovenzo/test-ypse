(function(){
    'use strict';
    
    angular.module('ypse.directives.menu', [])
        .directive('menu', menu);

    /** @ngInject */

    function menu(){
        return {
            restrict: 'A',
            templateUrl : '/assets/app/directives/menu/menu.html'
        }
    }
})();