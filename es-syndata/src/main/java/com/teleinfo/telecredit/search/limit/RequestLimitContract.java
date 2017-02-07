package com.teleinfo.telecredit.search.limit;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月19日 下午3:32:44
*@version 1.0
*@parameter
*@since
*@return 
*/

@Aspect  
@Component  
public class RequestLimitContract {  
    private static final Logger logger = LoggerFactory.getLogger(RequestLimitContract.class);
    
    private Map<String, Integer> requestsMap=new HashMap<String,Integer>();
    
    @Before("within(@org.springframework.stereotype.Controller *) && @annotation(limit)")  
    public void requestLimit(final JoinPoint joinPoint, RequestLimit limit) throws RequestLimitException {  
        try {  
            Object[] args = joinPoint.getArgs();  
            HttpServletRequest request = null;  
            for (int i = 0; i < args.length; i++) {  
                if (args[i] instanceof HttpServletRequest) {  
                    request = (HttpServletRequest) args[i];  
                    break;  
                }  
            }  
            if (request == null) {  
                throw new RequestLimitException("方法中缺失HttpServletRequest参数");  
            }  
            String ip = this.getIpAddress(request);  
            String url = request.getRequestURL().toString();  
            final String key = "req_limit_"+url+ip;  
            logger.info("当前访问标识串是"+ key);
            if(requestsMap.get(key)==null || requestsMap.get(key)==0){  
                requestsMap.put(key,1);  
            }else{  
                requestsMap.put(key,requestsMap.get(key)+1);  
            }  
            int count = requestsMap.get(key);  
            if (count > 0) {  
                Timer timer= new Timer();  
                TimerTask task  = new TimerTask(){ 
                    @Override  
                    public void run() {  
                        requestsMap.remove(key);
                    }  
                };
              //安排在指定延迟后执行指定的任务。task : 所要安排的任务。10000 : 执行任务前的延迟时间，单位是毫秒。  
                timer.schedule(task, limit.time());  
            }  
            if (count > limit.count()) {  
                logger.info("用户IP[" + ip + "]访问地址[" + url + "]超过了限定的次数[" + limit.count() + "]");  
                throw new RequestLimitException();  
            }  
        } catch (RequestLimitException e) {  
            throw e;  
        } catch (Exception e) {  
            logger.error("发生异常: ", e);  
        }  
    }
    
    public String getIpAddress(HttpServletRequest request) throws IOException {  
        // 获取请求主机IP地址,如果通过代理进来，则透过防火墙获取真实IP地址  
        String ip = request.getHeader("X-Forwarded-For");  
        if (logger.isInfoEnabled()) {  
            logger.info("getIpAddress(HttpServletRequest) - X-Forwarded-For - String ip=" + ip);  
        }  
  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("Proxy-Client-IP");  
                if (logger.isInfoEnabled()) {  
                    logger.info("getIpAddress(HttpServletRequest) - Proxy-Client-IP - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("WL-Proxy-Client-IP");  
                if (logger.isInfoEnabled()) {  
                    logger.info("getIpAddress(HttpServletRequest) - WL-Proxy-Client-IP - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("HTTP_CLIENT_IP");  
                if (logger.isInfoEnabled()) {  
                    logger.info("getIpAddress(HttpServletRequest) - HTTP_CLIENT_IP - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
                if (logger.isInfoEnabled()) {  
                    logger.info("getIpAddress(HttpServletRequest) - HTTP_X_FORWARDED_FOR - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getRemoteAddr();  
                if (logger.isInfoEnabled()) {  
                    logger.info("getIpAddress(HttpServletRequest) - getRemoteAddr - String ip=" + ip);  
                }  
            }  
        } else if (ip.length() > 15) {  
            String[] ips = ip.split(",");  
            for (int index = 0; index < ips.length; index++) {  
                String strIp = (String) ips[index];  
                if (!("unknown".equalsIgnoreCase(strIp))) {  
                    ip = strIp;  
                    break;  
                }  
            }  
        }  
        return ip;  
    }
}  