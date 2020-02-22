package com.sen.haoke.manage.api.vo.map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/21 13:59
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapHouseDataResult {

    private List<MapHouseXY> list;
}
