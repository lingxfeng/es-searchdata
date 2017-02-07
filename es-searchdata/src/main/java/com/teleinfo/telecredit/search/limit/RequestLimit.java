package com.teleinfo.telecredit.search.limit;


import org.springframework.core.Ordered;  
import org.springframework.core.annotation.Order;  
import java.lang.annotation.*;  
/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月19日 下午3:30:32
*@version 1.0
*@parameter
*@since
*@return 
*/

@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.METHOD)  
@Documented  
//最高优先级  
@Order(Ordered.HIGHEST_PRECEDENCE)  
public @interface RequestLimit {  
    /** 
     * 
     * 允许访问的次数，默认值MAX_VALUE 
     */  
    int count() default 120;  
  
    /** 
     * 
     * 时间段，单位为毫秒，默认值一分钟 
     */  
    long time() default 60000;  
}  