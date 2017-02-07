var ajaxRequest = function (type,url,data,successCalback,errorCallback){
    $.ajax({
        type:type,
        url:url,
        data:data,
        success:function (data) {
            successCalback(data);
        },
        error:function (MLHttpRequest, textStatus, errorThro) {
            console.log(MLHttpRequest);
            console.log(textStatus);
        }
    });
};
var setPagination = function (id,totalPages,clickEvent) {
    $('#'+id).twbsPagination({
        prev_text:"上一页",
        next_text:"下一页",
        totalPages: totalPages,
        visiblePages: 5,
        onPageClick: function (event, page) {
            clickEvent(event,page);
        }
    });
};
var getPageSize = function (data) {
    if(data.hasOwnProperty("pageSize") && data.pageSize >1){
        return data.pageSize;
    }else{
        return false;
    }
};
var noClaimHtmlModule = function(columnTitles){
    var noClaimHtml = '';
    for(let i=0 ,len = columnTitles.length;i<len;i++){
        noEditHtml += `<div class="module no-edit">
                            <div class="module-head">${columnTitles[i]}</div>
                            <div class="module-content"><p>企业尚未编辑</p><a href="">点击编辑企业</a></div>
                        </div>`;
    }
    return noClaimHtml;
};
var noEditHtmlModul = function (columnTitle) {
    var noEditHtml = `  <div class="module no-claim">
                            <div class="module-head">${columnTitle}</div>
                            <div class="module-content"><p>企业尚未认领</p><a href="">点击认领企业</a></div>
                        </div>`;
    return noEditHtml;
};
var fillData = {
    fillSnap:function (snapData) {
        var $thisContent = $("#nav-readme");
        var quickNavHtmlModule = `<div class="quick-nav">
                            <a href="#company-intro">企业介绍</a>
                            <a href="#development-history">发展历程</a>
                            <a href="#photos">实景照片</a>
                            <a href="#video">宣传视频</a>
                            <a href="#products">产品服务</a>
                            <a href="#honours">资质荣誉</a>
                            <a href="#online-entrances">在线业务入口</a>
                        </div>`;
        $thisContent.append(quickNavHtmlModule);

        if(snapData.claimState == true){//判断是否认领
            /*基本介绍*/
            if(snapData.information != null){
                var companyIntroHtml = ` <div id="company-intro" class="module">
                            <div class="module-head">企业介绍</div>
                            <div class="module-content intro-content">
                                <p>${snapData.information.text}</p>
                                <img class="company-banner" src="${snapData.information.bannerSrc}" alt="企业banner"/>
                            </div>
                        </div>`;
                $thisContent.append(companyIntroHtml);
            }else{
                $thisContent.append(noEditHtmlModul("企业介绍"));
            }
            /*历史发展*/
            if(snapData.historyDataList != null){
                var historyTimeLineData = snapData.historyDataList;
                var historyLength = snapData.historyDataList.length;
                var fiveHistoryContentHtml = "<div class='time-line'></div>", allHistoryContentHtml = "<div class='time-line'></div>" ;
                function setTimeLineHeight(){
                    var timeLineHeight = $(".development-history").height();
                    $(".time-line").height(timeLineHeight+10);
                }
                function getHishoryContent(showHistoryContentHtml,extend){
                    var historyHtml = "";
                    if(extend == true){
                        historyHtml = `<div id="development-history" class="module">
                            <div class="module-head">发展历程</div>
                            <div class="module-content">
                                <div class="development-history">
                                    <div class="time-line"></div>
                                    `+showHistoryContentHtml+`
                                </div>
                                <a id="more-history" href="javascript:void(0)" data-extend="false" class="btn btn-block more-history">展开更多 <i class="glyphicon glyphicon-chevron-down"></i></a>
                            </div>
                        </div>`;
                    }else{
                        historyHtml = `<div id="development-history" class="module">
                            <div class="module-head">发展历程</div>
                            <div class="module-content">
                                <div class="development-history">
                                    <div class="time-line"></div>
                                    `+showHistoryContentHtml+`
                                </div>
                            </div>
                        </div>`;
                    }

                    return historyHtml;
                }
                if(historyLength <= 5){
                    var showHistoryContentHtml=""
                    for(let i = 0 ; i< historyLength;i++){
                        showHistoryContentHtml += `<div class="history-list">
                                        <span>${snapData.historyDataList[i].time}</span>
                                        <i class="glyphicon glyphicon-record"></i>
                                        <p>${snapData.historyDataList[i].event}</p>
                                    </div>`;
                    }
                    $thisContent.append(getHishoryContent(showHistoryContentHtml,false));
                    setTimeLineHeight();
                }else{
                    for(let i = 0 ; i< 5;i++){
                        fiveHistoryContentHtml += `<div class="history-list">
                                        <span>${snapData.historyDataList[i].time}</span>
                                        <i class="glyphicon glyphicon-record"></i>
                                        <p>${snapData.historyDataList[i].event}</p>
                                    </div>`;
                    }
                    $thisContent.append(getHishoryContent(fiveHistoryContentHtml,true))
                    setTimeLineHeight();
                    for(let i = 0 ; i< historyLength;i++){
                        allHistoryContentHtml += `<div class="history-list">
                                        <span>${snapData.historyDataList[i].time}</span>
                                        <i class="glyphicon glyphicon-record"></i>
                                        <p>${snapData.historyDataList[i].event}</p>
                                    </div>`;
                    }
                    $("#more-history").on("click",function () {
                        var loadMroe = $(this).attr("data-extend");
                        if(loadMroe == "true"){
                            $("#more-history").show().html('展开更多 <i class="glyphicon glyphicon-chevron-down"></i>');
                            $("#more-history").attr("data-extend",false);
                            $(".development-history").html(fiveHistoryContentHtml);
                            setTimeLineHeight();
                        }else{
                            $("#more-history").show().html('收起 <i class="glyphicon glyphicon-chevron-up"></i>');
                            $("#more-history").attr("data-extend",true);
                            $(".development-history").html(allHistoryContentHtml);
                            setTimeLineHeight();
                        }
                    });
                }
            }else{
                $thisContent.append(noEditHtmlModul("发展历程"));
            }


            /*公司图片*/
            if(snapData.imgList != null){
                var photosHtmlModule = "";
                for(var i = 0 ,len = snapData.imgList.length; i<len ;i++){
                    photosHtmlModule += ` <div><a href="javascript:void(0)"><img src="${snapData.imgList[i].img1}" alt=""/></a><p class="text-center">${snapData.imgList[i].describe}</p></div>`;
                }
                var photosHtml = ` <div id="photos" class="module">
                            <div class="module-head">实景照片</div>
                            <div class="module-content">
                                <div class="slick" style="width: 695px;margin: 0 auto;">
                                `+photosHtmlModule+`
                                </div>
                            </div>
                        </div>`;
                $thisContent.append(photosHtml);
                $(".slick").slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 3,
                    touchMove: false,
                    slidesToScroll: 1,
                    arrows:true
                });
            }else{
                $thisContent.append(noEditHtmlModul("实景照片"));
            }

            /*视频宣传*/
            if(snapData.videoHtml != null){
                var videoHtml = `<div id="video" class="module">
                            <div class="module-head">宣传视频</div>
                            <div class="module-content video-wrap">
                            ${snapData.videoHtml.videoHtml}
                            </div>
                        </div>`;
                $thisContent.append(videoHtml);
            }else{
                $thisContent.append(noEditHtmlModul("宣传视频"));
            }

            //*产品列表*//
           if(snapData.productsData != null){
               var fillProductHtml = function (data,pageFresh) {
                   var productModule = "";
                   var productList = data.productList;
                   for(let i=0;i<productList.length;i++){
                       productModule += `<div class="product-list">
                                        <div class="left-desc">
                                            <div class="product-title">${productList[i].title}</div>
                                            <div class="product-introduction">${productList[i].introduction}</div>
                                            <div class="product-kind">服务类型：${productList[i].kind}</div>
                                            <div class="product-price">服务价格：${productList[i].price}</div>
                                        </div>
                                        <div class="right-img">
                                            <img src="${productList[i].logoSrc}" alt="">
                                        </div>
                                    </div>`
                   }
                   if(pageFresh == true){
                       $("#products .product-lists").html(productModule);
                       return false;
                   }else {
                       var productHtml = `<div id="products" class="module">
                            <div class="module-head">产品服务</div>
                            <div class="module-content ">
                                <div class="product-lists">
                                    `+productModule+`
                                </div>
                                <div id='pagination-product' class='pull-right'></div>
                            </div>
                        </div>`;
                       $thisContent.append(productHtml);
                   }
                   var productPagesSize = getPageSize(snapData.productsData);
                   if(productPagesSize){
                       var currentPageSize = 1;
                       setPagination("pagination-product",productPagesSize,function (event,page) {
                           if(currentPageSize != page){
                               currentPageSize = page;
                               ajaxRequest("get",_ctx+"./productServiceNext",{page:page,size:5},function (data) {
                                   fillProductHtml(data.productsData,true);
                               });
                           }
                       })
                   }
               };
               fillProductHtml(snapData.productsData);
           }else{
               $thisContent.append(noEditHtmlModul("产品服务"));
           }


            /*资质荣誉*/
           if(snapData.honoursData != null){
               var fillHonoursHtml = function (data,pageFresh) {
                   var honoursModule = "";
                   var honoursList = data.honoursList;
                   for(let i=0;i<honoursList.length;i++){
                       honoursModule += `<div class="honours-list">
                                    <div class="left-desc">
                                        <div class="honour-title">${honoursList[i].name}</div>
                                        <p>颁发机构：${honoursList[i].org}</p>
                                        <p>颁发时间：${honoursList[i].time}</p>
                                    </div>
                                    <div class="right-img">
                                        <img src="${honoursList[i].imgSrc}" alt="">
                                    </div>
                                </div>`
                   }
                   if(pageFresh == true){
                       $("#honours .honours-lists").html(honoursModule);
                       return false;
                   }else{
                       var honoursHtml = `<div id="honours" class="module">
                            <div class="module-head">资质荣誉</div>
                            <div class="module-content">
                                <div class="honours-lists">${honoursModule}</div>
                                 
                             <div id='pagination-honours' class='pull-right'></div>
                            </div>
                       
                        </div>`;
                       $thisContent.append(honoursHtml);
                   }
                   var honoursPagesSize = getPageSize(data);
                   if(honoursPagesSize){
                       setPagination("pagination-honours",honoursPagesSize,function (event,page) {
                           var currentSize = 1;
                           if(currentSize != page){
                               currentSize = page;
                               ajaxRequest("get","./honoursNext",{page:page,size:5},function (data) {
                                   fillHonoursHtml(data.honoursData,true);
                               });
                           }
                       })
                   }
               }
               fillHonoursHtml(snapData.honoursData);
           }else{
               $thisContent.append(noEditHtmlModul("资质荣誉"));
           }

            /*在线入口*/
           if(snapData.enterancData != null){
               var onlineHtmlModule = "";
               var enterancData = snapData.enterancData,
                   enterancDataList = snapData.enterancData.enterancDataList;
               for(let i=0;i<enterancDataList.length;i++){
                   onlineHtmlModule += `<div class="entrances-list">
                                    <div class="left-desc">
                                        <div class="company-name" title="北京泰尔英福网络科技有限责任公司">${enterancDataList[i].name}</div>
                                        <a href="${enterancDataList[i].url}" class="btn-enter">点击进入</a>
                                    </div>
                                    <div class="right-img">
                                        <img src="${enterancDataList[i].imgSrc}" alt="">
                                    </div>
                                </div>`
               }
               var onlineHtml = `<div id="online-entrances" class="module">
                            <div class="module-head">在线入口</div>
                            <div class="module-content entrances-lists">
                               `+onlineHtmlModule+`
                            </div>
                        </div>`;
               $thisContent.append(onlineHtml);
           }else{
               $thisContent.append(onlineHtml);
           }
        }else{
            //未认领状态
            var columnsTitle = ["企业介绍","企业历程","实景照片","宣传视频","产品服务","资质荣誉","在线入口"];
            var noClaimHtml = noClaimHtmlModule(columnsTitle);
            $thisContent.append(noEditHtmlModul("在线入口"));
        }
    },
    fillBase:function (baseData) {
        var $thisContent = $("#nav-base");
        var quickNavData = baseData.detailCount;
        var quickHtml = `<div class="quick-nav">
                            <a href="#quickNav-registerInfo">注册信息 ${quickNavData.basicInfoCount}</a>
                            <a href="#quickNav-shareholder">股东信息 ${quickNavData.shareholderCount}</a>
                            <a href="#quickNav-mainMembers">主要成员 ${quickNavData.memberCount}</a>
                            <a href="#quickNav-branch">分支机构 ${quickNavData.branchCount}</a>
                            <a href="#quickNav-changeRecords">变更记录 ${quickNavData.changeRecordCount}</a>
                        </div>`;
        $thisContent.append(quickHtml);

        /*注册信息*/ //shareholdersInformation
        if(quickNavData.basicInfoCount != 0){
            var registerData = baseData.basicInfo;
            var registerInfoHtml = `<div id="quickNav-registerInfo" class="module">
                            <div class="module-head">注册信息 <span class="count-number">${quickNavData.basicInfoCount}</span></div>
                            <div class="module-content">
                                <table class="table table-bordered table-col-4">
                                    <tbody>
                                    <tr>
                                        <td>统一社会信用代码</td>
                                        <td>${registerData.creditCode}</td>
                                        <td>组织机构代码</td>
                                        <td>${registerData.organizationCode}</td>
                                    </tr>
                                    <tr>
                                        <td>工商注册号</td>
                                        <td>${registerData.registrID}</td>
                                        <td>经营状态</td>
                                        <td>${registerData.managementState}</td>
                                    </tr>
                                    <tr>
                                        <td>公司类型</td>
                                        <td>${registerData.companyType}</td>
                                        <td>成立日期</td>
                                        <td>${registerData.foundation}</td>
                                    </tr>
                                    <tr>
                                        <td>法定代表人</td>
                                        <td>${registerData.legalRepresentative}</td>
                                        <td>营业期限</td>
                                        <td>${registerData.businessTerm}</td>
                                    </tr>
                                    <tr>
                                        <td>注册资本</td>
                                        <td>${registerData.registeredCapital}</td>
                                        <td>发照日期</td>
                                        <td>${registerData.dateIssue}</td>
                                    </tr>
                                    <tr>
                                        <td>登记机关</td>
                                        <td colspan="3">${registerData.registerOffice}</td>
                                    </tr>
                                    <tr>
                                        <td>企业地址</td>
                                        <td colspan="3">${registerData.businessAddress}</td>
                                    </tr>
                                    <tr>
                                        <td>经营范围</td>
                                        <td colspan="3">${registerData.scope}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>`;
            $thisContent.append(registerInfoHtml);
        }

        /*股东信息*/
        if(quickNavData.shareholderCount != 0){
            var partnersData = baseData.shareholders.list;
            var partnersHtmlMoudle = ``;
            for(let i = 0 ; i< partnersData.length;i++){
                partnersHtmlMoudle += `<tr><td>${partnersData[i].shareholdersName}</td><td>${partnersData[i].subcribe}</td><td>${partnersData[i].paidIn}</td></tr>`
            }
            var partnersHtml = `<div id="quickNav-shareholder" class="module">
                            <div class="module-head">股东信息 <span class="count-number">${quickNavData.shareholderCount}</span></div>
                            <div class="module-content">
                                <table class="table table-bordered table-common text-center">
                                    <thead>
                                    <tr>
                                        <th>股东名称</th>
                                        <th>认缴出资（金额/时间）</th>
                                        <th>实缴出资（金额/时间）</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    `+partnersHtmlMoudle+`
                                    </tbody>
                                </table>
                            </div>
                        </div>`;
            $thisContent.append(partnersHtml);
        }

        /*主要成员*/
        if(quickNavData.memberCounts != 0){
            var mainPeopleMoudle = "";
            var memberList = baseData.members;
            for(let i=0 ,len = memberList.length;i<len;i++){
                var imgIndex = i%4+1;
                mainPeopleMoudle += `<a href="" class="employeeInfo">
                                        <div class="base_list">
                                            <div class="base_list_head"><img src="http://www.shuidixy.com/images/head01.png"></div>
                                            <div class="base_list_n">
                                                <span class="base_list_n1">${memberList[i].memberName}</span>
                                                <span class="base_list_n2">${memberList[i].position}</span>
                                            </div>
                                        </div>
                                    </a>`;
            }
            var mainPeopleHtml = `<div id="quickNav-mainMembers" class="module">
                            <div class="module-head">主要成员 <span class="count-number">${quickNavData.memberCount}</span></div>
                            <div class="module-content">
                                <div class="panel_body">
                                   `+mainPeopleMoudle+`
                                </div>
                            </div>
                        </div>`;
            $thisContent.append(mainPeopleHtml);
        }

        /*分支机构*/
        if(quickNavData.branchCount != 0){
            var branchHtmlModule = '';
            var branchList = baseData.branch.list;
            for(let  i=0 , len = branchList.length;i < len;i++){
                branchHtmlModule += `<div class="col-xs-6">
                                    <div class="brunch-name">${branchList[i].branchName}</div>
                                </div>`;
            }
            var branchHtml = `<div id="quickNav-branch" class="module">
                            <div class="module-head">分支机构 <span class="count-number">${quickNavData.branchCount}</span></div>
                            <div class="module-content">
                              `+branchHtmlModule+`
                            </div>
                        </div>`;
            $thisContent.append(branchHtml);
        }

        /*变更记录*/
        if(quickNavData.changeRecordCount != 0){
            var fillChangeRecordsHtml = function (data,pageFresh) {
                var changeRecordHtmlModule = "";
                var changeRecordList = data.list;
                for(let i =0;i<changeRecordList.length;i++){
                    changeRecordHtmlModule += `<tr>
                                        <td>${i+1}</td>
                                        <td>${changeRecordList[i].changeData}</td>
                                        <td>${changeRecordList[i].changeEvent}</td>
                                        <td>${changeRecordList[i].changeBefore}</td>
                                        <td>${changeRecordList[i].changeAfter}</td>
                                    </tr>`
                }
                if(pageFresh == true){
                    $("#change-records tbody").html(changeRecordHtmlModule);
                    return false;
                }else{
                    var changeRecordHtml = ` <div id="quickNav-changeRecords" class="module">
                            <div class="module-head">变更记录 <span class="count-number">${quickNavData.changeRecordCount}</span></div>
                            <div class="module-content">
                                <table id="change-records" class="table table-bordered table-col-5">
                                    <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>变更日期</th>
                                        <th>变更事项</th>
                                        <th>变更前</th>
                                        <th>变更后</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        `+changeRecordHtmlModule+`
                                    </tbody>
                                </table>
                               <div id='pagination-changRecords' class='pull-right'></div>
                            </div>
                        </div>`;
                    $thisContent.append(changeRecordHtml);
                }
                var changeRecordsPageSize = getPageSize(data);
                if(changeRecordsPageSize){
                    setPagination("pagination-changRecords",changeRecordsPageSize,function (event,page) {
                        var currentPage = 1;
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get",_ctx + "./alterationNext",{page:page,size:5},function (data) {
                                fillChangeRecordsHtml(data.changeRecords,true);
                            });
                        }
                    })
                }
            };
            fillChangeRecordsHtml(baseData.changeRecords);
        }

    },
    fillOperate:function (operateData) {
        var $thisCount = $("#nav-operate");
        var quickNavData = operateData.information;
        var quickHtml = `<div class="quick-nav">
                            <a href="#quickNav-taxationInformation">税务信息 ${quickNavData.taxationInformation}</a>
                            <a href="#quickNav-financingInformation">融资信息 ${quickNavData.financingInformation}</a>
                            <a href="#quickNav-shareConsideration">股权出质 ${quickNavData.shareConsideration}</a>
                            <a href="#quickNav-foatingMortgage">动产抵押 ${quickNavData.foatingMortgage}</a>
                            <a href="#quickNav-clearingInformation">清算信息 ${quickNavData.clearingInformation}</a>
                            <a href="#quickNav-abnormalOperation">经营异常 ${quickNavData.abnormalOperation}</a>
                            <a href="#quickNav-administrativePenalty">行政处罚 ${quickNavData.administrativePenalty}</a>
                            <a href="#quickNav-information">招聘信息 ${quickNavData.employments}</a>
                            <a href="#quickNav-bidding">招投标 ${quickNavData.bidding}</a>
                        </div>`;
        $thisCount.append(quickHtml);

        /*招聘信息*/
       if(quickNavData.employments != 0){
           var fillRecruitHtml = function (data,pageFresh) {
               var recruitHtmlModule = ``;
               var informationList = data.list;
               for(let i=0 ,len = informationList.length;i< len ;i++){
                   recruitHtmlModule += ` <div class="list-row">
                                        <div class="left-img">
                                            <img src="" alt="">
                                        </div>
                                        <div class="right-text">
                                            <div class="list-title">${informationList[i].title}</div>
                                            <div class="list-content">
                                                <span>薪资：${informationList[i].salary}</span>
                                                <span>经验：${informationList[i].experience}</span>
                                                <span>地点：${informationList[i].city}</span>
                                                <span>来源：${informationList[i].source}</span>
                                                <span class="list-date">发布时间：${informationList[i].publishDt}</span>
                                            </div>
                                        </div>
                                    </div>`
               }
               if(pageFresh == true){
                   $("#recruit-info").html(recruitHtmlModule);
                   return false;
               }else{
                   var recruitHtml = `<div id="quickNav-information" class="module">
                            <div class="module-head">招聘信息 <span class="count-number">${quickNavData.employments}</span></div>
                            <div class="module-content">
                                <div id="recruit-info" class="list-box">`+recruitHtmlModule+`</div>
                                
                                <div id='pagination-recruit' class='pull-right'></div>
                            </div>
                        </div>`;
                   $thisCount.append(recruitHtml);
               }
               var recruitPageSize =  getPageSize(data);
               if(recruitPageSize){
                   var currentPage = 1;
                   setPagination("pagination-recruit",recruitPageSize,function (event,page) {
                       if(currentPage != page){
                           currentPage = page;
                           ajaxRequest("get","./informationNext",{page:page,size:5},function (data) {
                               fillRecruitHtml(data.information,true);
                           });
                       }
                   });
               }
           }
           fillRecruitHtml(operateData.employments);
       }

        /*招投标*/
        if(quickNavData.bidding != 0){
            var fillBidHtml = function (data,pageFresh) {
                var bidHtmlModule = ``;
                var bidList = data.list;
                for(let i=0 ,len = bidList.length;i<len;i++){
                    bidHtmlModule += ` <div class="list-row">
                                        <div class="list-body">
                                            <div class="list-title">
                                                <span class="list-number">${i}</span>${bidList[i].title}
                                            </div>
                                            <div class="list-content">
                                                <span>发布时间：${bidList[i].publishDt}</span>
                                                <span>所属地区：${bidList[i].region}</span>
                                                <span>项目分类：${bidList[i].itemCategory}</span>
                                                <span>中标结果：${bidList[i].biddingResult}</span>
                                            </div>
                                        </div>
                                    </div>`;
                }
                if(pageFresh == true){
                    $("#biddings-data").html(bidHtmlModule);
                    return false;
                }else{
                    var recruitHtml = ` <div id="quickNav-bidding" class="module">
                            <div class="module-head">招投标 <span class="count-number">${quickNavData.bidding}</span></div>
                            <div class="module-content">
                                <div id="biddings-data" class="list-box">
                                `+bidHtmlModule+`
                                </div>
                                <div id='pagination-bid' class='pull-right'></div>
                            </div>
                        </div>`;
                    $thisCount.append(recruitHtml);
                }
                var bidPageSize =  getPageSize(data);
                if(bidPageSize){
                    setPagination("pagination-bid",bidPageSize,function (event,page) {
                        var currentPage = 1;
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get","./biddingNext",{page:page,size:5},function (data) {
                                fillRecruitHtml(data.bids,true);
                            });
                        }
                    });
                }
            }
            fillBidHtml(operateData.bids);
        }
    },
    fillInvest:function (data) {
        var $thisContent = $("#nav-invest");
        var quickHtml = `<div class="quick-nav">
                            <a href="#quickNav-foreignInvestment">对外投资 ${data.investCount}</a>
                        </div>`;
        $thisContent.append(quickHtml);
        /*对外投资*/

        var fillInvestHtml = function (data,pageFresh) {
            var investHtmlModule = "";
            var investData = data.list;
            for(let i = 0; i< investData.length ;i++){
                investHtmlModule += `<div class="list-row">
                                            <div class="left-img">
                                                <img src="${investData[i].logo}" alt=""/>
                                            </div>
                                            <div class="right-text">
                                                <div class="list-title">${investData[i].companyName}</div>
                                                <div class="list-content">
                                                    <span>法人：${investData[i].legalPerson}</span>
                                                    <span>成立日期：${investData[i].foundDt}</span>
                                                    <span>注册资本：${investData[i].registeredCapital}</span>
                                                </div>
                                            </div>
                                        </div>`;
            }
            if(pageFresh == true){
                $("#invest").html(investHtmlModule);
                return false;
            }else{
                var investHtml = ` <div id="quickNav-foreignInvestment" class="module">
                            <div class="module">
                                <div class="module-head">对外投资 <span class="count-number">${data.totalSize}</span></div>
                                <div class="module-content">
                                    <div id="invest" class="list-box">
                                        `+investHtmlModule+`
                                    </div>
                                    <div id="pagination-invest" class="text-right"></div>
                                </div>
                            </div>
                        </div>`;
                $thisContent.append(investHtml);
                var investPageSize = getPageSize(data);
                if(investPageSize>1){
                    var currentPageFlag = 1;
                    setPagination("pagination-invest",investPageSize,function (event,page) {
                        if(currentPageFlag != page){
                            currentPageFlag = page;
                            ajaxRequest("get",_ctx + "./foreignInvestmentNext",{page:page,size:5},function (data) {
                                fillInvestHtml(data.invests,true);
                            });
                        }
                    });
                }
            }
        }
        fillInvestHtml(data.invests);
    },
    fillLow:function (lawData) {
        var $thisContent = $("#nav-law");
        var quickNavData = lawData.lawsuitCount;
        var quickHtml = ` <div class="quick-nav">
                            <a href="#quickNav-judgment">法院判决 ${quickNavData.judgmentCount}</a>
                            <a href="#quickNav-executee">被执行人信息 ${quickNavData.executee}</a>
                            <a href="#quickNav-dishonestPeople">失信人信息 ${quickNavData.dishonestCount}</a>
                        </div>`;
        $thisContent.append(quickHtml);
        /*法院判决*/
        if(quickNavData.judgmentCount != 0){
            var fillLawHtml = function (data,pageFresh) {
                var lawHtmlModule = "";
                var judgList = data.list;
                for(let i=0 , len = judgList.length; i < len ;i++){
                    lawHtmlModule += `<div class="list-row">
                                        <div class="list-body">
                                            <div class="list-title">
                                                <span class="list-number">${i}</span>${judgList[i].title}
                                            </div>
                                            <div class="list-content">
                                                <span>发布时间：${judgList[i].publishDt}</span>
                                                <span>案件编号：${judgList[i].caseno}</span>
                                                <span>执行法院：${judgList[i].court}</span>
                                            </div>
                                        </div>
                                    </div>`;
                }
                if (pageFresh == true){
                    $("#law-data").html(lawHtmlModule);
                }else{
                    var lawHtml = `<div id="quickNav-judgment" class="module">
                            <div class="module-head">法院判决 <span class="count-number">${quickNavData.judgmentCount}</span></div>
                            <div class="module-content">
                                <div id="law-data" class="list-box">
                                `+lawHtmlModule+`
                                </div>
                                <div id="pagination-law" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(lawHtml);
                }
                var lawPageSize = getPageSize(data);
                if(lawPageSize){
                    setPagination("pagination-law",lawPageSize,function (event,page) {
                        var currentPage = 1;
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get",_ctx + "./judgmentNext",{page:page,size:5},function (data) {
                                fillLawHtml(data.judgment,true);
                            });
                        }
                    })
                }
            };
            fillLawHtml(lawData.judgment);
        }

        /*执行人信息*/
        if(quickNavData.executee != 0){
            var fillExectorHtml = function (data,pageRefresh) {
                var exectorHtmlModule = "";
                var exectorList = data.list;
                for(let i=0 , len = exectorList.length;i<len;i++){
                    exectorHtmlModule += `<div class="list-row">
                                        <div class="list-body">
                                            <div class="list-title">
                                                <span class="list-number">${exectorList[i].serial}</span>${exectorList[i].executeeNumber}
                                            </div>
                                            <div class="list-content">
                                                <span>立案时间：${exectorList[i].filingTime}</span>
                                                <span>执行法院：${exectorList[i].executiveCourt}</span>
                                                <span>执行标的：${exectorList[i].performNumber}</span>
                                                <span>案件状态：${exectorList[i].executingState}</span>
                                            </div>
                                        </div>
                                    </div>`;
                }
                if(pageRefresh == true){
                    $("#exector-data").html(exectorHtmlModule);
                }else{
                    var exectorHtml = `<div id="quickNav-executee" class="module">
                            <div class="module-head">被执行人信息 <span class="count-number">${quickNavData.executee}</span></div>
                            <div class="module-content">
                                <div id="exector-data" class="list-box">
                                `+exectorHtmlModule+`
                                </div>
                                <div id="pagination-exector" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(exectorHtml);
                }
                var exectueePageSize = getPageSize(data);
                if(exectueePageSize){
                    setPagination("pagination-exector",exectueePageSize,function (event,page) {
                        var currentPage = 1;
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get",_ctx + "./executeeNext",{page:page,size:5},function (data) {
                                fillLawHtml(data.executee,true);
                            });
                        }
                    })
                }
            }
            fillExectorHtml(lawData.executee);
        }

        /*失信人信息*/
        if(quickNavData.dishonestCount != 0){
            var disHonestData = lawData.dishonest;
            var disHonestPeopleHtml = `<div id="quickNav-dishonestPeople" class="module">
                            <div class="module-head">失信人信息 <span class="count-number">${quickNavData.dishonestCount}</span></div>
                            <div class="module-content">
                                <div class="list-box">
                                    <div class="list-row">
                                        <div class="list-body">
                                            <div class="list-title">
                                                <span class="list-number">${disHonestData.serial}</span> ${disHonestData.casecode}
                                            </div>
                                            <div class="list-content">
                                                <div>
                                                    <span>立案时间：${disHonestData.regDt}</span>
                                                    <span>执行依据文号：${disHonestData.gistid}</span>	
                                                    <span>公布时间：${disHonestData.publishDt}</span>
                                                </div>
                                                <div>
                                                    <span>执行法院：：${disHonestData.courtname}</span>
                                                    <span>被执行人的履行情况：${disHonestData.performance}</span>
                                                </div>
                                                <div>
                                                    <span>法律生效文书确定的义务</span>
                                                </div>
                                                <div>
                                                ${disHonestData.duty}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>`;
            $thisContent.append(disHonestPeopleHtml);
        }

    },
    fillAssets:function (assetsData) {
        var $thisContent = $("#nav-intangible-assets");
        var quickNavData = assetsData.digitalCount;
        var quickHtml = ` <div class="quick-nav">
                            <a href="#quickNav-trademarkInformation">商标信息 ${quickNavData.tmCount}</a>
                            <a href="#quickNav-patentsInformation">专利信息 ${quickNavData.patentCount}</a>
                            <a href="#quickNav-copyrightInformation">著作权信息 ${quickNavData.copyrightCount}</a>
                            <a href="#quickNav-softwareInformation">软件著作权信息 ${quickNavData.softwareCount}</a>
                            <a href="#quickNav-siteInformation">网站信息 ${quickNavData.websiteCount}</a>
                            <a href="#quickNav-domainInformation">域名信息 ${quickNavData.domainCount}</a>
                            <a href="#quickNav-qualification">资质荣誉 ${quickNavData.qualification}</a>
                        </div>`;
        $thisContent.append(quickHtml);
        /*商标信息*/
        if(quickNavData.tmCount != 0){
            var fillBrandHtml = function (data,pageFresh) {
                var brandHtmlModule = "";
                var branData = data.list;
                for(let i =0;i<branData.length;i++){
                    brandHtmlModule += ` <div class="moduble-box">
                                    <div class="left-text">
                                        <div class="box-title">${branData[i].tmName}</div>
                                        <div class="box-content">
                                            <p>分类：${branData[i].intCls}</p>
                                            <p>状态：${branData[i].status}</p>
                                        </div>
                                    </div>
                                    <div class="right-img">
                                        <img src="${branData[i].tmPic}" alt=""/>
                                    </div>
                                </div>`;
                }
                if(pageFresh == true){
                    $("#brand-data").html(brandHtmlModule);
                }else {
                    var brandHtml = `<div id="quickNav-trademarkInformation" class="module">
                            <div class="module-head">商标信息 <span class="count-number">${quickNavData.tmCount}</span></div>
                            <div class="module-content honours-lists">
                                <div id="brand-data"> `+brandHtmlModule+`</div>
                               <div id="pagination-brand" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(brandHtml);
                }
                var brandPageSize = getPageSize(data);
                if(brandPageSize){
                    setPagination("pagination-brand",brandPageSize,function (event,page) {
                        var currentPage = 1;
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get","./trademarkInformationNext",{page:page,size:5},function (data) {
                                fillBrandHtml(data.trademarkInformation,true);
                            });
                        }
                    })
                }
            }
            fillBrandHtml(assetsData.tms)
        }

        /*专利信息*/
        if(quickNavData.patentCount != 0){
            var fillPatentHtml = function (data,pageFresh) {
                var patentHtmlModule = "";
                var patentList = data.list;
                for(let i =0;i<patentList.length;i++){
                    patentHtmlModule += `<div class="moduble-box">
                                    <div class="left-text">
                                        <div class="box-title">${patentList[i].patentName}</div>
                                        <div class="box-content">
                                            <p>专利类型：${patentList[i].patentType}</p>
                                            <p>公布日期：${patentList[i].applicationPublishTime}</p>
                                        </div>
                                    </div>
                                </div>`;
                }
                if(pageFresh == true){
                    $("#patent-data").html(patentHtmlModule);
                }else {
                    var patentHtml = `<div id="quickNav-patentsInformation" class="module">
                            <div class="module-head">专利信息 <span class="count-number">${quickNavData.patentCount}</span></div>
                            <div class="module-content honours-lists">
                                 <div id="patent-data">`+patentHtmlModule+`</div>
                                <div id="pagination-patent" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(patentHtml);
                }
                var patentPageSize = getPageSize(data);
                if(patentPageSize){
                    var currentPage = 1;
                    setPagination("pagination-patent",patentPageSize,function (event,page) {
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get","./patentsInformationNext",{page:page,size:5},function (data) {
                                fillPatentHtml(data.patentsInformation,true);
                            });
                        }
                    })
                }
            }
            fillPatentHtml(assetsData.patents);
        }

        /*著作权信息*/
        if(quickNavData.copyrightCount != 0){
            var fillCopyrightHtml = function (data,pageFresh) {
                var copyrightHtmlModule = "";
                var copyrightList = data.list;
                for(let i =0;i<copyrightList.length;i++){
                    copyrightHtmlModule += ` <div class="moduble-box">
                                    <div class="left-text dblock">
                                        <div class="box-title">${copyrightList[i].fullname}</div>
                                        <div class="box-content">
                                            <p>登记号：${copyrightList[i].regnum}</p>
                                            <p>登记日期：${copyrightList[i].publishDt}</p>
                                            <p>登记类别：${copyrightList[i].simpleName}</p>
                                        </div>
                                    </div>
                                </div>`;
                }
                if(pageFresh == true){
                    $("#copyright-data").html(copyrightHtmlModule);
                }else {
                    var copyrightHtml = `<div id="quickNav-copyrightInformation" class="module">
                            <div class="module-head">著作权信息 <span class="count-number">${quickNavData.copyrightCount}</span></div>
                            <div class="module-content honours-lists">
                                <div id="copyright-data">`+copyrightHtmlModule+`</div>
                                <div id="pagination-copyright" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(copyrightHtml);
                }
                var copyrightPageSize = getPageSize(data);
                if(copyrightPageSize){
                    var currentPage = 1;
                    setPagination("pagination-copyright",copyrightPageSize,function (event,page) {
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get","./copyrightInformationNext",{page:page,size:5},function (data) {
                                fillCopyrightHtml(data.copyrightInformation,true);
                            });
                        }
                    })
                }
            }
            fillCopyrightHtml(assetsData.copyrights);
        }

        /*软件著作权信息*/
        if(quickNavData.softwareCount != 0){
            var fillSoftwareHtml = function (data,pageFresh) {
                var softwareHtmlModule = "";
                var softwareList = data.list;
                for(let i =0;i<softwareList.length;i++){
                    softwareHtmlModule += `  <div class="moduble-box">
                                    <div class="left-text dblock">
                                        <div class="box-title">${softwareList[i].softwareName}</div>
                                        <div class="box-content">
                                            <p>版本号：${softwareList[i].versionNumber}</p>
                                            <p>分类号：${softwareList[i].stdmode}</p>
                                            <p>登记号：${softwareList[i].registerNumber}</p>
                                            <p>登记批准日期：${softwareList[i].approvalDate}</p>
                                        </div>
                                    </div>
                                </div>`;
                }
                if(pageFresh == true){
                    $("#software-data").html(softwareHtmlModule);
                }else {
                    var softwareHtml = `<div id="quickNav-softwareInformation" class="module">
                            <div class="module-head">软件著作权信息 <span class="count-number">${quickNavData.softwareCount}</span></div>
                            <div class="module-content honours-lists">
                                <div id="software-data">`+softwareHtmlModule+`</div>
                                <div id="pagination-software" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(softwareHtml);
                }
                var softWarePageSize = getPageSize(data);
                if(softWarePageSize){
                    var currentPage = 1;
                    setPagination("pagination-software",softWarePageSize,function (event,page) {
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get","./softwareInformationNext",{page:page,size:5},function (data) {
                                fillSoftwareHtml(data.softwareInformation,true);
                            });
                        }
                    });
                }
            }
            fillSoftwareHtml(assetsData.softwareInformation);
        }

        /*网站信息*/
        if(quickNavData.websiteCount != 0){
            var fillWebsiteHtml = function (data,pageFresh) {
                var websiteHtmlModule = "";
                var websiteList = data.list;
                for(let i =0;i<websiteList.length;i++){
                    websiteHtmlModule += `  <div class="moduble-box">
                                    <div class="left-text dblock">
                                        <div class="box-title">${websiteList[i].siteName}</div>
                                        <div class="box-content">
                                            <p>网址： ${websiteList[i].website}</p>
                                            <p>域名：${websiteList[i].domainName}</p>
                                            <p>网站备案/许可证号：${websiteList[i].licenseKey}</p>
                                            <p>审核时间： ${websiteList[i].checkTime}</p>
                                        </div>
                                    </div>
                                </div>`;
                }
                if(pageFresh == true){
                    $("#website-data").html(websiteHtmlModule);
                }else {
                    var websiteHtml = `<div id="quickNav-siteInformation" class="module">
                            <div class="module-head">网站信息 <span class="count-number">${quickNavData.websiteCount}</span></div>
                            <div class="module-content honours-lists">
                                <div id="website-data">`+websiteHtmlModule+`</div>
                                <div id="pagination-website" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(websiteHtml);
                }
                var domainPageSize = getPageSize(data);
                if(domainPageSize){
                    var currentPage = 1;
                    setPagination("pagination-website",domainPageSize,function (event,page) {
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get","./siteInformationNext",{page:page,size:5},function (data) {
                                fillWebsiteHtml(data.siteInformation,true);
                            });
                        }
                    })
                }
            }
            fillWebsiteHtml(assetsData.siteInformation);
        }

        /*域名信息*/
        if(quickNavData.domainCount != 0){
            var fillDomanHtml = function (data,pageFresh) {
                var domainHtmlModule = "";
                var domainList = data.list;
                for(let i =0;i<domainList.length;i++){
                    domainHtmlModule += `  <div class="moduble-box">
                                    <div class="left-text dblock">
                                        <div class="box-title">${domainList[i].domainName}</div>
                                        <div class="box-content">
                                            <p>注册时间：${domainList[i].registrationDat}</p>
                                            <p>到期时间：${domainList[i].expirationTime}</p>
                                        </div>
                                    </div>
                                </div>`;
                }
                if(pageFresh == true){
                    $("#domain-data").html(domainHtmlModule);
                }else {
                    var domainHtml = `<div id="quickNav-domainInformation" class="module">
                            <div class="module-head">域名信息 <span class="count-number">${quickNavData.domainCount}</span></div>
                            <div class="module-content honours-lists">
                                <div id="domain-data">`+domainHtmlModule+`</div>
                                <div id="pagination-domain" class="text-right"></div>
                            </div>
                        </div>`;
                    $thisContent.append(domainHtml);
                }
                var domainPageSize = getPageSize(data);
                if(domainPageSize){
                    var currentPage = 1;
                    setPagination("pagination-domain",domainPageSize,function (event,page) {
                        if(currentPage != page){
                            currentPage = page;
                            ajaxRequest("get","./domainInformationNext",{page:page,size:5},function (data) {
                                fillDomanHtml(data.domainInformation,true);
                            });
                        };
                    })
                }
            }
            fillDomanHtml(assetsData.domainInformation)
        }
    },
    fillNews:function (data) {
        var $thisContent = $("#nav-news");
        var quickHtml = ` <div class="quick-nav">
                            <a href="#quickNav-news">新闻舆情 ${data.news.newsInformation}</a>
                        </div>`;
        $thisContent.append(quickHtml);
        if(data.news.newsInformation != 0){
            var fillNewsHtml = function (newsData,pageFresh) {
                var newsHtmlModule = "";
                var newsList = newsData.list;
                for(let i=0;i<newsList.length;i++){
                    newsHtmlModule +=
                        `<div class="article-list">
                             <div class="article-title"><a href="">${newsList[i].newsTitle}</a></div>
                             <div class="article-flag">${newsList[i].date} ${newsList[i].reference}</div>
                             <div class="article-intro">${newsList[i].content}</div>
                        </div>`;
                }
                if (pageFresh == true){
                    $("#news-data").html(newsHtmlModule);
                }else{
                    var newsHtml = ` <div id="quickNav-news" class="module">
                            <div class="module">
                                <div class="module-head">新闻舆情 <span class="count-number">${newsData.totalSize}</span></div>
                                <div class="module-content p0">
                                    <div id="news-data">`+newsHtmlModule+`</div>
                                    <div id="pagination-news" class="text-right"></div>
                                </div>
                            </div>
                        </div>`;
                    $thisContent.append(newsHtml);
                    var newsPageSize = getPageSize(newsData);
                    if (newsPageSize){
                        var currentPageFlag = 1;
                        setPagination("pagination-news",newsPageSize,function (event,page) {
                            if(currentPageFlag != page){
                                currentPageFlag = page;
                                ajaxRequest("get","./newsNext",{page:page,size:5},function (data) {
                                    fillNewsHtml(data.newsInformations,true);
                                });
                            }
                        });
                    }
                }

            }
            fillNewsHtml(data.newsInformations);

        }
    }
};


var _ctx = "companyInfo/";
var activeTabs = ["enterpriseSnapshot","basicInformation","employmentInformation","foreignInvestment","lawsuit","digitalAsset","news"];
var fillMethods = ["fillSnap","fillBase","fillOperate","fillInvest","fillLow","fillAssets","fillNews"];
var initActiveTab = $("#activeTab").val();
var loadTabIndex = activeTabs.indexOf(initActiveTab);
var companyId = $("#companyId").val();
var companyName = $("#companyName").val();
var data = {companyId:companyId,companyName:companyName};
debugger
ajaxRequest("get",_ctx+"./"+initActiveTab,data,fillData[fillMethods[loadTabIndex]]);
$("#myTab li:eq("+loadTabIndex+")").addClass("active dataFilled");
$(".tab-pane:eq("+loadTabIndex+")").addClass("active");

$("#myTab li").on("click",function () {
    var index = $(this).index();
    if ($(this).hasClass("dataFilled") == false){
        $(this).addClass("dataFilled");
        ajaxRequest("get",_ctx+"./"+activeTabs[index],data,fillData[fillMethods[index]]);
    }
});

//查看弹出地图
$("#layer-map").on("click",function () {
    layer.open({
        title:"泰尔信用",
        area:["60%"],
        btn:[],
        content:"<div id='allmap' style='width: 100%;height: 500px;'></div>",
    });
    // var locationAddress = contactData.address;
    var locationAddress = $("#map-address").text();
    var map = new BMap.Map("allmap");  // 创建Map实例
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.MapTypeControl());
    map.addControl(new BMap.OverviewMapControl());
    map.enableScrollWheelZoom(true);
    map.centerAndZoom(locationAddress,15);      // 初始化地图,用城市名设置地图中心点
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(locationAddress, function(point){
        if(point){
            var poi = new BMap.Point(point.lng, point.lat);
            var marker = new BMap.Marker(poi);  // 创建标注
            map.addOverlay(marker);
            setTimeout(function(){
                map.centerAndZoom(poi, 15);
            },1000);
            map.setZoom(14);
            var labelContent ="<p style='margin:10px 0 0 ;line-height:1.5;font-size:13px;'>"+locationAddress+"</p>" + "</div>";
            var infoWindow = new BMap.InfoWindow(labelContent);  // 创建信息窗口对象
            //图片加载完毕重绘infowindow
            marker.openInfoWindow(infoWindow);
        }
    });
});