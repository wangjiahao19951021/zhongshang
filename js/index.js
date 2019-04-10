//swiper插件
var swiper = new Swiper('.swiper-container', {
    autoplay: 2000,
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

window.onload = function () {
    //title切换
    $(".index-nav ul li").click(function () {
        var idx = $(this).index();
        var view_href;
        console.log(idx);
        switch (idx) {
            case 0 : view_href =  "./index.html"; break;
            case 1 : view_href = "./about.html"; break;
            case 2 : view_href = "./information.html"; break;
            case 3 : view_href = "./business.html"; break;
            case 4 : view_href = "./team.html"; break;
            case 5 : view_href = "./alliance.html"; break;
        }
        window.location.href = view_href
    });


    // 动态设置li宽度 专家团队页面
   function team_lis() {
        var a = 100  / ($(".team_expert_row2 li").length +　0.1)
        $(".team_expert_row2 li").css("width", a + "%")
   }
   team_lis()

    // wow.js 下拉时的动态效果
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    });
    wow.init();


    // 点击了解更多跳转至关于中商
    $(".index-more").click(function () {
        window.location.href = "./about.html"
    })
        

    // 1的时候切换为英文 0的时候为中文  中英文切换逻辑
    $(".change_langa").on("click", "span", function () {
        var idxx = $(this).attr("data")     
        if (idxx == 1) {
            sessionStorage.setItem("language", 0);
            window.location.reload();     
        } else if (idxx == 2) {
            sessionStorage.setItem("language", 1);
            window.location.reload();
        }

        
        
                 
    })
    // 此处失效 因为页面刷新了所以使用sessionStorage
    if (sessionStorage.getItem("language") && sessionStorage.getItem("language") == 0) {
        $(".change_langa").find("span").eq(0).addClass("active") 
    } else if (sessionStorage.getItem("language") && sessionStorage.getItem("language") == 1) {
        $(".change_langa").find("span").removeClass("active")        
        $(".change_langa").find("span").eq(1).addClass("active")
    }

    $(".index-banner").click(function () {
        window.location.href = "./index.html"
    })

}

