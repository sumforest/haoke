package com.sen.haoke.manage.api.graphql;

import com.sen.haoke.manage.api.service.HouseResourcesService;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;

/**
 * @Auther: Sen
 * @Date: 2020/2/12 00:34
 * @Description:
 */
@Component
public class HouseResourcesList implements MyDataFetcher {

    @Resource
    private HouseResourcesService service;

    @Override
    public String fileName() {
        return "HouseResourcesList";
    }

    @Override
    public Object dataFetcher(DataFetchingEnvironment environment) {
        Integer page = environment.getArgument("page");
        page = page == null ? 1 : page;
        Integer pageSize = environment.getArgument("pageSize");
        pageSize = pageSize == null ? 10 : pageSize;
        return service.list(null, page, pageSize);
    }
}
