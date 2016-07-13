package net.chronos.timekeeper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EmployeesPageController {

    @RequestMapping("/")
    public String getTimeKeeperPage(Model model) {
        return "index";
    }
}
