package com.sen.haoke.manage.dubbo.server.api;

import com.alibaba.dubbo.config.annotation.Service;
import com.sen.haoke.manage.dubbo.server.pojo.Ad;
import com.sen.haoke.manage.dubbo.server.service.AdService;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;
import javax.annotation.Resource;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 00:27
 * @Description:
 */
@Service(version = "1.0.0")
public class ApiAdServiceImpl implements ApiAdService {

    @Resource
    private AdService adService;

    @Override
    public PageInfo<Ad> queryAdList(Integer type, Integer page, Integer pageSize) {
        Ad ad = new Ad();
        ad.setType(type);
        return adService.queryAdList(ad, page, pageSize);
    }
}
