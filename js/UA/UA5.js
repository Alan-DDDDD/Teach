export class UA5 extends baseObject {
    constructor() {
        super();
    }
    Init(){
        let me = this;
        me.ClassName = "UA5";
        me.defaultHideArea = ["L1","L2","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save"]//設定ToolBar按鈕狀態，預設全開
        me.InitL1();
        me.InitL2();
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        $(`#DATAGP_LIST`).on("click",".datagpinsert",me.Insert);
        
    }
    InitL1(){
        let me = this;
        //設定L區DataTable
        let columns = [
            { data: 'Datagp',title: "資料代號" },
            { data: 'Datagpnm',title: "中文" },
            { 
                data: null,title:"操作功能",orderable: false,
                render:function(data,type,row){
                    let html = `<button class="btn btn-primary datagpinsert" style="padding:0.125rem 0.375rem">新增</button>`
                    return html
                }
            }
        ]
        let columnDefs = []
        let buttons = []
        this.setTable(`DATAGP_LIST`,[],columns,columnDefs,buttons,function(e){
            let table = $(`#DATAGP_LIST`).DataTable();
            var rowData = table.row(e).data();
            if(rowData){
                pageaction.showLoading();
                pageaction.areashow("L2");
                me.SearchDetail(rowData);
                $(`#datagpname`).html(rowData.Datagpnm)
            }
        });
    }
    InitL2(){
        let columns = [
            { data: 'Dataid',title: "資料代號" },
            { data: 'Data',title: "中文" },
            { data: 'InvalidDt',title: "失效時間" },
        ]
        let columnDefs = []
        let buttons = []
        this.setTable(`DATAID_LIST`,[],columns,columnDefs,buttons,function(e){
            let table = $(`#DATAID_LIST`).DataTable();
            var rowData = table.row(e).data();
            if(rowData){
                pageaction.areahide("L1");
                pageaction.areashow("E");
                pageaction.ToolBarUnDisabled("save");
                currentview.BindDataForArea(rowData,"EArea");
            }
        });
    }
    SearchAfter(data){
        pageaction.hideLoading();
        this.BindDataList(`DATAGP_LIST`,data ?? null);//重新綁定DataTable資料
        pageaction.areashow("L1");
    }
    async Save(){
        pageaction.showLoading()
        let E = this.GetAreaData("EArea");
        let data = await t_Post("UA5/Save",this.ClassName,E);
        if(data.Status){
            this.alertMsg("儲存成功","Success")
            let table = $(`#DATAID_LIST`).DataTable();
            let tableData = table.rows().data().toArray();
            tableData = tableData.map(item => 
                item.Id === data.Data.Id ? { ...item, ...data.Data } : item
            );
            this.BindDataList("DATAID_LIST",tableData);
            pageaction.hideLoading();
        }else{
            this.alertMsg(data.Msg,"warning");
            pageaction.hideLoading();

        }
    }
    Insert(){
        currentview.ClearArea("EArea");//清空E區資料
        let table = $(`#DATAGP_LIST`).DataTable();
        var rowData = table.row($(this).parent()[0]).data();
        $(`#Id`).val(0);
        $(`#Datagp`).val(rowData.Datagp);
        $(`#Datagpnm`).val(rowData.Datagpnm);
        pageaction.ToolBarUnDisabled("save");//解鎖save按鈕
        pageaction.areahide("Q");//隱藏Q區
        pageaction.areahide("L1");//隱藏L區
        pageaction.areahide("L2");//隱藏L區
        pageaction.areashow("E");//展開E區
    }
    async SearchDetail(DATAGP){
        let data = await t_Post("UA5/SearchDetail",this.ClassName,DATAGP);
        if(data.Status){
            this.BindDataList(`DATAID_LIST`,data.Data ?? null)
        }
        pageaction.hideLoading();
    }
    SetDataValid(){
        let me = this;
        me.DataValid('Dataid','input',/[^A-Za-z0-9]/g);
    }
}
currentview = new UA5();