angular.module('myApp').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/user-list', {
            templateUrl: '/app/components/user/user-list/user-list.html',
            controller: 'UserListController',
            controllerAs: 'vm'
        })
        .when('/user-list/create', {
            templateUrl: '/app/components/user/user-create/user-create.html',
            controller: 'UserCreateController',
            controllerAs: 'vm'
        })
        .when('/user-list/edit/:username', {
            templateUrl: '/app/components/user/user-edit/user-edit.html',
            controller: 'UserEditController',
            controllerAs: 'vm'
        })
        .when('/403', {
            templateUrl: '/app/components/error-pages/403.html'
        })
        .when('/404', {
            templateUrl: '/app/components/error-pages/404.html'
        })
        .otherwise({
            redirectTo: '/user-list'
        });
}]);
