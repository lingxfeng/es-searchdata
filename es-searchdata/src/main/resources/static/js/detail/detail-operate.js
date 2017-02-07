var operaFunction = function (operateData) {
        var $thisCount = $("#nav-operate");
        var quickNavData = operateData.manageCount;
        var quickHtml = `<div class="quick-nav">
                            <a href="#quickNav-taxationInformation">税务信息 ${quickNavData.taxationInformation}</a>
                            <a href="#quickNav-financingInformation">融资信息 ${quickNavData.financingInformation}</a>
                            <a href="#quickNav-shareConsideration">股权出质 ${quickNavData.shareConsideration}</a>
                            <a href="#quickNav-foatingMortgage">动产抵押 ${quickNavData.foatingMortgage}</a>
                            <a href="#quickNav-clearingInformation">清算信息 ${quickNavData.clearingInformation}</a>
                            <a href="#quickNav-abnormalOperation">经营异常 ${quickNavData.abnormalOperation}</a>
                            <a href="#quickNav-administrativePenalty">行政处罚 ${quickNavData.administrativePenalty}</a>
                            <a href="#quickNav-information">招聘信息 ${quickNavData.employmentCount}</a>
                            <a href="#quickNav-bidding">招投标 ${quickNavData.biddingCount}</a>
                        </div>`;
        $thisCount.append(quickHtml);

        /*招聘信息*/
       if(quickNavData.employmentCount != 0){
           var fillRecruitHtml = function (data,pageFresh) {
               var recruitHtmlModule = ``;
               var informationList = data.list;
               for(let i=0 ,len = informationList.length;i< len ;i++){
                   recruitHtmlModule += ` <div class="list-row">
                                        <div class="left-img">
                                            <img src="../static/images/companyInfo/employment.png" alt="">
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
                            <div class="module-head">招聘信息 <span class="count-number">${quickNavData.employmentCount}</span></div>
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
                           ajaxRequest("get",_ctx+"./employmentInformation",{page:page,size:5,companyId:companyId,companyName:companyName},function (data) {
                               fillRecruitHtml(data.employments,true);
                           });
                       }
                   });
               }
           }
           fillRecruitHtml(operateData.employments);
       }

        /*招投标*/
        if(quickNavData.biddingCount != 0){
            var fillBidHtml = function (data,pageFresh) {
                var bidHtmlModule = ``;
                var bidList = data.list;
                for(let i=0 ,len = bidList.length;i<len;i++){
                    bidHtmlModule += ` <div class="list-row">
                                        <div class="list-body">
                                            <div class="list-title">
                                                <span class="list-number">${i+1}</span>${bidList[i].title}
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
                            <div class="module-head">招投标 <span class="count-number">${quickNavData.biddingCount}</span></div>
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
                            ajaxRequest("get",_ctx+"./employmentInformation",{page:page,size:5,companyId:companyId,companyName:companyName},function (data) {
                                fillRecruitHtml(data.bids,true);
                            });
                        }
                    });
                }
            }
            fillBidHtml(operateData.bids);
        }
    }