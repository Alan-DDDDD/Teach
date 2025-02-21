reList("AA1");
export class AA1 extends baseObject {
    constructor() {
        super();
    }

    //初始化UB1
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report"]//設定ToolBar按鈕狀態，預設全開
        me.ClassName = "AA1"
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
            { data: 'Name',title: "客戶名稱" },
            { data: 'Contact',title: "聯絡人" },
            { data: 'Phone',title: "聯絡電話" },
            { data: 'SysEDt',title: "系統到期日" },
            { 
                data: null,title:"操作功能",orderable: false,
                render:function(data,type,row){
                    let html = `<button class="btn btn-primary data_detaile" style="padding:0.125rem 0.375rem">明細</button>`
                    return html
                }
            }
        ]
        let columnDefs = [
            {width: '8%',targets:[0],responsivePriority:1},
            {width: '30%',targets:[1],responsivePriority:3},
            {width: '10%',targets:[2],responsivePriority:4},
            {width: '10%',targets:[3],responsivePriority:5},
            {width: '15%',targets:[4],responsivePriority:6},
            {width: '10%',targets:[5],responsivePriority:2},
        ]
        let buttons = [
            { extend: 'excel', className: 'excelButton btn-primary disabled' },
            { extend: 'print', className: 'printButton btn-primary disabled' }
        ]
        this.setTable(`datatable`,[],columns,columnDefs,buttons,function(){
            //設定L區DataTable tr點擊動作
            // let table = $(`#datatable`).DataTable();
            // var rowData = table.row(this).data();
            // if(rowData){
            //     pageaction.areahide("L");
            //     pageaction.areashow("E");
            //     pageaction.ToolBarUnDisabled("save");
            //     currentview.BindDataForArea(rowData,"EArea");
            // }
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
            // let Data = [
            //     {
            //         CHK:"Y",
            //         ACCESS_TOKEN
            //         : 
            //         "qw51dq3561fwe2f31er5t634451rg2",
            //         ACCOUNT
            //         : 
            //         "haochung@gmail.com",
            //         ADDRESS
            //         : 
            //         "新北市土城區中央路三段178號1樓",
            //         API_KEY
            //         : 
            //         "we54r62351f23erf1w536yk516rss",
            //         COMID
            //         : 
            //         "A001",
            //         CONTACT
            //         : 
            //         "溫東宜",
            //         DIRECTOR
            //         : 
            //         "溫東宜",
            //         EMAIL
            //         : 
            //         "haochung@gmail.com",
            //         GRADE_CHK
            //         : 
            //         "Y",
            //         INCLASS_CHK
            //         : 
            //         "N",
            //         LINE_CHN_ID
            //         : 
            //         "ef56w4r5tw4e45561gt56g1k.5,uy",
            //         LINE_MSG_CHK
            //         : 
            //         "Y",
            //         MEMO
            //         : 
            //         "測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設測試測設",
            //         NAME
            //         : 
            //         "浩群文理補習班",
            //         NOTIFY_CHK
            //         : 
            //         "N",
            //         OUTCLASS_CHK
            //         : 
            //         "Y",
            //         OWNER
            //         : 
            //         "溫東宜",
            //         PASSWORD
            //         : 
            //         "qwe154565",
            //         PAY_CHK
            //         : 
            //         "N",
            //         PHONE
            //         : 
            //         "0911111111",
            //         SYS_E_DT
            //         : 
            //         "2026-02-17",
            //         SYS_S_DT
            //         : 
            //         "2025-02-18"}
            // ]
            let data = await t_Post(`AA1/Search`,this.ClassName,this.GetAreaData("QArea"))
            //Data = await t_Post("UB1/Search",this.ClassName,this.GetAreaData("QArea"));
            this.BindDataList(`datatable`,data.Data);//重新綁定DataTable資料
            pageaction.areashow("L");
            pageaction.areahide("Q");
            $(`.dt-buttons`).find(`button`).removeClass('disabled')
            setTimeout(function(){
                pageaction.hideLoading();
            },3000);
        }else{
            this.alertMsg("請輸入必填資料","danger")
        }
    }
    Save(){
        if(super.verification("EArea")){
            this.alertMsg("儲存成功","success")
            console.log(this.GetAreaData("EArea"));
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
    }

    DataDetail(){
        let table = $(`#datatable`).DataTable();
        var rowData = table.rows($(this).parent()[0]).data()[0];
        if(rowData){   
            pageaction.areahide("L");
            pageaction.areashow("E");
            pageaction.ToolBarUnDisabled("save");
            currentview.BindDataForArea(rowData,"EArea");
        }
    }
}
currentview = new AA1();