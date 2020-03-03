package com.sen.haoke.manage.api.vo;

import com.sen.haoke.manage.api.pojo.HouseData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Set;

/**
 * @Auther: Sen
 * @Date: 2020/2/28 15:33
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResult {

    private Integer totalPage;

    private List<HouseData> list;

    private Set<String> hotWord;
}
