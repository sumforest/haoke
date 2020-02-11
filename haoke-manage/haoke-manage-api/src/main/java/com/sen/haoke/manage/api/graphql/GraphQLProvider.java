package com.sen.haoke.manage.api.graphql;

import com.sen.haoke.manage.api.service.HouseResourcesService;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;

/**
 * @Auther: Sen
 * @Date: 2020/2/11 22:59
 * @Description:
 */
@Component
public class GraphQLProvider {

    private GraphQL graphQL;

   @Autowired
   private List<MyDataFetcher> myDataFetchers;

    /**
     * Spring初始化后初始化GraphQL对象
     */
    @PostConstruct
    public void init() {
        //初始化graphql文件
        File file = null;
        try {
             file = ResourceUtils.getFile("classpath:haoke.graphql");
            TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(file);
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
        } catch (FileNotFoundException e) {
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
