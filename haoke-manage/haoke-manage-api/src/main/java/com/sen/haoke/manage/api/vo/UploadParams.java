package com.sen.haoke.manage.api.vo;

import lombok.Data;

/**
 * @Auther: Sen
 * @Date: 2020/2/10 12:59
 * @Description:
 */
@Data
public class UploadParams {
    // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
    private String uid;
    // 文件名
    private String name;
    // 状态有：uploading done error removed
    private String status;
    // 服务端响应内容'{"status": "success"}',
    private String response;
}
