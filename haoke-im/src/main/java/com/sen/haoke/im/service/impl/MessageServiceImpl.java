package com.sen.haoke.im.service.impl;

import com.sen.haoke.im.dao.MessageDao;
import com.sen.haoke.im.pojo.Message;
import com.sen.haoke.im.service.MessageService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/17 23:28
 * @Description:
 */
@Service
public class MessageServiceImpl implements MessageService {

    @Resource
    private MessageDao messageDao;

    @Override
    public List<Message> listMessage(Long fromId, Long toId, int page, int rows) {
        List<Message> listByFromAndTo = messageDao.findListByFromAndTo(fromId, toId, page, rows);
        listByFromAndTo.forEach(message -> {
            if (message.getStatus() == 1) {
                //如果当前的消息状态为未读状态，修改为已读状态
                messageDao.updateMessageStatus(message.getId(), 2);
            }
        });
        return listByFromAndTo;
    }

    @Override
    public Message findLastedMessage(Long fromId, Long toId) {
        return messageDao.findLastedMessage(fromId, toId);
    }
}
