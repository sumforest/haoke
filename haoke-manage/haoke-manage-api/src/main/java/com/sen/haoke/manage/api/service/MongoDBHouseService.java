package com.sen.haoke.manage.api.service;

import com.sen.haoke.manage.api.pojo.MongoDBMapper;
import com.sen.haoke.manage.api.vo.map.MapHouseDataResult;
import com.sen.haoke.manage.api.vo.map.MapHouseXY;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/22 01:25
 * @Description: MongDB实现地图找房
 */
@Service
public class MongoDBHouseService {
    /**
     * 存储比例尺-->v和缩放等级-->k
     */
    public static final Map<Integer, Double> BAIDU_ZOOM = new HashMap<>();
    static {
        BAIDU_ZOOM.put(19, 20d / 1000); //单位为km
        BAIDU_ZOOM.put(18, 50d / 1000);
        BAIDU_ZOOM.put(17, 100d / 1000);
        BAIDU_ZOOM.put(16, 200d / 1000);
        BAIDU_ZOOM.put(15, 500d / 1000);
        BAIDU_ZOOM.put(14, 1d);
        BAIDU_ZOOM.put(13, 2d);
        BAIDU_ZOOM.put(12, 5d);
        BAIDU_ZOOM.put(11, 10d);
        BAIDU_ZOOM.put(10, 20d);
        BAIDU_ZOOM.put(9, 25d);
        BAIDU_ZOOM.put(8, 50d);
        BAIDU_ZOOM.put(7, 100d);
        BAIDU_ZOOM.put(6, 200d);
        BAIDU_ZOOM.put(5, 500d);
        BAIDU_ZOOM.put(4, 1000d);
        BAIDU_ZOOM.put(3, 2000d);
        BAIDU_ZOOM.put(2, 5000d);
        BAIDU_ZOOM.put(1, 10000d);
    }

    @Resource
    private MongoTemplate mongoTemplate;

    /**
     * 地图找房
     *
     * @param lng  经度
     * @param lat  纬度
     * @param zoom 缩放等级
     * @return 搜索到的房源
     */
    public MapHouseDataResult queryHouseDataByMap(Float lng, Float lat, Integer zoom) {
        //默认查找范围是比例尺的1.5倍距离查找，除以111.12-->地球1°代表111.12km
        double maxDistance = BAIDU_ZOOM.get(zoom) * 1.5 / 111.12;
        Criteria criteria = Criteria.where("loc").near(new Point(lng, lat)).maxDistance(maxDistance);
        Query query = Query.query(criteria);
        List<MongoDBMapper> mongoDBMappers = mongoTemplate.find(query, MongoDBMapper.class);
        List<MapHouseXY> list= new ArrayList<>();
        mongoDBMappers.forEach(mongoDBMapper ->
                list.add(new MapHouseXY(mongoDBMapper.getLoc()[0], mongoDBMapper.getLoc()[1])));
        return new MapHouseDataResult(list);
    }
}
