package com.sen.haoke.manage.api.interceptor;


import org.apache.commons.io.IOUtils;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @Auther: Sen
 * @Date: 2020/2/14 23:56
 * @Description: 包装Request解决request中的ServletInputStream中只能读取一次的问题
 */
public class MyServletRequestWrapper extends HttpServletRequestWrapper {

    /**
     * request请求参数中的字节数组
     */
    private final byte[] body;

    public MyServletRequestWrapper(HttpServletRequest request) throws IOException {
        super(request);
        this.body = IOUtils.toByteArray(super.getInputStream());
    }

    @Override
    public BufferedReader getReader() throws IOException {
        return new BufferedReader(new InputStreamReader(getInputStream()));
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        return new RequestBodyCachingInputStream(body);
    }

    private static class RequestBodyCachingInputStream extends ServletInputStream {

        /**
         * 保存请求体的字节数组
         */
        private byte[] body;

        /**
         * 上次恢复的字节数组下标
         */
        private int lastRetrievedIndex = -1;

        private ReadListener listener;

        public RequestBodyCachingInputStream(byte[] body) {
            this.body = body;
        }

        @Override
        public boolean isFinished() {
            return lastRetrievedIndex == body.length - 1;
        }

        @Override
        public boolean isReady() {
            return isFinished();
        }

        @Override
        public void setReadListener(ReadListener readListener) {
            if (readListener == null) {
                throw new IllegalArgumentException("ReadListener can not be null!");
            }
            if (this.listener != null) {
                throw new IllegalArgumentException("ReadListener has been set!");
            }
            this.listener = readListener;
            if (!isFinished()) {
                try {
                    listener.onAllDataRead();
                } catch (IOException e) {
                    listener.onError(e);
                }
            }
        }

        @Override
        public int read() throws IOException {
            if (isFinished()) {
                return -1;
            }
            int result = body[lastRetrievedIndex + 1];
            lastRetrievedIndex++;
            if (isFinished() && listener != null) {
                try {
                    listener.onAllDataRead();
                } catch (IOException e) {
                    listener.onError(e);
                    throw e;
                }
            }
            return result;
        }

        @Override
        public int available() throws IOException {
            return this.body.length - 1 - lastRetrievedIndex;
        }

        @Override
        public void close() throws IOException {
            lastRetrievedIndex = this.body.length - 1;
            body = null;
        }
    }
}
