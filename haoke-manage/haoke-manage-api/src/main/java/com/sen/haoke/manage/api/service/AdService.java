package com.sen.haoke.manage.api.service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.sen.haoke.manage.dubbo.server.api.ApiAdService;
import com.sen.haoke.manage.dubbo.server.pojo.Ad;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;
import org.springframework.stereotype.Service;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 12:31
 * @Description:
 */
@Service
public class AdService {

    @Reference(version = "1.0.0")
    private ApiAdService apiAdService;

    public PageInfo<Ad> list(Integer type,Integer page,Integer pageSize) {
        return apiAdService.queryAdList(type, page, pageSize);
    }
}
