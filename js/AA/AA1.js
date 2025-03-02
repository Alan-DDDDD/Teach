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
        $(`#SavebuildComid`).on("click",async function(e){
            let data = $(`#buildComidCYID`).val();
            let Comid = $(`#Comid`).val();
            let Data = await t_Post(`AA1/BuildComid`,this.ClassName,{CYID:data,Comid:Comid});
            if(Data.Status){
                $(`#Comid`).val(Data.Data);
                $(`#buildCloseBtn`).click();
            }else{
                this.alertMsg(Data.Msg,"danger");
            }

        }.bind(this));
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
        this.setTable(`datatable`,[],columns,columnDefs,buttons,function(e){
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
            let data = await t_Post(`AA1/Search`,this.ClassName,this.GetAreaData("QArea"));
            this.BindDataList(`datatable`,data.Data);//重新綁定DataTable資料
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
            pageaction.showLoading();
            let E = this.GetAreaData("EArea")
            let Data = await t_Post("AA1/Save",this.ClassName,E);
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
    SetDataValid(){
        let me = this;
        me.DataValid('Comid','input',/[^A-Z0-9]/g);
        me.DataValid('Account','input',/[^A-Za-z0-9]/g);
        me.DataValid('Password','input',/[^A-Za-z0-9]/g);
    }
}
currentview = new AA1();