angular.module('myApp').directive('notification', function() {
    return {
        restrict: 'E',
        scope: {
            type: '@',
            message: '@'
        },
        template: `
      <div  ng-class="{'success': type === 'success', 'error': type === 'error'}">
        {{ message }}
      </div>
    `,
    };
});
