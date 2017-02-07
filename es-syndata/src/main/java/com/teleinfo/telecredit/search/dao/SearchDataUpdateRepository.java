package com.teleinfo.telecredit.search.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.teleinfo.telecredit.search.pojo.SearchDataUpdate;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月12日 下午4:38:43
*@version 1.0
*@parameter
*@since
*@return 
*/
@Transactional(readOnly=true)
public interface SearchDataUpdateRepository extends JpaRepository<SearchDataUpdate,Long>{
	@Query("select t from SearchDataUpdate t where t.updatedt > :lastTime order by t.updatedt")
	List<SearchDataUpdate> findModifiedData(@Param("lastTime")Date lastTime);
}
