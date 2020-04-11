package com.sen.haoke.manage.api.config;

import com.sen.haoke.manage.api.interceptor.RedisInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.annotation.Resource;
/**
 * @Auther: Sen
 * @Date: 2020/2/14 23:22
 * @Description:
 */
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Resource
    private RedisInterceptor redisInterceptor;

    /**
     * 注册自定义{@link RedisInterceptor}拦截器到Spring拦截器链中
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //拦截所有路径
        registry.addInterceptor(redisInterceptor).addPathPatterns("/**");
    }
}
