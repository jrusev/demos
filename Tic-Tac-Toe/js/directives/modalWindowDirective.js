'use strict';

ticTacToeApp.directive('modalWindow', function() {
    return {
        restrict: 'A',
        templateUrl: 'views/directives/modal-window.html',
        replace: false
    }
});