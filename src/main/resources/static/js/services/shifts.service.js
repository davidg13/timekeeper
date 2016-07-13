angular.module('timekeeperApp').service('ShiftService', function ShiftService($http) {
    var exports = {};

    exports.getShiftTypes = function() { return ['Regular', 'Vacation', 'Sick', 'Holiday', 'UnpaidLeave']};

    exports.getShiftsForEmployee = function(id) {
         var url = "/v1/shifts?employee-id=" + id;
          return $http.get(url)
            .then(function(response){ console.log(response); return response.data; })
            .catch(function(error) { console.log(error.data.message);});
     };

  //prepare shift data for posting
    exports.prepareData = function(newShift) {
         var data = {};
         data.employeeId = newShift.employeeId;
         data.shiftType = newShift.shiftType;
         data.startTime = newShift.startTime;
         data.endTime = newShift.endTime;

         if(newShift.shiftType == 'Regular' && newShift.hasLunch) {
            data.lunchStartTime = newShift.lunchStartTime;
            data.lunchEndTime = newShift.lunchEndTime;
         }

         return JSON.stringify(data);
     };

     exports.dateWithHours = function(hours, minutes) {
        var dwh = new Date();
        dwh.setHours(hours);
        dwh.setMinutes(minutes);
        dwh.setSeconds(0);
        dwh.setMilliseconds(0);
        return dwh;
     };

     exports.postShift = function(shift) {
         var data = this.prepareData(shift);
          console.log(data);
         var url = "/v1/shifts";
         return $http.post(url,data)
            .then(function() { return {creationError: false, creationErrorMessage: ""};})

     };

     exports.deleteShift = function(shiftId) {
         var url = "/v1/shifts/" + shiftId;
         return $http.delete(url)
            .then(function() { return true; })
            .catch(function(err) { console.log("Error deleting shift: " + err.message); });
     };

     exports.newShift = function() {
        var newShift = {
                    employeeId: null,
                    date: new Date(),
                    shiftType: 'Regular',
                    startTime: this.dateWithHours(9,0),
                    endTime:  this.dateWithHours(17,0),
                    hasLunch: true,
                    lunchStartTime:  this.dateWithHours(12,0),
                    lunchEndTime:  this.dateWithHours(12,30)
                };
        return newShift;

     };

    exports.validateShift = function(newShift) {
            var ns = newShift;
            var error = { creationError: false, creationErrorMessage: ''};

            //set date for time fields
            ns.startTime.setFullYear(ns.date.getFullYear());
            ns.startTime.setMonth(ns.date.getMonth());
            ns.startTime.setDate(ns.date.getDate());

            //set date for time fields
            ns.endTime.setFullYear(ns.date.getFullYear());
            ns.endTime.setMonth(ns.date.getMonth());
            ns.endTime.setDate(ns.date.getDate());

            //set date for time fields
            ns.lunchStartTime.setFullYear(ns.date.getFullYear());
            ns.lunchStartTime.setMonth(ns.date.getMonth());
            ns.lunchStartTime.setDate(ns.date.getDate());

            //set date for time fields
            ns.lunchEndTime.setFullYear(ns.date.getFullYear());
            ns.lunchEndTime.setMonth(ns.date.getMonth());
            ns.lunchEndTime.setDate(ns.date.getDate());

            if(ns.startTime.getTime() >= ns.endTime.getTime()) {
               error.creationError = true;
               error.creationErrorMessage = "Shift must end after it begins";
                 return error;
            }
            //validate lunch only for regular shift
            if(ns.shiftType === 'Regular') {
               if(ns.hasLunch) {
                    // make sure times are sequential
                   if(ns.lunchStartTime.getTime() >= ns.lunchEndTime.getTime()) {
                       error.creationError = true;
                       error.creationErrorMessage = "Lunch must end after it begins";
                       return error;
                   } else if(ns.startTime.getTime() >= ns.lunchStartTime.getTime() || ns.endTime.getTime() <= ns.lunchEndTime.getTime()) {
                       error.creationError = true;
                       error.creationErrorMessage = "Lunch must be during the shift";
                       return error;
                   }
               } else {
                    var duration = (ns.endTime.getTime() - ns.startTime.getTime()) / 3600000;
                    if(duration >= 6) {
                        error.creationError = true;
                        error.creationErrorMessage = "Lunch must be taken for a 6+ hour shift";
                        return error;
                    }
               }
            }

            //no problems - empty error
            return error;
    };

    return exports;
});