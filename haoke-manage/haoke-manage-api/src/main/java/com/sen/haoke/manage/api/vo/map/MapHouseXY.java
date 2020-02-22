package com.sen.haoke.manage.api.vo.map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Auther: Sen
 * @Date: 2020/2/21 13:58
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapHouseXY {

    /**
     * 经度
     */
    private Float x;

    /**
     * 纬度
     */
    private Float y;
}
