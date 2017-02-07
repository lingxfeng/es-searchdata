package com.teleinfo.telecredit.web;

import java.text.ParseException;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.StaticApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teleinfo.telecredit.search.limit.RequestLimit;
import com.teleinfo.telecredit.search.pojo.ReturnObj;
import com.teleinfo.telecredit.search.pojo.SearchObj;
import com.teleinfo.telecredit.search.sevice.SearchDataService;
import com.teleinfo.telecredit.search.util.ClientHelper;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月9日 上午11:58:10
*@version 1.0
*@parameter
*@since
*@return 
*/
@Controller
@RequestMapping(name="/")
public class SearchDataController {
	@Autowired
	private SearchDataService searchDataService;
	
	
	@Value("${elasticesearch.nodes}")
	private String nodes;
	@Value("${elasticesearch.cluster}")
	private String cluster;
	@Value("${elasticesearch.index}")
	private String index;
	@Value("${elasticesearch.type}")
	private String type;
	@Autowired
	private  ClientHelper helper ;
	private Logger logger = LoggerFactory.getLogger(getClass());
	/**
	 * 全范围检索
	 * @param content
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="mysearch")
	@RequestLimit(count=20,time=10000)
	public ReturnObj searchTypeAll(HttpServletRequest request,SearchObj searchObj,Model model){
		if(searchObj.getContent()==null || "".equals(searchObj.getContent())){
			ReturnObj obj = new ReturnObj();
			obj.setError("搜索内容不能为空");
			obj.setStatus(1);
			return obj;
		}else{
			Client client = helper.getClient();
			SearchResponse response = this.searchDataService.tearmSearch(client, searchObj, index, type);
			if(response.getHits().getTotalHits() == 0){
				response = this.searchDataService.compoundSearch(client,searchObj,index,type);
			}
			logger.info("ES查询结束！进行数据处理");
			ReturnObj obj = this.searchDataService.desolveData(response,searchObj);
			return obj;
		}

		
	}
	/**
	 * 自动补全
	 * @param searchObj
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "mysuggest")
	public ReturnObj getSuggest(SearchObj searchObj,Model model){
		ReturnObj obj = new ReturnObj();
		Client client = helper.getClient();
		List<String> suggestlist = this.searchDataService.getSuggest(client,searchObj.getContent(),index);
		obj.setSuggestList(suggestlist);
		return obj;
	}
	/**
	 * 手气不错
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getLucky")
	public String getLucky(SearchObj searchObj){
		Client client = helper.getClient();
		String domain = this.searchDataService.getLuckyDomain(client, index, type, searchObj);
		return domain;
	}
	/**
	 * 属性自动
	 * @param content
	 * @param pagenum
	 * @param model
	 * @throws ParseException 
	 */
	@ModelAttribute
	public void getContent(@RequestParam(value = "content", defaultValue = "") String content,
			@RequestParam(value = "currentPage", defaultValue = "1", required = false) Integer currentPage,
			@RequestParam(value = "capital_hight",required = false) Float capital_hight,
			@RequestParam(value = "capital_low", required = false) Float capital_low,
			@RequestParam(value = "foundedtime_hight",required = false) Long foundedtime_hight,
			@RequestParam(value = "foundedtime_low", required = false) Long foundedtime_low,
			@RequestParam(value = "province", required = false) String province,
			Model model) throws ParseException {
		//封装实体类
		SearchObj searchObj = new SearchObj();
		searchObj.setContent(content);
		searchObj.setCapital_hight(capital_hight);
		searchObj.setCapital_low(capital_low);
		searchObj.setFoundedtime_low(foundedtime_low);
		searchObj.setFoundedtime_hight(foundedtime_hight);
		searchObj.setProvince(province);
		searchObj.setCurrentPage(currentPage);
		model.addAttribute("searchObj", searchObj);
	}
}
