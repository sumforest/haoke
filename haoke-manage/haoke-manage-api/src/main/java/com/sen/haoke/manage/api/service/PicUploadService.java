package com.sen.haoke.manage.api.service;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.PutObjectRequest;
import com.sen.haoke.manage.api.config.AliyunOSSConfiguration;
import com.sen.haoke.manage.api.vo.UploadParams;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

/**
 * @Auther: Sen
 * @Date: 2020/2/10 12:55
 * @Description:
 */
@Service
public class PicUploadService {
    // 允许上传的格式
    private static final String[] IMAGE_TYPE = new String[]{".bmp", ".jpg", ".jpeg", ".gif", ".png"};

    @Resource
    private OSSClient ossClient;

    @Resource
    private AliyunOSSConfiguration configuration;

    public UploadParams upload(MultipartFile multipartFile) {
        String originalFileName = multipartFile.getOriginalFilename();
        UploadParams uploadParams = new UploadParams();

        boolean isLegal = false;
        for (String type : IMAGE_TYPE) {
            if (StringUtils.endsWith(originalFileName, type)) {
                isLegal= true;
                break;
            }
        }
        if (!isLegal) {
            uploadParams.setStatus("error");
            return uploadParams;
        }
        assert originalFileName != null;
        String suffix = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        String newFilename = UUID.randomUUID().toString() + "." + suffix;
        // 创建PutObjectRequest对象。
        // <yourObjectName>表示上传文件到OSS时需要指定包含文件后缀在内的完整路径，例如abc/efg/123.jpg。
        PutObjectRequest putObjectRequest = null;
        try {
            putObjectRequest = new PutObjectRequest(configuration.getBucketName(), newFilename, new ByteArrayInputStream(multipartFile.getBytes()));
            // 如果需要上传时设置存储类型与访问权限，请参考以下示例代码。
            // ObjectMetadata metadata = new ObjectMetadata();
            // metadata.setHeader(OSSHeaders.OSS_STORAGE_CLASS, StorageClass.Standard.toString());
            // metadata.setObjectAcl(CannedAccessControlList.Private);
            // putObjectRequest.setMetadata(metadata);
            // 上传字符串。
            ossClient.putObject(putObjectRequest);
        } catch (IOException e) {
            e.printStackTrace();
            uploadParams.setStatus("error");
            return uploadParams;
        } finally {
            // 关闭OSSClient。
            ossClient.shutdown();
        }
        uploadParams.setUid(System.currentTimeMillis() + "");
        uploadParams.setStatus("done");
        uploadParams.setName("http://" + configuration.getBucketName() + "." + configuration.getEndpoint() + "/" + newFilename);
        return uploadParams;
    }

}
