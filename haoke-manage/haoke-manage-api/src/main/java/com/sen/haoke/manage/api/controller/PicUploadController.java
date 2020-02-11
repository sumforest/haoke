package com.sen.haoke.manage.api.controller;

import com.sen.haoke.manage.api.service.PicUploadService;
import com.sen.haoke.manage.api.vo.UploadParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Auther: Sen
 * @Date: 2020/2/10 12:53
 * @Description:
 */
@Controller
@RequestMapping("/pic/upload")
public class PicUploadController {

    @Autowired
    private PicUploadService picUploadService;

    @PostMapping
    @ResponseBody
    public UploadParams upload(@RequestParam("file") MultipartFile multipartFile) {
        return picUploadService.upload(multipartFile);
    }
}
