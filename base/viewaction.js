//[object action]-tree List action 
$(`.tree-group`).on('click',`.tree-lable`,function(){
    $(this).next(".tree-subgroup").toggle(200);
    //$(this).parent().toggleClass("expanded");
});

$(`.tree-group`).on('click',`.tree-checkbox`,function(){
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

function generateTreeHtml(nodes,border) {
    let tree = [];

    nodes.forEach(node => {
        let div = document.createElement(`div`);
        div.classList.add(`tree-item`);
        if(border) div.classList.add(`list-group-item`);
        let input = document.createElement(`input`);
        input.classList.add(`form-check-input`,`me-1`,`tree-checkbox`);
        input.type = 'checkbox';
        input.value = '';
        input.setAttribute('data-id', node.Id);
        if(node.Parameters){
            node.Parameters.forEach(param=>{
                input.setAttribute(`data-${param.Name}`, param.Value);
            });
        }
        div.append(input);
        let span = document.createElement(`span`);
        span.textContent = node.Name;
        if(node.Subgroup && node.Subgroup.length > 0){
            span.classList.add(`tree-lable`)
        }
        div.append(span);

        if (node.Subgroup && node.Subgroup.length > 0) {
            let subdiv = document.createElement(`div`);
            subdiv.classList.add(`row`,`tree-subgroup`);
            $(subdiv).html(generateTreeHtml(node.Subgroup));
            div.append(subdiv);
        }
        tree.push(div);
    });
    return tree
}


// // 當用戶輸入關鍵字時，觸發過濾函數
// document.getElementById("st_search").addEventListener("input", function (event) {
//     let key = this.value.toLowerCase();
//     let items = document.querySelectorAll(".tree-lable")
//     console.log(items)
//     if(key){
//         items.forEach(function(item){
//             if($(items).text().toLowerCase() == key){
//                 if($(item).parent().parent().hasClass("tree-subgroup")){
//                     $(item).next(".tree-subgroup").show(200);
//                 }
//             }else{
//                 $(item).parent().hide(200)
//             }
//         })
//     }else{
//         items.forEach(function(item){
//             console.log($(item).parent().parent())
//             if(!$(item).parent().parent().hasClass("tree-subgroup")){
//                 $(item).next(".tree-subgroup").show(200);
//             }
//         })
//     }
// });

// function checkParent(item){
//     return $(item).parent().parent().hasClass("tree-subgroup");
// }