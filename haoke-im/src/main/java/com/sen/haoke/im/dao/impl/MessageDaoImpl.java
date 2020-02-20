package com.sen.haoke.im.dao.impl;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.sen.haoke.im.dao.MessageDao;
import com.sen.haoke.im.pojo.Message;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 22:15
 * @Description:
 */
@Component
public class MessageDaoImpl implements MessageDao {

    @Resource
    private MongoTemplate mongoTemplate;

    @Override
    public List<Message> findListByFromAndTo(Long from, Long to, int page, int pageSize) {
        //从A到B的消息
        Criteria aCriteria = new Criteria().andOperator(
                Criteria.where("from.id").is(from),
                Criteria.where("to.id").is(to)
                );
        //从B到A的消息
        Criteria bCriteria = new Criteria().andOperator(
                Criteria.where("from.id").is(to),
                Criteria.where("to.id").is(from)
        );
        Criteria criteria = new Criteria().orOperator(aCriteria, bCriteria);
        //设置分页
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Query query = Query.query(criteria).with(pageable).with(Sort.by(Sort.Direction.ASC, "send_date"));
        return mongoTemplate.find(query, Message.class);
    }

    @Override
    public Message findMessageById(ObjectId id) {
        return mongoTemplate.findById(id, Message.class);
    }

    @Override
    public UpdateResult updateMessageStatus(ObjectId id, Integer status) {
        Query query = Query.query(Criteria.where("id").is(id));
        Update update = Update.update("status", status);
        if (status == 1) {
            //更新发送消息的时间
            update.set("send_date", new Date());
        }
        if (status == 2) {
            //更新已读时间
            update.set("read_date", new Date());
        }
        return mongoTemplate.updateFirst(query, update, Message.class);
    }

    @Override
    public Message findLastedMessage(Long fromId, Long toId) {
        Criteria aCriteria = new Criteria().andOperator(
                Criteria.where("from.id").is(fromId),
                Criteria.where("to.id").is(toId)
        );
        Criteria bCriteria = new Criteria().andOperator(
                Criteria.where("from.id").is(toId),
                Criteria.where("to.id").is(fromId)
        );
        Query query = Query.query(new Criteria().orOperator(aCriteria, bCriteria)).with(Sort.by(Sort.Direction.DESC, "send_date")).limit(1);
        List<Message> messages = mongoTemplate.find(query, Message.class);
        Message message = null;
        if (messages.size() > 0) {
            message = messages.get(0);
        }
        return message;
    }

    @Override
    public Message save(Message message) {
        message.setSendDate(new Date());
        message.setStatus(1);
        message.setId(ObjectId.get());
        return mongoTemplate.save(message);
    }

    @Override
    public DeleteResult deleteMessage(ObjectId id) {
        return mongoTemplate.remove(Query.query(Criteria.where("id").is(id)), Message.class);
    }
}
