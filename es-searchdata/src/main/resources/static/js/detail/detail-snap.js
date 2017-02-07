var snapFunction = function (snapData) {
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
            $thisContent.append(noClaimHtml);
        }
    }