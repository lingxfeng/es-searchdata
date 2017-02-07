/**
 * Created by Mr Wang on 2016/11/15.
 */

//基本信息
var topData = {
    logoSrc : "logo.png",                       //企业logo名称
    name : "北京泰尔英福网络科技有限责任公司",  //企业名称
    updataDate : "2016年11月11日",             //数据更新日期
    creditNumber:"91110108589104047H",          //网信代码
    creditAddress:"泰尔英福.信用.信息"          //网信地址
};

//企业介绍
// 每段文字放在一个  "<p>XXXXX</p>"中  多段文字格式如下： "<p>第一段</p><p>第二段</p>",( *文字最后有一个英文输入下的逗号* )
var introData = {
    text:[
            "Teleinfo（北京泰尔英福网络科技有限责任公司）是中国信息通信研究院（CAICT）的全资子公司和互联网关键技术成果转化平台，成立于2012年",
            "Teleinfo作为领先的互联网关键服务提供商，提供基于域名的网络数据与安全应用服务，帮助个人和企业轻松建立稳定、高效的在线体验。"
    ],
    bannerSrc:"company-banner.png"
};

//发展历程
var historyData = [
    {time:"2012年6月",                                                        //时间
        event:"公司注册城里，启动申请\".信息\"通用顶级域名注册局资质申请"     //事件
    },
    {time:"2015年1月",
        event:"正式组建运营团队，确定\"域名-安全-数据\"三个业务方向。"
    },
    {time:"2015年10月",
        event:"根植中国服务世界 Teleinfo亮相ICANN54。"
    },
    {time:"2016年1月",
        event:"\".信息\"域名注册进入日升期。"
    },
    {time:"2016年3月",
        event:"中文域名\".信息\"全球开放注册。"
    }
];

//实景图片
//直接放入图片名称即可，涉及相关图片均放在images.teleinfo/目录下面
var imgSrc = ["company1.png","company2.png","company3.png","company2.png","company3.png","company2.png","company3.png"];

//宣传视频
var videoHtml = "<embed src='http://player.youku.com/player.php/sid/XMzU1Mjg5NzQ0/v.swf' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>";
//产品服务
var productsData = [
    {
        title:".信息",                                    //产品名称
        introduction:"极具商业应用价值的中文域名",       //产品介绍
        kind:"域名服务",                                    //服务类型
        price:"258元/年",                                 //服务价格
        logoSrc:"dotinfo.png"                             //产品logou图片
    },
    {
        title:"mTLD",
        introduction:"专为域名打造、设计的全业务流程服务云平台。该平台旨在为客户解决域名-互联网关键基础资源服务的安全性、易用性和可管理性问题。" +
        "平台提供了面向全球的云注册局服务，同时为客户提供政策及业务咨询、业务中国区落地、域名数据解析安全、数据托管、服务监测等完整的解决方案。" +
        "同时该平台也是为进一步推动域名行业的规范、健康发展，并为从事域名行业的企业提供更专业的、更适合中国本土的域名服务。",
        kind:"域名服务",
        price:"258元/年",
        logoSrc:"mtld.png"
    },
    {
        title:"泰尔网信",
        introduction:"泰尔网信，是在工信部指导下，由中国信息通信研究院建设运营的全国网络信用基础数据平台。平台汇聚企业主客观信用信息，真实公正地展示给网民。" +
        "泰尔网信旨在帮助网民快速准确获取互联网真实信息；帮助企业展示并提升网络信用，使获信成本最小化；通过构筑泰尔网络信用体系，有效净化互联网信息内容，建立文明健康的网络空间。",
        kind:"域名服务",
        price:"基础服务（8元/年）、增值服务（980元/年）",
        logoSrc:"telecredit.png"
    },
    {
        title:"infoID",
        introduction:"infoID结合了Teleinfo在生物识别、数据整合分析及支撑国家进行行业支持服务等方面的技术及资源积累，能够满足各种场景下的身份验证需求。",
        kind:"域名服务",
        price:"-",
        logoSrc:"infoid.png"
    }
    ,
    {
        title:"泰尔网信",
        introduction:"泰尔网信，是在工信部指导下，由中国信息通信研究院建设运营的全国网络信用基础数据平台。平台汇聚企业主客观信用信息，真实公正地展示给网民。" +
        "泰尔网信旨在帮助网民快速准确获取互联网真实信息；帮助企业展示并提升网络信用，使获信成本最小化；通过构筑泰尔网络信用体系，有效净化互联网信息内容，建立文明健康的网络空间。",
        kind:"域名服务",
        price:"基础服务（8元/年）、增值服务（980元/年）",
        logoSrc:"telecredit.png"
    },
    {
        title:"infoID",
        introduction:"infoID结合了Teleinfo在生物识别、数据整合分析及支撑国家进行行业支持服务等方面的技术及资源积累，能够满足各种场景下的身份验证需求。",
        kind:"域名服务",
        price:"-",
        logoSrc:"infoid.png"
    }
    ,
    {
        title:"泰尔网信",
        introduction:"泰尔网信，是在工信部指导下，由中国信息通信研究院建设运营的全国网络信用基础数据平台。平台汇聚企业主客观信用信息，真实公正地展示给网民。" +
        "泰尔网信旨在帮助网民快速准确获取互联网真实信息；帮助企业展示并提升网络信用，使获信成本最小化；通过构筑泰尔网络信用体系，有效净化互联网信息内容，建立文明健康的网络空间。",
        kind:"域名服务",
        price:"基础服务（8元/年）、增值服务（980元/年）",
        logoSrc:"telecredit.png"
    },
    {
        title:"infoID",
        introduction:"infoID结合了Teleinfo在生物识别、数据整合分析及支撑国家进行行业支持服务等方面的技术及资源积累，能够满足各种场景下的身份验证需求。",
        kind:"域名服务",
        price:"-",
        logoSrc:"infoid.png"
    }
    ,
    {
        title:"泰尔网信",
        introduction:"泰尔网信，是在工信部指导下，由中国信息通信研究院建设运营的全国网络信用基础数据平台。平台汇聚企业主客观信用信息，真实公正地展示给网民。" +
        "泰尔网信旨在帮助网民快速准确获取互联网真实信息；帮助企业展示并提升网络信用，使获信成本最小化；通过构筑泰尔网络信用体系，有效净化互联网信息内容，建立文明健康的网络空间。",
        kind:"域名服务",
        price:"基础服务（8元/年）、增值服务（980元/年）",
        logoSrc:"telecredit.png"
    },
    {
        title:"infoID",
        introduction:"infoID结合了Teleinfo在生物识别、数据整合分析及支撑国家进行行业支持服务等方面的技术及资源积累，能够满足各种场景下的身份验证需求。",
        kind:"域名服务",
        price:"-",
        logoSrc:"infoid.png"
    }
    ,
    {
        title:"泰尔网信",
        introduction:"泰尔网信，是在工信部指导下，由中国信息通信研究院建设运营的全国网络信用基础数据平台。平台汇聚企业主客观信用信息，真实公正地展示给网民。" +
        "泰尔网信旨在帮助网民快速准确获取互联网真实信息；帮助企业展示并提升网络信用，使获信成本最小化；通过构筑泰尔网络信用体系，有效净化互联网信息内容，建立文明健康的网络空间。",
        kind:"域名服务",
        price:"基础服务（8元/年）、增值服务（980元/年）",
        logoSrc:"telecredit.png"
    },
    {
        title:"infoID",
        introduction:"infoID结合了Teleinfo在生物识别、数据整合分析及支撑国家进行行业支持服务等方面的技术及资源积累，能够满足各种场景下的身份验证需求。",
        kind:"域名服务",
        price:"-",
        logoSrc:"infoid.png"
    }
];

//资质荣誉
var honoursData = [
    {
        name:"ISO9001质量管理体系认证",     //荣誉名称
        org:"中国质量认证中心",             //颁发机构
        time:"2015-11-12",                  //颁发时间
        imgSrc:"company-desc1.png"          //图片路径
    },
    {
        name:"ISO27001信息安全管理体系",
        org:"中国质量认证中心",
        time:"2016-03-22",
        imgSrc:"company-desc2.png"
    },
    {
        name:"高薪技术企业证书",
        org:"北京市科学技术委员会",
        time:"2015-12-10",
        imgSrc:"company-desc3.png"
    }
];

//在线入口
var enterancData = [
    {
        name:"北京泰尔英福网络科技有限责任公司",    //名称
        imgSrc:"entrance1.png"      //图片地址
    }
];

//浏览统计
var countData = {
    scanned:"1009", //浏览量
    concerns:"64"   //关注人数
}

//联系方式
var contactData = {
    telephone:"400-300-5000",     //电话
    email:"service@teleinfo.cn",
    address:"北京市海淀区中关村翠湖科技园21号楼",   //地址
    homePage:"www.teleinfo.cn",     //官网地址
    weixin:"泰尔英福",       //微信账号
    sina:"泰尔英福"        //新浪微博
};

/**********************************************************************************/
/*                                                                                */
/*                           下面内容不要改，一定不要改                           */
/*                           下面内容不要改，一定不要改                           */
/*                           下面内容不要改，一定不要改                           */
/*                                                                                */
/**********************************************************************************/



//上方基本信息
(function () {
    $("#user-name").html(topData.name);
    $(".company-logo img").attr("src","../static/images.teleinfo/"+topData.logoSrc);
    $(".company-name h3").html(topData.name);
    $(".data-update span").html(topData.updataDate);
    $(".company-text p:eq(0)").html("网信代码："+topData.creditNumber);
    $(".company-text p:eq(1)").html("网信地址："+"<a href='http://"+topData.creditAddress+"'>"+topData.creditAddress+"</a>");
})();

//企业介绍
(function(){
    var introTextHtml = "";
    for(var i=0 ; i<introData.text.length;i++){
        introTextHtml += "<p>"+introData.text[i]+"</p>";
    }
    introTextHtml += "<img class='company-banner' src='../static/images.teleinfo/"+introData.bannerSrc+"'>";
    $(".intro-content").html(introTextHtml);
})();

//发展历程内容填充
(function(){
    var fiveHistoryContentHtml = "", allHistoryContentHtml = "" ;

    function lessHistory(){
        if(fiveHistoryContentHtml == ""){
            fiveHistoryContentHtml = "<div class='time-line'></div>";
            for(var i = 0 , len = historyData.length; i < len ; i++){
                if (len > 5){
                    if(i>4){
                        continue;
                    }else{
                        var newEventHtml = "<div class='history-list'><span>"+ historyData[i].time +"</span> <i class='glyphicon glyphicon-record'></i> <p>"+ historyData[i].event +"</p> </div>";
                        fiveHistoryContentHtml += newEventHtml;
                    }
                }else{
                    var newEventHtml = "<div class='history-list'><span>"+ historyData[i].time +"</span> <i class='glyphicon glyphicon-record'></i> <p>"+ historyData[i].event +"</p> </div>";
                    fiveHistoryContentHtml += newEventHtml;
                    $("#more-history").hide();
                }
            }
        }
        if(historyData.length <=5 ){
            $("#more-history").hide();
        }else{
            $("#more-history").attr("data-extend",false);
            $("#more-history").show().html("展开更多");
        }
        $(".development-history").html(fiveHistoryContentHtml);
        var timeLineHeight = $(".development-history").height();
        $(".time-line").height(timeLineHeight+10);
    }
    lessHistory();
    function moreHistory(){
        if(allHistoryContentHtml==""){
            allHistoryContentHtml = "<div class='time-line'></div>";
            for(var i = 0 , len = historyData.length; i < len ; i++){
                var newEventHtml = "<div class='history-list'><span>"+ historyData[i].time +"</span> <i class='glyphicon glyphicon-record'></i> <p>"+ historyData[i].event +"</p> </div>";
                allHistoryContentHtml += newEventHtml;
            }
        }
        $("#more-history").attr("data-extend",true);
        $(".development-history").html(allHistoryContentHtml);
        var timeLineHeight = $(".development-history").height();
        $(".time-line").height(timeLineHeight+10);
        $("#more-history").show().html("收起");
    }
    $("#more-history").click(function () {
        var loadState = $(this).attr("data-extend");
        if(loadState == "true"){
            lessHistory();
        }else{
            moreHistory();
        }
    });

    // $(".time-line").height(timeLineHeight+10);

})();

//实景照片部分  把图片放在images.teleinfo.cn目录下，直接修改下方的imgSrc内容。
(function(){
    imgHtml = "";
    for(var i = 0 ; i<imgSrc.length;i++){
        imgHtml += "<div><a href='javascript:void(0)'><img src='../static/images.teleinfo/"+imgSrc[i]+"' alt=''> <p class='text-center'>公司外景"+i+"</p></a></div>";
    }
    $(".slick").html(imgHtml).slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        touchMove: false,
        slidesToScroll: 1,
        arrows:true
    });
}());

//宣传视频
(function(){
   $(".video-wrap").html(videoHtml);
})();

//产品服务
(function(){
    function pageHtml(page){
        showPage = page || 1;
        var productListHtml = "";
        for(var i = (5*(showPage-1)); i<(5*showPage < productsData.length ? 5*showPage : productsData.length);i++){
            var thisProduction = productsData[i].introduction;
            if(thisProduction.length < 90){
                productListHtml +=  "<div class='product-list'> " +
                    "<div class='left-desc'> " +
                    "<div class='product-title'>"+ productsData[i].title +"</div> " +
                    "<div class='product-introduction'>"+ thisProduction +"</div> " +
                    "<div class='product-kind'>服务类型："+productsData[i].kind+"</div> " +
                    "<div class='product-price'>服务价格："+productsData[i].price+"</div> " +
                    "</div> <div class='right-img'> <img src='../static/images.teleinfo/"+productsData[i].logoSrc+"' alt=''> </div> </div>";
            }else{
                var allContent = thisProduction;
                var fillIntroductionContent = thisProduction.slice(0,90)+"...";
                productListHtml +=  "<div class='product-list'> " +
                    "<div class='left-desc'> " +
                    "<div class='product-title'>"+ productsData[i].title +"</div> " +
                    "<div class='product-introduction' data-hide='"+allContent+"'><span>"+ fillIntroductionContent +"</span>"+"<a href='javascript:void(0)' class='more-introduction pull-right '>"+"&gt;&gt;"+"</a>"+"</div> " +
                    "<div class='product-kind'>服务类型："+productsData[i].kind+"</div> " +
                    "<div class='product-price'>服务价格："+productsData[i].price+"</div> " +
                    "</div> <div class='right-img'> <img src='../static/images.teleinfo/"+productsData[i].logoSrc+"' alt=''> </div> </div>";
            }
        }
        return productListHtml;
    }

    // productListHtml+= " <div id='pagination-demo' class='pull-right'></div>";
    // $(".product-lists").html(pageHtml(1));
    if(productsData.length>5){
        $('#pagination-demo').twbsPagination({
            prev_text:"上一页",
            next_text:"下一页",
            totalPages: Math.ceil(productsData.length/5),
            visiblePages: 5,
            onPageClick: function (event, page) {
                $(".product-lists").html(pageHtml(page));
            }
        });
    }else{
        $(".product-lists").html(pageHtml(1));
    }
    $(".product-lists").on("click",".more-introduction",function(){
        var $production = $(this).parent();
        var beHideHtml = $production.find("span").html();
        var beShowHtml = $production.attr("data-hide");
        $production.attr("data-hide",beHideHtml)
        $production.find("span").html(beShowHtml);
        var openState = $(this).attr("data-hide");
        if(openState != "true"){
            $(this).html("<<")
            $(this).attr("data-hide",true);
        }else{
            $(this).html(">>")
            $(this).attr("data-hide",false);
        }
    });
})();

//资质荣誉
(function(){
    var honoursHtml = "";
    for(var i = 0 ; i < honoursData.length ; i++){
        honoursHtml +=  "<div class='honours-list'> " +
            "<div class='left-desc'> " +
            "<div class='honour-title'>"+ honoursData[i].name +"</div> " +
            "<p>颁发机构："+ honoursData[i].org +"</p> " +
            "<p>颁发时间："+ honoursData[i].time +"</p> </div> " +
            "<div class='right-img'> " +
            "<img src='../static/images.teleinfo/"+honoursData[i].imgSrc+"' alt=''> </div> </div>";
    }

    $(".honours-lists").html(honoursHtml);
})();

//在线入口
(function () {

    var enteranceHtml = "";
    for(var i = 0 ; i<enterancData.length;i++){
        enteranceHtml += "<div class='entrances-list'> " +
            "<div class='left-desc'> " +
            "<div class='company-name' title='北京泰尔英福网络科技有限责任公司'>"+enterancData[i].name+"</div> <a href='' class='btn-enter'>点击进入</a> </div> " +
            "<div class='right-img'><img src='../static/images.teleinfo/"+enterancData[i].imgSrc+"'/></div> </div> </div>";
    }
    $(".entrances-lists").html(enteranceHtml);
})();

//浏览统计
(function () {

    $(".count-number:eq(0)").html(countData.scanned);
    $(".count-number:eq(1)").html(countData.concerns);

})();

//联系方式
(function () {
    var fillHtml = [contactData.telephone,"<a href='mail:to"+contactData+"'>"+contactData.email+"</a>",
        contactData.address+"<a id='layer-map' href='javascript:void(0)'>查看地图</a>",
        "<a href='http://"+contactData.homePage+"'>"+contactData.homePage+"</a>",contactData.weixin,contactData.sina];

    $(".contact-row p").each(function (index,value) {
        $(this).html(fillHtml[index])
    })
})();

//查看弹出地图
$("#layer-map").on("click",function () {
    layer.open({
        title:topData.name,
        area:["60%"],
        btn:[],
        content:"<div id='allmap' style='width: 100%;height: 500px;'></div>",
    });
    var locationAddress = contactData.address;
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