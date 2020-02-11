package com.sen.haoke.manage.house.dubbo.server.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 22:59
 * @Description:
 */
@Configuration
@MapperScan("com.sen.haoke.manage.house.dubbo.server.mapper")
public class MybatisConfig {

    /**
     * 注入分页拦截器，用于MyBatisPlus分页
     * @return
     */
    @Bean
    public PaginationInterceptor createPaginationInterceptor(){
        return new PaginationInterceptor();
    }
}
