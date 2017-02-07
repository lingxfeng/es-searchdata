package com.teleinfo.telecredit.search.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.teleinfo.telecredit.search.pojo.SearchData;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月12日 下午4:38:43
*@version 1.0
*@parameter
*@since
*@return 
*/
@Transactional(readOnly=true)
public interface SearchDataRepository extends JpaRepository<SearchData,Long>{
	@Query("select new com.teleinfo.telecredit.search.pojo.SearchData("
			+ "t.id,"
			+ "t.ent_name,"
			+ "t.ent_num,"
			+ "t.ent_legalperson,"
			+ "t.ent_name,"
			+ "t.product,"
			+ "t.website,"
			+ "t.province,"
			+ "t.city,"
			+ "t.district,"
			+ "t.capital_standard,"
			+ "t.capital_unit,"
			+ "t.founded_time,"
			+ "t.telephone,"
			+ "t.mail,"
			+ "t.photo,"
			+ "t.ent_status,"
			+ "t.keyword,"
			+ "t.credit_site,"
			+ "t.creatdt,"
			+ "t.updatedt)"
			+ "from SearchData t where t.id between :from and :to")
	List<SearchData> findChunkById(@Param("from")Long from,@Param("to")Long to);
	
	@Query("select t from SearchData t where 1=1")
	Page<SearchData> findChunk(Pageable pageable);
	
	@Query("select count(t) from SearchData t")
	Long findTotalnum();
	
	@Query("select count(t) from SearchData t")
	Integer findTotalnumToInt();
	
	@Query("select max(t.id) from SearchData t")
	Long findMaxId();

}
