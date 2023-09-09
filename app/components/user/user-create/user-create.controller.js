angular.module('myApp').controller('UserCreateController', UserCreateController);

UserCreateController.$inject = ['UserService', '$window', '$location', '$timeout'];

function UserCreateController(UserService, $window, $location, $timeout) {
    const vm = this;

    vm.newUser = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        type: '',
        password: '',
        repeatPassword: ''
    };

    vm.users = UserService.getUsers();
    vm.showSuccessNotification = false;
    vm.showErrorNotification = false;

    vm.navigateToEditUser = function (username) {
        $location.path('/user-list/edit/' + username);
    };

    vm.createUser = function () {
        const success = UserService.createUser(vm.newUser);

        if (success) {
            vm.showSuccessNotification = true;

            $timeout(function () {
                vm.showSuccessNotification = false;
                $window.location.href = '#/user-list';
            }, 2000);
        } else {
            vm.showErrorNotification = true;

            $timeout(function () {
                vm.showErrorNotification = false;
            }, 2000);
        }
    };
}
