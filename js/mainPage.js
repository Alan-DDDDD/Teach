var currentview;
$(`#pageList .PU,.PA`).on(`click`,function(event){
    //event.preventDefault();
    let me = $(this);
    let id = me.attr("id");
    //if(liff.isLoggedIn()){
        //reList(id);
        //reView(id);
        caseid = null;
    //}else{
        //liff.login();
    //}
})

function reList(page){
    let lis = $(`#pageList li`);
    $.each(lis,(i,d)=>{
        $(d).removeClass("active");
        $(d).removeClass("open");
    });
    $(`#`+page).addClass("active")
    $(`#`+page).parent().parent().addClass("open")
    $(`#`+page).parent().parent().addClass("active")
}

async function reView(page){
    let view = $(`#view`);
    var r = await fetch("../html/"+page+".html");
    var t = await r.text();
    if(currentview != undefined)
        currentview.remove();
    view.html(t);
    //if(!currentview || currentview.constructor.name != page){
        reJs(page);
    //}
}

function reJs(page){
    let js = $(`.myjs`);
    $(js).remove(); 
    let script = document.createElement('script');
    script.src = "../js/"+page+".js?v=" + Math.random();
    script.type = "module";
    script.classList.add("myjs");
    document.body.appendChild(script);
}

//公告顯示
function startAnnouncement() {
    const announcementList = document.getElementById('announcement-list');
    const items = announcementList.children;
    const itemHeight = items[0].offsetHeight; // 每行的高度
    let index = 0;

    setInterval(() => {
      // 計算新的位置
      index = (index + 1) % items.length; // 循環顯示
      announcementList.style.top = `-${index * itemHeight}px`;
    }, 10000); // 每 10 秒切换一次
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', startAnnouncement);