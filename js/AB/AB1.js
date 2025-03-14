export class AB1 extends baseObject {
    constructor() {
        super();
    }
    //初始化UB1
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report","entry","invalid","done"]//設定ToolBar按鈕狀態，預設全開
        me.ClassName = "AB1"
        me.InitL();//初始化L區
        me.InitEL();//初始化EL區
        me.InitTree();
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
        $(`#invalid`).on("click",async function(){
            let data = await t_Post("AB1/GiveUp",me.ClassName,{Coid:$(`#Coid`).val()});
            if(data.Status){
                me.LockArea("EArea",true);
                me.alertMsg("儲存成功","Success");
            }
        });
        $(`#entry`).on(`click`,async function(){
            let data = await t_Post("AB1/InputCase",me.ClassName,{Coid:$(`#Coid`).val()});
            if(data.Status){
                me.LockArea("EArea",true);
                me.alertMsg("儲存成功","Success");
            }
        })
        $(`#done`).on(`click`,async function(){
            let data = await t_Post("AB1/")
        })
    }

    SetSingleTag(){
        $(`#Status`).attr(`disabled`,`disabled`);
        $(`#Review`).attr("disabled","disabled");
    }

    InitL(){
        //設定L區DataTable
        let columns = [
            // { 
            //     data: null,title:`<input class="form-check-input all_checkbox" type="checkbox"/>選取`,
            //     orderable: false,
            //     render: function(data,type,row){
            //         let html = `<input class="form-check-input list_checkbox" type="checkbox" `;
            //         html += data == 'Y' ? "checked":"";
            //         html += `/>`
            //         return html;
            //     }
            // },
            { data: 'Coid',title: "訂單編號" },
            { data: 'CustName',title: "客戶名稱" },
            { data: 'ConfirmDt',title: "簽約日" },
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
            {width:'5%',targets:[0],responsivePriority:1},
            {targets:[1],responsivePriority:3},
            {targets:[2],responsivePriority:4},
            {targets:[3],responsivePriority:5},
            {targets:[4],responsivePriority:2},
            //{width: '10%',targets:[5],responsivePriority:2},
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
                    let html = `<button class="bx bx-minus minus" style="padding:0.125rem 0.375rem"></button>
                                <button class="bx bx-plus plus" style="padding:0.125rem 0.375rem"></button>`
                    return html
                }
            }
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
        this.setTable(`OrderDetail`,[],columns,columnDefs,buttons,function(e){
        });
    }
    async InitTree(){
        let data = await t_Post("AB1/Tree",this.ClassName);
        if(data.Status){
            $(`#ModuleTree`).html(generateTreeHtml(data.Data.Module,true));
            $(`#ProductTree`).html(generateTreeHtml(data.Data.Product,true));
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

    minus(btn){
        let table = $(`#OrderDetail`).DataTable();
        let tableData = table.rows().data().toArray();
        let rowData = table.rows($(btn).parent()[0]).data()[0];
        let deletetype = rowData.Count == 1;
        if(deletetype){
            if(confirm("是否確認刪除?")){
                table.row($(btn).parents('tr')).remove().draw();
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

    plus(btn){
        let table = $(`#OrderDetail`).DataTable();
        let tableData = table.rows().data().toArray();
        let rowData = table.rows($(btn).parent()[0]).data()[0];
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
        this.CalculateTotal();
    }

    SetDataValid(){
        let me = this;
        // me.DataValid('Comid','input',/[^A-Z0-9]/g);
        // me.DataValid('Account','input',/[^A-Za-z0-9]/g);
        // me.DataValid('Password','input',/[^A-Za-z0-9]/g);
    }
}
currentview = new AB1();