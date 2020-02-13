package com.sen.haoke.manage.dubbo.server.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@TableName("tb_ad")
public class Ad extends BasePojo {

    private static final long serialVersionUID = 4564934949291812681L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    //广告类型
    private Integer type;

    //描述
    private String title;

    //'图片URL地址
    private String url;
}