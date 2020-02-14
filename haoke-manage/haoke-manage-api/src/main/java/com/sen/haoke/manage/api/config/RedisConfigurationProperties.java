package com.sen.haoke.manage.api.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/14 17:40
 * @Description:
 */
@Component
@ConfigurationProperties(prefix = "spring.redis.cluster")
@Data
public class RedisConfigurationProperties {

    /**
     * 节点地址
     */
    private List<String> nodes;

    /**
     * 最大转发次数
     */
    private Integer maxRedirects;
}
