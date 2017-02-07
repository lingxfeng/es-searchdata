var investFunction = function (data) {
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
                                                <img src="../static/images/companyInfo/none-default.png" alt=""/>
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
                            ajaxRequest("get",_ctx + "./foreignInvestment",{page:page,size:5,companyId:companyId,companyName:companyName},function (data) {
                                fillInvestHtml(data.invests,true);
                            });
                        }
                    });
                }
            }
        }
        fillInvestHtml(data.invests);
    }