package com.sen.haoke.im.dao;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.sen.haoke.im.pojo.Message;
import org.bson.types.ObjectId;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 15:54
 * @Description:
 */
public interface MessageDao {

    /**
     * 查询点对点聊天记录
     *
     * @param from     发送用户id
     * @param to       接收用户id
     * @param page     页数
     * @param pageSize 页宽
     * @return
     */
    List<Message> findListByFromAndTo(Long from, Long to, int page, int pageSize);

    /**
     * 通过主键查询消息
     * @param id
     * @return
     */
    Message findMessageById(ObjectId id);

    /**
     * 更新消息状态
     * @param id
     * @param status
     * @return
     */
    UpdateResult updateMessageStatus(ObjectId id, Integer status);

    Message save(Message message);

    DeleteResult deleteMessage(ObjectId id);
}
