//[object action]-tree List action 
$(`.tree-lable`).on('click',function(){
    $(this).next(".tree-subgroup").toggle(200);
});

$(`.tree-checkbox`).on('click',function(){
    let me = $(this);
    let sub = me.nextAll(".tree-subgroup");
    sub.show(200);
    sub.find('input').prop("checked",me.prop("checked"));
    $.each(me.parents().filter(".tree-subgroup"),(i,d)=>{
        $(d).prevAll('.tree-checkbox').prop("checked",$(d).find('input[type="checkbox"]').length === $(d).find('input[type="checkbox"]:checked').length);
    })
    $(`#allchk`).prop("checked",$(`#classList`).find(`input[type=checkbox]`).length === $(`#classList`).find('input[type="checkbox"]:checked').length);
});

$(`#allchk`).on("click",function(){
    $(`#classList input[type=checkbox]`).prop("checked",$(this).prop("checked"));
})