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
        //redis客户端中已经集成netty但是es依赖会重新导入netty依赖倒置冲突
        //java.lang.IllegalStateException: availableProcessors is already set to [6], rejecting [6]
        System.setProperty("es.set.netty.runtime.available.processors","false");
        SpringApplication.run(DubboApiApplication.class, args);
    }
}
