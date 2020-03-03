package com.sen.haoke.manage.api.controller;

import com.sen.haoke.manage.api.service.SearchService;
import com.sen.haoke.manage.api.vo.SearchResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import java.util.Set;

/**
 * @Auther: Sen
 * @Date: 2020/2/28 15:34
 * @Description:
 */
@RestController
@CrossOrigin
@RequestMapping("search")
public class SearchController {

    @Resource
    private SearchService searchService;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    private static final String REDISKEY = "HAOKE_HOTWORD";

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchController.class);

    @GetMapping
    public SearchResult search(String keyword, @RequestParam(defaultValue = "1") Integer page) {
        //防止爬虫爬走过多的数据
        if (page > 100) {
            page = 1;
        }
        SearchResult search = searchService.search(keyword, page);
        //每次搜索总条数
        int count = Math.max(search.getTotalPage() - 1, 1) * SearchService.ROWS + search.getList().size();
        //使用zset保存每次搜索的关键词和获取的总数量
        redisTemplate.opsForZSet().add(REDISKEY, keyword, count);
        //当搜索结果的总页数<=1需要热词
        if (search.getTotalPage() <= 1) {
            Set<String> strings = redisTemplate.opsForZSet().reverseRange(REDISKEY, 0, 4);
            search.setHotWord(strings);
        }
            //写日志
            LOGGER.info("[Search关键字为: " + keyword + "]  总条数为：" + count);
        return search;
    }
}
