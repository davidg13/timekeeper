var timekeeperApp = angular.module('timekeeperApp', ['ui.bootstrap', 'ngRoute', 'shiftsModule', 'employeesModule']);
timekeeperApp.controller('TimekeeperCtrl', function() {console.log('shoe');});
timekeeperApp.config(['$routeProvider',
    function config($routeProvider, $locationProvider) {
        $routeProvider.
            when('/employees',{
                template: '<employees-list><employees-list>'
            }).
            when('/shifts/:employeeId',{
                template: '<shifts-list><shift-list>'
            }).
            when('/create-shift/:employeeId',{
                            template: '<shifts-create><shift-create>'
            }).
            otherwise({ redirectTo: 'employees'});
    }
]);
angular.module('timekeeperApp').run(['$route', function(){}]);