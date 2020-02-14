package com.sen.haoke.manage.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.Set;

/**
 * @Auther: Sen
 * @Date: 2020/2/14 17:54
 * @Description:
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class RedisTemplateTest {

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @Test
    public void testRedisTemplate(){
        for (int i = 0; i < 100; i++) {
            redisTemplate.opsForValue().set("key" + i, "value" + i);
        }
        Set<String> keys = this.redisTemplate.keys("key*");
        for (String key : keys) {
            String value = redisTemplate.opsForValue().get(key);
            System.out.println(value);
        }
        System.out.println("key的个数"+keys.size());
    }
}
