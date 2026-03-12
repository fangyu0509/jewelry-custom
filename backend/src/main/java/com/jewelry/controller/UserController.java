package com.jewelry.controller;

import com.jewelry.service.UserService;
import com.jewelry.util.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 用户控制器
 */
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    /**
     * 微信登录
     */
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody Map<String, String> params) {
        String code = params.get("code");
        Map<String, Object> result = userService.wxLogin(code);
        return Result.success(result);
    }
    
    /**
     * 获取用户信息
     */
    @GetMapping("/info")
    public Result<Map<String, Object>> getInfo(@RequestHeader("X-User-Id") Long userId) {
        Map<String, Object> userInfo = userService.getUserInfo(userId);
        return Result.success(userInfo);
    }
    
    /**
     * 更新用户信息
     */
    @PutMapping("/info")
    public Result<Void> updateInfo(@RequestBody Map<String, Object> params,
                                    @RequestHeader("X-User-Id") Long userId) {
        userService.updateUserInfo(userId, params);
        return Result.success();
    }
}
