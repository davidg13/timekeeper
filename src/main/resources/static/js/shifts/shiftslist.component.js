angular.module('shiftsModule',['ui.bootstrap','ngRoute']);
angular.module('shiftsModule').component('shiftsList',{
    templateUrl: '/js/shifts/shiftslist.tpl.html',
    controller: ['$scope', '$location', 'EmployeeService', 'ShiftService','$routeParams',
    function ShiftsController($scope, $location, EmployeeService, ShiftService, $routeParams){
        $scope.getShifts = function(id) {
            ShiftService.getShiftsForEmployee(id)
                    .then(function (data) {
                            $scope.shifts = data;
                          },
                          function(error) {
                            console.log('error', error);
                          }
            );
        };

        $scope.getEmployee = function(id) {
             EmployeeService.getEmployee(id)
                     .then(function (data) {
                             $scope.shiftEmployee = data;
                           },
                           function(error) {
                             console.log('error', error);
                           }
                     );
        };

        $scope.viewShiftsForEmployee = function(id) {
            $scope.getEmployee(id);
            $scope.getShifts(id);

        };

        $scope.deleteShift = function(shiftId, idx) {
            ShiftService.deleteShift(shiftId)
                .then(function (data) {
                          $scope.shifts.splice(idx,1);
                      },
                      function(error) {
                          console.log('error', error);
                      }
                );

        };

        $scope.closeShifts = function() {
            $location.path('employees');
        };

        $scope.shifts = [];
        $scope.viewShiftsForEmployee($routeParams.employeeId);
    }]
});