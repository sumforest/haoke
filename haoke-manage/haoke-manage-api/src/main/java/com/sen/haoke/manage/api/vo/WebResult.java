package com.sen.haoke.manage.api.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 12:34
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebResult {

    /**
     * 状态码
     */
    //忽略此属性转换成Json字符串
    @JsonIgnore
    private Integer status;

    /**
     * 消息
     */
    @JsonIgnore
    private String msg;

    /**
     * 保存图片地址的集合
     */
    @JsonIgnore
    private List<?> list;

    @JsonIgnore
    public static WebResult build(List<?> list) {
        return new WebResult(200, "成功", list);
    }

    @JsonIgnore
    public static WebResult build(List<?> list,String msg) {
        return new WebResult(200, msg, list);
    }

    public Map<String, Object> getData() {
        Map<String,Object> data = new HashMap<>();
        data.put("list", list);
        return data;
    }

    public Map<String, Object> getMeta() {
        Map<String,Object> meta = new HashMap<>();
        meta.put("status", this.status);
        meta.put("msg", this.msg);
        return meta;
    }
}
