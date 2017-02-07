package com.teleinfo.telecredit.search.configure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.teleinfo.telecredit.search.util.ClientHelper;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年2月7日 上午11:35:02
*@version 1.0
*@parameter
*@since
*@return 
*/
@Configuration
public class CommonConfig {
	@Value("${elasticesearch.nodes}")
	private String nodes;
	@Value("${elasticesearch.cluster}")
	private String cluster;
	@Bean
	public ClientHelper getClientHelper() {
		ClientHelper helper = new ClientHelper(nodes,cluster);
		return helper;
	}
	
}
