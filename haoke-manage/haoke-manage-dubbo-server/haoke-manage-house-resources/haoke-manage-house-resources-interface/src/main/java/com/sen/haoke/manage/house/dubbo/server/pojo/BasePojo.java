package com.sen.haoke.manage.house.dubbo.server.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 17:26
 * @Description:
 */
@Data
public class BasePojo implements Serializable {
    private static final long serialVersionUID = 4473116347449685301L;

    private Date created;

    private Date updated;
}
