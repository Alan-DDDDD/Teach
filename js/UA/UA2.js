export class UA2 extends baseObject {
    constructor() {
        super();
    }
    //初始化UB1
    Init(){
        let me = this;
        me.ClassName = "UA2"
        me.defaultHideArea = ["E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save"]//設定ToolBar按鈕狀態，預設全開
        me.InitL();//初始化L區
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        $(`#insert`).on("click",me.Insert.bind(this));
    }
    InitL(){
        //設定L區DataTable
        let columns = [
            { data: 'id',title: "課程編號" },
            { data: 'phone',title: "名稱"},
            { data: 'tax',title: "老師" },
            { data: 'email',title: "人數" },
        ]
        super.setTable(`datatable`,[],columns,function(){
            //設定L區DataTable點擊動作
            //alert($($(this).find('td').get(2)).html())
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
    // Search(){
    //     if(super.verification("QArea")){
    //         pageaction.showLoading();
    //         let Data = [{name:'text',phone:'0977778111',tax:'0222151112',email:'0911511@gmail.com'}]
    //         super.BindDataList(`datatable`,Data);//重新綁定DataTable資料
    //         pageaction.areashow("L");
    //         pageaction.areahide("Q");
    //         setTimeout(function(){
    //             pageaction.hideLoading();
    //         },3000);
    //     }else{
    //         this.alertMsg("請輸入必填資料")
    //     }
    // }
    Save(){
        if(super.verification("EArea")){
            this.alertMsg("成功")
        }else{
            this.alertMsg("請輸入必填資料")
        }
    }
    Insert(){
        super.ClearArea("EArea");//清空E區資料
        pageaction.ToolBarUnDisabled("save");//解鎖save按鈕
        pageaction.areahide("Q");//隱藏Q區
        pageaction.areahide("L");//隱藏L區
        pageaction.areashow("E");//展開E區
    }
}
currentview = new UA2();