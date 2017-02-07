var newFunction = function (data) {
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
