package com.sen.haoke.manage.dubbo.server.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sen.haoke.manage.dubbo.server.pojo.Ad;
import com.sen.haoke.manage.dubbo.server.service.AdService;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 00:32
 * @Description:
 */
@Service
@Transactional
public class AdServiceImpl extends BaseServiceImpl<Ad> implements AdService {


    @Override
    public PageInfo<Ad> queryAdList(Ad ad, Integer page, Integer pageSize) {
        IPage<Ad> adIPage = super.page(ad, page, pageSize);
        return new PageInfo<>(adIPage.getTotal(), page, pageSize, adIPage.getRecords());
    }
}
