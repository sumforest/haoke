package com.sen.haoke.manage.api.service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.sen.haoke.manage.api.vo.Pagination;
import com.sen.haoke.manage.api.vo.TableResult;
import com.sen.haoke.manage.house.dubbo.server.api.ApiHouseResourcesService;
import com.sen.haoke.manage.house.dubbo.server.pojo.HouseResources;
import com.sen.haoke.manage.house.dubbo.server.vo.PageInfo;
import org.springframework.stereotype.Service;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 23:31
 * @Description:
 */
@Service
public class HouseResourcesService {

    @Reference(version = "1.0.0")
    private ApiHouseResourcesService houseResourcesService;

    public boolean save(HouseResources houseResources) {
        return houseResourcesService.saveHouseResources(houseResources) == 1;
    }

    public TableResult<HouseResources> list(HouseResources houseResources, Integer currentPage, Integer currentSize) {
        PageInfo<HouseResources> pageInfo = houseResourcesService.queryHouseResourcesList(currentPage, currentSize, houseResources);
        return new TableResult<>(pageInfo.getData(), new Pagination(currentPage, currentSize, pageInfo.getTotal().intValue()));
    }

    public Object queryHouseResources(Long id) {
        return houseResourcesService.queryHouseResourcesById(id);
    }
}
