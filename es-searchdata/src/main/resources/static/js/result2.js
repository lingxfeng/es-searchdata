	$(function(){
		
		
		//搜索条件
	    var searchCondition = {
	    	content:"",
	    	capital_low : null,
	    	capital_hight : null,
	    	foundedtime_low: null,
	    	foundedtime_hight: null,
	    	province : null,
	    	currentPage : 1,
	    };
	    var currentPageNo = 1;
	    getContent();
		function getContent(){
		    //获取搜索内容
		    var queryString = $.trim(GetQueryString());
		    searchCondition.content = queryString;
		    searchCondition.currentPage = 1;
		    currentPageNo = 1;
		    if($.trim(queryString).length != 0){
		        getCookies("searchContent");
		        setCookies("searchContent",queryString);
		        requestSearchData(searchCondition)
		    }
		}

		
	    //获得要查询的字符串
	    function GetQueryString() {
	    	var userSearchContent = $("#content").val();
	        if(userSearchContent !== null){
	            setCookies("searchContent",userSearchContent);
	            getCookies("searchContent");
	            return  decodeURIComponent(userSearchContent);
	        }else{
	            return null;
	        }
	    }
	    
	  //请求数据
	    function requestSearchData (searchCondition){
	        $.ajax({
	            type:"get",
	            url:"/mysearch",
	            data:searchCondition,
	            success:function (data) {
	            	console.dir(data);
	            	fillData(data);
	            	$("#loading-result").hide();
	            	$("#result-wrap").show();
	            },
	            error:function (MLHttpRequest, textStatus, errorThro) {
	            	if(MLHttpRequest.readyState == 4 &&  MLHttpRequest.status == 500){
		            	$("#loading-result").hide();
		            	$("#result-wrap").show();
	            		$("#request-limit").show();
	            		$("#no-result").hide();
	    	        	$("#resultList-wrap").hide();
	            	}
	            }
	        })
	    }
	  //头部搜索按钮点击搜索
	    $("#btn-search").on("click", function () {
	    	getContent();
	    });
	    //头部搜索框敲击回车搜索
    	$(document).keydown(function(event){ 
    		if(event.keyCode==13){ 
    		$("#btn-search").click(); 
    		}
    	});
	  //筛选条件点击事件
	    $("#btn-searchCondition").click(function () {
	        var _this=$(this);
	        var _searchCondition=$("#searchCondition");
	        if(_searchCondition.css("display")=='none'){
	            _this.html("收起筛选<i class='iconfont icon-shangsanjiao'></i>");
	            _searchCondition.show();
	        } else{
	            _this.html("展开筛选<i class='iconfont icon-xiasanjiao'></i>");
	            _searchCondition.hide();
	        }
	    });
	    $("#btn-province-more").click(function () {
	        $(".province-more").toggle();
	    });
	    
	    $("#condition-registerCaptial a").on("click",function () {
	        if($(this).hasClass("current") == false){
	            var index = $(this).index();
	            if(index == 1){
	            	searchCondition.capital_low= null;
	            	searchCondition.capital_hight= 100;
	            }else if(index == 2){
	            	searchCondition.capital_low= 100;
	            	searchCondition.capital_hight= 200;
	            }else if(index == 3){
	            	searchCondition.capital_low= 200;
	            	searchCondition.capital_hight= 500;
	            }else if(index == 4){
	            	searchCondition.capital_low= 500;
	            	searchCondition.capital_hight= 1000;
	            }else if(index == 5){
	            	searchCondition.capital_low= 1000;
	            	searchCondition.capital_hight= null;
	            }else{
	            	searchCondition.capital_low= null;
	            	searchCondition.capital_hight= null;
	            }
	            $(this).addClass("current").siblings().removeClass("current");
	            searchCondition.currentPage = 1;
			    currentPageNo = 1;
	            requestSearchData(searchCondition);
	        }
	    });
	    $("#condition-formed a").on("click",function () {
	    	var year1 = $("#year1").val();
	    	var year5 = $("#year5").val();
	    	var year10 = $("#year10").val();
	    	var year15 = $("#year15").val();
	        if($(this).hasClass("current") == false){
	            var index = $(this).index();
	            if(index == 1){
	            	searchCondition.foundedtime_low= year1;
	            	searchCondition.foundedtime_hight= null;
	            }else if(index == 2){
	            	searchCondition.foundedtime_low= year5;
	            	searchCondition.foundedtime_hight= year1;
	            }else if(index == 3){
	            	searchCondition.foundedtime_low= year10;
	            	searchCondition.foundedtime_hight= year5;
	            }else if(index == 4){
	            	searchCondition.foundedtime_low= year15;
	            	searchCondition.foundedtime_hight= year10;
	            }else if(index == 5){
	            	searchCondition.foundedtime_low= null;
	            	searchCondition.foundedtime_hight= year15;
	            }else{
	            	searchCondition.foundedtime_low= null;
	            	searchCondition.foundedtime_hight= null;
	            }
	            $(this).addClass("current").siblings().removeClass("current");
	            searchCondition.currentPage = 1;
			    currentPageNo = 1;
	            requestSearchData(searchCondition,fillData);
	        }
	    });
	    $("#condition-provice a").on("click",function () {
	        if($(this).hasClass("current") == false){
	        	var str = $(this).attr("value");;
	        	if(str == 'qb'){
	        		searchCondition.province = "";
	        	}else{
	        		searchCondition.province = $(this).attr("value");
	        	}
	            $("#condition-provice .current").removeClass("current");
	            $(this).addClass("current");
	            searchCondition.currentPage = 1;
			    currentPageNo = 1;
	            requestSearchData(searchCondition);
	        }
	    });
	
	    //写入数据
	    function fillData(data){
	        $("#results-counts span:eq(0)").html(searchCondition.content);
	        $("#results-counts span:eq(1)").html(data.totalnum);
	        
	        if(data.totalnum === 0){
	        	$("#no-result").show();
	        	$("#resultList-wrap").hide();
	        	return ;
	        }else{
	        	$("#no-result").hide();
	        	$("#resultList-wrap").show();
	        }
	        
	        var listHtml = "";
	        var searchDataList = data.returnData;
	        if(searchDataList != null){
		        for(var i = 0 , len = searchDataList.length; i < len ; i++){
		        	var ent_name = searchDataList[i].ent_name==null?"---":searchDataList[i].ent_name;
		        	var ent_legalperson = searchDataList[i].ent_legalperson==null?"---":searchDataList[i].ent_legalperson;
		        	var founded_time = searchDataList[i].founded_time==null?"---":searchDataList[i].founded_time;
		        	var capitalStanderd = (searchDataList[i].capital_standard==null || searchDataList[i].capital_standard=="")?"---":searchDataList[i].capital_standard;
		        	var capital_unit = searchDataList[i].capital_unit==null?"  ":searchDataList[i].capital_unit;
		        	var score = searchDataList[i].score==null?"---":searchDataList[i].score;
		        	var telephone = searchDataList[i].telephone==null?"---":searchDataList[i].telephone;
		        	var mail = searchDataList[i].mail==null?"---":searchDataList[i].mail;
		            listHtml += `<div class="result-list-row">
		                                <div class="list-company-logo">
		                                    <img src="${searchDataList[i].photo}" alt="">
		                                </div>
		                                <div class="list-company-info">
		                                		
		                                    <div class="list-company-name"><a href="http://${searchDataList[i].credit_site}">${ent_name}</a></div>
		                                    <div class="list-company-flags">
		                                        <span>法人：${ent_legalperson}</span>
		                                        <span>成立时间：${founded_time}</span>
		                                        <span>注册资本：${capitalStanderd}万元${capital_unit}</span>
		                                        <span>匹配度：${score}</span>
		                                    </div>
		                                    <div class="list-company-contacts">
		                                        <span><i class="iconfont icon-dianhua"></i> ${telephone}</span>
		                                        <span><i class="iconfont icon-youxiang"></i> ${mail}</span>
		                                    </div>
		                                </div>`;
		           if(searchDataList[i].status == true){
		        	    listHtml +=  `<div class="list-company-status">
		                                	<span>存续</span>
		                                </div>`;
		           }else{
		        	   listHtml +=  `<div class="list-company-status">
		           						<span>正常</span>
		           					</div>`;
		           }
		            if(searchDataList[i].focus == true){
		                listHtml +=  `<div class="list-focus-status">
		                                    <i class="iconfont icon-focus"></i>
		                                </div>
		                            </div>`;
		            }else{
		                listHtml +=  `<div class="list-focus-status">
		                                	<i class="iconfont icon-nofocus"></i>
		                                </div>
		                            </div>`;
		            }
		        }
	        }

	        $("#result-list").html(listHtml);
	        var totalSize = data.totalPages;
	        if(totalSize > 1){
	        	$('#pagination-resultList').show();
	            var maxPag = totalSize > 10 ? 10 : totalSize;
	            $('#pagination-resultList').twbsPagination({
	                prev_text:"上一页",
	                next_text:"下一页",
	                totalPages: maxPag,
	                visiblePages: 10,
	                onPageClick: function (event, page) {
	                    if(page != currentPageNo){
	                      	searchCondition.currentPage = page;
	                        requestSearchData(searchCondition,fillData);
	                        currentPageNo = page;
	                    }
	                }
	            });
	        }else{
	            $('#pagination-resultList').hide();
	        }
	    }           
	    
	  //设置cookie 读取cookie
	    function getCookies(cookieName){
	        var cookies = document.cookie;
	        var s_index = cookies.indexOf(cookieName+"=");
	        if(s_index == -1){
	            $("#history-list").html("暂无浏览历史");
	        }else{
	            var e_index = cookies.indexOf(";",s_index) == -1 ? e_index = cookies.length : e_index = cookies.indexOf(";",s_index);
	            var historyContent = cookies.substring(s_index,e_index);
	            historyContent = historyContent.replace(/searchContent/,"").substring(1);
	            var history = historyContent.split("=");
	            var historyListHtml = "" ;
	            for(var i = 0; i < history.length ; i++){
	                var args = history[i].split("&");
	                historyListHtml += `<div class="history-content">
	                            <a href="./list?content=${decodeURIComponent(args[0])}" title="${decodeURIComponent(args[0])}">${decodeURIComponent(args[0])}</a></div>`
	            }
	            $("#history-list").html(historyListHtml);
	        }
	    }
	    function setCookies(cookieName,value){
	        var cookies = document.cookie;
	        var s_index = cookies.indexOf(cookieName+"="),e_index;
	        var searchTime = getNowFormatDate();

	        var outTime = new Date();
	        outTime.setHours(outTime.getHours() + (30*24));
	        if(s_index == -1){
	            document.cookie = cookieName + "="+ value + "&" + searchTime + ";expires=" + outTime.toUTCString();
	        }else{
	            if(cookies.indexOf(";",s_index) == -1){
	                e_index = cookies.length;
	            }else{
	                e_index = cookies.indexOf(";",s_index);
	            }
	            var historyContent = cookies.substring(s_index,e_index);
	            historyContent = historyContent.replace(/searchContent/,"");
	            var cookiesLength = historyContent.match(/[=]/ig).length;
	            if(cookiesLength <= 4){
	                document.cookie = cookieName + "="+ value + "&" + searchTime + historyContent + ";expires=" + outTime.toUTCString();
	            }else {
	                var lastIndex = historyContent.lastIndexOf("=");
	                historyContent = historyContent.substring(0,lastIndex);
	                document.cookie = cookieName + "="+ value + "&" + searchTime + historyContent + ";expires=" + outTime.toUTCString();
	            }
	        }
	    }
	    
	  //获得目标日期时间
	    function getNowFormatDate(seperator01,seperator02) {
	        var date = new Date();
	        var seperator1 = seperator01 || "-";
	        var seperator2 = seperator02 || ":";
	        var month = date.getMonth() + 1;
	        var strDate = date.getDate();
	        if (month >= 1 && month <= 9) {
	            month = "0" + month;
	        }
	        if (strDate >= 0 && strDate <= 9) {
	            strDate = "0" + strDate;
	        }

	        var strHour = date.getHours();
	        var strMinutes = date.getMinutes();
	        var strSeconds = date.getSeconds();
	        var pm_am = "";
	        if(strHour>12){
	            strHour = Math.abs(strHour - 12);
	            pm_am += " pm";
	        }else {
	            pm_am += " am";
	        }
	        if (strMinutes >= 0 && strMinutes <= 9) {
	            strMinutes = "0" + strMinutes;
	        }
	        if (strSeconds >= 0 && strSeconds <= 9) {
	            strSeconds = "0" + strSeconds;
	        }
	        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + "  " + strHour + seperator2 + strMinutes
	            + seperator2 + strSeconds + pm_am;
	        return currentdate;
	    }
	    
	});    

//关于我们加载选中特定tab选项
if($("#service-wrap").length != 0){
    $("[data-toggle='tooltip']").tooltip();
    (function () {
        var hashArray = ["about","operate","privacy","help","opinition"];
        var showTab = location.hash.slice(1);
        var tabIndex = hashArray.indexOf(showTab);
        if(tabIndex != -1){
            $('#service li:eq('+ tabIndex +') a').tab('show');
        }
    })();
    $("textarea, input[type='text']").on("blur",function () {
        if($(this).val().length == 0){
            $(this).addClass("error").focus();
        }
    });
    $("#submit-opinition").on("click",function () {
        checkForm();
    });
    function refreshCheckCode(){
        $(".check-img").attr("src","http://www.telecredit.cn/captcha/"+"?v="+Math.random());
    }
    function checkForm() {
        var data = {
            suggestion:{

            }
        };

        var problemDesc = $("#problem-desc").val().trim();
        var problemDescLength = problemDesc.length;
        if(problemDescLength == 0 || problemDescLength > 2000){
            $("#problem-desc").addClass("error").focus();
            return false;
        }else{
            data.suggestion.problem = problemDesc;
        }
        var reply = $("input[name='reply']:checked").val();

        var phone = $(".phone").val();
        var regPhone =  /^1[0-9]{10}$/;
        var regEmail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if(regPhone.test(phone) == false && (regEmail.test(phone) == false || phone.length > 100)){
            $(".phone").addClass("error").focus();
            return false;
        }else{
            data.suggestion.phone = phone;
        }

        var checkCode = $(".check-code").val();
        var regCheckCode = /^[\d\w]{4}$/;
        if(regCheckCode.test(checkCode)){
            data.suggestion.reply = reply;
            data.suggestion.checkCode = checkCode;
            var stringJson = JSON.stringify(data);
            //输入为数字
            $.ajax({
                type: "post",
                url: "/suggestion/",
                contentType:"application/json;charset=utf-8",
                data: stringJson,
                success: function (data) {
                    if(data.response.status.code == 0){
                        $("#success-msg").fadeIn();
                        setTimeout(function(){
                            location.href = "http://www.telecredit.cn";
                        },3000);
                    }else{
                        //提示验证码错误
                        refreshCheckCode();
                        $(".check-code").addClass("error").focus();
                        /*
                         *
                         * 提示验证码错误
                         * */
                    }
                }, error: function () {
                    //错误提示，刷新验证码
                }
            });
        }else{
            $(".check-code").addClass("error").focus();
        }
    }
    $(".check-img").on("click",function () {
        refreshCheckCode();
    });
    $("#close-modal").on("click",function () {
        $("#success-msg").fadeOut();
    });


}

if($(".main-404").length != 0){
    (function (time){
        $(".countdown span").html(time);
        var surplusTime = time;
        window.setInterval(function () {
            surplusTime --;
            $(".countdown span").html(surplusTime);
            if(surplusTime == 0){
                window.location.href="http://www.telecredit.cn";
            }
        },1000);
    })(3);
}