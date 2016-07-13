package net.chronos.timekeeper.controller;

import net.chronos.timekeeper.dto.DepartmentDTO;
import net.chronos.timekeeper.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/v1/departments")
public class DepartmentsController {

    private static final Logger log = LoggerFactory.getLogger(EmployeesContoller.class);
    @Autowired
    DepartmentService departmentService;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<DepartmentDTO> getDepartments() {
        log.info("Get departments");
        return departmentService.getDepartments();
    }
}
