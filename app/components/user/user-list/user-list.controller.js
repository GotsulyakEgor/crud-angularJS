angular.module('myApp').controller('UserListController', UserListController);

UserListController.$inject = ['$location', 'UserService'];

function UserListController($location, UserService) {
    const vm = this;
    vm.users = UserService.getUsers();

    vm.navigateToEditUser = function (username) {
        $location.path('/user-list/edit/' + username);
    };
}
