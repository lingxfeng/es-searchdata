package com.teleinfo.telecredit.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月16日 下午4:26:41
*@version 1.0
*@parameter
*@since
*@return 
*/

@Controller
@RequestMapping(value="/insert")
public class InsertDataController {
	
/*	@Autowired
	private SearchDataService searchDataService;
	@Autowired
	private SearchDataRepository searchDataRepository;*/

	@Value("${elasticesearch.nodes}")
	private String nodes;
	@Value("${elasticesearch.cluster}")
	private String cluster;
	@Value("${elasticesearch.index}")
	private String index;
	@Value("${elasticesearch.type}")
	private String type;
	/**
	 * 跳转页面
	 * @return
	 */
	@RequestMapping("/")
	public String goIndex(){
		return "send-messaage";
	}
	/**
	 * 单线程导入数据
	 * @return
	 */
	/*@SuppressWarnings("rawtypes")
	@ResponseBody
	@RequestMapping("testInsertById")
	public Map testInsertById(){
		Map map = new HashMap<>();
		Client client = this.searchDataService.getClient(host,port);
		Long begin = new Date().getTime();
        System.out.println("开始时间："+begin);
        //Long findTotalnum = this.searchDataRepository.findTotalnum();
        Long findTotalnum = this.searchDataRepository.findMaxId();
        System.out.println(findTotalnum);
        Long chunk = findTotalnum/50000;
        
        for(Long i=1l;i<=chunk+1;i++){
        	Long begins = new Date().getTime();
            System.out.println("第"+i+"开始时间："+begins);
            List<SearchData> list;
            if(i <= chunk){
            	list = this.searchDataRepository.findChunkById((i-1)*50000,i*50000-1);
            }else{
            	list = this.searchDataRepository.findChunkById(chunk*50000,findTotalnum);
            }
            if(list != null && list.size() != 0){
            	map = this.searchDataService.save(client,index,type,"", list);
            }
            Long ends = new Date().getTime();
            System.out.println("第"+i+"结束时间："+ends);
            System.out.println("第"+i+"cast : " + (ends - begins) / 1000 + "s");
        }
        client.close();
        Long end = new Date().getTime();
        System.out.println("结束时间："+end);
        System.out.println("cast : " + (end - begin) / 1000 + "s");
		return map;
	}*/
	
	
	/**
	 * 单线程导入数据目前不可用，JPA不支持limit
	 * 要使用pageable
	 * pageable限定参数是int 
	 * 使用pageable之后性能受影响（不建议使用）
	 * @return
	 */
	/*@ResponseBody
	@RequestMapping("testInsertByPage")
	public String testInsert(){
		Client client = this.searchDataService.getClient(host,port);
        Integer findTotalnum = this.searchDataRepository.findTotalnumToInt();
        Integer chunk = findTotalnum/50000;
        for(Integer i=0;i<=chunk;i++){
            List<SearchData> list;
        	Pageable pageable = new PageRequest(i, 50000);
            Page<SearchData> misakaPage = this.searchDataRepository.findChunk(pageable);  
            list = misakaPage.getContent();
            for(int j=0;j<list.size();j++){
            	list.get(j).setSuggest_ent_name(list.get(j).getEnt_name());
            }
        	this.searchDataService.save(client,index,type,"", list);
        }
        client.close();
		return null;
	}*/
	/**
	 * 多线程导入数据
	 * @return
	 */
/*	@ResponseBody
	@RequestMapping("testInsert2")
	public String testInsert2(){
		this.searchDataService.threadsExecute(5,host,port);
		return null;
	}*/
}
