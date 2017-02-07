package com.teleinfo.telecredit.web;

import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/")
public class IndexController {
	
	@RequestMapping("/result")
	public String list() {
		return"result";
	}
	
	/**
	 * 进入页面
	 * @return
	 */
	@RequestMapping(value="/",method=RequestMethod.GET)
	public String goIndex(){
		System.out.println(Thread.currentThread().getId());
		return "searchindex";
	}
	/**
	 * 进入列表页面
	 * @return
	 */
	@RequestMapping(value="list",method=RequestMethod.GET)
	public String goList(@RequestParam(name="content")String content,Model model){
		Calendar calendar = Calendar.getInstance();
        Date date = new Date();
        
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, -1);
        Date date1 = calendar.getTime();
       
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, -5);
        Date date5 = calendar.getTime();
        
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, -10);
        Date date10 = calendar.getTime();
        
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, -15);
        Date date15 = calendar.getTime();
		model.addAttribute("before1year",date1.getTime());//得到去年
		model.addAttribute("before5year", date5.getTime());//得到5年前
		model.addAttribute("before10year", date10.getTime());//得到10年前
		model.addAttribute("before15year", date15.getTime());//得到15年前
		model.addAttribute("content",content);
		return "searchresult";
	}

}
