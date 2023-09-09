angular.module('myApp').service('UserService', UserService);

function UserService($q) {
    const users = [
        {
            username: 'user1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            type: 'Admin',
            password: 'aboba1235',
            repeatPassword: 'aboba1235'
        },
        {
            username: 'user2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            type: 'Driver',
            password: 'aboba123',
            repeatPassword: 'aboba123'
        },
    ];

    this.getUsers = function () {
        return users;
    };

    this.createUser = function (newUser) {
        if (validateUser(newUser)) {
            users.push(angular.copy(newUser));
            return true;
        } else {
            return false;
        }
    };

    this.editUser = function (updatedUser) {
        if (validateUser(updatedUser, true)) {
            const index = users.findIndex(function (user) {
                return user.username === updatedUser.username;
            });
            if (index !== -1) {
                users[index] = angular.copy(updatedUser);
                return true;
            }
        }
    };

    this.deleteUser = function (username) {
        const index = users.findIndex(function (user) {
            return user.username === username;
        });
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
    };

    function validateUser(user, edit) {
        let isValid = true;
        if (!edit) {
            if (!isUsernameUnique(user.username)) {
                highlightInput('username', 'usernameLabel');
                isValid = false;
            }
        }

        if (!isFirstNameValid(user.firstName)) {
            highlightInput('firstName', 'firstNameLabel');
            isValid = false;
        }

        if (!isLastNameValid(user.lastName)) {
            highlightInput('lastName', 'lastNameLabel');
            isValid = false;
        }

        if (!isEmailValid(user.email)) {
            highlightInput('email', 'emailLabel');
            isValid = false;
        }

        if (!isPasswordValid(user.password)) {
            highlightInput('password', 'passwordLabel');
            isValid = false;
        }

        if (!isUserTypeValid(user.type)) {
            highlightInput('userType', 'typeLabel');
            isValid = false;
        }

        if (!isPasswordIdentic(user.password, user.repeatPassword)) {
            highlightInput('repeat-password', 'repeatPasswordLabel');
            isValid = false;
        }

        return isValid;
    }

    function highlightInput(inputId, labelId) {
        const inputElement = document.getElementById(inputId);
        const inputLabelElement = document.getElementById(labelId);

        if (inputElement) {
            inputElement.classList.add('error-highlight');
        }
        if (inputLabelElement) {
            inputLabelElement.style.display = 'block';
        }
    }

    function isUsernameUnique(username) {
        if (!!username) {
            return !users.some(function (user) {
                return user.username === username;
            });
        } else {
            return false
        }
    }

    function isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function isPasswordValid(password) {
        return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password) && password.length >= 8;
    }

    function isFirstNameValid(firstName) {
        return !!firstName;
    }

    function isLastNameValid(lastName) {
        return !!lastName;
    }

    function isUserTypeValid(userType) {
        return !!userType;
    }

    function isPasswordIdentic(password, repeatPassword) {
        return password === repeatPassword;
    }
}
