$(`#QBar,#LBar,#EBar`).on(`click`,function(){
    let Area = $(this).attr("id");
    $(`#${Area.substring(0,1)}Area`).toggle(200);
});

// $(`#datatable`).DataTable();
$(`#datatable`).DataTable({
    columns: [ //列的標題一般是從DOM中讀取（你還可以使用這個屬性為表格創建列標題)
        { data: 'name',title: "姓名" },
        { data: 'phone',title: "行動電話"},
        { data: 'tax',title: "市話" },
        { data: 'email',title: "Email(電子信箱)" },
        ],
    language: {
        url: "/json/datatable-zh-HANT.json" 
     }
})

$(`#datatable`).on('click','tbody tr',function(){
    //alert($($(this).find('td').get(2)).html())
});

$(`#datatable`).css("cursor","pointer")
AreaHide('EArea')
function AreaHide(Area){
    $(`#${Area}`).hide(200);
}