package com.sen.haoke.manage.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.ExecutionInput;
import graphql.GraphQL;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @Auther: Sen
 * @Date: 2020/2/11 22:55
 * @Description:
 */
@Controller
@CrossOrigin
@RequestMapping("graphql")
public class GraphQLController {

    @Resource
    private GraphQL graphQL;

    @GetMapping
    @ResponseBody
    public Map<String, Object> graphql(@RequestParam("query") String query,
                                       @RequestParam(value = "variables",required = false) String variables,
                                       String operationName) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            Map<String,Object> var = mapper.readValue(variables, mapper.getTypeFactory().constructMapType(HashMap.class, String.class, Object.class));
            return getStringObjectMap(query, operationName, var);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map<String, Object> result = new HashMap<>();
        result.put("error", "查询出错");
        return result;
    }

    @PostMapping
    @ResponseBody
    public Map<String, Object> postGraphql(@RequestBody Map<String, Object> params) {
        try {
            String query = (String) params.get("query");
            Map<String, Object> variables = (Map<String, Object>) params.get("variables");
            String operationName = (String) params.get("operationName");
            return getStringObjectMap(query, operationName, variables);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String, Object> result = new HashMap<>();
        result.put("error", "查询出错");
        return result;
    }

    /**
     * 进行GraphQL 查询
     * @param query 查询语句
     * @param operationName 操作名称
     * @param var 参数
     * @return 查询结果
     */
    private Map<String, Object> getStringObjectMap(String query, String operationName, Map<String, Object> var) {
        ExecutionInput executionInput = ExecutionInput
                .newExecutionInput()
                .query(query)
                .operationName(operationName)
                .variables(var)
                .build();
        return graphQL.execute(executionInput).toSpecification();
    }
}
