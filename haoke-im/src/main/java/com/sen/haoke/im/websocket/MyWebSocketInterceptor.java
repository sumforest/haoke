package com.sen.haoke.im.websocket;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 23:32
 * @Description: 建立WebSocket之前握手拦截器
 */
@Component
public class MyWebSocketInterceptor implements HandshakeInterceptor {
    /**
     *
     * @param request
     * @param response
     * @param wsHandler
     * @param attributes
     * @return 返回false握手失败建立连接失败
     * @throws Exception
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        //获取websocket的请求路径：ws/{uid}
        String path = request.getURI().getPath();
        String[] paths = StringUtils.split(path, '/');
        if (paths.length != 2) {
            return false;
        }
        if (!StringUtils.isNumeric(paths[1])) {
            return false;
        }
        //把路径参数发送消息的uid存入Session
        attributes.put("uid", Long.valueOf(paths[1]));
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
