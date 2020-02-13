package com.sen.haoke.manage.api.controller;

import com.sen.haoke.manage.api.service.HouseResourcesService;
import com.sen.haoke.manage.api.vo.TableResult;
import com.sen.haoke.manage.dubbo.server.pojo.HouseResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 23:33
 * @Description:
 */
@RestController
@RequestMapping("house/resources")
public class HouseResourcesController {

    @Resource
    private HouseResourcesService service;

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody HouseResources houseResources) {
        boolean isSuccess = service.save(houseResources);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping
    public TableResult<HouseResources> list(HouseResources houseResources,
                                            @RequestParam(defaultValue = "1") Integer currentPage,
                                            @RequestParam(defaultValue = "10") Integer pageSize) {
        return service.list(houseResources, currentPage, pageSize);
    }

    /**
     * 更新房源
     * @param houseResources json封装称pojo
     * @return
     */
    @PutMapping
    public ResponseEntity<Void> updateHouseResources(@RequestBody HouseResources houseResources) {
        boolean isSuccess = service.updateHouseResources(houseResources);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
