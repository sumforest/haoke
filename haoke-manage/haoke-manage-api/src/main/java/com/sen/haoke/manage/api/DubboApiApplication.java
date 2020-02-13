package com.sen.haoke.manage.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 23:39
 * @Description:
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class DubboApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(DubboApiApplication.class, args);
    }
}
