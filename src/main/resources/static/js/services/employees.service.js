angular.module('timekeeperApp').service('EmployeeService', function EmployeeService($http) {
    var exports = {};
    exports.searchEmployees = function(empSearchLast, empSearchDept) {
        var url = "/v1/employees?last=" + empSearchLast;
        if(empSearchDept){
            url += "&department=" + empSearchDept;
        }
        console.log(url);
       return $http.get(url)
           .then(function(response){ return response.data; })
           .catch(function(error) { console.log(error.message);});
    };

    exports.allEmployees = function() {
         return $http.get("/v1/employees")
            .then(function(response){ return response.data; })
            .catch(function(error) { console.log(error.message);});
    };

    exports.getEmployee = function(employeeId) {
        return $http.get("/v1/employees/" + employeeId)
                .then(function(response){  return response.data; })
                .catch(function(error) { console.log(error.message);});
    }
    return exports;
 });

