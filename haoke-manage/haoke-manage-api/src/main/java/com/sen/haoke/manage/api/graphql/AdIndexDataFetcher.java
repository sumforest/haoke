package com.sen.haoke.manage.api.graphql;

import com.sen.haoke.manage.api.service.AdService;
import com.sen.haoke.manage.api.vo.ad.index.IndexAdResult;
import com.sen.haoke.manage.api.vo.ad.index.IndexAdResultData;
import com.sen.haoke.manage.dubbo.server.pojo.Ad;
import com.sen.haoke.manage.dubbo.server.vo.PageInfo;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 13:55
 * @Description:
 */
@Component
public class AdIndexDataFetcher implements MyDataFetcher {

    @Resource
    private AdService adService;

    @Override
    public String fileName() {
        return "AdIndexList";
    }

    @Override
    public Object dataFetcher(DataFetchingEnvironment environment) {
        PageInfo<Ad> pageInfo = adService.list(1, 1, 3);
        List<IndexAdResultData> list = new ArrayList<>();
        for (Ad ad : pageInfo.getData()) {
            list.add(new IndexAdResultData(ad.getUrl()));
        }
        return new IndexAdResult(list);
    }
}
