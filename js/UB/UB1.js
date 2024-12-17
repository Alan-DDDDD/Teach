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
                currentview.BindDataForArea(rowData,"EArea");
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
                {emplid:0,gender:"M",name:'text',phone:'0977778111',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:1,gender:"F",name:'text',phone:'0977778112',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:2,gender:"M",name:'text',phone:'0977778113',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:3,gender:"M",name:'text',phone:'0977778114',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:4,gender:"F",name:'text',phone:'0977778115',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:5,gender:"F",name:'text',phone:'0977778116',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:6,gender:"M",name:'text',phone:'0977778117',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:7,gender:"M",name:'text',phone:'0977778118',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:8,gender:"F",name:'text',phone:'0977778119',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:9,gender:"M",name:'text',phone:'0977778120',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:10,gender:"M",name:'text',phone:'0977778121',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:11,gender:"F",name:'text',phone:'0977778122',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:12,gender:"M",name:'text',phone:'0977778123',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:13,gender:"F",name:'text',phone:'0977778124',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:14,gender:"M",name:'text',phone:'0977778125',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:15,gender:"M",name:'text',phone:'0977778126',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:16,gender:"M",name:'text',phone:'0977778127',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:17,gender:"F",name:'text',phone:'0977778128',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:18,gender:"F",name:'text',phone:'0977778129',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:19,gender:"F",name:'text',phone:'0977778130',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:20,gender:"M",name:'text',phone:'0977778131',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:21,gender:"F",name:'text',phone:'0977778132',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:22,gender:"M",name:'text',phone:'0977778133',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:23,gender:"M",name:'text',phone:'0977778134',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:24,gender:"F",name:'text',phone:'0977778135',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:25,gender:"F",name:'text',phone:'0977778136',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:26,gender:"M",name:'text',phone:'0977778137',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:27,gender:"F",name:'text',phone:'0977778138',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:28,gender:"M",name:'text',phone:'0977778139',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:29,gender:"F",name:'text',phone:'0977778140',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:30,gender:"M",name:'text',phone:'0977778141',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:31,gender:"F",name:'text',phone:'0977778142',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:32,gender:"M",name:'text',phone:'0977778143',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:33,gender:"F",name:'text',phone:'0977778144',tax:'0222151112',email:'0911511@gmail.com'},
                {emplid:34,gender:"M",name:'text',phone:'0977778145',tax:'0222151112',email:'0911511@gmail.com'}
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