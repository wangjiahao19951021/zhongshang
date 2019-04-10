// 只允许一个window.onlocd 因此此处使用 $(function() {})
$(function () {
  sessionStorage.setItem("information_hover_item", 0)
  $(".wrap-news").addClass("hide");
  // title切换
 $(".main-tabNews li").click(function () {
    var idx = $(this).index();
    for (var i = 0; i < $(".wrap-active li").length; i ++) {
      $(".wrap-active li").eq(i).addClass("vis_hide")
    }
    $(".wrap-active li").eq(idx).removeClass("vis_hide")
    $(".infor_box").eq(idx).removeClass("hide").siblings(".infor_box").addClass("hide")

    // 此处因为文章详情需要跳转页面，所以记录下状态
    // sessionStorage.setItem("information_idx", idx)
    $(".wrap-news").addClass("hide");
    sessionStorage.setItem("information_hover_item", idx)
  })

  // 点击文章跳转至详细信息
  $(".wrap-movement").delegate(".row", "click", function () {
    $(".wrap-news").removeClass("hide");
    // console.log($(this).parents(".wrap-movement").attr("data-id"))
    var id = $(this).parents(".main-movement").attr("data-id")

    for (var i = 0; i < $(".infor_box").length; i++) {
      $(".infor_box").eq(i).addClass("hide")
    }

    $.ajax({
      url: "http://test91.ykmimi.com/news/getDetailNews",
      type: "post",
      data: {
        id: id
      },
      success: function (data) {
        console.log(data)
        $(".title-news h2").text(data.news.title)
        $(".title-news p").text(data.news.author)
        $(".cont-news").html(data.news.content)
      }
    })
  })

  // 此处为文章详情页面初始化判断一下title状态
  // if (sessionStorage.getItem("information_idx")) {
  //   for (var i = 0; i < $(".wrap-active li").length; i ++) {
  //     $(".wrap-active li").eq(i).addClass("vis_hide")
  //   }
  //   var idx = sessionStorage.getItem("information_idx")
  //   $(".wrap-active li").eq(idx).removeClass("vis_hide")
  // }
  
  // title hover事件
  $(".main-tabNews li").hover( function () {
    var idx = $(this).index();
    for (var i = 0; i < $(".wrap-active li").length; i ++) {
      $(".wrap-active li").eq(i).addClass("vis_hide")
    }
    sessionStorage.getItem("information_hover_item")
    $(".wrap-active li").eq(idx).removeClass("vis_hide")
    $(".wrap-active li").eq(sessionStorage.getItem("information_hover_item")).removeClass("vis_hide")
  }, function () {
    var idx = $(this).index();
    for (var i = 0; i < $(".wrap-active li").length; i ++) {
      $(".wrap-active li").eq(i).addClass("vis_hide")
    }
    sessionStorage.getItem("information_hover_item")
    $(".wrap-active li").eq(sessionStorage.getItem("information_hover_item")).removeClass("vis_hide")
  })



  ;(function () {

      // 每页多少条数据
      let pageSize = 4
      // moren当前第几页
      let pageNum = 1;
      // 总条数
      let totalData
      // init (pageNum, pageSize)
      init()
      function init () {
          // wayListData(pageNum, pageSize)
          wayListData((data) => {
              page(data.total)
              $(".infor_box_new1").empty()
              var str;
              for (var i = 0; i <　data.rows.length; i++) {
              var $div = $('<div class="main-movement" data-id=" '+  data.rows[i].id + ' "></div>');
              var $row = $('<div class="row"></div>').appendTo($div);
              var $img_movement =$('<div class="col-md-4 img-movement"></div>').appendTo($row)
              if (data.rows[i].top == 1) {
                var $isTop =$('<span class="isTop">置顶</span>').appendTo($img_movement)
              }
              var $img1 = $('<img src='+  data.rows[i].spic + ' width="100%" height="100%">').appendTo($img_movement)
              var $cont_movement = $('<div class="col-md-8 cont-movement"></div>').appendTo($row)
              var $h3_title = $('<h3 class="h3-title">'+  data.rows[i].title + '</h3>').appendTo($cont_movement)
              var $p_cont = $('<p class="p-cont">'+  data.rows[i].brief + '</p>').appendTo($cont_movement)
              var $fl = $('<span class="fl">'+  data.rows[i].update_time + '</span>').appendTo($cont_movement)
              var $fr = $('<span class="fr">'+  data.rows[i].author + '</span>').appendTo($cont_movement)

              
              $(".infor_box_new1").append($div)
              }
          })
      }
      // 点击行业要闻
      $(".main-tabNews li").click(function () {
        pageNum = 1;
        wayListData((data) => {
          page(data.total)
          $(".infor_box_new1").empty()
          var str;
          for (var i = 0; i <　data.rows.length; i++) {
          var $div = $('<div class="main-movement" data-id=" '+  data.rows[i].id + ' "></div>');
          var $row = $('<div class="row"></div>').appendTo($div);
          var $img_movement =$('<div class="col-md-4 img-movement"></div>').appendTo($row)
          if (data.rows[i].top == 1) {
            var $isTop =$('<span class="isTop">置顶</span>').appendTo($img_movement)
          }
          var $img1 = $('<img src='+  data.rows[i].spic + ' width="100%" height="100%">').appendTo($img_movement)
          var $cont_movement = $('<div class="col-md-8 cont-movement"></div>').appendTo($row)
          var $h3_title = $('<h3 class="h3-title">'+  data.rows[i].title + '</h3>').appendTo($cont_movement)
          var $p_cont = $('<p class="p-cont">'+  data.rows[i].brief + '</p>').appendTo($cont_movement)
          var $fl = $('<span class="fl">'+  data.rows[i].update_time + '</span>').appendTo($cont_movement)
          var $fr = $('<span class="fr">'+  data.rows[i].author + '</span>').appendTo($cont_movement)
          $(".infor_box_new1").append($div);
          }
      })
      })
      
      function page(totalData) {
          $('.M-box11').pagination({
              mode: 'fixed',
              // 一共多少条多少数据
              totalData: totalData,
              // 显示几条数据
              showData: pageSize,      
              callback: function (api) {
                  pageNum = api.getCurrent()
                  console.log(pageNum)
                  wayListData((data) => {
                    // page(data.total)
                    $(".infor_box_new1").empty()
                    var str;
                    for (var i = 0; i <　data.rows.length; i++) {
                    var $div = $('<div class="main-movement" data-id=" '+  data.rows[i].id + ' "></div>');
                    var $row = $('<div class="row"></div>').appendTo($div);
                    var $img_movement =$('<div class="col-md-4 img-movement"></div>').appendTo($row)
                    if (data.rows[i].top == 1) {
                      var $isTop =$('<span class="isTop">置顶</span>').appendTo($img_movement)
                    }
                    var $img1 = $('<img src='+  data.rows[i].spic + ' width="100%" height="100%">').appendTo($img_movement)
                    var $cont_movement = $('<div class="col-md-8 cont-movement"></div>').appendTo($row)
                    var $h3_title = $('<h3 class="h3-title">'+  data.rows[i].title + '</h3>').appendTo($cont_movement)
                    var $p_cont = $('<p class="p-cont">'+  data.rows[i].brief + '</p>').appendTo($cont_movement)
                    var $fl = $('<span class="fl">'+  data.rows[i].update_time + '</span>').appendTo($cont_movement)
                    var $fr = $('<span class="fr">'+  data.rows[i].author + '</span>').appendTo($cont_movement)
      
                    
                    $(".infor_box_new1").append($div)
                    }
                })
              }
          }); 
      }

  function wayListData(callback) {
    $.ajax({
        url: "http://test91.ykmimi.com/news/getLimitNews",
        type: "post",
        data: {
          page: pageNum,
          rows: pageSize,
          section: sessionStorage.getItem("information_hover_item"),
        },
        success: function (data) {
          // console.log(data);
          callback(data)
        }
    })
  }
  } ())

})