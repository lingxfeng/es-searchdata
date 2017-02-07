package com.teleinfo.telecredit.search.service.impl;

import java.net.InetAddress;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequestBuilder;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.teleinfo.telecredit.search.dao.SearchDataRepository;
import com.teleinfo.telecredit.search.pojo.SearchData;
import com.teleinfo.telecredit.search.pojo.SearchDataUpdate;
import com.teleinfo.telecredit.search.service.SearchDataService;
import com.teleinfo.telecredit.search.util.ClientHelper;
import com.alibaba.fastjson.JSON;
/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月9日 下午12:21:19
*@version 1.0
 * @param <T>
*@parameter
*@since
*@return 
*/
@Service
public class SearchDataServiceImpl implements SearchDataService{
	@Autowired
	private SearchDataRepository searchDataRepository;
	@Autowired
    private SimpMessagingTemplate messagingTemplate;
	@Autowired
	private ClientHelper helper;
	/**
	 * 多线程执行内部类
	 * @author dll
	 *
	 */
	public class InnerClass implements Runnable{
		private String nodes;
		
		public String getNodes() {
			return nodes;
		}
		public void setNodes(String nodes) {
			this.nodes = nodes;
		}
		//Long findTotalnum = SearchDataServiceImpl.this.searchDataRepository.findTotalnum();
		Long findTotalnum = SearchDataServiceImpl.this.searchDataRepository.findMaxId();
        Long chunk = findTotalnum/50000;
		private AtomicLong i = new AtomicLong(chunk+2);
		public void run(){
				long l = 0;
				while((l=i.decrementAndGet())>0){
					Client client = helper.getClient();
					Long begins = new Date().getTime();
					messagingTemplate.convertAndSend("/queue/notifications","第"+l+"部分开始时间："+begins+";当前线程："+Thread.currentThread().getId());
					System.out.println("第"+l+"部分开始时间："+begins+";当前线程："+Thread.currentThread().getId());
					List<SearchData> list;
					if(l == chunk +1){
						list = SearchDataServiceImpl.this.searchDataRepository.findChunkById((l-1)*50000,findTotalnum);
					}else{
						list = SearchDataServiceImpl.this.searchDataRepository.findChunkById((l-1)*50000,l*50000-1);
					}
					if(list != null && list.size() != 0){
						SearchDataServiceImpl.this.save(client,"teleinfo_version","search_data","", list);
					}
					Long ends = new Date().getTime();
					messagingTemplate.convertAndSend("/queue/notifications","第"+l+"部结束时间："+ends+";当前线程："+Thread.currentThread().getId());
					System.out.println("第"+l+"部结束时间："+ends+";当前线程："+Thread.currentThread().getId());
					messagingTemplate.convertAndSend("/queue/notifications","cast : " + (ends - begins) / 1000 + "s");
					System.out.println("第"+l+"部cast : " + (ends - begins) / 1000 + "s");
					}
				}
	}
	/**
	 * 调用内部类进行多线程处理
	 */
	@Override
	public void threadsExecute(int num,String nodes){
         //在外部类中创建成员内部类
          InnerClass innerClass = this.new InnerClass();
          innerClass.setNodes(nodes);
          for(int count=1;count<=num;count++){
        	  new Thread(innerClass).start();
          }
          
	}
	/**
	 * 获取es连接
	 */
	@Override
	public Client getClient(String host,int port) {
		 try {
	            Client client = TransportClient
	            		.builder()
	            		.build()
	            		//.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("host2"), 9300));
	                    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(host), port));
	            return client;
	        } catch (Exception ex) {
	            System.out.println(ex);
	        }
	        return null;
	}
	/**
	 * 获取查询体
	 * @param client
	 * @param index
	 * @param type
	 * @return
	 */
	public SearchRequestBuilder getRequestBuilder(Client client,String index,String type){
		SearchRequestBuilder request = client.prepareSearch(index).setTypes(type);
		return request;
	}
	
	
	/**
	 * 添加数据到Elasticsearch
	 * @param index		索引
	 * @param type		类型
	 * @param idName	Id字段名称
	 * @param listData  一个对象集合
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public  Map save(Client client,String index, String type,String idName,List<SearchData> listData) {
		BulkRequestBuilder bulkRequest = client.prepareBulk().setRefresh(true);
		Map resultMap = new HashMap();
		for (SearchData searchData : listData) {
			String jsonString = JSON.toJSONString(searchData); 
			//没有指定idName 那就让Elasticsearch自动生成
			if("".equals(idName)){
				IndexRequestBuilder lrb = client.prepareIndex(index, type).setSource(jsonString);
				bulkRequest.add(lrb);
			}else{
				String idValue = String.valueOf(searchData.getId());
				IndexRequestBuilder lrb = client.prepareIndex(index,type,idValue).setSource(jsonString);
				bulkRequest.add(lrb);	
			}
		}
		BulkResponse bulkResponse = bulkRequest.execute().actionGet();
		if (bulkResponse.hasFailures()) {
			System.out.println(bulkResponse.getItems().toString());
			resultMap.put("500", "保存ES失败!");
			return resultMap;
		}
		bulkRequest = client.prepareBulk();
		resultMap.put("200", "保存ES成功!");
		return resultMap;
	}
	/**
	 * 添加更新数据到Elasticsearch
	 * @param index		索引
	 * @param type		类型
	 * @param idName	Id字段名称
	 * @param listData  一个对象集合
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public  Map update(Client client,String index, String type,String idName,List<SearchDataUpdate> listData) {
		BulkRequestBuilder bulkRequest = client.prepareBulk().setRefresh(true);
		Map resultMap = new HashMap();
		for (SearchDataUpdate searchData : listData) {
			String jsonString = JSON.toJSONString(searchData); 
			//没有指定idName 那就让Elasticsearch自动生成
			if("".equals(idName)){
				IndexRequestBuilder lrb = client.prepareIndex(index, type).setSource(jsonString);
				bulkRequest.add(lrb);
			}else{
				String idValue = String.valueOf(searchData.getId());
				IndexRequestBuilder lrb = client.prepareIndex(index,type,idValue).setSource(jsonString);
				bulkRequest.add(lrb);	
			}
		}
		BulkResponse bulkResponse = bulkRequest.execute().actionGet();
		if (bulkResponse.hasFailures()) {
			System.out.println(bulkResponse.getItems().toString());
			resultMap.put("500", "保存ES失败!");
			return resultMap;
		}
		bulkRequest = client.prepareBulk();
		resultMap.put("200", "保存ES成功!");
		return resultMap;
	}

	@SuppressWarnings("unused")
	public String setIndex(Client client,String index,String type){
		CreateIndexResponse inde = client.admin().indices().prepareCreate(index)
        .setSettings(Settings.builder()             
                .put("index.number_of_shards", 5)
                .put("index.number_of_replicas",1)
                .put("analysis","{\n"
                		+"\"tokenizer\": {\n"
                			+"\"my_pinyin\": {\n"
                			+"\"type\": \"pinyin\",\"first_letter\": \"prefix\",\"padding_char\": \"\""+
                        "}\n"
                    +"},\n"
                    +"\"analyzer\": {\n"
                        +"\"pinyin_analyzer\": {\n"
                            +"\"tokenizer\": \"my_pinyin\","
                            +"\"filter\": \"word_delimiter\""
                        +"},\n"
                        +"\"ik\": {\n"
                            +"\"tokenizer\": \"ik_smart\""
                        +"}\n"
                    +"}\n"
                +"}\n"
                )       
        ).addMapping(type, "{\n"
            +"\"dynamic\": true,"
            +"\"properties\": {\n"
                +"\"ent_id\": {\n"
                    +"\"type\": \"long\""
                +"},\n"
                +"\"ent_name\": {\n"
                    +"\"type\": \"multi_field\","
                    +"\"fields\": {\n"
                        +"\"ent_name\": {\n"
                            +"\"type\": \"string\","
                            +"\"term_vector\": \"with_positions_offsets\","
                            +"\"analyzer\": \"ik\","
                            +"\"index_analyzer\": \"ik\","
                            +"\"search_analyzer\": \"ik\""
                        +"},\n"
                        +"\"ent_name_pinyin\": {\n"
                            +"\"type\": \"string\","
                            +"\"analyzer\": \"ik\""
                        +"}\n"
                    +"}\n"
                +"},\n"
                +"\"credit_site\": {\n"
                    +"\"type\": \"string\","
                    +"\"index\": \"not_analyzed\""
                +"},\n"
                +"\"updatedt\": {\n"
                    +"\"type\": \"date\","
                    +"\"index\": \"not_analyzed\""
                +"}\n"
            +"}\n"
        +"}\n"
        )
        .get();
		return null;       
	}
	/**
	 * 添加数据到Elasticsearch直接调用使用
	 * @param index		索引
	 * @param type		类型
	 * @param idName	Id字段名称
	 * @param listData  一个对象集合
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public  Map save2(Client client,String index, String type,String idName,List<Map> listData) {
		BulkRequestBuilder bulkRequest = client.prepareBulk().setRefresh(true);
		Map resultMap = new HashMap();
		for (Map searchData : listData) {
			String jsonString = JSON.toJSONString(searchData); 
			//没有指定idName 那就让Elasticsearch自动生成
			if("".equals(idName)){
				IndexRequestBuilder lrb = client.prepareIndex(index, type).setSource(jsonString);
				bulkRequest.add(lrb);
			}else{
				String idValue = String.valueOf(searchData.get("id"));
				IndexRequestBuilder lrb = client.prepareIndex(index,type,idValue).setSource(jsonString);
				bulkRequest.add(lrb);	
			}
		}
		BulkResponse bulkResponse = bulkRequest.execute().actionGet();
		if (bulkResponse.hasFailures()) {
			System.out.println(bulkResponse.getItems().toString());
			resultMap.put("500", "保存ES失败!");
			return resultMap;
		}
		bulkRequest = client.prepareBulk();
		resultMap.put("200", "保存ES成功!");
		return resultMap;
	}
	
	
}
