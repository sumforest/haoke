package com.sen.haoke.manage.api.pojo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Auther: Sen
 * @Date: 2020/2/22 01:22
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//指定MongoDB中的表明
@Document(collection = "house")
public class MongoDBMapper {

    @Id
    //把该属性解析成json字符串
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private Long hid;

    private String title;

    private Float[] loc;
}
