package com.sen.haoke.manage.api.graphql;

import com.sen.haoke.manage.api.service.HouseResourcesService;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;

/**
 * @Auther: Sen
 * @Date: 2020/2/12 00:12
 * @Description:
 */
@Component
public class HouseResourcesQuery implements MyDataFetcher {

    @Resource
    private HouseResourcesService service;

    @Override
    public String fileName() {
        return "HouseResources";
    }

    @Override
    public Object dataFetcher(DataFetchingEnvironment environment) {
        Long id = environment.getArgument("id");
        return service.queryHouseResources(id);
    }
}
