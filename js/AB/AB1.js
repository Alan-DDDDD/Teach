export class AB1 extends baseObject {
    constructor() {
        super();
    }

    //初始化UB1
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report"]//設定ToolBar按鈕狀態，預設全開
        me.ClassName = "AB1"
        me.InitL();//初始化L區
        me.InitEL();//初始化EL區
        me.InitModuleTree();
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        $(`#insert`).on("click",me.Insert.bind(this));
        $(`#datatable`).on("click",".data_detaile",me.DataDetail);
        $(`#OrderDetail`).on("click",".minus",me.minus);
        $(`#OrderDetail`).on("click",".plus",me.plus);
        $(`#SavebuildM`).on("click",()=>{me.AddOrder("M")});
        $(`#SavebuildP`).on("click",()=>{me.AddOrder("P")});
        $(`#Review`).attr("disabled","disabled");
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
            { data: 'Name',title: "訂單編號" },
            { data: 'Contact',title: "客戶名稱" },
            { data: 'ConfirmDt',title: "簽約日" },
            { data: 'Salesid',title: "負責業務" },
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
            {width: '10%',targets:[1],responsivePriority:3},
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
    InitEL(){
        let columns = [
            { data: 'Mpid',title: "產品編號" },
            { data: 'Name',title: "產品名稱" },
            { data: 'Price',title: "單價" },
            { data: 'Count',title: "數量" },
            { data: 'Amount',title: "總價" },
            { 
                data: null,title:"操作功能",orderable: false,
                render:function(data,type,row){
                    let html = `<i class="bx bx-minus minus" style="padding:0.125rem 0.375rem"></i>
                                <i class="bx bx-plus plus" style="padding:0.125rem 0.375rem"></i>`
                    return html
                }
            }
        ]
        let Data = [
            {Mpid:"xxxxxxxxx1",Name:"測試產品名稱1",Price:5000,Count:1,Amount:5000},
            {Mpid:"xxxxxxxxx2",Name:"測試產品名稱2",Price:3000,Count:1,Amount:3000},
            {Mpid:"xxxxxxxxx3",Name:"測試產品名稱3",Price:8000,Count:1,Amount:8000},
            {Mpid:"xxxxxxxxx4",Name:"測試產品名稱4",Price:5000,Count:4,Amount:20000},
        ]
        let columnDefs = [
            {width: '5%',targets:[0],responsivePriority:1},
            {width: '5%',targets:[1],responsivePriority:3},
            {width: '5%',targets:[2],responsivePriority:4},
            {width: '5%',targets:[3],responsivePriority:5},
            {width: '5%',targets:[4],responsivePriority:6},
            {width: '5%',targets:[5],responsivePriority:2},
        ]
        let buttons = []
        this.setTable(`OrderDetail`,Data,columns,columnDefs,buttons,function(e){
        });
    }
    async InitModuleTree(){
        let data = await t_Post("AB1/ModuleTree",this.ClassName);
        if(data.Status){
            $(`#ModuleTree`).html(generateTreeHtml(data.Data,true));
        }else{
            this.alertMsg(data.Msg,"danger");
        }
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

    minus(){
        let table = $(`#OrderDetail`).DataTable();
        let tableData = table.rows().data().toArray();
        let rowData = table.rows($(this).parent()[0]).data()[0];
        let deletetype = rowData.Count == 1;
        if(deletetype){
            if(confirm("是否確認刪除?")){
                table.row($(this).parents('tr')).remove().draw();
                tableData = table.rows().data().toArray();
            }
        } else{
            rowData.Count--;
            rowData.Amount = rowData.Price * rowData.Count;
            tableData = tableData.map(item => 
                item.Mpid === rowData.Mpid ? { ...item, ...rowData } : item
            );
        }
        currentview.BindDataList("OrderDetail",tableData);
        currentview.CalculateTotal();
    }

    plus(){
        let table = $(`#OrderDetail`).DataTable();
        let tableData = table.rows().data().toArray();
        let rowData = table.rows($(this).parent()[0]).data()[0];
        rowData.Count++;
        rowData.Amount = rowData.Price * rowData.Count;
        tableData = tableData.map(item => 
            item.Mpid === rowData.Mpid ? { ...item, ...rowData } : item
        );
        currentview.BindDataList("OrderDetail",tableData);
        currentview.CalculateTotal();
    }

    CalculateTotal(){
        let table = $(`#OrderDetail`).DataTable();
        let tableData = table.rows().data().toArray();
        let amount = 0;
        $.each(tableData,(i,d)=>{
            amount += d.Amount;
        })
        let discount = $(`#Discount`).val() || 0;
        $(`#Amount`).val(amount-discount);
    }

    AddOrder(type){
        let table = $(`#OrderDetail`).DataTable();
        let tableData = table.rows().data().toArray();
        let chklist
        let data = [];
        switch(type){
            case "M":
                chklist = $(`#ModuleTree input[type=checkbox]`);
                break;
            case "P":
                chklist = $(`#ProductTree input[type=checkbox]`);
                break;
            default:
                break;
        }
        $.each(chklist,(i,d)=>{
            let $d = $(d);
            if($d.prop('checked')){
                data.push({
                    Mpid : $d.data('id'),
                    Name : $d.data('name'),
                    Price : $d.data('price'),
                    Count : "1",
                    Amount : $d.data('price')
                });
            }
        })
        tableData.push(...data);
        console.log(tableData);
        this.BindDataList("OrderDetail",tableData);
        this.CalculateTotal()
    }

    SetDataValid(){
        let me = this;
        // me.DataValid('Comid','input',/[^A-Z0-9]/g);
        // me.DataValid('Account','input',/[^A-Za-z0-9]/g);
        // me.DataValid('Password','input',/[^A-Za-z0-9]/g);
    }
}
currentview = new AB1();