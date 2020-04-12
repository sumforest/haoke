package com.sen.haoke.manage.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import javax.annotation.Resource;

/**
 * @Auther: Sen
 * @Date: 2020/2/14 17:45
 * @Description:
 */
@Configuration
public class RedisConfiguration {

    @Resource
    private RedisConfigurationProperties redisConfigurationProperties;

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(redisConfigurationProperties.getNodes());
        redisClusterConfiguration.setMaxRedirects(redisConfigurationProperties.getMaxRedirects());
        return new JedisConnectionFactory(redisClusterConfiguration);
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();;
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        return redisTemplate;
    }
}
