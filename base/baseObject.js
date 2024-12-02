class baseObject {
    constructor(parameters) {
        pageaction.AreaBarClick();
        this.LoadBefore();
        this.Init();
        this.LoadAfter();
        this.DefLoadHide();
    }
    
    
    tablesetting = "/json/datatable-zh-HANT.json"
    defHideArea = [];
    Init(){
    }

    Deconstructor(){
        pageaction.AreaBarUnClick();
    }

    LoadBefore(){
    }

    LoadAfter(){
    }

    DefLoadHide(){
        $.each(this.defHideArea,(i,d)=>{
            pageaction.areahide(d);
        })
    }

    ToolBar(){

    }

    /**
    * @param {string} id - 要設定的Table Id
    * @param {Array} Data - 資料內容
    * @param {Array} Columns - 欄位標頭 [{data:'name',title:'姓名'},...]
    * @param {methods} trclick - 委派方法 function(){}
    */
    bindTable(id,Data,Columns,trclick){
        let table = $(`#${id}`)
        table.DataTable({
            data:Data,
            columns:Columns,
            language:{
                url: this.tablesetting
            },
            lengthMenu:[5,10,15,20]
        });

        table.css("cursor","pointer");

        if(trclick){
            table.on('click','tbody tr',trclick);
        }
    }
    
    /**
    @param {string} conditionArea -要驗證的區域id
    @return {boolean} -驗證狀態
    */
    verification(conditionArea){
        let result = true;
        let ob = $(`#${conditionArea}`).find("input,select,textarea");
        $.each(ob,(i,d)=>{
            let chk = $(d).next();
            if(chk.length == 0)
                chk = $(d).prev();
            if(chk.find('span').data("require") == true){
                let value = $(d).val()
                if(!value){
                    result = false;
                    $(d).css("border-color","red");
                }else{
                    $(d).css("border-color","#d9dee3");
                }
            }
        });
        return result;
    }
}