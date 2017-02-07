var lowFunction = function (lawData) {
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
                                                <span class="list-number">${i+1}</span>${judgList[i].title}
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
                            ajaxRequest("get",_ctx + "./lawsuit",{page:page,size:5,companyId:companyId,companyName:companyName},function (data) {
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
                            ajaxRequest("get",_ctx + "./lawsuit",{page:page,size:5,companyId:companyId,companyName:companyName},function (data) {
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

    }