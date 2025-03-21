export class AB2 extends baseObject {
    constructor() {
        super();
    }
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report","entry","invalid","done"]//設定ToolBar按鈕狀態，預設全開
        me.ClassName = "AB2"
        me.InitL();//初始化L區
        //me.InitEL();//初始化EL區
        //me.InitTree();
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        $(`#insert`).on("click",me.Insert.bind(this));
        $(`#datatable`).on("click",".data_detaile",me.DataDetail);
        $(`#OrderDetail`).on("click",".minus",function(){
            if(me.EditLock)
                return;
            else
            me.minus(this);
        });
        $(`#OrderDetail`).on("click",".plus",function(){
            if(me.EditLock)
                return;
            else
            me.plus(this);
        });
        $(`#SavebuildM`).on("click",()=>{me.AddOrder("M")});
        $(`#SavebuildP`).on("click",()=>{me.AddOrder("P")});
        $(`#Discount`).on(`change`,me.CalculateTotal);
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
        if(super.verification("EArea")){
            pageaction.showLoading();
            let E = this.GetAreaData("EArea");
            let EL = $(`#OrderDetail`).DataTable().rows().data().toArray();
            let P = {
                    Order : JSON.stringify(E),
                    OrderDetail : JSON.stringify(EL)
            }
            let Data = await t_Post("AB1/Save",this.ClassName,P);
            if(Data.Status){
                this.alertMsg("儲存成功","Success")
                let table = $(`#datatable`).DataTable();
                let tableData = table.rows().data().toArray();
                tableData = tableData.map(item => 
                    item.Comid === Data.Data.Comid ? { ...item, ...Data.Data } : item
                );
                this.BindDataList("datatable",tableData);
                pageaction.hideLoading();
            }else{
                this.alertMsg(Data.Msg,"danger")
            }
        }else{
            this.alertMsg("請輸入必填資料","danger")
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
        if(rowData){   
            pageaction.areahide("L");
            pageaction.areashow("E");
            pageaction.ToolBarUnDisabled("save");
            currentview.BindDataForArea(rowData,"EArea");
            currentview.BindDataList("OrderDetail",rowData.Detail);
            rowData.Status > 1 ? 
                currentview.LockArea("EArea",true):
                currentview.LockArea("EArea",false);
            switch(true){
                case (rowData.Status == 1):
                    currentview.LockArea("EArea",false);
                    pageaction.ToolBarUnDisabled("entry");
                    pageaction.ToolBarUnDisabled("invalid");
                    pageaction.ToolBarUnDisabled("done");
                    break;
                case (1 < rowData.Status && rowData.Status < 5):
                    currentview.LockArea("EArea",true);
                    pageaction.ToolBarDisabled("entry");
                    pageaction.ToolBarUnDisabled("invalid");
                    pageaction.ToolBarUnDisabled("done");
                    break;
                case (rowData.Status == 5):
                    currentview.LockArea("EArea",true);
                    pageaction.ToolBarUnDisabled("entry");
                    pageaction.ToolBarDisabled("invalid");
                    pageaction.ToolBarUnDisabled("done");
                    break;
                default:
                    currentview.LockArea("EArea",true);
                    pageaction.ToolBarDisabled("entry");
                    pageaction.ToolBarDisabled("invalid");
                    pageaction.ToolBarDisabled("done");
                    break;
            }
        }
    }

    SetDataValid(){
        let me = this;
        // me.DataValid('Comid','input',/[^A-Z0-9]/g);
        // me.DataValid('Account','input',/[^A-Za-z0-9]/g);
        // me.DataValid('Password','input',/[^A-Za-z0-9]/g);
    }
}
currentview = new AB2();