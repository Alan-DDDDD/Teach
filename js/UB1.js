$(`#QBar,#LBar,#EBar`).on(`click`,function(){
    let Area = $(this).attr("id");
    $(`#${Area.substring(0,1)}Area`).toggle(200);
});