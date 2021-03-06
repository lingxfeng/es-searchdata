var userSearchContent = "";
$(function () {
    //搜索条件
    var searchCondition = {
        searchKey : "",
        page : 1,
        registerCapitals : 0,
        formed : 0,
        provice : "全部",
    };
    //获得要查询的字符串
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r !== null){
            setCookies("searchContent",r[2]);
            getCookies("searchContent");
            return  decodeURIComponent(r[2]);
        }else{
            return null;
        }
    }
    //请求数据
    function requestSearchData (searchCondition,successCallback){
        $.ajax({
            type:"get",
            url:"./search/searchData",
            data:searchCondition,
            success:function (data) {
                successCallback(data)
            },
            error:function (MLHttpRequest, textStatus, errorThro) {
                console.log(MLHttpRequest);
                console.log(textStatus);
            }
        })
    }

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
            searchCondition.provice = index;
            $(this).addClass("current").siblings().removeClass("current");
            requestSearchData(searchCondition,fillData);
        }
    });
    $("#condition-formed a").on("click",function () {
        if($(this).hasClass("current") == false){
            var index = $(this).index();
            searchCondition.formed = index;
            $(this).addClass("current").siblings().removeClass("current");
            requestSearchData(searchCondition,fillData);
        }
    });
    $("#condition-provice a").on("click",function () {
        if($(this).hasClass("current") == false){
            searchCondition.provice = $(this).text();
            $("#condition-provice .current").removeClass("current");
            $(this).addClass("current");
            requestSearchData(searchCondition,fillData);
        }
    });
    // requestData("/api/search/query",1,queryString);
    //写入数据
    function fillData(data){
        $("#results-counts span:eq(0)").html(userSearchContent);
        $("#results-counts span:eq(1)").html(data.totalSize);
        var listHtml = "";
        var searchDataList = data.list;
        for(var i = 0 , len = searchDataList.length; i < len ; i++){
            listHtml += `<div class="result-list-row">
                                <div class="list-company-logo">
                                    <img src="${searchDataList[i].logo}" alt="">
                                </div>
                                <div class="list-company-info">
                                		
                                    <div class="list-company-name"><a href="http://${searchDataList[i].uname}">${searchDataList[i].name}</a></div>
                                    <div class="list-company-flags">
                                        <span>法人：${searchDataList[i].legalPerson}</span>
                                        <span>成立时间：${searchDataList[i].establishDt}</span>
                                        <span>注册资本：${searchDataList[i].regCapital}</span>
                                    </div>
                                    <div class="list-company-contacts">
                                       <!-- <span><i class="iconfont icon-dianhua"></i> ${searchDataList[i].phone}</span>
                                        <span><i class="iconfont icon-youxiang"></i> ${searchDataList[i].mailbox}</span>-->
                                    </div>
                                </div>
                                <div class="list-company-status">
                                  <!--  <span>存续</span>-->
                                </div>`;
            if(searchDataList[i].focus == true){
                listHtml +=  `<div class="list-focus-status">
                                    <i class="iconfont icon-focus"></i>
                                </div>
                            </div>`;
            }else{
                listHtml +=  `<div class="list-focus-status">
                                   <!-- <i class="iconfont icon-nofocus"></i>-->
                                </div>
                            </div>`;
            }

        }
        $("#result-list").html(listHtml);
        var totalSize = data.totalSize;
        if(totalSize > 1){
            var currentPageNo = 1;
            var maxPag = totalSize > 10 ? 10 : totalSize;
            $('#pagination-resultList').twbsPagination({
                prev_text:"上一页",
                next_text:"下一页",
                totalPages: 0,
                visiblePages: 10,
                onPageClick: function (event, page) {
                    if(page != currentPageNo){
                        searchCondition.page = page;
                        requestSearchData(searchCondition,fillData);
                        currentPageNo = page;
                    }
                }
            });
        }else{
            $('#pagination-demo').hide();
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
                            <a href="./result?q=${decodeURIComponent(args[0])}" title="${decodeURIComponent(args[0])}">${decodeURIComponent(args[0])}</a></div>`
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

    //获取搜索内容
    var queryString = $.trim(GetQueryString("q"));
    userSearchContent = queryString;
    searchCondition.searchKey = userSearchContent;
    if($.trim(userSearchContent).length != 0){
        getCookies("searchContent");
        setCookies("searchContent",queryString);
        requestSearchData(searchCondition,fillData)
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