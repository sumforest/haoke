package com.sen.haoke.manage.api.interceptor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sen.haoke.manage.api.controller.GraphQLController;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import javax.annotation.Resource;
import java.time.Duration;

/**
 * @Auther: Sen
 * @Date: 2020/2/15 01:13
 * @Description: 使用代理模式给Get请求获得的数据写入Redis
 * 触发时机：再@ResponseBody返回前
 * 不使用拦截器原因：
 * 拦截器的Response中无法获取数据库的数据
 */
@ControllerAdvice
public class MyResponseBodyAdvice implements ResponseBodyAdvice {

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 是否支持增强
     *
     * @param returnType
     * @param converterType
     * @return 返回true执行 beforeBodyWrite()
     */
    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        if (returnType.hasMethodAnnotation(GetMapping.class)) {
            return true;
        }
        //为GrapQL的Post请求时执行增强
        if (returnType.hasMethodAnnotation(PostMapping.class)
                && StringUtils.equals(GraphQLController.class.getName(), returnType.getExecutable().getDeclaringClass().getName())) {
            return true;
        }
        return false;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType
            , Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        try {
            String redisKey = RedisInterceptor.getRedisKey(((ServletServerHttpRequest) request).getServletRequest());
            String value;
            if (body instanceof String) {
                value = (String) body;
            } else {
                ObjectMapper objectMapper = new ObjectMapper();

                value = objectMapper.writeValueAsString(body);

            }
            redisTemplate.opsForValue().set(redisKey, value, Duration.ofHours(1));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return body;
    }
}
