$(`.tree-lable`).on('click',function(){
    $(this).next(".tree-subgroup").toggle(200);
});

$(`.tree-checkbox`).on('click',function(){
    let me = $(this);
    let chk = me.prop("checked");
    let sub = me.nextAll(".tree-subgroup");
    sub.show(200);
    sub.find('input').prop("checked",chk);
    let parent = me.parent().parent();
    if(parent.hasClass("tree-subgroup"))
        if(!chk){
            parent.prevAll(".tree-checkbox").prop("checked",false)
            $(`#allchk`).prop("checked",false)
        }
        else
            if(parent.find('input[type="checkbox"]').length === parent.find('input[type="checkbox"]:checked').length) parent.prevAll('.tree-checkbox').prop("checked",true);
    let all = $(`#classList`);
    $(`#allchk`).prop("checked",all.find(`input[type=checkbox]`).length === all.find('input[type="checkbox"]:checked').length);
});

$(`#allchk`).on("click",function(){
    $(`#classList input[type=checkbox]`).prop("checked",$(this).prop("checked"));
})