package com.sen.haoke.manage.api.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/10 23:48
 * @Description:
 */
@Data
@AllArgsConstructor
public class TableResult<T> {

    private List<T> list;

    private Pagination pagination;
}
