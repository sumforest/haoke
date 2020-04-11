package com.sen.haoke.im.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import javax.annotation.Resource;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 23:33
 * @Description:
 */
@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer {

    @Resource
    private MyHandler myHandler;

    @Resource
    private MyWebSocketInterceptor webSocketInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        //配置websocket路径和参数
        registry.addHandler(myHandler, "/ws/{uid}")
                //配置跨域
                .setAllowedOrigins("*")
                //配置拦截器
                .addInterceptors(webSocketInterceptor);
    }
}
