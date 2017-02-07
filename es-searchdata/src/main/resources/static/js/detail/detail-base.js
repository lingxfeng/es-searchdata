var baseFunction=function (baseData) {
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
                                            <div class="base_list_head"><img src="../static/images/companyInfo/head01.png"></div>
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
                                    <div class="brunch-name">${branchList[i]}</div>
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
                            ajaxRequest("get",_ctx + "./basicInformation",{page:page,size:5,companyId:companyId,companyName:companyName},function (data) {
                                fillChangeRecordsHtml(data.changeRecords,true);
                            });
                        }
                    })
                }
            };
            fillChangeRecordsHtml(baseData.changeRecords);
        }

    }