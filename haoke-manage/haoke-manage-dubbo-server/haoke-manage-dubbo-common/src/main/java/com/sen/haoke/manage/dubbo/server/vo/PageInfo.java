package com.sen.haoke.manage.dubbo.server.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/10 17:40
 * @Description:
 */
@Data
@AllArgsConstructor
public class PageInfo<T> implements Serializable {

    private static final long serialVersionUID = -19655311717372894L;

    private Long total;

    private int page;

    private int pageSize;

    private List<T> data;
}
