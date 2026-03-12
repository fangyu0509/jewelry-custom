package com.jewelry.service;

import com.jewelry.entity.User;
import com.jewelry.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    public Map<String, Object> wxLogin(String code) {
        // TODO: 调用微信接口获取 openid
        // 这里简化处理，实际需要根据 code 调用微信 API
        User user = new User();
        user.setId(1L);
        user.setOpenid("mock_openid_" + code);
        
        return Map.of(
            "token", "mock_jwt_token_" + user.getId(),
            "userId", user.getId(),
            "isNew", true
        );
    }
    
    public Map<String, Object> getUserInfo(Long userId) {
        User user = userRepository.selectById(userId);
        if (user == null) {
            return Map.of();
        }
        return Map.of(
            "id", user.getId(),
            "nickname", user.getNickname(),
            "avatar", user.getAvatar(),
            "phone", user.getPhone()
        );
    }
    
    public void updateUserInfo(Long userId, Map<String, Object> params) {
        User user = userRepository.selectById(userId);
        if (user != null) {
            if (params.containsKey("nickname")) user.setNickname((String) params.get("nickname"));
            if (params.containsKey("avatar")) user.setAvatar((String) params.get("avatar"));
            if (params.containsKey("phone")) user.setPhone((String) params.get("phone"));
            userRepository.updateById(user);
        }
    }
}
