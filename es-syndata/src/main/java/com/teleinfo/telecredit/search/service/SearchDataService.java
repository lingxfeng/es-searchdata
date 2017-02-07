package com.teleinfo.telecredit.search.service;

import java.util.List;
import java.util.Map;

import org.elasticsearch.client.Client;
import com.teleinfo.telecredit.search.pojo.SearchData;
import com.teleinfo.telecredit.search.pojo.SearchDataUpdate;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月9日 下午12:20:27
*@version 1.0
 * @param <T>
*@parameter
*@since
*@return 
*/
public interface SearchDataService{
	/**
	 * 获取链接
	 * @param host
	 * @param port
	 * @return
	 */
	Client getClient(String host,int port);
	/**
	 * 
	 * @param num 启动线程数
	 * @param host
	 * @param port
	 */
	void threadsExecute(int num,String nodes);
	/**
	 * 写入数据
	 * @param client
	 * @param index
	 * @param type
	 * @param idName
	 * @param listData
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	Map save(Client client,String index, String type,String idName,List<SearchData> listData);
	
	
	/**
	 * 更新数据
	 * @param client
	 * @param index
	 * @param type
	 * @param idName
	 * @param listData
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	Map update(Client client,String index, String type,String idName,List<SearchDataUpdate> listData);
	
	/**
	 * 创建索引
	 * @param client
	 * @return
	 */
	String setIndex(Client client,String index,String type);
}
