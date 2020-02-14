package com.sen.haoke.manage.dubbo.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sen.haoke.manage.dubbo.server.pojo.BasePojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @Auther: Sen
 * @Date: 2020/2/9 22:37
 * @Description:
 */
@Service
public abstract class BaseServiceImpl<T extends BasePojo> {

    @Resource
    private BaseMapper<T> mapper;

    public int Insert(T t) {
        t.setCreated(new Date());
        t.setUpdated(new Date());
        return mapper.insert(t);
    }

    public T selectById(Long id) {
        return mapper.selectById(id);
    }

    public int update(T t){
        t.setUpdated(new Date());
        return mapper.updateById(t);
    }

    public int delete(Long id) {
        return mapper.deleteById(id);
    }

    /**
     * 通过条件分页查询
     * @param t 用于查询条件的对象
     * @param page 第几页
     * @param pageSize 每页多少条
     * @return 分页对象
     */
    public IPage<T> page(T t, Integer page, Integer pageSize) {
        return mapper.selectPage(new Page<>(page, pageSize), new QueryWrapper<>(t));
    }

    /**
     * 根据条件经行分页查询
     * @param wrapper 条件
     * @param page 当前页
     * @param pageSize 页宽
     * @return
     */
    public IPage<T> queryByPage(Wrapper<T> wrapper, Integer page, Integer pageSize) {
        return mapper.selectPage(new Page<>(page, pageSize), wrapper);
    }
}
