angular.module('timekeeperApp').service('DepartmentService', function DepartmentService($http) {
    var exports = {};
    exports.getDepartments = function() {
         return $http.get("/v1/departments")
            .then(function(res){ return res.data; })
            .catch(function(error) { console.log(error.message);});
    };
    return exports;
 });