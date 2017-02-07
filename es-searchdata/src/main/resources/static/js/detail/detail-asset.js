var assetFunction = function (assetsData) {
        var $thisContent = $("#nav-intangible-assets");
        var quickNavData = assetsData.digitalCount;
        var quickHtml = ` <div class="quick-nav">
                            <a href="#quickNav-trademarkInformation">商标信息 ${quickNavData.tmCount}</a>
                            <a href="#quickNav-patentsInformation">专利信息 ${quickNavData.patentCount}</a>
                            <a href="#quickNav-copyrightInformation">著作权信息 ${quickNavData.copyrightCount}</a>
                            <a href="#quickNav-softwareInformation">软件著作权信息 ${quickNavData.softwareCount}</a>
                            <a href="#quickNav-siteInformation">网站信息 ${quickNavData.websiteCount}</a>
                            <a href="#quickNav-domainInformation">域名信息 ${quickNavData.domainCount}</a>
                          <!--<a href="#quickNav-qualification">资质荣誉 ${quickNavData.qualification}</a>-->
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
                            ajaxRequest("get",_ctx+"./digitalAsset",{page:page,size:5,companyId:companyId,companyName},function (data) {
                                fillBrandHtml(data.tms,true);
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
                            ajaxRequest("get",_ctx+"./digitalAsset",{page:page,size:5,companyId:companyId,companyName},function (data) {
                                fillPatentHtml(data.patents,true);
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
                            ajaxRequest("get",_ctx+"./digitalAsset",{page:page,size:5,companyId:companyId,companyName},function (data) {
                                fillCopyrightHtml(data.copyrights,true);
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
                                        <div class="box-title">${softwareList[i].fullName}</div>
                                        <div class="box-content">
                                            <p>版本号：${softwareList[i].version}</p>
                                            <p>分类号：${softwareList[i].catnum}</p>
                                            <p>登记号：${softwareList[i].regnum}</p>
                                            <p>登记批准日期：${softwareList[i].publishDt}</p>
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
                            ajaxRequest("get",_ctx+"./digitalAsset",{page:page,size:5,companyId:companyId,companyName},function (data) {
                                fillSoftwareHtml(data.softwares,true);
                            });
                        }
                    });
                }
            }
            fillSoftwareHtml(assetsData.softwares);
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
                            ajaxRequest("get","./digitalAsset",{page:page,size:5},function (data) {
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
                            ajaxRequest("get","./digitalAsset",{page:page,size:5},function (data) {
                                fillDomanHtml(data.domainInformation,true);
                            });
                        };
                    })
                }
            }
            fillDomanHtml(assetsData.domainInformation)
        }
    }