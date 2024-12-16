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
            { data: 'email',title: "Email(電子信箱)" },
        ]
        let columnDefs = [
            {targets:[0],responsivePriority:1},
            {targets:[1],responsivePriority:2},
            {targets:[2],responsivePriority:3},
            {targets:[3],responsivePriority:4},
        ]
        this.setTable(`datatable`,[],columns,columnDefs,function(){
            //設定L區DataTable tr點擊動作
            pageaction.areahide("L");
            pageaction.areashow("E");
            pageaction.ToolBarUnDisabled("save");
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
            let Data = [{name:'text',phone:'0977778111',tax:'0222151112',email:'0911511@gmail.com'}]
            this.BindDataList(`datatable`,Data);//重新綁定DataTable資料
            pageaction.areashow("L");
            pageaction.areahide("Q");
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
