package com.sen.haoke.im.pojo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;

/**
 * @Auther: Sen
 * @Date: 2020/2/16 15:42
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//声明当前对象对应的表为message（当不做声明时Spring把当前对象名转小写后作为表明）
@Document(collection = "message")
public class Message {

    @Id
    //指定属性使用JackSon序列化称字符串
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String msg;

    /**
     * 消息状态 1-已读，2-未读
     */
    @Indexed
    private Integer status;

    @Indexed
    @Field("send_date")
    private Date sendDate;

    @Field("read_date")
    private Date readDate;

    @Indexed
    private User from;

    @Indexed
    private User to;
}
