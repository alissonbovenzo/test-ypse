(function(){
    'use strict';
    
    angular.module('ypse.verses', ['ui.router'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('verses',{
                abstract: true,
                url:  '/verses'
            })

            .state('verses.list', {
                url: '/list',
                templateUrl: '/assets/app/modules/verses/templates/list.html'
            })

            .state('verses.edit', {
                url: '/edit',
                templateUrl: '/assets/app/modules/verses/templates/edit.html'
            })
    }
    
})();