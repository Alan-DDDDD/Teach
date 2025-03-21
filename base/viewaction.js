//------------------------------------------------------------------------------------------------------
//[object action]-tree List action 
$(`.tree-group`).on('click',`.tree-lable`,function(){
    $(this).next(".tree-subgroup").toggle(200);
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
//------------------------------------------------------------------------------------------------------
//Datatables checkbox action
function AllCheck(datatables,checkbox){
    let table = $(`#${datatables}`).DataTable();
    var rowData = table.rows().data();
    if(rowData.length > 0){
        $.each(rowData,(i,d)=>{
            d["check"] = $(checkbox).prop('checked') ? "Y":"N";
        });
        table.rows().nodes().to$().find('.list_checkbox').prop('checked', $(checkbox).prop('checked'));
    }
}

function ListCheckBox(datatables,checkbox){
    let table = $(`#${datatables}`).DataTable();
    let rowData = table.rows($(checkbox).parent()[0]).data()[0];
    if(rowData){
        rowData["check"] = $(checkbox).prop('checked') ? "Y":"N";
    }
    
    let allData = table.rows().data();
    let chks = [];
    if(allData){
        $.each(allData,(i,d)=>{
            chks.push(d["check"] === "Y");
        })
        if(allData.length === chks.filter(x=>x===true).length){
            $('.all_checkbox').prop('checked', true).prop('indeterminate', false);
        }else if(allData.length === chks.filter(x=>x===false).length){
            $('.all_checkbox').prop('checked', false).prop('indeterminate', false);
        }else{
            $('.all_checkbox').prop('checked', false).prop('indeterminate', true);
        }
    }
}
//------------------------------------------------------------------------------------------------------