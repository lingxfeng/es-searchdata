var _ctx = $("meta[name='ctx']").attr("content");
if ($(".main").length != 0) {
    function resize() {
        var nowHeight = $(window).outerHeight() - $("header").outerHeight() - $("footer").outerHeight() - $(".bottom-contact").outerHeight();
        $(".main").css("min-height", nowHeight);
    }
    resize();
    $(window).on("resize", function () {
        resize();
    });
}
/*//头部搜索按钮点击搜索
$("#search").on("click", function () {
    var searchContent = $("#search-content").val();
    if (searchContent.length == 0) {
        $("#search-content").focus();
        $("#search-content").addClass("error");
        return false;
    } else {
        window.location.href = "./result?q=" + encodeURIComponent($("#search-content").val());
    }
});*/

$(function(){ 
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
		$("#search").click(); 
		}
	});
});
//头部搜索框敲击回车搜索
/*$("#search").on("keypress", function (event) {
	debugger;
	var content = $("#content").val();
    if (event.keyCode == "13") {
        if ($(this).val().length === 0) {
            $(this).focus();
            $(this).addClass("error");
            return false;
        } else {
        	window.location.href="/list?content="+content;
        }
    }
})*/
//点击查一下
function submitform(){
	var content = $("#content").val();
	window.location.href="/list?content="+content;
}
//处理手气不错返回结果
function goodLuck(domain){
    if(domain.length != 0){
        var jumpUrl = "http://"+domain;
        location.href = jumpUrl;
    }else{
        badLuck();
    }
}
function badLuck(){
    var badLuck = "<div class='alert alert-danger bad-luck' role='alert'>手气太差,换一个试试</div>";
    if($(".bad-luck").length == 0){
        // $(".hot-word").after(badLuck);
        $(".hot-word").after(badLuck);
    }else{
        $(".bad-luck").fadeIn();
    }
    setTimeout(function(){
        $(".bad-luck").fadeOut();
    },2000);
}
//手气不错功能
$("#good-luck").on("click",function () {
    var searchContent = $("#content").val();
    if(searchContent.length === 0 ){
        $("#search-content").focus();
        $("#search-content").addClass("error");
    }else{
        $.ajax({
            type : "post",
            url : " /getLucky",
            data:searchContent,
            success : function (data) {
            	if(data != null && "" != data){
            		 goodLuck(data);
            	}else{
            		
            	}
               
            },
            error : function (data) {
                badLuck();
            }
        });
    }
});
/*注册和登陆页面公用函数*/
//下拉菜单
$("#user-center,#header-list").hover(function () {
    $("#header-list").show();
},function () {
    $("#header-list").hide();
});
// 设置jQuery Ajax全局的参数
$.ajaxSetup({
    error: function(XMLHttpRequest, textStatus, errorThrown){
        switch (XMLHttpRequest.status){
            case(302):
                location.href = "http://telecredit.cn/login/";
                break;
            default:
            // alert("未知错误");
        }
    }
});
layer.config({
    extend: ['skin/myskin/style.css'], //加载新皮肤
});
//验证正则表达式
var regRules = {
    phone: /^1(3|4|5|7|8)\d{9}$/,
    email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    password: /^[A-Za-z0-9]{6,18}/,
    imgValidatecode: /^\w{4}$/,
    phoneValidatecode: /^\d{4}$/
};
/*验证手机和邮箱合适*/
var $errorMsg = $(".error-msg");
var $userAccount = $("#account");
var $password = $("#password");
var $rePassword = $("#repassword");
var $imgCode = $("#img-validatecode");
var $phoneCode = $("#phone-validatecode");
//验证注册信息
var registCheck = {
    phoneAccount: false,
    emainAccount: false,
    checkUserAccount: function () {
        var userAccount = $userAccount.val();
        if (regRules.phone.test(userAccount) === false && regRules.email.test(userAccount) === false) {
//验证用户名电话号码或者邮箱是否正确
            $errorMsg.show().html("请输入正确手机号码或邮箱");
            $userAccount.parent().addClass("error");
            return false;
        } else if (regRules.phone.test(userAccount) === true) {
            this.phoneAccount = true;
            $(".phone-check").show();
            $(".img-check").hide();
        } else if (regRules.email.test(userAccount) === true) {
            this.emainAccount = true;
            $(".img-check").show();
            $(".phone-check").hide();
        }
    },
    checkUserPassword: function () {
        var userPassword = $password.val();
        if (regRules.password.test(userPassword) === false) {
            $errorMsg.show().html("密码为6-18位字母或数字");
            $password.parent().addClass("error");
            return false;
        }
    },
    checkUserRePassword: function () {
        this.checkUserPassword();
        var userPassword = $password.val();
        var userRePassword = $rePassword.val();
        if (regRules.password.test(userPassword) === false) {
            $errorMsg.show().html("密码为6-18位字母或数字");
            $password.parent().addClass("error");
            return false;
        } else if (regRules.password.test(userRePassword) === false) {
            $errorMsg.show().html("密码为6-18位字母或数字");
            $rePassword.parent().addClass("error");
            return false;
        } else if (userPassword !== userRePassword) {
            $errorMsg.show().html("两次密码输入不一致");
            $rePassword.parent().addClass("error");
            return false;
        }
    },
    checkImgCode: function () {
        var checkCode = $("#img-validatecode").val();
        if (regRules.imgValidatecode.test(checkCode) === false) {
            $errorMsg.show().html("图片验证码错误");
            $imgCode.parent().addClass("error");
            // refreshRegisterCheckImg();//输入错误刷新
            return false;
        }
    },
    checkPhoneCode: function () {
        var phoneCode = $phoneCode.val();
        if (regRules.phoneValidatecode.test(phoneCode) === false) {
            $errorMsg.show().html("手机验证码错误");
            $phoneCode.parent().addClass("error");
            return false;
        }
    }
};
//验证码路径
var imgValidatecodeSrc = _ctx+"/captcha-image";
function refreshRegisterCheckImg($this) {
    $this.attr("src", imgValidatecodeSrc + "?v=" + Math.random())
}
//验证码点击刷新
$("#img-validatecode,.img-validate").on("click", function () {
    var $this = $(this);
    refreshRegisterCheckImg($this);
});
//设置获取手机验证码按钮倒计时
// function setRestTime() {
//     var restSeconds = 60;
//     $(this).attr("disabled", "true");
//     var $this = $(this);
//     (function (time) {
//         $this.html("剩余" + time + "S");
//         var surplusTime = time;
//         var restSecondsIndex = window.setInterval(function () {
//             surplusTime--;
//             if (surplusTime > 0) {
//                 $this.html("剩余" + surplusTime + "S");
//             } else {
//                 $this.html("获取验证码");
//                 $this.removeAttr("disabled");
//                 clearInterval(restSecondsIndex);
//             }
//         }, 1000);
//     })(restSeconds);
// }
//获取手机验证码点击弹出图片验证码
function showLayerImgCode(phoneNumber, element) {
    var layerImgCode = layer.open({
        type: 0,
        title: '请先完成下方验证',
        btn: ["确 定", "取 消"],
        shade: [0.8, '#131820'],
        area: '400px',
        content: "<div id='layer-imgcode' class='img-check'><input class='layer-style-input' type='text' placeholder='输入右侧验证码'><img src=" + imgValidatecodeSrc + "  title='点击刷新验证码'></div>",
        yes: function () {
            var phoneImgCode = $("#layer-imgcode input").val();
            console.log(phoneImgCode);
            if (regRules.imgValidatecode.test(phoneImgCode) === true) {
                var smsRequestUrl = _ctx + "/sms/" + phoneNumber + "/" + phoneImgCode;
                $.ajax({
                    url: smsRequestUrl,
                    type: "post",
                    data: {},
                    success: function (data) {
                        if (data > 0) {
                            layer.close(layerImgCode);
                            setRestTime(element);
                        } else {
                            $("#layer-imgcode").append("<a class='error-msg'>图片验证码不正确</a>");
                            refreshRegisterCheckImg($("#layer-imgcode img"));
                        }
                    }
                });
            } else {
                $("#layer-imgcode").append("<a class='error-msg'>图片验证码不正确</a>")
                // showLayerErrorMsg("图片验证码不正确！");
                refreshRegisterCheckImg($("#layer-imgcode input"));
            }
        }
    });
    $("#layer-imgcode img").on("click", function () {
        var $this = $(this);
        refreshRegisterCheckImg($this);
    });
}
//设置获取手机验证码按钮倒计时
function setRestTime($this) {
    var restSeconds = 60;
    $this.attr("disabled", "true");
    (function (time) {
        $this.html("剩余" + time + "S");
        var surplusTime = time;
        var restSecondsIndex = window.setInterval(function () {
            surplusTime--;
            if (surplusTime > 0) {
                $this.html("剩余" + surplusTime + "S");
            } else {
                $this.html("获取验证码");
                $this.removeAttr("disabled");
                clearInterval(restSecondsIndex);
            }
        }, 1000);
    })(restSeconds);
}
//获取手机验证码点击事件
$("#get-phonecode").click(function () {
    var userAccount = $("#account").val();
    if (regRules.phone.test(userAccount) === false) {
        //验证用户名电话号码或者邮箱是否正确
        $(".error-msg").show().html("请输入正确手机号码");
        $("#account-phone").parent().addClass("error");
        return false;
    } else {
        showLayerImgCode(userAccount, $(this));
    }
});
/*******注册页面*******/
if ($(".register-wrap").length !== 0) {
    console.log("enter register");

    /*输入框获得焦点去掉红框*/
    $(".register-content input").focus(function () {
        $(this).parent().removeClass("error");
    });
    $(".register-content input").keydown(function () {
        $(".error-msg").hide()
    });

    /*验证用户名*/
    $(" #account").on("blur", function () {
        registCheck.checkUserAccount();
    });
    /*验证密码*/
    $password.on("blur", function () {
        registCheck.checkUserPassword();
    });
    $rePassword.on("blur", function () {
        registCheck.checkUserRePassword();
    });
    /*验证图片验证码*/
    $imgCode.on("blur", function () {
        registCheck.checkImgCode();
    });
    /*验证手机验证码*/
    $phoneCode.on("blur", function () {
        registCheck.checkPhoneCode();
    });
    $("#blankCheckbox").click(function(){
        if($(this).is(":checked") === false){
            $errorMsg.show().html("请阅读并勾选协议");
        }else{
            $errorMsg.hide();
        }
    });

    $("#register-submit").on("click", function () {
//全部验证为错误验证，如果有问题，直接在上方提示，return 函数  终止
        if (registCheck.checkUserAccount() === false)  return false;

        if (registCheck.checkUserPassword() === false) return false;

        if (registCheck.checkUserRePassword() === false) return false;

        if (registCheck.emainAccount === true && registCheck.checkImgCode() === false) return false;

        if (registCheck.phoneAccount === true && registCheck.checkPhoneCode() === false) return false;
        // if (registCheck.checkPhoneCode() === false) return false;
//判断用户协议是否点击
        if ($("#blankCheckbox").is(":checked") === false) {
            $errorMsg.show().html("请阅读并勾选协议");
            return false;
        }
        $(".error-msg").hide();
        $("register_form").submit();
    });
    //获取手机验证码点击事件
    $("#get-phonecode").click(function () {
        var userAccount = $("#account").val();
        if (regRules.phone.test(userAccount) === false) {
            //验证用户名电话号码或者邮箱是否正确
            $(".error-msg").show().html("请输入正确手机号码");
            $("#account-phone").parent().addClass("error");
            return false;
        } else {
            showLayerImgCode(userAccount, $(this));
        }
    });
}
/*******END注册*******/

/*******登陆*******/
if ($(".login-wrap").length !== 0) {
    //切换登陆方式时，改变input登陆type
    $(".login-head ul li a").on("click", function () {
        var loginType = $(this).attr("data-type");
        $("#login-type").val(loginType);
        $(".error-msg").hide();
        // var showIndex = loginType;//点击切换登陆方式时，初始隐藏错误提示和输入框错误红色边框
        // $(".error-msg:eq("+showIndex+")").hide();
    });
    /*输入框获得焦点去掉红框*/
    $(".login-content input").focus(function () {
        $(this).parent().removeClass("error");
    });
    $(".login-content input").keydown(function () {
        $(".error-msg").hide()
    });
    /*验证手机和邮箱合适*/
    $("#account").on("blur", function () {
        // var userAccount  = $(this).val();
        // if(regRules.phone.test(userAccount) === false && regRules.email.test(userAccount) === false){
        //     //验证用户名电话号码或者邮箱是否正确
        //     $("#login-normal .error-msg").show().html("请输入正确手机号码或邮箱");
        //     $(this).parent().addClass("error");
        //     return false;
        // }
        var userAccount = $(this).val();
        if (regRules.phone.test(userAccount) === false && regRules.email.test(userAccount) === false) {
//验证用户名电话号码或者邮箱是否正确
            $errorMsg.show().html("请输入正确手机号码或邮箱");
            $userAccount.parent().addClass("error");
            return false;
        }
    });
    $("#account-phone").on("blur", function () {
        var userAccount = $(this).val();
        if (regRules.phone.test(userAccount) === false) {
            //验证用户名电话号码或者邮箱是否正确
            $(".error-msg").show().html("请输入正确手机号码");
            $(this).parent().addClass("error");
            return false;
        }
    });

    //手机验证码点击后弹出弹窗，图片验证码正确后发送请求手机验证码发送请求，失败给出错误提示
    $("#get-phonecode").click(function () {
        var userAccount = $("#account-phone").val();
        if (regRules.phone.test(userAccount) === false) {
            //验证用户名电话号码或者邮箱是否正确
            $(".error-msg").show().html("请输入正确手机号码");
            $("#account-phone").parent().addClass("error");
            return false;
        } else {
            showLayerImgCode(userAccount, $(this));
        }
    });
    $(".login-submit").click(function () {
        var loginType = $("#login-type").val();
        if(loginType == 0){
            var account = $("#account").val();
            if (regRules.email.test(account) == false && regRules.phone.test(account) == false) {
                //验证用户名电话号码或者邮箱是否正确
                $(".error-msg").show().html("请输入正确手机号码或邮箱");
                $("#account-phone").parent().addClass("error");
                return false;
            }
            var password = $("#password").val();
            if(regRules.password.test(password) == false){
                $(".error-msg").show().html("请输入正确手机号码或邮箱");
                $(this).parent().addClass("error");
                return false;
            }
        }else if(loginType ==1){
            var phoneNumber = $("#account-phone").val();
            if (regRules.phone.test(phoneNumber) === false) {
                //验证用户名电话号码或者邮箱是否正确
                $(".error-msg").show().html("请输入正确手机号码或邮箱");
                $("#account-phone").parent().addClass("error");
                return false;
            }
            var phoneValidatecode = $("#phone-validatecode").val();
            if(regRules.phoneValidatecode.test(phoneValidatecode) == false){
                $(".error-msg").show().html("请输入正确短信验证码");
                $(this).parent().addClass("error");
                return false;
            }
        }

        // var phoneValidatecode = $(".phone-validatecode").val();
        // if (regRules.phoneValidatecode.test(phoneValidatecode) == false) {
        //     $(".error-msg").show().html("手机验证码错误");
        //     $(".phone-validatecode").addClass("error-msg");
        //     return false;
        // }
        $("#login_form").submit();
    });
    //尝试登陆5次失败后，出现验证码
    function showImgCode(imgUrl) {
        $(".login-wrap .img-check").removeClass("none").find("img").attr("src", imgUrl);
    }
}
/*******END登陆*******/

/*账号设置*/
//显示弹出框内部错误提示
function showLayerErrorMsg(errorText) {
    $(".error-msg").remove();
    if ($(".layui-layer-content:last .error-msg").length === 0) {
        $(".layui-layer-content").append("<div class='error-msg'>" + errorText + "</div>");
    } else {
        $(".layui-layer-content:last .error-msg").html(errorText).show();
    }
}
//隐藏弹出框内部错误提示
function hideLayerErrorMsg() {
    $(".error-msg").hide();
}
//账号设置   绑定修改设置成后提示
function showLayerSuccessMsg(successText) {
    $(".success-msg").html(successText).show();
    window.setTimeout(function () {
        $(".success-msg").fadeIn();
    }, 3000);
}
function hideLayerSuccessMsg() {
    $(".success-msg").hide();
}
//修改头像
$("#change-head").click(function () {
    var layerChangeHeadIndex = layer.open({
        type: 1,
        title: '修改头像',
        btn: ["确 定", "取 消"],
        shade: [0.8, '#131820'],
        offset: "30%",
        area: '400px',
        content: $(".layer-change-head"),
        yes: function () {
            var filePath = $("#change-head-file").val();
            alert(filePath);
            $.ajax({
                type: "post",
                url: "http://192.168.103.2/sethead/",
                data: {name: filePath},
                success: function (data) {
                    if (data == -1 || data == null) {
                        alert(上传头像失败);
                    } else {
                        layer.close(layerChangeHeadIndex);
                        showLayerSuccessMsg("修改头像成功");
                    }
                }
            });
        }
    })
    return false;
});
//修改头像 点击选择文件，后改变显示的路径
$("#change-head-file").on("change", function (e) {
    var maxsize = 2 * 1024 * 1024;
    var uploadImgSize,
        filePath = $(this).val();
    var imgFormat = filePath.slice(-3);
    //判断是否是规定格式图片
    var requireFormat = ["jpg", "gif", "png"];
    if (requireFormat.indexOf(imgFormat) === -1) {
        //错误提示，上传图片格式错误
        showLayerErrorMsg("对不起，上传文件格式错误，请重新上传");
        filePath = "选择一个文件";
        $(this).attr("data-format", false);
    } else {
        hideLayerErrorMsg();
        document.getElementsByClassName("btn-upload")[0].getElementsByTagName("input")[0].files[0].size;
        $(this).attr("data-format", true);
    }
    if (uploadImgSize > maxsize) {
        showLayerErrorMsg("对不起，上传文件需小于2M");
        filePath = "选择一个文件";
        $(this).attr("data-format", false);
    }
    // filePath = filePath !== "" ? filePath : "选择一个文件";
    $(".head-path").html(filePath);
});

//身份验证弹窗
$("#get-phone-validatecode").click(function () {
    // important,需要修改第一个参数啊；
    var bindPhoneNumber = $(".bind-phoneno").val();
    if(regRules.phone.test(bindPhoneNumber) == true){
        showLayerImgCode(bindPhoneNumber, $(this));
    }else {
        showLayerErrorMsg("填入正确手机号");
    }
});
$("#get-email-validatecode").click(function () {
    // important,需要修改第一个参数啊；
    var bindPhoneNumber = $(".bind-phoneno").val();
    showLayerImgCode(bindPhoneNumber, $(this));
});
//修改邮箱验证码
// $("#get-email-validatecode").click(function () {
//     // important,需要修改第一个参数啊；
//     var bindEmail = $(".bind-email").val();
//     $.ajax({
//         type:"post",
//         url:"",
//         data:{},
//         success:function (data) {
//
//         }
//     });
// });
//修改手机
$("#change-phone").click(function () {
    $(".layer-change-wrap input").val("");
    var layerChangePhoneIndex = layer.open({
        type: 1,
        title: "绑定手机",
        btn: ["确 定", "取 消"],
        area: "400px",
        content: $(".layer-change-phone"),
        yes: function () {
            var phoneNumber = $(".bind-phoneno").val(),
                phoneValidatecode = $(".bind-phone-validatecode").val();
            if (regRules.phone.test(phoneNumber) == false) {
                showLayerErrorMsg("请输入正确手机号");
            }else if(regRules.phoneValidatecode.test(phoneValidatecode) == false){
                showLayerErrorMsg("短信验证码错误");
            }else {
                hideLayerErrorMsg();
                $.ajax({
                    type: "post",
                    url: _ctx + "/setphone/"+phoneNumber+"/"+phoneValidatecode,
                    data: {},
                    success: function (data) {
                        if (data == 1) {
                            layer.close(layerChangePhoneIndex);
                            showLayerSuccessMsg("绑定手机成功");
                        } else if (data == 0) {
                            showLayerErrorMsg("没有发送过短信");
                        } else if (data == -1) {
                            showLayerErrorMsg("手机号码或者验证码输入错误");
                        } else if (data == -2) {
                            showLayerErrorMsg("短信验证码超时");
                        } else if (data == -3) {
                            showLayerErrorMsg("验证失败");
                        }else if (data == -6) {
                            showLayerErrorMsg("手机号码已被绑定");
                        }
                    }
                });
            }
        }
    });
});
//修改Email电子邮箱
$("#change-email").click(function () {
    $(".layer-change-wrap input").val("");
    var layerChangeEmailIndex = layer.open({
        type: 1,
        title: "绑定邮箱",
        btn: ["确 定", "取 消"],
        area: "400px",
        content: $(".layer-change-email"),
        yes:function () {
            var bindEmail = $(".bind-email").val(),
                imgValidatecode = $("#bind-emai-validatecode").val();
            if(regRules.email.test(bindEmail) == false){
                showLayerErrorMsg("请输入正确格式邮箱");
            }else if(regRules.imgValidatecode.test(imgValidatecode) == false){
                showLayerErrorMsg("验证码错误");
                return false;
            }else{
                hideLayerErrorMsg();
                $.ajax({
                    type: "post",
                    url: _ctx + "/setmail/" + bindEmail + "/" + imgValidatecode,
                    success: function (data) {
                        //1:邮件发送成功 -7：email地址输入错误 -8：没有验证码 -9：验证码错误
                        if(data == 1){
                            showLayerSuccessMsg("绑定邮箱成功");
                            layer.close(layerChangeEmailIndex);
                        }else if(data == 0 || data == -7 ){
                            showLayerErrorMsg("请输入正确格式邮箱");
                        }else if(data == -8){
                            showLayerErrorMsg("请输入验证码");
                        }else if(data == -9){
                            showLayerErrorMsg("验证码错误");
                        }else if (data == -6) {
                            showLayerErrorMsg("邮箱已被绑定");
                        }
                    }
                });
            }
        }
    });
});
//修改密码
$("#change-password").click(function () {
    $(".layer-change-wrap input").val("");
    var layerChangePwdIndex = layer.open({
        type: 1,
        title: "修改密码",
        btn: ["确 定", "取 消"],
        area: "400px",
        content: $(".layer-change-password"),
        yes: function () {
            var oldPassword = $("#old-pwd").val();
            var newPassword = $("#new-pwd").val();
            var renewPassword = $("#renew-pwd").val();
            if (regRules.password.test(oldPassword) == false) {
                showLayerErrorMsg("原密码格式错误");
            } else if (regRules.password.test(newPassword) == false) {
                showLayerErrorMsg("新密码格式错误");
            } else if (regRules.password.test(renewPassword) == false) {
                showLayerErrorMsg("新密码格式错误");
            } else if (newPassword != renewPassword) {
                showLayerErrorMsg("两次密码输入不一致");
            } else {
                hideLayerErrorMsg();
                $.ajax({
                    type: "post",
                    url: _ctx + "/setpwd/" + oldPassword + "/" + newPassword,
                    success: function (data) {
                        //1：修改成功 0：原密码验证失败 -1：原密码输入错误 -2：新密码输入错误
                        if(data == 1){
                            showLayerSuccessMsg("修改密码成功");
                            layer.close(layerChangePwdIndex);
                        }else if(data == 0 || data == -1 ){
                            showLayerErrorMsg("原密码错误");
                        }else if(data == -2){
                            showLayerErrorMsg("新密码格式错误");
                        }
                    }
                });
            }
        }
    });
});

//解除绑定处理
$(".remove-binding").on("click",function () {
    var $this = $(this);
    var bindType = $this.attr("bind-type");
    var bindTypeName = {
        weixin:"微信",
        qq:"QQ",
        weibo:"新浪微博"
    };
    var name = bindTypeName[bindType];
    layer.open({
        title:"解绑社交账号",
        btn:["确定","取消"],
        area:"500",
        content:"解绑"+name+"后您将无法使用"+name+"登录泰尔网信，您确定要解绑吗？",
        yes:function () {
            $("body").append("<form id='removebind' method='get' action='/user/removebind/"+bindType+"'></form>");
            $("#removebind").submit();
        }
    });
});


if($("#findpwd").length != 0){
    var accountRegisted = false;
    $("#account").blur(function () {
        registCheck.checkUserAccount();
        var userAccount = $(this).val();
        checkRegisterState(userAccount);
    });

    function checkRegisterState(userAccount) {
        var userAccountType = -1;
        if(regRules.phone.test(userAccount) == true){
            userAccountType = 1;
        }else if(regRules.email.test(userAccount) == true){
            userAccountType = 0;
        }
        if(userAccountType != -1){
            var requestUrl = _ctx + "/forget/check/"+ userAccountType +"/" + userAccount;
            $.ajax({
                type:"post",
                url:requestUrl,
                async: false,
                success:function (data) {
                    if(data == 1){
                        accountRegisted = true
                    }
                }
            });
        }
    }


    $("#img-validatecode").blur(function () {
        registCheck.checkImgCode();
    });

    $("#confirm-account").click(function(){
        if(registCheck.checkUserAccount() == false) return false;

        if (registCheck.emainAccount === true && registCheck.checkImgCode() === false) return false;

        if (registCheck.phoneAccount === true && registCheck.checkPhoneCode() === false) return false;

        checkRegisterState($("#account").val());

        if(accountRegisted == false) {
            $(".error-msg").show().html("账号不存在");
            return false;
        }

    });


    $("#findpwd input").keydown(function () {
        $(".error-msg").hide();
    }).focus(function () {
        $(this).parent().removeClass("error");
    });

    var jumpEmailHash = {
        'qq.com': 'http://mail.qq.com',
        'gmail.com': 'http://mail.google.com',
        'sina.com': 'http://mail.sina.com.cn',
        '163.com': 'http://mail.163.com',
        '126.com': 'http://mail.126.com',
        'yeah.net': 'http://www.yeah.net/',
        'sohu.com': 'http://mail.sohu.com/',
        'tom.com': 'http://mail.tom.com/',
        'sogou.com': 'http://mail.sogou.com/',
        '139.com': 'http://mail.10086.cn/',
        'hotmail.com': 'http://www.hotmail.com',
        'live.com': 'http://login.live.com/',
        'live.cn': 'http://login.live.cn/',
        'live.com.cn': 'http://login.live.com.cn',
        '189.com': 'http://webmail16.189.cn/webmail/',
        'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
        'yahoo.cn': 'http://mail.cn.yahoo.com/',
        'eyou.com': 'http://www.eyou.com/',
        '21cn.com': 'http://mail.21cn.com/',
        '188.com': 'http://www.188.com/',
        'foxmail.coom': 'http://www.foxmail.com'
    };
    (function () {
        var url = $("#validate-email").text().split('@')[1];
        jumpLink = jumpEmailHash[url] ? jumpEmailHash[url] : "http://mail."+ url;
        $("#jump-link").attr("href", jumpLink);
    })();

    //重置密码
    $("#reset-pwd").click(function () {
        if (registCheck.checkUserPassword() == false) return false;
        if (registCheck.checkUserRePassword() == false) return false;
        // $.ajax({});
    });
}


