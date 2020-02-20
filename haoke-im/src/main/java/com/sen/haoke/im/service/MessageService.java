package com.sen.haoke.im.service;

import com.sen.haoke.im.pojo.Message;

import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/17 23:26
 * @Description:
 */
public interface MessageService {

    /**
     * 返回最新的点对点聊天的所有消息
     * @param fromId 发送用户id
     * @param toId 接收用户id
     * @param page 页数
     * @param rows 页宽
     * @return 消息集合
     */
    List<Message> listMessage(Long fromId, Long toId, int page, int rows);

    /**
     * 查找最新发送的消息
     * @param fromId 发送用户id
     * @param toId 接收用户id
     * @return
     */
    Message findLastedMessage(Long fromId, Long toId);
}
