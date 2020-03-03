package com.sen.haoke.manage.api.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

/**
 * @Auther: Sen
 * @Date: 2020/2/28 14:52
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "haoke", type = "house", createIndex = false)
public class HouseData {

    @Id
    private String id;

    private String title;

    private String rent;

    private String houseType;

    private String time;

    private String rentMethod;

    private String floor;

    private String img;

    /**
     * 朝向
     */
    private String orientation;
}
