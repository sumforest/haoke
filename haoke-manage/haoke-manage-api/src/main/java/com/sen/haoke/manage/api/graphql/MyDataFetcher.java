package com.sen.haoke.manage.api.graphql;

import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;

/**
 * @Auther: Sen
 * @Date: 2020/2/12 00:04
 * @Description:
 */
@Component
public interface MyDataFetcher {

    String fileName();

    Object dataFetcher(DataFetchingEnvironment environment);
}
