package com.sen.haoke.manage.house.dubbo.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sen.haoke.manage.house.dubbo.server.pojo.HouseResources;
import com.sen.haoke.manage.house.dubbo.server.service.HouseResourcesService;
import com.sen.haoke.manage.house.dubbo.server.vo.PageInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 22:35
 * @Description:
 */
@Service
@Transactional
public class HouseResourcesServiceImpl extends BaseServiceImpl<HouseResources> implements HouseResourcesService {

    @Override
    public int saveHouseResources(HouseResources houseResources) {
        if (StringUtils.isBlank(houseResources.getTitle())) {
            return -1;
        }
        return super.Insert(houseResources);
    }

    @Override
    public PageInfo<HouseResources> queryHouseResourcesList(int page, int pageSize, HouseResources queryCondition) {
        QueryWrapper<HouseResources> wrapper = new QueryWrapper<>(queryCondition);
        wrapper.orderByDesc("updated");
        IPage<HouseResources> iPage = super.queryByPage(wrapper, page, pageSize);
        return new PageInfo<>(iPage.getTotal(), page, pageSize, iPage.getRecords());
    }

    @Override
    public HouseResources queryHouseResourcesById(Long id) {
        return super.selectById(id);
    }
}
