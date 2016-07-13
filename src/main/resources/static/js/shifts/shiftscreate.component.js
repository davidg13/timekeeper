angular.module('shiftsModule').component('shiftsCreate',{
    templateUrl: '/js/shifts/shiftscreate.tpl.html',
    controller: ['$scope', '$location', 'EmployeeService', 'ShiftService','$routeParams',
    function ShiftsController($scope, $location, EmployeeService, ShiftService, $routeParams){
        $scope.createShift = function(id) {
            $scope.newShift = ShiftService.newShift();
            $scope.newShift.employeeId = id;
        }

        $scope.cancelCreate = function() {
            $scope.clearShift();
            $location.path('employees');
        };

        $scope.clearShift = function() {
            $scope.newShift = ShiftService.newShift();
            $scope.shiftEmployee = "";
            $scope.creationError = false;
            $scope.creationErrorMessage = "";
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

        $scope.shiftChange = function() {
            var error = ShiftService.validateShift($scope.newShift);
            $scope.unpackShiftError(error);
        };

        $scope.postShift = function () {
            var error = ShiftService.validateShift($scope.newShift);
            $scope.unpackShiftError(error);

            if(!$scope.creationError) {
                ShiftService.postShift($scope.newShift)
                    .then(function (data) {
                              $scope.creationError = false;
                              $scope.creationErrorMessage = "";
                              $location.path('employees');
                          },
                          function(error) {
                             console.log('error', error);
                             $scope.creationError = true;
                             $scope.creationErrorMessage = error.data.message;

                          }
                    );
            }


        };

        $scope.unpackShiftError = function(error) {
                $scope.creationError = error.creationError;
                $scope.creationErrorMessage = error.creationErrorMessage;
        };

        //initialize
       /* shift creation */
       $scope.shiftTypes = ShiftService.getShiftTypes();
       $scope.getEmployee($routeParams.employeeId);
       $scope.createShift($routeParams.employeeId);
       $scope.creationError = false;
       $scope.creationErrorMessage = "";
    }]
});