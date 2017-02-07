package com.teleinfo.telecredit.search.pojo;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月10日 上午9:44:10
*@version 1.0
*@parameter
*@since
*@return 
*/

public class SearchObj {
	private String content;//输入查询内容
	private String province;//选择省份
	private Float capital_low;//注册资本
	private Float capital_hight;//注册资本
	private Long foundedtime_low;//注册时间
	private Long foundedtime_hight;//注册时间
	private Integer pageSize = 10;
	private Integer currentPage = 1;
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public Float getCapital_low() {
		return capital_low;
	}
	public void setCapital_low(Float capital_low) {
		this.capital_low = capital_low;
	}
	public Float getCapital_hight() {
		return capital_hight;
	}
	public void setCapital_hight(Float capital_hight) {
		this.capital_hight = capital_hight;
	}

	public Long getFoundedtime_low() {
		return foundedtime_low;
	}
	public void setFoundedtime_low(Long foundedtime_low) {
		this.foundedtime_low = foundedtime_low;
	}
	public Long getFoundedtime_hight() {
		return foundedtime_hight;
	}
	public void setFoundedtime_hight(Long foundedtime_hight) {
		this.foundedtime_hight = foundedtime_hight;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}
}
