package com.teleinfo.telecredit.search.jobs;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.elasticsearch.client.Client;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.teleinfo.telecredit.search.dao.SearchDataUpdateRepository;
import com.teleinfo.telecredit.search.pojo.SearchDataUpdate;
import com.teleinfo.telecredit.search.service.SearchDataService;
import com.teleinfo.telecredit.search.util.ClientHelper;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月20日 下午2:57:58
*@version 1.0
*@parameter
*@since
*@return 
*/
@Component
public class UpdateJob{
	
	@Autowired 
	private SearchDataUpdateRepository searchDataRepository;
	@Autowired 
	private SearchDataService searchDataService; 
	@Autowired
	private ClientHelper helper;
	@Value("${elasticesearch.nodes}")
	private String nodes;
	@Value("${elasticesearch.cluster}")
	private String cluster;
	@Value("${elasticesearch.index}")
	private String index;
	@Value("${elasticesearch.type}")
	private String type;
	
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	@Scheduled(cron = "0/30 * * * * ?") // 每30秒执行一次
	public void schedule() {
		Date nowdate = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(nowdate);
		c.add(Calendar.SECOND, -30);
		Date datebefore = c.getTime();
		System.out.println(Thread.currentThread().getId());
		List<SearchDataUpdate> list = this.searchDataRepository.findModifiedData(datebefore);
		if(list != null && list.size() != 0){
			//Client client = this.searchDataService.getClient(host, port);
			Client client = helper.getClient();
			this.searchDataService.update(client, index, type,"", list);
			client.close();
			logger.info(nowdate+"更新了数据："+list.size()+"条！");
			//将数据清除
			this.searchDataRepository.deleteInBatch(list);
		}		
	}
	
}
