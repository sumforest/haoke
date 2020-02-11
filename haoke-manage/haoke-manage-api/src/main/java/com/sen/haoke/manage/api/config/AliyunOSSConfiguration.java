package com.sen.haoke.manage.api.config;

import com.aliyun.oss.OSSClient;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @Auther: Sen
 * @Date: 2020/2/10 12:24
 * @Description:
 */
@Configuration
//读取配置文件
@PropertySource("classpath:aliyunoss.properties")
//把以aliyun开头的配置信息映射到本类属性当中
@ConfigurationProperties(prefix = "aliyun")
//添加set方法
@Data
public class AliyunOSSConfiguration {
    // Endpoint以杭州为例，其它Region请按实际情况填写。
    private String endpoint;
    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
    private String accessKeyId;

    private String accessKeySecret;

    private String bucketName;

    @Bean
    public OSSClient createOssClient(){
        return new OSSClient(endpoint,accessKeyId,accessKeySecret);
    }
}
