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

    /**
     * 获取GraphQL操作名
     * @return String
     */
    String fileName();

    /**
     * 返回结果映射封装对象返回
     * @param environment 查询参数
     * @return 查询结果
     */
    Object dataFetcher(DataFetchingEnvironment environment);
}
