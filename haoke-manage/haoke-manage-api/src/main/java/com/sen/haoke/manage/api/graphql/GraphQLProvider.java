package com.sen.haoke.manage.api.graphql;

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

/**
 * @Auther: Sen
 * @Date: 2020/2/11 22:59
 * @Description:
 */
@Component
public class GraphQLProvider {

    private GraphQL graphQL;

   @Resource
   private List<MyDataFetcher> myDataFetchers;

    /**
     * Spring初始化后初始化GraphQL对象
     */
    @PostConstruct
    public void init() {
        //初始化graphql文件
        File file = null;
        try {
            InputStream resource = GraphQLProvider.class.getClassLoader().getResourceAsStream("haoke.graphql");
            // file = ResourceUtils.getFile("classpath:haoke.graphql");
            String graphqlStr = IOUtils.toString(Objects.requireNonNull(resource), StandardCharsets.UTF_8);
            TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(graphqlStr);
            //查询
            RuntimeWiring wiring = RuntimeWiring.newRuntimeWiring()
                    .type("HaokeQuery", builder->
                            {
                                myDataFetchers.forEach(myDataFetcher -> {
                                    builder.dataFetcher(myDataFetcher.fileName(), myDataFetcher::dataFetcher);
                                });
                                return builder;
                            }
                        //     builder.dataFetcher("HouseResources", param->{
                        //     Long id = param.getArgument("id");
                        //     return service.queryHouseResources(id);
                        // })
                    )
                    .build();
            GraphQLSchema graphQLSchema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
            this.graphQL = GraphQL.newGraphQL(graphQLSchema).build();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 把graphQL交给Spring容器托管
     * @return
     */
    @Bean
    public GraphQL graphQL(){
        return this.graphQL;
    }
}
