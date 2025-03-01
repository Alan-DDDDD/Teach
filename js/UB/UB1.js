export class UB1 extends baseObject {
    constructor() {
        super();
    }

    //初始化UB1
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report"]//設定ToolBar按鈕狀態，預設全開
        me.ClassName = "UB1"
        me.InitL();//初始化L區
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        $(`#insert`).on("click",me.Insert.bind(this));
        $(`#datatable`).on("click",".data_detaile",me.DataDetail);
    }
    InitL(){
        //設定L區DataTable
        let columns = [
            { 
                data: null,title:`<input class="form-check-input all_checkbox" type="checkbox"/>選取`,
                orderable: false,
                render: function(data,type,row){
                    let html = `<input class="form-check-input list_checkbox" type="checkbox" `;
                    html += data == 'Y' ? "checked":"";
                    html += `/>`
                    return html;
                }
            },
            { data: 'Name',title: "姓名" },
            { data: 'Phone',title: "行動電話" },
            { data: 'Tax',title: "市話" },
            { data: 'Email',title: "Email(電子信箱)" },
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
            {targets:[4],responsivePriority:6},
            {targets:[5],responsivePriority:2},
        ]
        let buttons = [
            { extend: 'excel', className: 'excelButton btn-primary disabled' },
            { extend: 'print', className: 'printButton btn-primary disabled' }
        ]
        this.setTable(`datatable`,[],columns,columnDefs,buttons,function(e){
            //設定L區DataTable tr點擊動作
        });
    }
    remove(){
        super.Deconstructor();
        $(`#search`).unbind("click");
        $(`#save`).unbind("click");
        $(`#insert`).unbind("click");
    }
    async Search(){
        if(super.verification("QArea")){
            pageaction.showLoading();
            let Data = await t_Post("UB1/Search",this.ClassName,this.GetAreaData("QArea"));
            if(Data.Data){
                this.BindDataList(`datatable`,Data.Data ?? null);//重新綁定DataTable資料
            }else{
                this.alertMsg(Data.Msg,"success")
            }
            pageaction.areashow("L");
            pageaction.areahide("Q");
            $(`.dt-buttons`).find(`button`).removeClass('disabled')
            pageaction.hideLoading();
        }else{
            this.alertMsg("請輸入必填資料","danger")
        }
    }
    async Save(){
        if(super.verification("EArea")){
            let data = this.GetAreaData("EArea");
            let response = await t_Post(`${this.ClassName}/DoSave`,this.ClassName,data);
            if(response.Data[0]){
                this.alertMsg("儲存成功","success")
                let table = $(`#datatable`).DataTable();
                let tableData = table.rows().data().toArray();
                tableData = tableData.map(item => 
                    item.Emplid === response.Data[0].Emplid ? { ...item, ...response.Data[0] } : item
                );
                this.BindDataList("datatable",tableData);
            }
        }else{
            this.alertMsg("請輸入必填資料","danger")
        }
    }
    Insert(){
        this.ClearArea("EArea");//清空E區資料
        pageaction.ToolBarUnDisabled("save");//解鎖save按鈕
        pageaction.areahide("Q");//隱藏Q區
        pageaction.areahide("L");//隱藏L區
        pageaction.areashow("E");//展開E區
        $(`#EMPLID`).removeAttr(`disabled`);
        $(`#ACCOUNT`).removeAttr(`disabled`);
        $(`#PASSWORD`).removeAttr(`disabled`);
    }

    DataDetail(){
        let table = $(`#datatable`).DataTable();
        var rowData = table.rows($(this).parent()[0]).data()[0];
        if(rowData){   
            pageaction.areahide("L");
            pageaction.areashow("E");
            pageaction.ToolBarUnDisabled("save");
            currentview.BindDataForArea(rowData,"EArea");
            $(`#EMPLID`).attr(`disabled`,"disabled");
            $(`#ACCOUNT`).attr(`disabled`,"disabled");
            $(`#PASSWORD`).attr(`disabled`,"disabled");
        }
    }
}
currentview = new UB1();