package com.teleinfo.telecredit.search.sevice;

import java.util.List;
import java.util.Map;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import com.teleinfo.telecredit.search.pojo.ReturnObj;
import com.teleinfo.telecredit.search.pojo.SearchObj;

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
	 * 输入既查询
	 * @param client
	 * @param content
	 * @return
	 */
	List<String> getSuggest(Client client,String content,String index);
	/**
	 * 查询
	 * @param client
	 * @return
	 */
	SearchResponse search(Client client,String index,String type);
	/**
	 * 组合查询
	 * @param client
	 * @param searchObj
	 * @return
	 */
	SearchResponse compoundSearch(Client client,SearchObj searchObj,String index,String type);
	/**
	 * 单过滤
	 * @param client
	 * @param searchObj
	 * @return
	 */
	SearchResponse tearmSearch(Client client,SearchObj searchObj,String index,String type);
	
	/**
	 * 处理返回结果
	 * @param response
	 * @return
	 */
	ReturnObj desolveData(SearchResponse  response,SearchObj searchObj);
	/**
	 * 手气不错
	 * @return
	 */
	String getLuckyDomain(Client client,String index,String type,SearchObj searchObj);
	/**
	 * 创建索引
	 * @param client
	 * @return
	 */
	String setIndex(Client client,String index,String type);
}
