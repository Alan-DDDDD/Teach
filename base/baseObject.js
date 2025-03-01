class baseObject {
    constructor(parameters) {
        pageaction.AreaBarClick();
        this.LoadBefore();
        this.Init();
        this.CheckAuth();
        this.LoadAfter();
        this.setDropDownList();
        this.DefaultLoadHide();
        this.DefaultLoadToolBarDisabled();
        this.SetDataValid;
    }
    
    tablesetting = "../../json/datatable-zh-HANT.json";//DataTable使用語系(繁體中文)
    defaultHideArea = [];//預設隱藏區域
    defaultToolBarDisabled = [];//預設禁用ToolBar按鈕
    ClassName;
    CurrentUser;
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
        // console.log(this.GetAreaData("QArea"));
    }

    async Search(action){
        pageaction.showLoading();
        this.SearchBefore();
        if(this.GetAreaData("QArea") && this.verification("QArea")){
            pageaction.areahide("Q");
            let data = await t_Post(`${this.ClassName}/Search`,this.ClassName,this.GetAreaData("QArea"));
            try{
                if(data.Status){
                    this.SearchAfter(data.Data);
                }else{
                    this.alertMsg(data.Msg,"danger")
                }
            }
            catch{
                this.alertMsg("系統錯誤","danger")
                pageaction.hideLoading();
            }
        }
        else{
            pageaction.hideLoading();
        }
    }

    SearchAfter(data){
        pageaction.hideLoading();
    }

    /**
     * 打包指定區域內input,select,textarea的資料
     * @param {string} Area -要取得資料區域的Id 
     * @returns {object} -傳回打包好的資料
     */
    GetAreaData(Area){
        let params = $(`#${Area}`).find("input,select,textarea");
        if(params.length == 0){
            return null;
        }
        let data = {};
        $.each(params,(i,d)=>{
            let $el = $(d);
            let id = $el.attr("id");
            
            // 判斷是否是 checkbox
            if ($el.attr("type") === "checkbox") {
                // 如果是 checkbox，使用 .prop('checked') 判斷是否被選中
                data[id] = $el.prop('checked') ? "Y":"N";
            } else {
                // 其他表單元素使用 .val()
                data[id] = $el.val();
            }
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
    setTable(id,Data,Columns,ColumnDefs,Buttons,trclick){
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
            layout:{
                top1Start:{
                    buttons:Buttons
                }
            }
        });
        
        table.css("cursor","pointer");

        if(trclick){
            table.on('click','tbody td',function(){
                var beforeContent = window.getComputedStyle(this, '::before').getPropertyValue('content');
                var hasButton = this.querySelector('button') == null;
                var hasAnchor = this.querySelector('a') == null;
                if(beforeContent == 'none' && hasButton && hasAnchor){
                    trclick(this);
                }
            });
        }

        $(`#${id}`).on("change",".list_checkbox",function(){
            ListCheckBox(id,this);
        });
        $(`#${id}`).on(`change`,".all_checkbox",function(){
            AllCheck(id,this);
        });

        return table;
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
            let chk = $(d).next().find('.require');
            if(chk.length == 0)
                chk = $(d).prev().find('.require');
            if(chk.length == 0 && $(d).parent().hasClass('input-group'))
                chk = $(d).parent().prev().find('.require');
            if(chk.length > 0){
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
        div.classList.add("alert",`alert-${alertDegree.toLowerCase() ?? "secondary"}`,"alert-dismissible");
        div.innerHTML = `${Msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        teachalert.append(div);
        setTimeout(function(){
            div.remove();
        },keepTime ? keepTime*1000:3000);
    }

    /**
     * 將物件綁定到指定區域的欄位
     * @param {object} data -需要綁定的資料物件 
     * @param {string} area -指定綁定區域
     */
    BindDataForArea(data,area){
        $.each(data, function(key, value) {
            key = key.toUpperCase();
            var $input = $(`#${area} input[name="${key}"], select[name="${key}"], textarea[name="${key}"]`);
            if ($input.length) {
                switch (true) {
                    case $input.attr('type') === 'text':
                        $input.val(value);
                        break;
                    case $input.attr('type') === 'date':
                        $input.val(value);
                        break;
                    case $input.attr('type') === 'datetime-local':
                        $input.val(value);
                        break;
                    case $input.attr('type') === 'password':
                        $input.val(value);
                        break;
                    case $input.attr('type') === 'checkbox':
                        $input.prop('checked', value === 'Y' || value === true);
                        break;
                    case $input.is('select'):
                        $input.val(value);
                        break;
                    case $input.is('textarea'):
                        $input.val(value);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    async setDropDownList(){
        let ddls = $(`.t_ddl`);
        let data = await t_Post(`${this.ClassName}/GetDDLDataSource`,this.ClassName);
        if(data.Data){
            $.each(ddls,(i,d)=>{
                let dataSource = $(d).data("ddlds");
                $(d).empty().append(`<option value="">請選擇</option>`);
                $.each(data.Data[dataSource], function(index, option) {
                    $(d).append(
                        $('<option>', {value: option.Value,text: option.Text})
                    );
                });
            })
        }
    }

    settingViewAuth(module){
        if(module){
            let Auth = module.EMPLModules.filter(x=>x.Functionid === this.ClassName)[0];
            if(Auth && Auth.Mval){
                switch(Auth.Mval){
                    case "R":
                        $(`.toolbar #insert, .toolbar #save`).remove();
                        $(`.EditArea`).find(`input,select,textarea`).attr(`disabled`,`disabled`);
                        break;
                    case "N":
                        $(`#view`).html("無使用權限");
                        break;
                    case "E":
                        $(`.toolbar #insert`).remove();
                        break;
                    case "I":
                    case "A":
                    default:
                        $(`.EditArea`).find(`input,select,textarea`).removeAttr(`disabled`);
                        break;
                }
            }
        }
    }

    async CheckAuth(){
        if(!sessionStorage.getItem("jwttoken")){
            sessionStorage.setItem("OriginalPage",this.ClassName);
            window.open("../../html/base/login.html","_self");
        }
        else{
            CurrentFunc = this.ClassName;
            let userid = sessionStorage.getItem("emplid");
            let data = await t_Post(`${this.ClassName}/LoginUser?userid=${userid}`,this.ClassName)
            if(data.Status){
                this.CurrentUser = data.Data;
                this.settingViewAuth(this.CurrentUser.ModuleAuth)
                $(`#nav_username`).html(this.CurrentUser.UserName);
                $(`#nav_level`).html(this.CurrentUser.LevelName);
            }
        }
    }

    DataValid(ElementId,Html,Pattern){
        document.getElementById(ElementId).addEventListener(Html.toLowerCase(), function(event) {
            this.value = this.value.replace(Pattern, '');
          });
    }
    
    SetDataValid(){

    }
}