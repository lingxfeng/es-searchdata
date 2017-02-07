package com.teleinfo.telecredit.search.limit;
/** 
*@author dll 作者 E-mail：dongliangliang@teleinfo.cn 
*@date 创建时间：2017年1月19日 下午3:32:00
*@version 1.0
*@parameter
*@since
*@return 
*/

public class RequestLimitException extends Exception {  

	private static final long serialVersionUID = 5564154178982933089L;

	public RequestLimitException() {  
        super("HTTP请求超出设定的限制");  
    }  
  
    public RequestLimitException(String message) {  
        super(message);  
    }  
  
}  