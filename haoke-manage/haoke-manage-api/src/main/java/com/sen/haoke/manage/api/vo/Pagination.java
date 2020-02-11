package com.sen.haoke.manage.api.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @Auther: Sen
 * @Date: 2020/2/10 23:49
 * @Description:
 */
@Data
@AllArgsConstructor
public class Pagination {

    private Integer current;

    private Integer pageSize;

    private Integer total;
}
