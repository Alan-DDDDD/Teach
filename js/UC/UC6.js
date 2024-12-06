reList("UC6");
export class UC6 extends baseObject {
    constructor() {
        super();
    }
    //初始化UB1
    Init(){
        let me = this;
        me.defaultToolBarDisabled = ["save","report"]//設定ToolBar按鈕狀態，預設全開
        me.InitL();//初始化L區
        $(`#search`).on("click",me.Search);
        $(`#save`).on("click",me.Save);
        $(`#insert`).on("click",me.Insert);
    }
    InitL(){
        //設定L區DataTable
        let columns = [
            { data: 'name',title: "姓名" },
            { data: 'phone',title: "行動電話"},
            { data: 'tax',title: "市話" },
            { data: 'email',title: "Email(電子信箱)" },
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
    Search(){
        if(super.verification("QArea")){
            pageaction.showLoading();
            let Data = [{name:'text',phone:'0977778111',tax:'0222151112',email:'0911511@gmail.com'}]
            super.BindDataList(`datatable`,Data);//重新綁定DataTable資料
            pageaction.areashow("L");
            pageaction.areahide("Q");
            setTimeout(function(){
                pageaction.hideLoading();
            },3000);
        }else{
            super.errorMsg("請輸入必填資料")
        }
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
currentview = new UC6();
