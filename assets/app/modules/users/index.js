(function(){
    'use strict';
    
    angular.module('ypse.users', [
        'ui.router',
        'ngStorage'
    ])
        .config(routeConfig)
        .controller('usersListController', usersListController)
        .controller('usersEditController', usersEditController)

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('users',{
                abstract: true,
                url:  '/users'
            })

            .state('users.list', {
                url: '/list',
                templateUrl: '/assets/app/modules/users/templates/list.html',
                controller: 'usersListController'
            })

            .state('users.new', {
                url: '/new',
                templateUrl: '/assets/app/modules/users/templates/edit.html',
                controller: 'usersEditController'
            })
            .state('users.edit', {
                url: '/edit/:id',
                templateUrl: '/assets/app/modules/users/templates/edit.html',
                controller: 'usersEditController'
            })
    }

    function usersListController($scope, $localStorage){
        $scope.users = $localStorage.users;
    }

    function usersEditController($scope, $localStorage, $stateParams, $state){
        $scope.currentPath = $state.current.name;
        var $users = $localStorage.users || [];
        $scope.data;

        function validate(name, email){
            if(name.length < 3){
                alert('Necessário inserir um nome com no minimo 3 caracteres');
                return false;
            }
            return true;
        }
        if($stateParams.id){
            $scope.data = $users[$stateParams.id]
            $scope.submit = function(){
                if(!validate($scope.data.name)) return;
                $users[$stateParams.id] = $scope.data;
                $localStorage.users = $users;
                $state.go('users.list');
            }
            $scope.delete = function(){
                $users.splice($stateParams.id,1);
                $localStorage.users = $users;
                $state.go('users.list')
            }
            return;
        }
        $scope.submit = function(){
            if(!validate($scope.data.name)) return;
            $users.push($scope.data);
            $localStorage.users = $users;
            $state.go('users.list')
        }
        
    }
    
})();