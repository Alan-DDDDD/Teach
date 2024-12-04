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