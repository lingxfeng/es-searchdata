package com.teleinfo.telecredit.search.sevice.impl;

import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequestBuilder;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.action.suggest.SuggestRequestBuilder;
import org.elasticsearch.action.suggest.SuggestResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.IndicesAdminClient;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.MultiMatchQueryBuilder.Type;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.suggest.Suggest.Suggestion.Entry;
import org.elasticsearch.search.suggest.Suggest.Suggestion.Entry.Option;
import org.elasticsearch.search.suggest.completion.CompletionSuggestionBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teleinfo.telecredit.search.pojo.ReturnObj;
import com.teleinfo.telecredit.search.pojo.SearchObj;
import com.teleinfo.telecredit.search.sevice.SearchDataService;
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
	 * suggest功能实现
	 * @param client
	 * @param content
	 * @return
	 */
	@Override
	public List<String> getSuggest(Client client,String content,String index){
		String field = "suggest_ent_name";
		SuggestRequestBuilder srb = client.prepareSuggest(index);
		CompletionSuggestionBuilder csfb = new CompletionSuggestionBuilder(field)
				.field(field)
				.text(content)
				.size(10);
		srb = srb.addSuggestion(csfb);
		SuggestResponse response = srb.execute().actionGet();
		List<String> resulte = new ArrayList<String>();
		List<? extends Entry<? extends Option>> list = response.getSuggest().getSuggestion(field).getEntries(); 
		for (Entry<? extends Option> e : list) { 
			for (Option option : e) { 
				resulte.add(option.getText().toString());
			} 
		} 
		return resulte;
	}
	
	/**
	 * 简单查询
	 * @param client
	 * @return
	 */
	@Override
	public SearchResponse search(Client client,String index,String type) {
        SearchResponse response = client.prepareSearch(index)//可以同时搜索多个索引prepareSearch("index","index2")
                .setTypes(type)//可以同时搜索多个类型
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                .setQuery(QueryBuilders.termQuery("", ""))                 // Query
                .setPostFilter(QueryBuilders.rangeQuery("").from(12).to(18))     // Filter
                .setFrom(0).setSize(2).setExplain(true)
                .execute()
                .actionGet();
		return response;
	}
	
	/**
	 * term查询
	 * @param client
	 * @return
	 */
	public SearchResponse tearmSearch(Client client,SearchObj searchObj,String index,String type){
		SearchRequestBuilder request = this.getRequestBuilder(client,index,type);
		request.setSearchType(SearchType.QUERY_THEN_FETCH);
		request.setQuery(this.getEntNumTerm(searchObj));
		SearchResponse  response = request
				.setFrom((searchObj.getCurrentPage()-1)*searchObj.getPageSize()).setSize(searchObj.getPageSize())//分页
				.setExplain(false)
		        .execute()
		        .actionGet();
		return response;   
	}
	
	/**
	 * 组合查询
	 * @param client
	 * @param searchObj
	 * @return
	 */
	@Override
	public SearchResponse compoundSearch(Client client,SearchObj searchObj,String index,String type){
		SearchRequestBuilder request = this.getRequestBuilder(client,index,type);
		request.setSearchType(SearchType.QUERY_THEN_FETCH);
		request.setQuery(this.getQuerybuilder(searchObj));
		//设置高亮字段
		request = setHighLight("ent_name",request);
		request = setHighLight("ent_legalperson",request);
		SearchResponse  response = request
				.setFrom((searchObj.getCurrentPage()-1)*searchObj.getPageSize()).setSize(searchObj.getPageSize())//分页
				.setExplain(false)
		        .execute()
		        .actionGet();
		return response;     
	}
	
	/**
	 * 处理数据
	 * @param response
	 * @return
	 */
	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ReturnObj desolveData(SearchResponse  response,SearchObj searchObj){
		Long totalnum = response.getHits().getTotalHits();
		ReturnObj obj = new ReturnObj();
		if(totalnum == 0){
			obj.setStatus(1);
			obj.setError("未查询到相关数据！");
		}else{
			SearchHit[] sha = response.getHits().hits();
			List list = new ArrayList();
			String hight ="";
			for(int i = 0;i<sha.length;i++){
				Text[] texts;
				Map map = sha[i].getSource();
				
				//处理得分
				map.put("score",sha[i].getScore());
				//处理时间戳
				Long time = (Long) map.get("founded_time");
				if(time != null && time != 0){
					SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			        Date date = new Date(time);
			        map.put("founded_time", simpleDateFormat.format(date));
				}
		        //处理高亮字段
				if(sha[i].getHighlightFields().get("ent_name") != null){
					texts = sha[i].getHighlightFields().get("ent_name").fragments();
					for (Text text : texts) {
						hight = text.toString();
					}
					map.put("ent_name",hight);
				}
				if(sha[i].getHighlightFields().get("ent_legalperson") != null){
					texts = sha[i].getHighlightFields().get("ent_legalperson").fragments();
					for (Text text : texts) {
						hight = text.toString();
					}
					map.put("ent_legalperson",hight);
				}
				list.add(map);
			}
			obj.setReturnData(list);
			obj.setTotalnum(totalnum);
			obj.setTotalPages(totalnum/searchObj.getPageSize());
			obj.setCurrentPage(searchObj.getCurrentPage());
		}
		return obj;
	}
	
	/**
	 * 获取查询体
	 * @param searchObj
	 * @return
	 */
	public QueryBuilder getQuerybuilder(SearchObj searchObj){
		QueryBuilder qb = null;
		QueryBuilder curQuery = this.multiMatchQuery(searchObj);
		QueryBuilder capitalFilter = this.getCapitalFilter(searchObj);
		QueryBuilder foundedTimeFilter = this.getFoundedTimeFilter(searchObj);
		QueryBuilder provinceTerm = this.getProvinceTerm(searchObj);
		if(curQuery != null && capitalFilter != null && foundedTimeFilter != null && provinceTerm != null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery)
					.filter(capitalFilter)
					.filter(foundedTimeFilter)
					.filter(provinceTerm);
		}else if(curQuery != null && capitalFilter == null && foundedTimeFilter == null && provinceTerm == null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery);
		}else if(curQuery != null && capitalFilter != null && foundedTimeFilter != null && provinceTerm == null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery)
					.filter(capitalFilter)
					.filter(foundedTimeFilter);
		}else if(curQuery != null && capitalFilter != null && foundedTimeFilter == null && provinceTerm != null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery)
					.filter(capitalFilter)
					.filter(provinceTerm);
		}else if(curQuery != null && capitalFilter == null && foundedTimeFilter != null && provinceTerm != null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery)
					.filter(provinceTerm)
					.filter(foundedTimeFilter);
		}else if(curQuery != null && capitalFilter != null && foundedTimeFilter == null && provinceTerm == null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery)
					.filter(capitalFilter);
		}else if(curQuery != null && capitalFilter == null && foundedTimeFilter != null && provinceTerm == null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery)
					.filter(foundedTimeFilter);
		}else if(curQuery != null && capitalFilter == null && foundedTimeFilter == null && provinceTerm != null){
			qb = QueryBuilders.boolQuery()
					.must(curQuery)
					.filter(provinceTerm);
		}else{
			System.out.println("查询内容为空");
			qb = QueryBuilders.matchAllQuery();
		}
		return qb;
	}
	
	/**
	 * 获取注册资本过滤器
	 * @param searchObj
	 * @return
	 */
	public QueryBuilder getCapitalFilter(SearchObj searchObj){
		QueryBuilder capitalFilter = null;
		//检测是否选择注册资本过滤
		if(searchObj.getCapital_low() == null && searchObj.getCapital_hight() != null){
			capitalFilter = this.rangeFilter("capital_standard",searchObj.getCapital_hight(),2);
		}else if(searchObj.getCapital_low() != null && searchObj.getCapital_hight() == null){
			capitalFilter = this.rangeFilter("capital_standard",searchObj.getCapital_low(),1);
		}else if(searchObj.getCapital_low() != null && searchObj.getCapital_hight() != null){
			capitalFilter = this.rangeFilter("capital_standard",searchObj.getCapital_low(),searchObj.getCapital_hight());
		}
		return capitalFilter;
	}
	
	/**
	 * 获取注册时间过滤器
	 * @param searchObj
	 * @return
	 */
	public QueryBuilder getFoundedTimeFilter(SearchObj searchObj){
		QueryBuilder foundedTimeFilter = null;
		//检测是否选择注册时间过滤
		if(searchObj.getFoundedtime_low()== null && searchObj.getFoundedtime_hight() != null){
			foundedTimeFilter = this.rangeFilter("founded_time",searchObj.getFoundedtime_hight(),2);
		}else if(searchObj.getFoundedtime_low() != null && searchObj.getFoundedtime_hight() == null){
			foundedTimeFilter = this.rangeFilter("founded_time",searchObj.getFoundedtime_low(),1);
		}else if(searchObj.getFoundedtime_low() != null && searchObj.getFoundedtime_hight() != null){
			foundedTimeFilter = this.rangeFilter("founded_time",searchObj.getFoundedtime_low(),searchObj.getFoundedtime_hight());
		}
		return foundedTimeFilter;
	}
	/**
	 * 省份过滤器
	 * @param searchObj
	 * @return
	 */
	public QueryBuilder getProvinceTerm(SearchObj searchObj){
		QueryBuilder provinceFilter = null;
		if(searchObj.getProvince() != null && !"".equals(searchObj.getProvince())){
			provinceFilter = this.termQuery("province",searchObj.getProvince());
		}
		return provinceFilter;
	}
	/**
	 * 企业编号过滤器
	 * @param searchObj
	 * @return
	 */
	public QueryBuilder getEntNumTerm(SearchObj searchObj){
		QueryBuilder EntNumFilter = null;
		if(searchObj.getContent() != null && !"".equals(searchObj.getContent())){
			EntNumFilter = this.termQuery("ent_num",searchObj.getContent());
		}
		return EntNumFilter;
	}
	/**
	 * disMax查询
	 * 目前只适用于当前系统后续考虑进行改造
	 * @param searchObj
	 * @return
	 */
	public QueryBuilder disMaxQuery(SearchObj searchObj){
		QueryBuilder dismaxquery = null;
		if(searchObj.getContent() != null && !"".equals(searchObj.getContent())){
			dismaxquery = QueryBuilders.disMaxQuery()
					.add(this.matchQuery("ent_name", searchObj.getContent(), 1f))
					.add(this.matchQuery("ent_name.ent_name_pinyin", searchObj.getContent(), 1f))
					.add(this.matchQuery("ent_legalperson", searchObj.getContent(), 2f))
					.add(this.matchQuery("ent_legalperson.ent_legalperson_pinyin", searchObj.getContent(), 1f))
					.add(this.matchQuery("keyword", searchObj.getContent(), 1f))
					.add(this.matchQuery("keyword.keyword_pinyin", searchObj.getContent(), 1f))
				    .tieBreaker(0.7f);
		}
		return dismaxquery;
		
	}
	/**
	 * 多字段匹配
	 * @param searchObj
	 * @return
	 */
	public QueryBuilder multiMatchQuery(SearchObj searchObj){
		QueryBuilder multimatch = null;
		if(searchObj.getContent() != null && !"".equals(searchObj.getContent())){
			multimatch = QueryBuilders.multiMatchQuery(searchObj.getContent(), 
					"ent_name",
					"ent_legalperson",
					"keyword^3",
					"ent_name.ent_name_pinyin",
					"ent_legalperson.ent_legalperson_pinyin",
					"keyword.keyword_pinyin^3")
					.type(Type.MOST_FIELDS);
		}
		return multimatch;
	}
	/**
	 * 单字段match
	 * @param propoty
	 * @param content
	 * @param f 
	 * @return
	 */
	public QueryBuilder matchQuery(String propoty,String content, float f){
		QueryBuilder matchquery = QueryBuilders.matchQuery(propoty, content);
		return matchquery;
	}
	
	/**
	 * 单字段精确过滤
	 * @param propoty
	 * @param content
	 * @return
	 */
	public QueryBuilder termQuery(String propoty,String content){
		QueryBuilder termquery = QueryBuilders.termQuery(propoty, content);
		return termquery;
		
	}
	
	/**
	 * 单项过滤
	 * flag进行标识，flag=1，则只有下限。flag ！= 1则只有上限
	 * @param propoty
	 * @param data
	 * @param flag
	 * @return
	 */
	public <T> QueryBuilder rangeFilter(String propoty,T data,int flag){
		if(flag == 1){
			QueryBuilder rangefilter = QueryBuilders.rangeQuery(propoty)
					.from(data)
					.includeLower(true)
					.includeUpper(true);
					return rangefilter;
		}else{
			QueryBuilder rangefilter = QueryBuilders.rangeQuery(propoty)
					.to(data)
					.includeLower(true)
					.includeUpper(true);
					return rangefilter;
		}
	}
	
	/**
	 * 双向过滤
	 * @param propoty
	 * @param lowdata
	 * @param hightdata
	 * @return
	 */
	public <T> QueryBuilder rangeFilter(String propoty,T lowdata,T hightdata){
		QueryBuilder rangefilter = QueryBuilders.rangeQuery(propoty)
		.from(lowdata)
		.to(hightdata)
		.includeLower(true)
		.includeUpper(true);
		return rangefilter;
		
	}
	/**
	 * 设置高亮字段
	 * @param proporty
	 * @param request
	 * @return
	 */
	public SearchRequestBuilder setHighLight(String proporty,SearchRequestBuilder request){
		request.addHighlightedField(proporty);
		request.setHighlighterPreTags("<em style=\"color:red\">");
		request.setHighlighterPostTags("</em>");
		return request;
	}
	
	public SearchRequestBuilder setSource(SearchRequestBuilder request){
		request.setSource("ent_name");
		request.setSource("ent_legalperson");
		return request;
	}
	/**
	 * 获取手气不错结果
	 */
	public String getLuckyDomain(Client client,String index,String type,SearchObj searchObj){
		String domain="";
		SearchRequestBuilder request = this.getRequestBuilder(client,index,type);
		request.setSearchType(SearchType.QUERY_THEN_FETCH);
		request.setQuery(this.multiMatchQuery(searchObj));
		SearchResponse  response = request
				.setFrom(0).setSize(1)//分页
				.setExplain(false)
		        .execute()
		        .actionGet();
		SearchHit[] sha = response.getHits().hits();
		Map map = sha[0].getSource();
		domain = (String) map.get("credit_site");
		return domain;
	}
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
