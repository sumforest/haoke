package com.sen.haoke.manage.dubbo.server.service;

import com.sen.haoke.manage.dubbo.server.pojo.HouseResources;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 22:33
 * @Description: SpringMVC的数据承载模型接口，提供事务
 */
public interface HouseResourcesService {
    /**
     * 新增房源
     * @param houseResources
     * @return -1 参数不匹配，0 插入数据库失败，1 新增成功
     */
    int saveHouseResources(HouseResources houseResources);

    PageInfo<HouseResources> queryHouseResourcesList(int page, int pageSize, HouseResources queryCondition);

    HouseResources queryHouseResourcesById(Long id);

    boolean updateHouseResources(HouseResources houseResources);
}
