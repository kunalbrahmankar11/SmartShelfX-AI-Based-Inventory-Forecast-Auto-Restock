package AI.SmartShelfXInventory.controller;


import AI.SmartShelfXInventory.model.User;
import AI.SmartShelfXInventory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth") // allow React frontend
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/signin")
    public String signin(@RequestBody User user) {
        return userService.loginUser(user.getEmail(), user.getPassword());
    }
}