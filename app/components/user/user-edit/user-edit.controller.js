angular.module('myApp').controller('UserEditController', UserEditController);

UserEditController.$inject = ['$routeParams', 'UserService', '$window', '$location', '$timeout'];

function UserEditController($routeParams, UserService, $window, $location, $timeout) {
    const vm = this;

    const usernameParam = $routeParams.username;
    vm.showSuccessNotification = false;
    vm.showErrorNotification = false;
    vm.showDeleteNotification = false;

    vm.users = UserService.getUsers();

    vm.user = vm.users.find(function (user) {
        return user.username === usernameParam;
    });

    vm.editingUser = angular.copy(vm.user);

    vm.navigateToEditUser = function (username) {
        $location.path('/user-list/edit/' + username);
    };

    vm.editUser = function () {
        const success = UserService.editUser(vm.editingUser);

        if (success) {
            vm.showSuccessNotification = true;
            $timeout(function () {
                vm.showSuccessNotification = false;
                $location.path('/user-list');
            }, 2000);

        } else {
            vm.showErrorNotification = true;

            $timeout(function () {
                vm.showErrorNotification = false;
            }, 2000);
        }
    };

    vm.deleteUser = function () {
        const success = UserService.deleteUser(vm.user.username);

        if (success) {
            vm.showDeleteNotification = true;

            $timeout(function () {
                vm.showDeleteNotification = false;
                $location.path('/user-list');
            }, 2000);

        }
    };
}
