$(function () {
    if (sessionStorage.getItem("information_idx")) {
        for (var i = 0; i < $(".wrap-active li").length; i ++) {
          $(".wrap-active li").eq(i).addClass("vis_hide")
        }
        var idx = sessionStorage.getItem("information_idx")
        $(".wrap-active li").eq(idx).removeClass("vis_hide")
      }
})