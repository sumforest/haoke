package com.sen.haoke.manage.dubbo.server.api;

import com.sen.haoke.manage.dubbo.server.pojo.Ad;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 00:22
 * @Description:
 */
public interface ApiAdService {

    /**
     * 分页查询广告
     * @param type 广告类型
     * @param page 第几页
     * @param pageSize 页宽
     * @return
     */
    PageInfo<Ad> queryAdList(Integer type, Integer page, Integer pageSize);
}
