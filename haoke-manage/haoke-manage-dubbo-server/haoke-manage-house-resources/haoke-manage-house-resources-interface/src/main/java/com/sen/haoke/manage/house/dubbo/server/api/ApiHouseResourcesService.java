package com.sen.haoke.manage.house.dubbo.server.api;

import com.sen.haoke.manage.house.dubbo.server.pojo.HouseResources;
import com.sen.haoke.manage.house.dubbo.server.vo.PageInfo;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 22:29
 * @Description: Dubbo服务接口
 */
public interface ApiHouseResourcesService {

    /**
     * 新增房源
     *
     * @param houseResources
     * @return -1 参数不匹配，0 插入数据库失败，1 新增成功
     */
    int saveHouseResources(HouseResources houseResources);

    /**
     * 分页查询房源列表
     *
     * @param page           页数
     * @param pageSize       每页多少条
     * @param queryCondition 查询条件
     * @return 分页对象
     */
    PageInfo<HouseResources> queryHouseResourcesList(int page, int pageSize, HouseResources queryCondition);

    /**
     * 通过id查询房源
     *
     * @param id
     * @return
     */
    HouseResources queryHouseResourcesById(Long id);
}
