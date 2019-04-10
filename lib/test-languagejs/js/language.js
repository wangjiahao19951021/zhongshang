$(function(){
    // do something
    var script=document.createElement("script");
    script.type="text/javascript";
    script.src="http://www.microsoftTranslator.com/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**";
    // script.src="./lib/test-languagejs/js/translate.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    var value = sessionStorage.getItem("language");
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            if(value==="1"){
                Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 2000);
            }
        }
    }
    function onProgress(value) {
    }
    function onError(error) {
    }
    function onComplete() {
        $("#WidgetFloaterPanels").hide();
    }
    function onRestoreOriginal() {
    }
});

function translate(){
    var value = sessionStorage.getItem("language");
    if(value==="1"){
        sessionStorage.setItem("language", "0");
    }else{
        sessionStorage.setItem("language", "1");
    }
    window.location.reload();//刷新当前页面.
}

// 设置
// B = "none",
// Pb = "none",

// 去除颜色
// s.style.color = r;
// s.style.backgroundColor = m