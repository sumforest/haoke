package com.sen.haoke.manage.api.vo.ad.index;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 13:44
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndexAdResult {

    private List<IndexAdResultData> list;
}
