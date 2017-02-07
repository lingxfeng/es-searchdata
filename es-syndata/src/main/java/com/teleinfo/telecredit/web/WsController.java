package com.teleinfo.telecredit.web;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.elasticsearch.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.teleinfo.telecredit.search.dao.SearchDataRepository;
import com.teleinfo.telecredit.search.pojo.SearchData;
import com.teleinfo.telecredit.search.service.SearchDataService;
import com.teleinfo.telecredit.search.util.ClientHelper;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年2月6日 下午3:07:51
*@version 1.0
*@parameter
*@since
*@return 
*/
@Controller
public class WsController {
	
	@Autowired
	private SearchDataService searchDataService;
	@Autowired
	private SearchDataRepository searchDataRepository;

	@Value("${elasticesearch.nodes}")
	private String nodes;
	@Value("${elasticesearch.cluster}")
	private String cluster;
	@Value("${elasticesearch.index}")
	private String index;
	@Value("${elasticesearch.type}")
	private String type;
	
	@Autowired
    private SimpMessagingTemplate messagingTemplate;//
	
	@Autowired
	private ClientHelper helper;
	/**
	 * 通过单线程进行数据同步
	 */
    @SuppressWarnings({ "unused", "rawtypes" })
	@MessageMapping("/sendBySingle")
    public void insertById() {
    	messagingTemplate.convertAndSend("/queue/notifications","单线程数据同步开始！");
        Map map = new HashMap<>();
		Client client = helper.getClient();
		Long begin = new Date().getTime();
		messagingTemplate.convertAndSend("/queue/notifications","开始时间："+begin);
        System.out.println("开始时间："+begin);
        //Long findTotalnum = this.searchDataRepository.findTotalnum();
        Long findTotalnum = this.searchDataRepository.findMaxId();
        System.out.println(findTotalnum);
        Long chunk = findTotalnum/50000;
        
        for(Long i=1l;i<=chunk+1;i++){
        	Long begins = new Date().getTime();
        	messagingTemplate.convertAndSend("/queue/notifications","第"+i+"部分开始时间："+begins);
            System.out.println("第"+i+"部分开始时间："+begins);
            List<SearchData> list;
            if(i <= chunk){
            	list = this.searchDataRepository.findChunkById((i-1)*50000,i*50000-1);
            }else{
            	list = this.searchDataRepository.findChunkById(chunk*50000,findTotalnum);
            }
            if(list != null && list.size() != 0){
            	map = this.searchDataService.save(client,index,type,"", list);
            }
            Long ends = new Date().getTime();
            messagingTemplate.convertAndSend("/queue/notifications","第"+i+"部分结束时间："+ends);
            System.out.println("第"+i+"部分结束时间："+ends);
            messagingTemplate.convertAndSend("/queue/notifications","第"+i+"cast : " + (ends - begins) / 1000 + "s");
            System.out.println("第"+i+"cast : " + (ends - begins) / 1000 + "s");
        }
        client.close();
        Long end = new Date().getTime();
        messagingTemplate.convertAndSend("/queue/notifications","结束时间："+end);
        System.out.println("结束时间："+end);
        messagingTemplate.convertAndSend("/queue/notifications","cast : " + (end - begin) / 1000 + "s");
        System.out.println("cast : " + (end - begin) / 1000 + "s");  
    }
    /**
     * 多线程导入数据
     * @param num
     */
    @MessageMapping("/sendByThreads")
	public void insertByThreads(String num){
		this.searchDataService.threadsExecute(Integer.parseInt(num),nodes);
	}
}
