class pageaction {
    constructor() {
    }
    static areahide(Area){
        $(`#${Area}Area`).hide(200);
    }
    static areashow(Area){
        $(`#${Area}Area`).show(200);
    }
    static AreaBarClick(){
        $(`#view .AreaBar`).on('click',function(){
            let me = this;
            let id = $(me).parent().attr("id");
            $(`#${id}Area`).toggle(200);
        });
    }
    static AreaBarUnClick(){
        $(`#view .AreaBar`).unbind('click');
    }

    static ToolBarDisabled(id){
        $(`#${id}`).attr("disabled","disabled");
    }

    static ToolBarUnDisabled(id){
        $(`#${id}`).removeAttr("disabled");
    }
    static showLoading(){
        document.querySelector('.loading-overlay').style.display = 'flex';
    }

    static hideLoading(){
        document.querySelector('.loading-overlay').style.display = 'none';
    }
}