package com.sen.haoke.manage.api.controller;

import com.sen.haoke.manage.api.config.MockConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
/**
 * @Auther: Sen
 * @Date: 2020/2/13 21:48
 * @Description:
 */
@RestController
@CrossOrigin
@RequestMapping("mock")
public class MockController {

    @Resource
    private MockConfiguration mockConfig;

    /**
     * 菜单
     *
     * @return
     */
    @GetMapping("index/menu")
    public String indexMenu() {
        return this.mockConfig.getIndexMenu();
    }
    /**
     * 首页资讯
     * @return
     */
    @GetMapping("index/info")
    public String indexInfo() {
        return this.mockConfig.getIndexInfo();
    }
    /**
     * 首页问答
     * @return
     */
    @GetMapping("index/faq")
    public String indexFaq() {
        return this.mockConfig.getIndexFaq();
    }
    /**
     * 首页房源信息
     * @return
     */
    @GetMapping("index/house")
    public String indexHouse() {
        return this.mockConfig.getIndexHouse();
    }

    /**
     * 查询资讯
     *
     * @param type
     * @return
     */
    @GetMapping("infos/list")
    public String infosList(@RequestParam("type")Integer type) {
        switch (type){
            case 1:
                return this.mockConfig.getInfosList1();
            case 2:
                return this.mockConfig.getInfosList2();
            case 3:
                return this.mockConfig.getInfosList3();
        }
        return this.mockConfig.getInfosList1();
    }
    /**
     * 我的中心
     * @return
     */
    @GetMapping("my/info")
    public String myInfo() {
        return this.mockConfig.getMy();
    }

}
