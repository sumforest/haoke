package com.sen.haoke.im.controller;

import com.sen.haoke.im.pojo.Message;
import com.sen.haoke.im.pojo.User;
import com.sen.haoke.im.pojo.UserData;
import com.sen.haoke.im.service.MessageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/17 23:32
 * @Description:
 */
@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    @Resource
    private MessageService messageService;

    /**
     * 查询微聊功能主页的用户列表
     * @return
     */
    @GetMapping
    public List<Map<String, Object>> listIndexUser(Long fromId) {
        List<Map<String,Object>> result = new ArrayList<>();
        UserData.USER_MAP.forEach(
                (k,v)->{
                    Map<String,Object> map = new HashMap<>();
                    map.put("id", v.getId());
                    map.put("avatar", "http://javasite.oss-cn-shenzhen.aliyuncs.com/9f88eea4-b0b8-4e95-a5ee-32aa6aadecf0.jpg");
                    map.put("from_user", fromId);
                    map.put("to_user", v.getId());
                    map.put("username", v.getUsername());
                    Message lastedMessage = messageService.findLastedMessage(fromId, v.getId());
                    if (lastedMessage != null) {
                        map.put("chat_time", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(lastedMessage.getSendDate()));
                        map.put("chat_msg", lastedMessage.getMsg());
                    }
                    map.put("info_type", null);
                    result.add(map);
                }
        );
        return result;
    }
}
