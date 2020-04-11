package com.sen.haoke.im.websocket;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sen.haoke.im.dao.MessageDao;
import com.sen.haoke.im.pojo.Message;
import com.sen.haoke.im.pojo.UserData;
import org.apache.rocketmq.spring.annotation.MessageModel;
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 23:26
 * @Description: 实现消息的处理逻辑
 */
@Component
@RocketMQMessageListener(
        topic = "haoke-im-send-message",
        selectorExpression = "SEND_MSG",
        messageModel = MessageModel.BROADCASTING,
        consumerGroup = "haoke-im-group"
)
public class MyHandler extends TextWebSocketHandler implements RocketMQListener<String> {

    @Resource
    private MessageDao messageDao;

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Resource
    private RocketMQTemplate rocketMQTemplate;

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
        String msg = jsonNode.get("msg").textValue();
        //创建消息对象
        Message target = Message.builder()
                .from(UserData.USER_MAP.get(uid))
                .to(UserData.USER_MAP.get(toId))
                .msg(msg)
                .build();

        //保存到MongoDB
        target = messageDao.save(target);
        String msgJson = MAPPER.writeValueAsString(target);
        //判断接收用户是否在线
        WebSocketSession toSession = LONG_WEB_SOCKET_SESSION_MAP.get(toId);
        if (toSession != null && toSession.isOpen()) {
            //发送消息
            toSession.sendMessage(new TextMessage(msgJson));
            //把MongoDB的消息状态更新为已读
            messageDao.updateMessageStatus(target.getId(), 2);
        }else{
            //当前的Session不在当前JVM或者Session不在线,发送消息到MQ
            rocketMQTemplate.convertAndSend("haoke-im-send-message:SEND_MSG", msgJson);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        //获取当前断开连接的用户的uid
        Long uid = (Long) session.getAttributes().get("uid");
        //移除当前断开连接的用户
        LONG_WEB_SOCKET_SESSION_MAP.remove(uid);
    }

    /**
     * RocketMQ接收消息接口实现
     * @param message RocketMQ消息
     */
    @Override
    public void onMessage(String message) {
        //获取uid
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(message);
            long uid = jsonNode.get("to").get("id").longValue();
            WebSocketSession toSession = LONG_WEB_SOCKET_SESSION_MAP.get(uid);
            if (toSession != null && toSession.isOpen()) {
                //发送消息
                toSession.sendMessage(new TextMessage(message));
                //更新消息状态为已读
                messageDao.updateMessageStatus(new ObjectId(jsonNode.get("id").textValue()), 2);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
