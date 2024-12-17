reList("UB1");
export class UB1 extends baseObject {
    constructor() {
        super();
    }

    //初始化UB1
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report"]//設定ToolBar按鈕狀態，預設全開
        me.InitL();//初始化L區
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        $(`#insert`).on("click",me.Insert.bind(this));
    }
    InitL(){
        //設定L區DataTable
        let columns = [
            { data: 'name',title: "姓名" },
            { data: 'phone',title: "行動電話"},
            { data: 'tax',title: "市話" },
            { data: 'email',title: "Email(電子信箱)"},
        ]
        let columnDefs = [
            {targets:[0],responsivePriority:1},
            {targets:[1],responsivePriority:2},
            {targets:[2],responsivePriority:3},
            {targets:[3],responsivePriority:4},
        ]
        let buttons = [
            { extend: 'excel', className: 'excelButton btn-primary disabled' },
            { extend: 'print', className: 'printButton btn-primary disabled' }
        ]
        this.setTable(`datatable`,[],columns,columnDefs,buttons,function(){
            //設定L區DataTable tr點擊動作
            let table = $(`#datatable`).DataTable();
            var rowData = table.row(this).data();
            console.log(rowData)
            if(rowData){   
                pageaction.areahide("L");
                pageaction.areashow("E");
                pageaction.ToolBarUnDisabled("save");
                $(`#name`).val(rowData.name);
                $(`#phone`).val(rowData.phone);
                $(`#emplid`).val(rowData.id);
                $(`#email`).val(rowData.email);
                $(`#tax`).val(rowData.tax);
                $(`#gender`).val("M")
            }
        });
    }
    remove(){
        super.Deconstructor();
        $(`#search`).unbind("click");
        $(`#save`).unbind("click");
        $(`#insert`).unbind("click");
    }
    Search(){
        if(super.verification("QArea")){
            pageaction.showLoading();
            console.log(this.GetAreaData("EArea"));
            let Data = [
                {id:0,name:'text',phone:'0977778111',tax:'0222151112',email:'0911511@gmail.com'},
                {id:1,name:'text',phone:'0977778112',tax:'0222151112',email:'0911511@gmail.com'},
                {id:2,name:'text',phone:'0977778113',tax:'0222151112',email:'0911511@gmail.com'},
                {id:3,name:'text',phone:'0977778114',tax:'0222151112',email:'0911511@gmail.com'},
                {id:4,name:'text',phone:'0977778115',tax:'0222151112',email:'0911511@gmail.com'},
                {id:5,name:'text',phone:'0977778116',tax:'0222151112',email:'0911511@gmail.com'},
                {id:6,name:'text',phone:'0977778117',tax:'0222151112',email:'0911511@gmail.com'},
                {id:7,name:'text',phone:'0977778118',tax:'0222151112',email:'0911511@gmail.com'},
                {id:8,name:'text',phone:'0977778119',tax:'0222151112',email:'0911511@gmail.com'},
                {id:9,name:'text',phone:'0977778120',tax:'0222151112',email:'0911511@gmail.com'},
                {id:10,name:'text',phone:'0977778121',tax:'0222151112',email:'0911511@gmail.com'},
                {id:11,name:'text',phone:'0977778122',tax:'0222151112',email:'0911511@gmail.com'},
                {id:12,name:'text',phone:'0977778123',tax:'0222151112',email:'0911511@gmail.com'},
                {id:13,name:'text',phone:'0977778124',tax:'0222151112',email:'0911511@gmail.com'},
                {id:14,name:'text',phone:'0977778125',tax:'0222151112',email:'0911511@gmail.com'},
                {id:15,name:'text',phone:'0977778126',tax:'0222151112',email:'0911511@gmail.com'},
                {id:16,name:'text',phone:'0977778127',tax:'0222151112',email:'0911511@gmail.com'},
                {id:17,name:'text',phone:'0977778128',tax:'0222151112',email:'0911511@gmail.com'},
                {id:18,name:'text',phone:'0977778129',tax:'0222151112',email:'0911511@gmail.com'},
                {id:19,name:'text',phone:'0977778130',tax:'0222151112',email:'0911511@gmail.com'},
                {id:20,name:'text',phone:'0977778131',tax:'0222151112',email:'0911511@gmail.com'},
                {id:21,name:'text',phone:'0977778132',tax:'0222151112',email:'0911511@gmail.com'},
                {id:22,name:'text',phone:'0977778133',tax:'0222151112',email:'0911511@gmail.com'},
                {id:23,name:'text',phone:'0977778134',tax:'0222151112',email:'0911511@gmail.com'},
                {id:24,name:'text',phone:'0977778135',tax:'0222151112',email:'0911511@gmail.com'},
                {id:25,name:'text',phone:'0977778136',tax:'0222151112',email:'0911511@gmail.com'},
                {id:26,name:'text',phone:'0977778137',tax:'0222151112',email:'0911511@gmail.com'},
                {id:27,name:'text',phone:'0977778138',tax:'0222151112',email:'0911511@gmail.com'},
                {id:28,name:'text',phone:'0977778139',tax:'0222151112',email:'0911511@gmail.com'},
                {id:29,name:'text',phone:'0977778140',tax:'0222151112',email:'0911511@gmail.com'},
                {id:30,name:'text',phone:'0977778141',tax:'0222151112',email:'0911511@gmail.com'},
                {id:31,name:'text',phone:'0977778142',tax:'0222151112',email:'0911511@gmail.com'},
                {id:32,name:'text',phone:'0977778143',tax:'0222151112',email:'0911511@gmail.com'},
                {id:33,name:'text',phone:'0977778144',tax:'0222151112',email:'0911511@gmail.com'},
                {id:34,name:'text',phone:'0977778145',tax:'0222151112',email:'0911511@gmail.com'}
            ]
            this.BindDataList(`datatable`,Data);//重新綁定DataTable資料
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
}
currentview = new UB1();