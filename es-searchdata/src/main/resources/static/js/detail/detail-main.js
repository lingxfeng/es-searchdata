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
var noEditHtmlModul = function(columnTitles){
    var noEditHtml = '';
    for(let i=0 ,len = columnTitles.length;i<len;i++){
    	noEditHtml += `<div class="module no-edit">
                            <div class="module-head">${columnTitles[i]}</div>
                            <div class="module-content"><p>企业尚未编辑</p><a href="">点击编辑企业</a></div>
                        </div>`;
    }
    return noEditHtml;
};
var noClaimHtmlModule = function (columnTitles) {
	var noClaimHtml = "";
	for(let i=0 ,len = columnTitles.length;i<len;i++){
		noClaimHtml += `  <div class="module no-claim">
        <div class="module-head">${columnTitles[i]}</div>
        <div class="module-content"><p>暂无信息</p><!--<a href="">点击认领企业</a> --></div>
    </div>`;
    }
	
    return noClaimHtml;
};

var fillData = {
    fillSnap:snapFunction,
    fillBase:baseFunction,
    fillOperate:operaFunction,
    fillInvest:investFunction,
    fillLow:lowFunction,
    fillAssets:assetFunction,
    fillNews:newFunction,
}

var _ctx = "companyInfo/";

var activeTabs = ["enterpriseSnapshot","basicInformation","employmentInformation","foreignInvestment","lawsuit","digitalAsset","news"];
var fillMethods = ["fillSnap","fillBase","fillOperate","fillInvest","fillLow","fillAssets","fillNews"];
var initActiveTab = activeTabs[1];
var loadTabIndex = activeTabs.indexOf(initActiveTab);
var companyId = $("#companyId").val();
var companyName = $("#companyName").val();
var data = {companyId:companyId,companyName:companyName};
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