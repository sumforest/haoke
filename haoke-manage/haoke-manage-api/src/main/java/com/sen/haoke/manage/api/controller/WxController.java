package com.sen.haoke.manage.api.controller;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import javax.annotation.Resource;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/25 21:19
 * @Description:
 */
@RestController
@RequestMapping("wx")
public class WxController {

    @Resource
    private RestTemplate restTemplate;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    private static final String APPID = "wxdf4e811a794c2550";
    private static final String APPSECRET = "7da5705c884d71ec8dd2612d395e7655";

    @PostMapping
    public Map<String, Object> login(String code) {
        Map<String, Object> result = new HashMap<>();

        String url = "https://api.weixin.qq.com/sns/jscode2session?" +
                "appid=" + APPID +
                "&secret=" + APPSECRET +
                "&js_code=" + code +
                "&grant_type=authorization_code";

        String jsonData = restTemplate.getForObject(url, String.class);

        if (StringUtils.contains(jsonData, "errcode")) {
            //请求微信后台失败
            result.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        } else {
            result.put("status", HttpStatus.CREATED.value());
        }

        String ticket = "HAOKE_" + DigestUtils.md5Hex(jsonData);
        String redisKey = "WX_LOGIN_" + ticket;
        //保存到redis中
        assert jsonData != null;
        redisTemplate.opsForValue().set(redisKey, jsonData, Duration.ofDays(7));
        result.put("data", ticket);
        return result;
    }
}
