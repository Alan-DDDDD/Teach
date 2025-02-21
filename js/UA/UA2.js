reList("UA2");
export class UA2 extends baseObject {
    constructor() {
        super();
    }

    //UA2
    Init(){
        let me = this;
        me.defaultHideArea = ["L","E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report"]//設定ToolBar按鈕狀態，預設全開
        me.ClassName = "UA2"
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
                data: 'check',title:`<input class="form-check-input all_checkbox" type="checkbox"/>選取`,
                orderable: false,
                render: function(data,type,row){
                    let html = `<input class="form-check-input list_checkbox" type="checkbox" `;
                    html += data == 'Y' ? "checked":"";
                    html += `/>`
                    return html;
                }
            },
            { data: 'startdt',title: "開始時間" },
            { data: 'enddt',title: "結束時間" },
            { data: 'title',title: "標題" },
            { data: 'text',title: "公告內容" },
            { 
                data: null,title:"操作功能",orderable: false,
                render:function(data,type,row){
                    let html = `<button class="btn btn-primary data_detaile" style="padding:0.125rem 0.375rem">明細</button>`
                    return html
                }
            }
        ]
        let columnDefs = [
            {targets:[0],responsivePriority:1},
            {targets:[1],responsivePriority:3},
            {targets:[2],responsivePriority:4},
            {targets:[3],responsivePriority:5},
            {targets:[4],responsivePriority:6},
            {targets:[5],responsivePriority:2},
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
    Search(){
        if(super.verification("QArea")){
            pageaction.showLoading();
            console.log(this.GetAreaData("EArea"));
            let Data = [
                {check:"N",emplid:0,gender:"M",name:'text',phone:'0977778111',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:1,gender:"F",name:'text',phone:'0977778112',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:2,gender:"M",name:'text',phone:'0977778113',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:3,gender:"M",name:'text',phone:'0977778114',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:4,gender:"F",name:'text',phone:'0977778115',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:5,gender:"F",name:'text',phone:'0977778116',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:6,gender:"M",name:'text',phone:'0977778117',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:7,gender:"M",name:'text',phone:'0977778118',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:8,gender:"F",name:'text',phone:'0977778119',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:9,gender:"M",name:'text',phone:'0977778120',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:10,gender:"M",name:'text',phone:'0977778121',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:11,gender:"F",name:'text',phone:'0977778122',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:12,gender:"M",name:'text',phone:'0977778123',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:13,gender:"F",name:'text',phone:'0977778124',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:14,gender:"M",name:'text',phone:'0977778125',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:15,gender:"M",name:'text',phone:'0977778126',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:16,gender:"M",name:'text',phone:'0977778127',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:17,gender:"F",name:'text',phone:'0977778128',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:18,gender:"F",name:'text',phone:'0977778129',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:19,gender:"F",name:'text',phone:'0977778130',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:20,gender:"M",name:'text',phone:'0977778131',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:21,gender:"F",name:'text',phone:'0977778132',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:22,gender:"M",name:'text',phone:'0977778133',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:23,gender:"M",name:'text',phone:'0977778134',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:24,gender:"F",name:'text',phone:'0977778135',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:25,gender:"F",name:'text',phone:'0977778136',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:26,gender:"M",name:'text',phone:'0977778137',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:27,gender:"F",name:'text',phone:'0977778138',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:28,gender:"M",name:'text',phone:'0977778139',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:29,gender:"F",name:'text',phone:'0977778140',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:30,gender:"M",name:'text',phone:'0977778141',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:31,gender:"F",name:'text',phone:'0977778142',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:32,gender:"M",name:'text',phone:'0977778143',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:33,gender:"F",name:'text',phone:'0977778144',tax:'0222151112',email:'0911511@gmail.com'},
                {check:"N",emplid:34,gender:"M",name:'text',phone:'0977778145',tax:'0222151112',email:'0911511@gmail.com'}
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
    async Save(){
        if(super.verification("EArea")){
            let data = this.GetAreaData("EArea");
            let response = await t_Post(`${this.ClassName}/Save`,this.ClassName,data);
            if(response.Data){
                this.alertMsg("儲存成功","success")
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
}
currentview = new UA2();