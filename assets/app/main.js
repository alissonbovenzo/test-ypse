(function(){
    'use strict';
    angular.module('ypse', [
        'ypse.users',
        'ypse.verses',
        'ypse.directives'
    ])
    .config(configs)

    function configs($localStorageProvider){
         $localStorageProvider.setKeyPrefix('ypse.');
    }

})();