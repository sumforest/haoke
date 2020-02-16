package com.sen.haoke.im;

import com.sen.haoke.im.dao.MessageDao;
import com.sen.haoke.im.pojo.Message;
import com.sen.haoke.im.pojo.User;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 22:41
 * @Description:
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestMessageDao {

    @Resource
    private MessageDao dao;

    @Test
    public void testSave(){
        Message message = Message.builder()
                .id(ObjectId.get())
                .msg("你好")
                .sendDate(new Date())
                .status(1)
                .from(new User(1001L, "zhangsan"))
                .to(new User(1002L,"lisi"))
                .build();
        dao.save(message);

        message = Message.builder()
                .id(ObjectId.get())
                .msg("你也好")
                .sendDate(new Date())
                .status(1)
                .to(new User(1001L, "zhangsan"))
                .from(new User(1002L,"lisi"))
                .build();
        dao.save(message);

        message = Message.builder()
                .id(ObjectId.get())
                .msg("我在学习开发IM")
                .sendDate(new Date())
                .status(1)
                .from(new User(1001L, "zhangsan"))
                .to(new User(1002L,"lisi"))
                .build();
        dao.save(message);

        message = Message.builder()
                .id(ObjectId.get())
                .msg("那很好啊！")
                .sendDate(new Date())
                .status(1)
                .to(new User(1001L, "zhangsan"))
                .from(new User(1002L,"lisi"))
                .build();
        dao.save(message);

        System.out.println("OK");
    }

    @Test
    public void testQuery(){
        dao.findListByFromAndTo(1001L, 1002L, 1, 10)
                .forEach(System.out::println);
    }

    @Test
    public void testUpdate(){
        System.out.println(dao.updateMessageStatus(new ObjectId("5e4956d60cf58e3124193e7f"), 2));
    }

    @Test
    public void testDelete(){
        System.out.println(dao.deleteMessage(new ObjectId("5e4956d60cf58e3124193e7f")));
    }
}
