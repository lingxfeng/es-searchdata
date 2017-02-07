package com.teleinfo.telecredit.search.configure;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年2月6日 下午3:08:52
*@version 1.0
*@parameter
*@since
*@return 
*/

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/syncdata").setViewName("/syncdata");
    }
}