package com.sen.haoke.manage.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @Auther: Sen
 * @Date: 2020/2/25 21:33
 * @Description:
 */
@Configuration
public class WxConfiguration {

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
