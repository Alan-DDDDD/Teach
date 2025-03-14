export class AA3 extends baseObject {
    constructor() {
        super();
    }
    Init(){
        let me = this;
        me.ClassName = "AA3"
        me.defaultToolBarDisabled = ["save"]//設定ToolBar按鈕狀態，預設全開
        me.InitL();//初始化L區
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        $(`#insert`).on("click",me.Insert.bind(this));
        $(`#classList`).on("change",'input[type=checkbox]',function(){
            //alert($(`#classList input[type="checkbox"]:checked`).length)
        });
    }
    InitL(){
        //設定L區DataTable
        let columns = [
            { data: 'Coid',title: "訂單編號" },
            { data: 'CustName',title: "客戶" },
            { data: 'ContractSDt',title: "起始日" },
            { data: 'ContractEDt',title: "結束日" },
        ]
        super.setTable(`OrderDetail`,[],columns,function(){});
    }
    remove(){
        super.Deconstructor();
        $(`#search`).unbind("click");
        $(`#save`).unbind("click");
        $(`#insert`).unbind("click");
    }
    SearchAfter(data){
        $(`#tree`).html(generateTreeHtml(data.Tree,true));
        let module = $(`.list-group-item`).children(`input`);
        $.each(module,(i,d)=>{
            let me = $(d);
            if(data.Auth.indexOf(me.data(`id`)) > -1)
                me.click();
        })
        this.BindDataList("OrderDetail",data.Order);
        pageaction.hideLoading();
    }
    Save(){
        if(super.verification("EArea")){
            alert("成功")
        }else{
            super.errorMsg("請輸入必填資料")
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
currentview = new AA3();