package com.teleinfo.telecredit.search.pojo;

import java.util.List;

import org.elasticsearch.search.SearchHits;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月9日 下午5:00:57
*@version 1.0
*@parameter
*@since
*@return 
*/

public class ReturnObj {
	private int status = 0;//查询状态 0；成功，1失败
	private String error;//错误原因
	private long totalnum;//总数计数
	private List<?> returnData;//处理后的返回数据
	private SearchHits returnHits;//查询的结果集
	private List<?> suggestList;//自动补全的结果集
	private long totalPages;//总页数
	private long currentPage;//当前页数
	private Float score;//当前得分
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public long getTotalnum() {
		return totalnum;
	}
	public void setTotalnum(long totalnum) {
		this.totalnum = totalnum;
	}
	
	public List<?> getReturnData() {
		return returnData;
	}
	public void setReturnData(List<?> returnData) {
		this.returnData = returnData;
	}
	public SearchHits getReturnHits() {
		return returnHits;
	}
	public void setReturnHits(SearchHits returnHits) {
		this.returnHits = returnHits;
	}
	public List<?> getSuggestList() {
		return suggestList;
	}
	public void setSuggestList(List<?> suggestList) {
		this.suggestList = suggestList;
	}
	public long getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(long totalPages) {
		this.totalPages = totalPages;
	}
	public long getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(long currentPage) {
		this.currentPage = currentPage;
	}
	public Float getScore() {
		return score;
	}
	public void setScore(Float score) {
		this.score = score;
	}
	
}
