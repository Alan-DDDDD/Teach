class baseObject {
    constructor(parameters) {
        pageaction.AreaBarClick();
        this.LoadBefore();
        this.Init();
        this.LoadAfter();
        this.DefaultLoadHide();
        this.DefaultLoadToolBarDisabled();
    }
    
    tablesetting = "../../json/datatable-zh-HANT.json";//DataTable使用語系(繁體中文)
    defaultHideArea = [];//預設隱藏區域
    defaultToolBarDisabled = [];//預設禁用ToolBar按鈕
    Init(){
    }

    Deconstructor(){
        pageaction.AreaBarUnClick();
    }

    LoadBefore(){
    }

    LoadAfter(){
    }

    SearchBefore(){
        console.log(this.GetAreaData("QArea"));
    }

    Search(){
        this.SearchBefore();
        this.SearchAfter();
    }

    SearchAfter(){
    }

    /**
     * 打包指定區域內input,select,textarea的資料
     * @param {string} Area -要取得資料區域的Id 
     * @returns {object} -傳回打包好的資料
     */
    GetAreaData(Area){
        let params = $(`#${Area}`).find("input,select,textarea");
        let data = {};
        $.each(params,(i,d)=>{
            data[$(d).attr("id")] = $(d).val();
        })
        return data;
    }

    DefaultLoadHide(){
        $.each(this.defaultHideArea,(i,d)=>{
            pageaction.areahide(d);
        })
    }

    DefaultLoadToolBarDisabled(){
        $.each(this.defaultToolBarDisabled,(i,d)=>{
            pageaction.ToolBarDisabled(d);
        })
    }

    ToolBar(){

    }

    /**
     * 設定DataTable
    * @param {string} id - 要設定的Table Id
    * @param {Array} Data - 資料內容
    * @param {Array} Columns - 欄位標頭 [{data:'name',title:'姓名'},...]
    * @param {methods} trclick - tr點擊委派方法 function(){}
    */
    setTable(id,Data,Columns,ColumnDefs,trclick){
        let table = $(`#${id}`)
        table.DataTable({
            data:Data,
            columns:Columns,
            language:{
                url: this.tablesetting
            },
            lengthMenu:[5,10,15,20],
            responsive: true,
            columnDefs:ColumnDefs,
            stateSave:false,
            layout: {
                topStart: {
                    buttons: ['excel', 'pdf', 'print']
                }
            }
        });
        
        table.css("cursor","pointer");

        if(trclick){
            table.on('click','tbody tr',trclick);
        }
    }
    
    /**
    * 驗證必填欄位
    * @param {string} conditionArea -要驗證的區域id
    * @return {boolean} -驗證狀態
    */
    verification(conditionArea){
        let result = true;
        let ob = $(`#${conditionArea}`).find("input,select,textarea");
        $.each(ob,(i,d)=>{
            let chk = $(d).next();
            if(chk.length == 0)
                chk = $(d).prev();
            if(chk.find('.require').length > 0){
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

    /**
     * 鎖定或解除鎖定指定區域input,select,textarea
     * @param {string} LockArea -要鎖住的區域id
     * @param {boolean} lock -鎖定狀態(true鎖定/false解除鎖定)
     */
    LockArea(LockArea,lock){
        let ob = $(`#${LockArea}`).find("input,select,textarea");
        if(lock){
            ob.attr("disabled","disabled");
        }else{
            ob.remvoeAttr("disabled");
        }
    }

    /**
     * @param {string} ClearArea -要清空的區域id
     */
    ClearArea(ClearArea){
        let ob = $(`#${ClearArea}`).find("input,select,textarea");
        $(ob).val("");
    }

    /**
     * 資料列表重新綁定資料
     * @param {string} List -綁定的資料列表Id
     * @param {Array} Data -要綁定的資料
     */
    BindDataList(List,Data){
        let table = $(`#${List}`).DataTable();
        table.clear();
        table.rows.add(Data);
        table.draw();
    }

    /***
     * 系統提示訊息
     * @param {string} Msg -輸入提示字串
     * @param {string} alertDegree -警示程度["success","primary","secondary","warning","danger"](預設值"secondary")
     * @param {number} keepTime -持續時間(單位"秒")
     */
    alertMsg(Msg,alertDegree,keepTime){
        let teachalert = $(`#teachalert`);
        let div = document.createElement('div');
        div.role = "alert";
        div.classList.add("alert",`alert-${alertDegree ?? "secondary"}`,"alert-dismissible");
        div.innerHTML = `${Msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        teachalert.append(div);
        setTimeout(function(){
            div.remove();
        },keepTime ? keepTime*1000:3000);
    }
}