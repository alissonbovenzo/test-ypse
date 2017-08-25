(function(){
    'use strict';
    
    angular.module('ypse.verses', [
        'ui.router',
        'ngStorage'
    ])
        .config(routeConfig)
        .controller('versesListController', versesListController)
        .controller('versesEditController', versesEditController)

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
                templateUrl: '/assets/app/modules/verses/templates/list.html',
                controller: 'versesListController'
            })

            .state('verses.new', {
                url: '/new',
                templateUrl: '/assets/app/modules/verses/templates/edit.html',
                controller : 'versesEditController'
            })
            .state('verses.edit', {
                url: '/edit/:id',
                templateUrl: '/assets/app/modules/verses/templates/edit.html',
                controller : 'versesEditController'
            })
    }

    function versesListController($scope, $localStorage){
        $scope.verses = $localStorage.verses;
        $scope.users = $localStorage.users;
    }

    function versesEditController($scope, $localStorage, $stateParams, $state){
        $scope.currentPath = $state.current.name;
        $scope.users = $localStorage.users;
        var $verses = $localStorage.verses || [];

        if(!$scope.users.length ){
            alert('Necessário cadastrar ao menos um usuário');
            $state.go('users.new');
        }

        function validate(text){
            if(text.split(' ').length < 3){
                alert('Um verso deve ter ao menos 3 palavras!');
                return false;
            }
            return true;
        }
        
        if($stateParams.id){
            $scope.data = $verses[$stateParams.id]
            $scope.submit = function(){
                console.log($scope.data.user)
                if(!validate($scope.data.text)) return;
                $scope.data.timestamp = Date.now();
                $verses[$stateParams.id] = $scope.data;
                $localStorage.verses = $verses;
                $state.go('verses.list');
            }
            $scope.delete = function(){
                $verses.splice($stateParams.id,1);
                $localStorage.verses = $verses;
                $state.go('verses.list')
            }
            return;
        }

        $scope.submit = function(){
            if(!validate($scope.data.text)) return;
            $scope.data.timestamp = Date.now();
            $verses.push($scope.data);
            $localStorage.verses = $verses;
            $state.go('verses.list')
        }
        
    }
    
})();