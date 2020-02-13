package com.sen.haoke.manage.dubbo.server.service;

import com.sen.haoke.manage.dubbo.server.pojo.Ad;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 00:31
 * @Description:
 */
public interface AdService {

    PageInfo<Ad> queryAdList(Ad ad, Integer page, Integer pageSize);
}
