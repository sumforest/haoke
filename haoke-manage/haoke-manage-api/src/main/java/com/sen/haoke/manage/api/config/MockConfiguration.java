package com.sen.haoke.manage.api.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @Auther: Sen
 * @Date: 2020/2/13 21:45
 * @Description:
 */
@Configuration
@PropertySource("classpath:mock-data.properties")
@ConfigurationProperties(prefix = "mock")
@Data
public class MockConfiguration {

    private String indexMenu;

    private String indexInfo;

    private String indexFaq;

    private String indexHouse;

    private String infosList1;

    private String infosList2;

    private String infosList3;

    private String my;

}
