package com.sen.haoke.im.websocket;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sen.haoke.im.dao.MessageDao;
import com.sen.haoke.im.pojo.Message;
import com.sen.haoke.im.pojo.UserData;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 23:26
 * @Description: 实现消息的处理逻辑
 */
@Component
public class MyHandler extends TextWebSocketHandler {

    @Resource
    private MessageDao messageDao;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    /**
     * 保存在线的用户的Session
     */
    private static final Map<Long,WebSocketSession> LONG_WEB_SOCKET_SESSION_MAP = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //获取当前用户的uid
        Long uid = (Long) session.getAttributes().get("uid");
        //把当前登录的用户保存起来
        LONG_WEB_SOCKET_SESSION_MAP.put(uid, session);
    }

    /**
     * 消息发送时执行的逻辑
     * @param session
     * @param message
     * @throws Exception
     */
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        //获取当前用户的uid
        Long uid = (Long) session.getAttributes().get("uid");

        //解析json数据
        JsonNode jsonNode = MAPPER.readTree(message.getPayload().toString());
        //接收的用户的uid
        long toId = jsonNode.get("toId").asLong();
        String msg = jsonNode.get("msg").toString();
        //创建消息对象
        Message target = Message.builder()
                .from(UserData.USER_MAP.get(uid))
                .to(UserData.USER_MAP.get(toId))
                .msg(msg)
                .build();

        //保存到MongoDB
        target = messageDao.save(target);

        //判断接收用户是否在线
        WebSocketSession toSession = LONG_WEB_SOCKET_SESSION_MAP.get(toId);
        if (toSession != null && toSession.isOpen()) {
            //发送消息
            session.sendMessage(new TextMessage(MAPPER.writeValueAsString(target)));
            //把MongoDB的消息状态更新为已读
            messageDao.updateMessageStatus(target.getId(), 2);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        //获取当前断开连接的用户的uid
        Long uid = (Long) session.getAttributes().get("uid");
        //移除当前断开连接的用户
        LONG_WEB_SOCKET_SESSION_MAP.remove(uid);
    }
}
