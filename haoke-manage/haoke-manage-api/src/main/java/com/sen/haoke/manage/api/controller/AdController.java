package com.sen.haoke.manage.api.controller;

import com.sen.haoke.manage.api.service.AdService;
import com.sen.haoke.manage.api.vo.WebResult;
import com.sen.haoke.manage.dubbo.server.pojo.Ad;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 12:29
 * @Description:
 */
@RequestMapping("ad")
@RestController
@CrossOrigin
public class AdController {

    @Resource
    private AdService adService;

    @GetMapping
    public WebResult list() {
        PageInfo<Ad> pageInfo = adService.list(1, 1, 3);
        ArrayList<Map<String, String>> list = new ArrayList<>();
        pageInfo.getData().forEach(data -> {
            Map<String, String> map = new HashMap<>();
            map.put("original", data.getUrl());
            list.add(map);
        });
        return WebResult.build(list);
    }
}
