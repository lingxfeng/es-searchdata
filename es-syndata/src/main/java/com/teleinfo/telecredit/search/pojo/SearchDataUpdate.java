package com.teleinfo.telecredit.search.pojo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月11日 上午11:27:59
*@version 1.0
*@parameter
*由于使用mysql的trigger，把改动数据添加到了新的表里，所以新建对象与表建立映射
*此对象用于数据更新同步使用
*@since
*@return 
*/
@Entity
@Table(name = "TC_SEARCH_DATA_UPDATE",indexes = { @Index(columnList="id") })
@NamedQuery(name = "SearchDataUpdate.findAll", query = "SELECT t FROM SearchDataUpdate t")
public class SearchDataUpdate {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String ent_name;
	private String ent_num;
	private String ent_legalperson;
	@Transient
	private String suggest_ent_name;
	private String product;
	private String website;
	private String province;
	private String city;
	private String district;
	private String capital_standard;
	private String capital_unit;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date founded_time;
	private String telephone;
	private String mail;
	private String photo;
	private String ent_status;
	private String keyword;
	private String credit_site;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date creatdt;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date updatedt;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEnt_name() {
		return ent_name;
	}
	public void setEnt_name(String ent_name) {
		this.ent_name = ent_name;
	}
	public String getEnt_num() {
		return ent_num;
	}
	public void setEnt_num(String ent_num) {
		this.ent_num = ent_num;
	}
	public String getEnt_legalperson() {
		return ent_legalperson;
	}
	public void setEnt_legalperson(String ent_legalperson) {
		this.ent_legalperson = ent_legalperson;
	}
	
	public String getSuggest_ent_name() {
		return suggest_ent_name;
	}
	public void setSuggest_ent_name(String suggest_ent_name) {
		this.suggest_ent_name = suggest_ent_name;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getCapital_standard() {
		return capital_standard;
	}
	public void setCapital_standard(String capital_standard) {
		this.capital_standard = capital_standard;
	}
	public String getCapital_unit() {
		return capital_unit;
	}
	public void setCapital_unit(String capital_unit) {
		this.capital_unit = capital_unit;
	}
	public Date getFounded_time() {
		return founded_time;
	}
	public void setFounded_time(Date founded_time) {
		this.founded_time = founded_time;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getEnt_status() {
		return ent_status;
	}
	public void setEnt_status(String ent_status) {
		this.ent_status = ent_status;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getCredit_site() {
		return credit_site;
	}
	public void setCredit_site(String credit_site) {
		this.credit_site = credit_site;
	}
	public Date getCreatdt() {
		return creatdt;
	}
	public void setCreatdt(Date creatdt) {
		this.creatdt = creatdt;
	}
	public Date getUpdatedt() {
		return updatedt;
	}
	public void setUpdatedt(Date updatedt) {
		this.updatedt = updatedt;
	}
	
	public SearchDataUpdate(){
		
	}
	
	public SearchDataUpdate(Long id, String ent_name, String ent_num, String ent_legalperson, String suggest_ent_name,
			String product, String website, String province, String city, String district, String capital_standard,
			String capital_unit,Date founded_time, String telephone, String mail, String photo, String ent_status,
			String keyword,String credit_site, Date creatdt, Date updatedt) {
		super();
		this.id = id;
		this.ent_name = ent_name;
		this.ent_num = ent_num;
		this.ent_legalperson = ent_legalperson;
		this.suggest_ent_name = suggest_ent_name;
		this.product = product;
		this.website = website;
		this.province = province;
		this.city = city;
		this.district = district;
		this.capital_standard = capital_standard;
		this.capital_unit = capital_unit;
		this.founded_time = founded_time;
		this.telephone = telephone;
		this.mail = mail;
		this.photo = photo;
		this.ent_status = ent_status;
		this.keyword = keyword;
		this.credit_site = credit_site;
		this.creatdt = creatdt;
		this.updatedt = updatedt;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((capital_standard == null) ? 0 : capital_standard.hashCode());
		result = prime * result + ((capital_unit == null) ? 0 : capital_unit.hashCode());
		result = prime * result + ((city == null) ? 0 : city.hashCode());
		result = prime * result + ((creatdt == null) ? 0 : creatdt.hashCode());
		result = prime * result + ((credit_site == null) ? 0 : credit_site.hashCode());
		result = prime * result + ((district == null) ? 0 : district.hashCode());
		result = prime * result + ((ent_legalperson == null) ? 0 : ent_legalperson.hashCode());
		result = prime * result + ((ent_name == null) ? 0 : ent_name.hashCode());
		result = prime * result + ((ent_num == null) ? 0 : ent_num.hashCode());
		result = prime * result + ((ent_status == null) ? 0 : ent_status.hashCode());
		result = prime * result + ((founded_time == null) ? 0 : founded_time.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((keyword == null) ? 0 : keyword.hashCode());
		result = prime * result + ((mail == null) ? 0 : mail.hashCode());
		result = prime * result + ((photo == null) ? 0 : photo.hashCode());
		result = prime * result + ((product == null) ? 0 : product.hashCode());
		result = prime * result + ((province == null) ? 0 : province.hashCode());
		result = prime * result + ((suggest_ent_name == null) ? 0 : suggest_ent_name.hashCode());
		result = prime * result + ((telephone == null) ? 0 : telephone.hashCode());
		result = prime * result + ((updatedt == null) ? 0 : updatedt.hashCode());
		result = prime * result + ((website == null) ? 0 : website.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SearchDataUpdate other = (SearchDataUpdate) obj;
		if (capital_standard == null) {
			if (other.capital_standard != null)
				return false;
		} else if (!capital_standard.equals(other.capital_standard))
			return false;
		if (capital_unit == null) {
			if (other.capital_unit != null)
				return false;
		} else if (!capital_unit.equals(other.capital_unit))
			return false;
		if (city == null) {
			if (other.city != null)
				return false;
		} else if (!city.equals(other.city))
			return false;
		if (creatdt == null) {
			if (other.creatdt != null)
				return false;
		} else if (!creatdt.equals(other.creatdt))
			return false;
		if (credit_site == null) {
			if (other.credit_site != null)
				return false;
		} else if (!credit_site.equals(other.credit_site))
			return false;
		if (district == null) {
			if (other.district != null)
				return false;
		} else if (!district.equals(other.district))
			return false;
		if (ent_legalperson == null) {
			if (other.ent_legalperson != null)
				return false;
		} else if (!ent_legalperson.equals(other.ent_legalperson))
			return false;
		if (ent_name == null) {
			if (other.ent_name != null)
				return false;
		} else if (!ent_name.equals(other.ent_name))
			return false;
		if (ent_num == null) {
			if (other.ent_num != null)
				return false;
		} else if (!ent_num.equals(other.ent_num))
			return false;
		if (ent_status == null) {
			if (other.ent_status != null)
				return false;
		} else if (!ent_status.equals(other.ent_status))
			return false;
		if (founded_time == null) {
			if (other.founded_time != null)
				return false;
		} else if (!founded_time.equals(other.founded_time))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (keyword == null) {
			if (other.keyword != null)
				return false;
		} else if (!keyword.equals(other.keyword))
			return false;
		if (mail == null) {
			if (other.mail != null)
				return false;
		} else if (!mail.equals(other.mail))
			return false;
		if (photo == null) {
			if (other.photo != null)
				return false;
		} else if (!photo.equals(other.photo))
			return false;
		if (product == null) {
			if (other.product != null)
				return false;
		} else if (!product.equals(other.product))
			return false;
		if (province == null) {
			if (other.province != null)
				return false;
		} else if (!province.equals(other.province))
			return false;
		if (suggest_ent_name == null) {
			if (other.suggest_ent_name != null)
				return false;
		} else if (!suggest_ent_name.equals(other.suggest_ent_name))
			return false;
		if (telephone == null) {
			if (other.telephone != null)
				return false;
		} else if (!telephone.equals(other.telephone))
			return false;
		if (updatedt == null) {
			if (other.updatedt != null)
				return false;
		} else if (!updatedt.equals(other.updatedt))
			return false;
		if (website == null) {
			if (other.website != null)
				return false;
		} else if (!website.equals(other.website))
			return false;
		return true;
	}
	
	

}
