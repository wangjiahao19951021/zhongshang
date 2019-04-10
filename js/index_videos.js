$(function () {
        // 视频js 此处使用了自执行函数 不污染全局
        ;(function () {
            let flag = false;
            // 此处逻辑为视频播放4s后隐藏 鼠标悬停4s隐藏控制栏
            document.getElementById("video").onmousemove = mouse
            document.getElementById("video").onmouseover = mouse
            let isMove = false,
            timer = null;
            function mouse (){
                isMove = true;
                clearTimeout(timer);
                console.log(isMove); // 移动时
                $(".video_box").css("visibility", "visible")
                $(".index-header").css("visibility", "visible")
                $("body").css("cursor", "auto")  
                timer = setTimeout(function(){
                    $(".index-header").css("visibility", "hidden")
                    $(".video_box").css("visibility", "hidden")
                    $("body").css("cursor", "none")
                    isMove = false;
                    console.log(isMove); // 静止后
                }, 2000);                                 
            }
            $(".index_icon").click(function () {
                $("#video").hide().show()
                // 隐藏系统默认控制样式栏
                video.controls=false;         
                document.getElementById('video').play()
                $(".video_box").css({"visibility": "visible"})
                scroll_bar()
            })
            // 点击video暂停
            $("#video").click(function () {
                document.getElementById('video').pause()
                $("#video").hide();
                $(".index-more").show();
                $(".index_icon").hide()
                $(".video_left_zan").removeClass("glyphicon-pause").addClass("glyphicon-play")
                flag = true;
                $(".video_box").css("visibility", "visible")
                $(".index-header").css("visibility", "visible")
                $("body").css("cursor", "auto")  
                document.getElementById("video").onmousemove = null
                document.getElementById("video").onmouseover = null
                clearTimeout(timer);
            })
            // 点击底部控制栏的暂停时操作
            $(".video_left_zan").click(function () {
                // 暂停
                if (!flag) {
                    document.getElementById('video').pause()
                    $("#video").hide();
                    $(".index-more").show();
                    $(".index_icon").hide();
                    $(this).removeClass("glyphicon-pause").addClass("glyphicon-play")
                    flag = true;     
                    $(".video_box").css("visibility", "visible")
                    $(".index-header").css("visibility", "visible")
                    $("body").css("cursor", "auto")  
                    clearTimeout(timer);                    
                    document.getElementById("video").onmousemove = null
                    document.getElementById("video").onmouseover = null
                                                      
                } else {
                // 播放
                    document.getElementById('video').play();
                    $("#video").show()
                    $(".index-more").hide();
                    $(".index_icon").show()
                    $(this).removeClass("glyphicon-play").addClass("glyphicon-pause")
                    flag = false; 
                    document.getElementById("video").onmousemove = mouse
                    document.getElementById("video").onmouseover = mouse
                }
            })
            // 点击快进按钮
            $(".video_left_jia").click(function () {
                var video = document.getElementById('video')
                var now_time = video.currentTime;
                // 设置视频快进5s
                new_time = now_time + 5;
                //新值赋值回去
                video.currentTime = new_time;
            })
             // 点击后退按钮
             $(".video_left_jian").click(function () {
                var video = document.getElementById('video')
                var now_time = video.currentTime;
                // 设置视频后退5s
                new_time = now_time - 5;
                //新值赋值回去
                video.currentTime = new_time;
            })
            // 视频播放完毕
            var videos = document.getElementById('video')
            videos.addEventListener('ended', function () {  
                $("#video").hide();
                $(".index-more").show();
                $(".index_icon").hide();
                flag = true;     
                clearTimeout(timer);                    
                document.getElementById("video").onmousemove = null
                document.getElementById("video").onmouseover = null      
            }, false);
            // 滚动条
            function scroll_bar() {
                // 获取视频长度            
                var videos = document.getElementById('video')
                var times_end = videos.duration
                var times_end1 = videos.duration.toFixed(0)
                var times_end2 = secondsFormat(times_end1)
                // 截取小数点后2位 toFixed(2)
                $(".time_end").text(times_end2);
                setInterval(() => {
                    var times_start = videos.currentTime
                    var times_start1 = times_start.toFixed(0)
                    var times_start2 = secondsFormat(times_start1)
                    $(".time_start").text(times_start2)
                    // 小数转换为百分数
                    var times_bar = times_start / times_end
                    function toPercent(point){
                        var percent = Number( point * 100 );
                        percent+="%";
                        return percent;
                    }
                    $(".video_cbox_container").css("width", toPercent(times_bar))
                }, 60)
            }
            // 时间转换
            function secondsFormat( s ) { 
                var day = Math.floor( s/ (24*3600) ); // Math.floor()向下取整 
                var hour = Math.floor( (s - day*24*3600) / 3600); 
                var minute = Math.floor( (s - day*24*3600 - hour*3600) /60 ); 
                var second = s - day*24*3600 - hour*3600 - minute*60; 
                // return day + "天"  + hour + "时" + minute + "分" + second + "秒";
                if (hour < 10) {
                    hour =  "0" + hour
                } 
                if (minute< 10) {
                    minute = "0" + minute
                }
                if (second< 10) {
                    second = "0" + second
                }
                return  hour + "：" + minute + "：" + second + ""; 
            }
            // 进度条点击的操作
            function scroll_bar_click(e) {
                console.log(1)
                // 获取盒子的长度
                var scroll_box_length = document.getElementsByClassName("video_c_box")[0].offsetWidth
                // 获取盒子距离左侧距离
                var scroll_box_left = document.getElementsByClassName("video_c_box")[0].offsetLeft
                // 获取鼠标偏移量
                var scroll_left = e.pageX - scroll_box_left
                var scroll_left_width = scroll_left / scroll_box_length
                // 此处转换百分比从新计算内层盒子渲染
                function toPercent(point){
                    var percent = Number( point * 100 );
                    percent+="%";
                    return percent;
                }
                $(".video_cbox_container").css("width", toPercent(scroll_left_width));
                // 视频跳转
                var video = document.getElementById('video');
                video.currentTime = video.duration * scroll_left_width
            }
            // 视频点击跳转
            // 鼠标按下
            document.getElementsByClassName("video_c_box")[0].addEventListener("mousedown", scroll_bar_click, false)
            // document.getElementsByClassName("video_c_box")[0].addEventListener("mousemove", scroll_bar_click, false)
            // 鼠标抬起
            document.getElementsByClassName("video_c_box")[0].addEventListener("mouseup", scroll_bar_click, false)
            // 点击音量操作
            let flag_volume = false
            $(".video_centers>div:eq(3)").click(function () {
                var video = document.getElementById("video")
                // muted 禁音
                if (!flag_volume) {
                    video.muted = true
                    flag_volume = true
                    $(".jinyin1").hide()
                    $(".jinyin2").show()
                } else {
                    video.muted = false
                    flag_volume = false
                    $(".jinyin1").show()
                    $(".jinyin2").hide()
                }
            })

            // 鼠标悬停4s隐藏控制栏
            // ;(function () {
                // document.getElementById("video").onmousemove = mouse
                // document.getElementById("video").onmouseover = mouse
                // let isMove = false,
                // timer = null;
                // function mouse (){
                //     isMove = true;
                //     clearTimeout(timer);
                //     // console.log(isMove); // 移动时
                //     $(".video_box").css("visibility", "visible")
                //     $(".index-header").css("visibility", "visible")
                //     $("body").css("cursor", "auto")  
                //     timer = setTimeout(function(){
                //         $(".index-header").css("visibility", "hidden")
                //         $(".video_box").css("visibility", "hidden")
                //         $("body").css("cursor", "none")
                //         isMove = false;
                //         // console.log(isMove); // 静止后
                //     }, 2000);                                 
                    
                // }
            // } ())

            
        }());
})