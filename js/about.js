$(function () {
    ;(function () {
        let video = document.getElementById("videoss")
        // 视频操作
        $(".video_play").click(function () {
            video.style.display = "block"
            video.play()
            video.controls = false;
        })
        // 点击到视频上时
        $("#videoss").click(function () {
            video.style.display = "none"
            video.pause()
        })
        // 监听视频播放完毕
        video.addEventListener("ended", function () {
            video.style.display = "none"
            video.pause()
        }, false)
    }());
})