export class AB2 extends baseObject {
    constructor() {
        super();
    }
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["report","entry","invalid","done"]//設定ToolBar按鈕狀態，預設全開
        me.ClassName = "AB2"
        me.InitL();//初始化L區
        $(`#search`).on("click",me.Search.bind(this));
        $(`#datatable`).on("click",".data_detaile",me.DataDetail);
        $(`#payG`).on(`click`,me.Save);
        $(`#confirm`).on(`click`,me.Save);
        me.LockArea("EArea",true);
    }

    SetSingleTag(){
        $(`#Status`).attr(`disabled`,`disabled`);
        $(`#Review`).attr("disabled","disabled");
    }

    InitL(){
        let columns = [
            { data: 'Cbid',title: "繳費單號" },
            { data: 'CustName',title: "客戶名稱" },
            { data: 'Estimate',title: "預計繳費日" },
            { data: 'SalesName',title: "負責業務" },
            { 
                data: null,title:"操作功能",orderable: false,
                render:function(data,type,row){
                    let html = `<button class="btn btn-primary data_detaile" style="padding:0.125rem 0.375rem">明細</button>`
                    return html
                }
            }
        ]
        let columnDefs = [
            {targets:[0],responsivePriority:1},
            {targets:[1],responsivePriority:3},
            {targets:[2],responsivePriority:4},
            {targets:[3],responsivePriority:5},
            {targets:[4],responsivePriority:2},
        ]
        let buttons = [
            { extend: 'excel', className: 'excelButton btn-primary disabled' },
            { extend: 'print', className: 'printButton btn-primary disabled' }
        ]
        this.setTable(`datatable`,[],columns,columnDefs,buttons,function(e){
        });
    }
    remove(){
        super.Deconstructor();
        $(`#search`).unbind("click");
        $(`#save`).unbind("click");
        $(`#insert`).unbind("click");
    }
    async Save(){
        console.log(this)
        if(super.verification("EArea")){
            pageaction.showLoading();
            let confirmmem = $(`#ConfirmMemo`).val();
            let status = $(this).data("type");
            if(status == "Y" && (!confirmmem || confirmmem == "")){
                currentview.alertMsg("請輸入必填資料","danger");
                pageaction.hideLoading();
                return;
            }
            $(`#Memo`).val(confirmmem);
            if($(`#Status`).val() == status){
                pageaction.hideLoading();
                return;
            }
            $(`#Status`).val(status);
            let E = currentview.GetAreaData("EArea");
            let Data = await t_Post("AB2/Save",currentview.ClassName,E);
            if(Data.Status){
                currentview.alertMsg("儲存成功","Success")
                let table = $(`#datatable`).DataTable();
                let tableData = table.rows().data().toArray();
                tableData = tableData.map(item => 
                    item.Cbid === Data.Data.Cbid ? { ...item, ...Data.Data } : item
                );
                currentview.BindDataList("datatable",tableData);
                currentview.ViewStatus(Data.Data);
                pageaction.hideLoading();
            }else{
                currentview.alertMsg(Data.Msg,"danger")
            }
        }else{
            currentview.alertMsg("請輸入必填資料","danger")
        }
    }
    SearchAfter(data){
        this.BindDataList("datatable",data);
        pageaction.areashow("L");//展開E區
        pageaction.hideLoading();
    }
    Insert(){
        this.ClearArea("EArea");//清空E區資料
        this.LockArea("EArea",false);
        this.BindDataList("OrderDetail",[]);
        $(`#Status`).val("1");
        pageaction.ToolBarUnDisabled("save");//解鎖save按鈕
        pageaction.areahide("Q");//隱藏Q區
        pageaction.areahide("L");//隱藏L區
        pageaction.areashow("E");//展開E區
    }

    DataDetail(){
        let table = $(`#datatable`).DataTable();
        var rowData = table.rows($(this).parent()[0]).data()[0];
        currentview.ViewStatus(rowData)
    }

    SetDataValid(){
        let me = this;
        // me.DataValid('Comid','input',/[^A-Z0-9]/g);
        // me.DataValid('Account','input',/[^A-Za-z0-9]/g);
        // me.DataValid('Password','input',/[^A-Za-z0-9]/g);
    }

    ViewStatus(Data){
        if(Data){   
            pageaction.areahide("L");
            pageaction.areashow("E");
            currentview.BindDataForArea(Data,"EArea");
            switch(Data.Status){
                case "N":
                    pageaction.ToolBarUnDisabled("payY");
                    pageaction.ToolBarUnDisabled("payG");
                    pageaction.ToolBarUnDisabled("confirm");
                    break;
                default:
                    pageaction.ToolBarDisabled("payY");
                    pageaction.ToolBarDisabled("payG");
                    pageaction.ToolBarDisabled("confirm");
                    break;
            }
        }
    }
}
currentview = new AB2();