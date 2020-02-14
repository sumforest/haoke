package com.sen.haoke.manage.api.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Auther: Sen
 * @Date: 2020/2/15 00:18
 * @Description: 替换Request为包装后的Request
 */
@Component
public class RequestReplaceFilter  extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!(request instanceof MyServletRequestWrapper) ){
            // System.out.println("RequestReplaceFilter "+ IOUtils.toString(request.getInputStream(), StandardCharsets.UTF_8));
            request = new MyServletRequestWrapper(request);
        }
        // System.out.println("RequestReplaceFilter "+ IOUtils.toString(request.getInputStream(), StandardCharsets.UTF_8));
        filterChain.doFilter(request, response);
    }
}
