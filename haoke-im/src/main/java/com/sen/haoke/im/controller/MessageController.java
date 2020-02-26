package com.sen.haoke.im.controller;

import com.sen.haoke.im.pojo.Message;
import com.sen.haoke.im.service.MessageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/17 23:08
 * @Description:
 */
@RestController
@RequestMapping("message")
@CrossOrigin
public class MessageController {

    @Resource
    private MessageService messageService;

    /**
     * 返回最新的点对点聊天的所有消息
     * @param fromId 发送用户id
     * @param toId 接收用户id
     * @param page 页数
     * @param rows 页宽
     * @return 消息集合
     */
    @GetMapping
    public List<Message> listMessage(Long fromId, Long toId,
                                     @RequestParam(value = "page", defaultValue = "1") int page,
                                     @RequestParam(value = "rows", defaultValue = "100") int rows) {
        return messageService.listMessage(fromId, toId, page, rows);
    }


}
