export class UB2 extends baseObject {
    constructor() {
        super();
    }
    Init(){
        let me = this;
        me.defHideArea = ["L","E"]
        me.InitL();
        $(`#search`).on("click",me.Search);
        $(`#save`).on("click",me.Save);
    }
    InitL(){
        let columns = [
            { data: 'name',title: "姓名" },
            { data: 'phone',title: "行動電話"},
            { data: 'tax',title: "市話" },
            { data: 'email',title: "Email(電子信箱)" },
        ]
        super.bindTable(`datatable`,[],columns,function(){
            alert($($(this).find('td').get(2)).html())
        });
    }
    Search(){
        if(super.verification("QArea")){
            let table = $(`#datatable`).DataTable()
            table.clear();
            table.rows.add([{name:'text',phone:'0977778111',tax:'0222151112',email:'0911511@gmail.com'}]);
            table.draw();
        }
    }
    Save(){
        if(super.verification("EArea")){
            alert("成功")
        }
    }
}
currentview = new UB2();