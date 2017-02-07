//请求structjson数据，获得静态json文件路径
$(function () {
    var domainName = "",
        uHost = "",
        handleError = {
            "limitRequest":function () {
                $("#domain").hide();
                $("#web").hide();
                $("#limit").show();
            },
            "entNone" : function(){
                var tableHtml = "<table><tr><td>主体性质</td><td>-</td></tr><tr><td>机构名称</td><td>-</td></tr></table>";
                $("#subject table").html(tableHtml);
            },
            "domainNone" : function (domainname,updatetime) {
                $("title").html(domainname+".信息");
                var updateTime = updatetime || (new Date().toUTCString());
                $("#domain .word-info h3").html(domainname);
                $("#domain .data-time span").html(updateTime);
                $("#domain .result-count").hide();
                $("#domain").show();
                $("#domain .no-domain").show();
            }
        };
    resize();
    $.ajax({
        type: "post",
        url: "/api/structjson",
        data: {},
        success: function (structJson) {
            $(".loading-modal").hide();
            domainName = structJson.udomain;
            uHost = structJson.uhost;
            $("title").html(domainName + ".信息");
            var determineKind = determinBlackList(structJson);
            if(determineKind === true){
                determineDataKind(structJson);
            }
        },
        error: function (errorData) {
            //第一次请求structjson数据失败，提示内容  暂时提示受限
            $(".loading-modal").hide();

            if (errorData.status == "502" || errorData.status == "503") {
                handleError.limitRequest();
            } else {
                var searchDomain = document.domain.match(/.*?(?=.xn)/)[0];
                handleError.domainNone(searchDomain);            }
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout' || XMLHttpRequest.status == 504){
                var searchDomain = document.domain.match(/.*?(?=.xn)/)[0];
                handleError.domainNone(searchDomain);            }
        }
    });

    //判断是不是黑名单网站
    function determinBlackList(strctJson){
        var abuse = strctJson.abuse;
        if(abuse !== "none"){
            var uhost = strctJson.uhost;
            $("#uhost").html(uhost);
            $("#black-list").fadeIn();
            return false;
        }else{
            return true;
        }
    }

    //判断网站还是域名
    function determineDataKind(structJson){
        var data_kind = structJson.kind;
        if (data_kind == "website") {
            $("#web").show();
            $("#domain").hide();
            webDetail(structJson);
        } else if (data_kind == "domain") {
            $("#web").hide();
            $("#domain").show();
            domainDetail(structJson);
        } else if (data_kind == "none"){
            $("#domain").show();
            var searchDomain = document.domain.match(/.*?(?=.xn)/)[0];
            handleError.domainNone(searchDomain);
        }
    }

    //网站填入内容
    function webDetail(reponseData) {
        var elementId = ["web-belonger", "web-profile", "record-data", "subject", "infocheck","use-data"];
        var fileName = ["title", "web", "icp", "address", "infoCheck","whois"];
        var method = ["title", "webProfile", "icp", "subject", "infocheck","useData"];

        //遍历判断动态json返回的对应的静态json文件是否存在，发送请求静态json文件
        function pd(data, id, method) {
            $("#web-belonger .word-info h3").html(domainUrlHtml(uHost));
            if (data !== null) {
                fillData[method](data);
            }
        }

        //获取开办主体数据
        function getSubData(reponseData) {
            var dataTypes = ["ent","gov","org","other"];
            var subData = null;
            for(var i = 0, dataTypeLength = dataTypes.length; i< dataTypeLength ;i++){
                var datatype = dataTypes[i];
                if(reponseData[datatype] !== null){
                    subData = reponseData[datatype];
                    return subData;
                }
            }
            return subData ;
        }

        //判断返回的数据中type是否存在，以实现刷新按钮功能实现，不用所有文件全部加载
        if (reponseData.hasOwnProperty("type") === true) {
            var dataType = reponseData.type;    //刷新按钮是哪个模块
            var typeIndex = fileName.indexOf(dataType); //根据索引找到填入的方法
            var fillMethod = method[typeIndex];
            var refreshVersion = new Date().getTime();  //按照当前时间增加版本号，以清楚缓存
            var stringJson = reponseData[dataType];     //得到structjson中返回的对应部分的json字符串形式的数据
            fillData[fillMethod](stringJson);     //填入数据
        } else {
            for (var i = 0; i < elementId.length; i++) {
                //设置开办主体，infocheck无信息情况下的表现效果
                var noFileAttr = {
                    "href": "javascript:void(0)",
                    "data-toggle": ""
                };
                if (fileName[i] === "infocheck" && reponseData[fileName[i]] === null) {
                    $("#myTab li a[href='#operation']").attr(noFileAttr).addClass("no-click").off().unbind();   //修改成没有数据，禁止点击
                }else if(fileName[i] === "icp" && reponseData[fileName[i]] === null){
                    $("#record-data tr:eq(5) td:eq(1)").html("<a href='http://www."+domainName+".域名.信息'  class='href-color underline-lable' title='点击查看"+domainName+"注册信息'>"+domainName+"</a>");
                } else {
                    pd(reponseData[fileName[i]], elementId[i], method[i]);
                }
            }

            //处理开办主体部分
            var subData = reponseData.ent;
            if(subData !== null){
                fillData.subject(subData);
            }else {
                handleError.entNone();
            }
        }

        //填入网站图片
        fillWebImg(reponseData.title);
    }

    //域名填入的内容
    function domainDetail(reponseData) {
        $("#domain .word-info h3").html(domainName);
        $("#domain").show();
        var whoisData = reponseData.whois;
        if(whoisData !== null && whoisData.creation_date !== null){
            fillData.whois(whoisData);
            $(".loading-modal").hide();
        }else{
            var searchDomain = domainName || document.domain.match(/.*?(?=.xn)/)[0];
            var updateTime = null;
            if(reponseData.hasOwnProperty("last_update_date") && reponseData.last_update_date !== null){
                updateTime = reponseData.last_update_date[0];
            }
            handleError.domainNone(searchDomain,updateTime);
        }
    }

    //网站快照刷新
    function refreshWebPic() {
        $(".refresh-img-wrap").fadeIn();
        var imgElement = $(".img-info img");
        $("#refresh-img").on("click",function () {
            // $(this).addClass("glyphicon-spin");
            // $(".refresh-img-tip").html("正在更新");
            $(".refresh-img-wrap").removeClass("no-mask");
            $(".refresh-img-tip").show();
            $(this).off().hide();//防止用户短时间内多次点击
            var requestUrl = "/screenshot/page/" + domainName;
            $.ajax({
                type:"get",
                url:requestUrl,
                data:{},
                success:function(data){
                    if(data.response.status.code === 0){
                        $.ajax({
                            type : "post",
                            url : "/api/structjson",
                            data : {},
                            success : function (structJson) {
                                imgElement.removeClass("loading-img");
                                fillWebImg(structJson.title);
                                $(".refresh-img-wrap").addClass("latest-img");
                                $(".refresh-img-tip").html("最新图片");
                                setTimeout(function () {
                                    $(".refresh-img-wrap").fadeOut();
                                },500);
                            }
                        });
                    }
                },
                error:function(){
                    imgElement.removeClass("loading-img");
                    imgElement.attr("src","images/company.png");
                    refreshWebPic();
                }
            });
        });
    }

    //填入网页快照
    function fillWebImg(data) {
        //判断如果title、title.pic数据不为null，将图片填入
        var updateTime ;
        if(data !== null && data.pic !== null){
            var imgSrc = data.pic,
                bigImgSrc = "/website/pic" + imgSrc,
                dotIndex = bigImgSrc.indexOf("."),
                smallImgSrc = bigImgSrc.substring(0,dotIndex)+"-1"+bigImgSrc.substring(dotIndex);
            $("#web-belonger .img-info img").attr({"src": smallImgSrc, "data-target": "#myModal"});
            $(".img-info img").on("click",function () {
                $(".modal-body").attr("src", bigImgSrc);
                $("#myModal").fadeIn();
            });
            $("#myModalLabel").html(domainName + "网站快照");
            //根据图片的更新时间判断图片是否在有效期内
            updateTime = data.img_last_update_date;
            if (updateTime !== null ){
                var validity = 24*60*60*1000;
                updateTime = new Date(updateTime).getTime();
                var nowTime = new Date().getTime();
                //超出有限期，绑定刷新事件
                if((nowTime - updateTime) > validity){
                    refreshWebPic();
                }
            }else{
                refreshWebPic();
            }
        }else{
            refreshWebPic();
        }
    }

    var fillData = {
        "title": function (data) {
            var wordInfoHtml = "<h3>" + domainUrlHtml(uHost)+ "</h3> " +
                "<p class='data-time'>数据更新日期：<span>" + (data.last_update_date || "-" ) + "</span></p>" +
                " <p><i class='iconfont icon-title'></i> <span>" + (data.web_info || "-" ) + "</span></p>" +
                " <p><i class='iconfont icon-company'></i> <span>" + (data.ent_name || "-" ) + "</span></p> " +
                "<p><i class='iconfont icon-icp'></i> <span>" + (data.icp_no || "-" ) + "</span></p>";
            $("#web-belonger .word-info ").html(wordInfoHtml);
        },
        "webProfile": function (data) {
            var tableHtml = [];
            tableHtml.push(judgeData(data.web_title), judgeData(data.web_keywords), judgeData(data.web_description));
            $("#web-profile tr td:nth-child(2)").each(function (i) {
                $(this).html(tableHtml[i]);
            });
        },
        "icp": function (data) {
            var tableHtml = [];
            var subSite = 0 ;
            tableHtml.push(data.name, data.website, data.icp_no, data.audit_date, data.leader);
            var domainHtml = "";
            for (var i = 0; i < data.domains.length; i++) {
                domainHtml += "<a href='http://" + data.domains[i] + ".域名.信息' class='href-color underline-lable' title='点击查看"+domainName+"注册信息'>" + data.domains[i] + "</a>";
            }
            var subnoHtml = arrayHtml(data.icp_subno, "</br>");
            tableHtml.push(domainHtml, subnoHtml);
            $("#record-data tr td:nth-child(2)").each(function (i) {
                $(this).html(tableHtml[i]);
            });
            var recordDays = timeLength(data.audit_date.substring(0,10));
            $("#use-data table tr:nth-child(2) td:nth-child(2)").html(recordDays + "天 (最新备案更新时间：" + data.audit_date + ")");
            subSite = data.hasOwnProperty("holdNumber") === true ? data.holdNumber : data.icp_subno.length;
            $("#use-data table tr:nth-child(3) td:nth-child(2)").html("该ICP主体持有" + subSite + "个站点");
        },
        "enter": function (data) {
            var tableHtml = [data.address[0].ip_address, data.address[0].digital_address, data.address[0].physical_address];
            $("#enter-data tr td:nth-child(2)").each(function (i) {
                $(this).html(tableHtml[i]);
            });
        },
        "useData" : function (data) {
            if(data.creation_date){
                $("#use-data table tr:nth-child(1) td:nth-child(2)").html(timeLength(data.creation_date[0].substring(0,10))+ "天 (创建于" + data.creation_date[0]+")");
            }
        },
        "subject": function (data) {
            var order = data.order;
            var tableHtml = "<tbody>";
            var objectData = [];
            var fillData = [];
            var leftData = {
                "enterprise": ["主体性质", "公司名称", "统一社会信用代码", "公司注册地址", "公司类型", "注册资本", "法人代表", "联系电话", "经营范围"],
                "personal": ["主体性质", "姓名"],
                "goverment": ["主体性质", "机构名称", "中文域名", "机构地址", "机构职能"],
                "army": ["主体性质", "机构名称"],
                "socialGroup": ["主体性质", "机构名称", "社会团体类型"]
            };
            for (var j = 0; j < order.length; j++) {
                if (order[j] != "create_date") objectData.push( (data.hasOwnProperty(order[j]) && data[order[j]] != "null") ? data[order[j]] : "-");
            }
            data[order[0]] = data[order[0]].trim();
            switch (data[order[0]]){
                case "企业" :
                    $("#subject .data-table-title span").append(" <small>（数据验证：<a href='"+ data.tianyancha +"' target='_blank'>天眼查</a>）</small>");
                    fillData = leftData.enterprise;
                    break;
                case "个人" :
                    fillData = leftData.personal;
                    break;
                case "事业单位" :
                case "党政机关" :
                    fillData = leftData.goverment;
                    break;
                case "军队" :
                    fillData = leftData.army;
                    break;
                case "社会团体" :
                    fillData = leftData.socialGroup;
                    break;
            }
            for (var k = 0; k < objectData.length; k++) {
                tableHtml += "<tr><td>" + fillData[k] + "</td><td>" + objectData[k] + "</td></tr>";
            }
            tableHtml += "</tbody>";
            $("#subject table").html(tableHtml);
        },
        "infocheck": function (data) {
            if(data === null){
                return false;
            }
            var infocheckHref = domainName ? "http://infocheck.teleinfo.cn/result.html?q="+domainName : "http://infocheck.teleinfo.cn";
            $("#infocheck-href").attr("href",infocheckHref);
            var order = data.order;
            var objectData = [];
            var fillHtml = [];
            //$("#operation #reponse-time").html(data.speed);
            for (var j = 0; j < order.length; j++) {
                objectData.push(data[order[j]]);
            }
            //if(data.speed != null){
            //    $("#reponse-time").html(data.speed + "毫秒");
            //}else {
            //    $("#reponse-time").html("暂未获得网站响应时间");
            //}
            //获得infocheck评分，如果评分为空，则填入"-"
            fillHtml.push(objectData[0] !== null ? (objectData[0] + "分") : "-");
            for (var i = 1; i < objectData.length; i++) {
                if (objectData[i] === null) {
                    fillHtml.push("-");
                } else if (objectData[i] >= 60 && objectData[i] < 80) {
                    fillHtml.push("<i class='glyphicon glyphicon-ban-circle'></i>");
                } else if (objectData[i] >= 80) {
                    fillHtml.push("<i class='glyphicon glyphicon-ok'></i>");
                } else if (objectData[i] < 60) {
                    fillHtml.push("<i class='glyphicon glyphicon-remove'></i>");
                }
            }
            $(" #infocheck tr td:nth-child(2)").each(function (i) {
                $(this).html(fillHtml[i]);
            });
        },
        "whois": function (data) {
            var whoisResult = [];
            if (data.contacts.hasOwnProperty("registrant") === false) {
                data.contacts.registrant = {
                    "name": "-",
                    "email": "-",
                    "organization":"-"
                };
            }
            if (data.hasOwnProperty("registrar") === false) {
                data.registrar = ["-"];
            }
            var dnsHtml = arrayHtml(judgeData(data.nameservers), "</br>");
            var statusHtml = arrayHtml(data.status, "</br>");
            if(data.contacts.registrant !== null){
                whoisResult.push((data.contacts.registrant.organization || data.contacts.registrant.name),data.contacts.registrant.email,data.registrar[0],judgeData(data.creation_date),judgeData(data.expiration_date),statusHtml,dnsHtml);
            }
            var englishHtml = data.raw[0].replace(/\n/g, "</br>");
            $("#domain #regeisted-info tr td:nth-child(2)").each(function (i) {
                $(this).html(whoisResult[i]);
            });
            $("#domain #english-details").html(englishHtml);
            $("#domain .result-info .data-time span").html(judgeData(data.last_update_date));
        }
    };

    function domainUrlHtml(domain){
        return "<a class='underline-lable' href='http://"+domain+"' title='点击跳转到"+domain+"' target='_blank'>"+domain+"</a>";
    }
    function websiteUrlHtml(domain){
        var websiteHref = "http://" + domain + ".信用.信息";
        return "<a href='"+websiteHref+"' target='_blank'>"+domain+"</a>";
    }

    //将对象转换成字符串
    function arrayHtml(key, lable) {
        if (key !== null && key !== undefined && key.length !== 0) {
            var insertHtml = "";
            for (var i = 0; i < key.length; i++) {
                insertHtml += key[i] + (lable || "");
            }
            return insertHtml;
        } else {
            return "-";
        }
    }

    //获得目标时间到此时的时间（天）
    function timeLength(s1) {
        var d1 = new Date(s1.replace(/-/g, "/"));
        var d2 = new Date();
        var days = d2.getTime() - d1.getTime();
        var time = parseInt(days / (1000 * 60 * 60 * 24));
        return time;
    }

    //当数据为空 or null时候 返回 "-"
    function judgeData(data) {
        return data || "-";
    }

    //调整窗口大小
    $(window).on("resize", resize());
    function resize() {
        var nowHeight = $(window).outerHeight() - $("header").outerHeight() - $("footer").outerHeight() - $(".bottom-contact").outerHeight();
        $(".loading-modal").css("min-height", nowHeight);
        $("#web,#domain,#limit,#black-list").css("min-height", nowHeight - 20);
    }

    //顶部搜索窗口按钮点击事件
    $("#search").on("click", function () {
        if ($("#search-content").val().length == 0) {
            $("#search-content").focus();
            $("#search-content").addClass("error");
        } else {
            window.location.href = "http://www.telecredit.cn/result.html?q=" + encodeURIComponent($("#search-content").val());
        }
    });

    //顶部 and 首页搜索输入框敲击回车发送请求
    $("#search-content").on("keypress", function (event) {
        if (event.keyCode == "13") {
            if ($(this).val().length == 0) {
                $(this).focus();
                $(this).addClass("error");
                return false;
            } else {
                window.location.href = "http://www.telecredit.cn/result.html?q=" + encodeURIComponent($(this).val());
            }
        }
    });
    //搜索框获得焦点去掉红色
    $("#search-content").on("keydown",function () {
        $(this).removeClass("error");
    });
    //刷新按钮点击事件
    $(".btn-refresh").on("click", function () {
        var btnElement = $(this);
        $(this).attr("disabled", "true").html("正在刷新");
        var dataType = $(this).attr("data-type");
        var id = ["web-belonger", "web-profile", "record-data", "enter-data", "subject", "operation", "domain"];
        var fileName = ["title", "web", "icp", "address", "ent", "infoCheck", "whois"];
        var loadingIndex = fileName.indexOf(dataType);
        var appendId = id[loadingIndex];
        $("#" + appendId + "").append("<div class='refresh-modal'></div>");
        var refreshDomain = domainName || document.domain.match(/.*?(?=.xn)/)[0];
        var refreshUrl = "/api/structjson/" + encodeURIComponent(refreshDomain) + "?type=" + dataType;

        $.ajax({
            type: "post",
            url: refreshUrl,
            data: {},
            success: function (reponseData) {
                reponseData.type = dataType;
                btnElement.html("最新数据");
                $("#" + appendId + " .refresh-modal").hide();
                if (reponseData.kind == "website") {
                    $("#web").show();
                    $("#domain").hide();
                    webDetail(reponseData);
                } else if (reponseData.kind == "domain") {
                    $("#domain").show();
                    $("#web").hide();
                    domainDetail(reponseData);
                }
            },
            error: function (errorData) {
                $("#" + appendId + " .refresh-modal").hide();
                btnElement.html("刷新失败");
                btnElement.removeAttr("disabled");
                if (errorData.status == "502" || errorData.status == "503") {
                    $("#domain").hide();
                    $("#web").hide();
                    $("#limit").show();
                }
            }
        });
    });
});