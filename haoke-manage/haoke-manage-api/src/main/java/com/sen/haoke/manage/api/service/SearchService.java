package com.sen.haoke.manage.api.service;

import com.sen.haoke.manage.api.pojo.HouseData;
import com.sen.haoke.manage.api.vo.SearchResult;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.SearchResultMapper;
import org.springframework.data.elasticsearch.core.aggregation.AggregatedPage;
import org.springframework.data.elasticsearch.core.aggregation.impl.AggregatedPageImpl;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/28 15:38
 * @Description:
 */
@Service
public class SearchService {

    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;

    public static final Integer ROWS = 10;

    /**
     * 全文搜索，使用反射返回高亮字段
     *
     * @param keyword 关键字
     * @param page    页数
     * @return
     */
    public SearchResult search(String keyword, Integer page) {
        //设置分页参数
        PageRequest pageRequest = PageRequest.of(page - 1, ROWS);
        SearchQuery query = new NativeSearchQueryBuilder()
                //混合查询,and操作
                .withQuery(QueryBuilders.multiMatchQuery(keyword, "title","title.pinyin").operator(Operator.AND))
                .withHighlightFields(new HighlightBuilder.Field("title"))
                .withPageable(pageRequest)
                .build();

        AggregatedPage<HouseData> houseData = elasticsearchTemplate.queryForPage(query
                , HouseData.class
                , new SearchResultMapper() {
                    @Override
                    public <T> AggregatedPageImpl mapResults(SearchResponse searchResponse, Class<T> aClass, Pageable pageable) {
                        //没有匹配到数据
                        if (searchResponse.getHits().totalHits == 0) {
                            return new AggregatedPageImpl<>(Collections.emptyList(), pageable, 0L);
                        }
                        List<T> list = new ArrayList<>();
                        //通过反射把数据写入对应的类中
                        for (SearchHit hit : searchResponse.getHits()) {
                            Map<String, Object> sourceAsMap = hit.getSourceAsMap();
                            //遍历命中的一条数据的map，key为属性名，value为属性值
                            T t = (T) ReflectUtils.newInstance(aClass);
                            sourceAsMap.forEach((k, v) -> {
                                try {
                                    if (!k.equals("url")) {
                                        FieldUtils.writeField(t, k, v, true);
                                    }
                                } catch (IllegalAccessException e) {
                                    e.printStackTrace();
                                }
                            });
                            //写入id
                            try {
                                FieldUtils.writeField(t, "id", hit.getId(), true);
                            } catch (IllegalAccessException e) {
                                e.printStackTrace();
                            }

                            //处理高亮字段
                            hit.getHighlightFields().forEach((k, v) -> {
                                Text[] fragments = v.getFragments();
                                StringBuilder stringBuilder = new StringBuilder();
                                for (Text fragment : fragments) {
                                    stringBuilder.append(fragment.toString());
                                }
                                //写入高亮字段
                                try {
                                    FieldUtils.writeField(t, k, stringBuilder.toString(), true);
                                } catch (IllegalAccessException e) {
                                    e.printStackTrace();
                                }
                            });
                            list.add(t);
                        }
                        return new AggregatedPageImpl(list, pageable, searchResponse.getHits().totalHits);
                    }
                });

        return new SearchResult(houseData.getTotalPages(), houseData.getContent(),null);
    }
}
