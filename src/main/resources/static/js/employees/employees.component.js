angular.module('employeesModule',['ui.bootstrap','ngRoute']);
angular.module('employeesModule').component('employeesList',{
    templateUrl: '/js/employees/employees.tpl.html',
    controller: ['$scope', '$location','EmployeeService', 'DepartmentService','$routeParams',
    function EmployeesController($scope, $location, EmployeeService, DepartmentService,$routeParams){
        $scope.getDepartments = function() {

            DepartmentService.getDepartments().
                then(function (data) {
                        $scope.departments = data;
                        console.log(data);
                   },
                   function(error) {
                        console.log('error', error);
                   }
                );
        };

        $scope.searchEmployees = function() {
          if($scope.empSearchLast || $scope.empSearchDept) {
            EmployeeService.searchEmployees($scope.empSearchLast,$scope.empSearchDept).
                then(function (data) {
                        $scope.employees = data;
                        console.log(data);
                   },
                   function(error) {
                        console.log('error', error);
                   }
                );
          } else {
            EmployeeService.allEmployees().
                then(function (data) {
                        $scope.employees = data;
                     },
                     function(error) {
                        console.log('error', error);
                     }
                );
          }
        };

        $scope.viewShiftsForEmployee = function(id) {
            $location.path("shifts/" + id);
        };

        $scope.createShift = function(id) {
            $location.path("create-shift/" + id);
        };
        /* search employees */
        $scope.empSearchLast = "";
        $scope.empSearchDept = "";
        $scope.searchEmployees();
        $scope.getDepartments();
    }]
});