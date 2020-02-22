package com.sen.haoke.manage.api.graphql;

import com.sen.haoke.manage.api.service.MongoDBHouseService;
import com.sen.haoke.manage.api.vo.map.MapHouseDataResult;
import com.sen.haoke.manage.api.vo.map.MapHouseXY;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/21 13:52
 * @Description:
 */
@Component
public class MapHouseDataFetcher implements MyDataFetcher {

    @Resource
    private MongoDBHouseService houseService;

    @Override
    public String fileName() {
        return "MapHouseData";
    }

    @Override
    public Object dataFetcher(DataFetchingEnvironment environment) {
        //经度
        Float lng = ((Double) environment.getArgument("lng")).floatValue();
        //纬度
        Float lat = ((Double) environment.getArgument("lat")).floatValue();
        //缩放级别
        Integer zoom = environment.getArgument("zoom");
        /*System.out.printf("lan: %f,lat: %f,zoom: %d\n", lng, lat, zoom);
        List<MapHouseXY> list = new ArrayList<>();
        list.add(new MapHouseXY(116.43244f, 39.929986f));
        list.add(new MapHouseXY(116.424355f, 39.92982f));
        list.add(new MapHouseXY(116.423349f, 39.935214f));
        list.add(new MapHouseXY(116.350444f, 39.931645f));
        list.add(new MapHouseXY(116.351684f, 39.91867f));
        list.add(new MapHouseXY(116.353983f, 39.913855f));
        list.add(new MapHouseXY(116.357253f, 39.923152f));
        list.add(new MapHouseXY(116.349168f, 39.923152f));
        list.add(new MapHouseXY(116.36232f, 39.938339f));
        list.add(new MapHouseXY(116.374249f, 39.94625f));
        list.add(new MapHouseXY(116.380178f, 39.953053f));*/
        return houseService.queryHouseDataByMap(lng, lat, zoom);
    }
}
