export class UA3 extends baseObject {
    constructor() {
        super();
    }
    Init(){
        let me = this;
        me.ClassName = "UA3"
        me.defaultHideArea = ["E"];//設定預設隱藏區域
        me.defaultToolBarDisabled = ["save","report"]//設定ToolBar按鈕狀態，預設全開
        me.InitL();//初始化L區
        $(`#search`).on("click",me.Search.bind(this));
        $(`#save`).on("click",me.Save.bind(this));
        //$(`#insert`).on("click",me.Insert.bind(this));
        $(`#gosetting`).on(`click`,function(){

        })
    }
    InitL(){
        //設定L區DataTable
        let columns = [
            { data: 'module',title: "模組" },
            { data: 'function',title: "功能"},
            { data: 'auth',title: "權限",orderable: false,
                render:function(data,type,row){
                    let select = $('<select class="form-select">')
                    let options = [
                        { value: 'N', text: '無' },
                        { value: 'A', text: '全部' },
                        { value: 'E', text: '編輯' },
                        { value: 'R', text: '只讀' },
                    ];
                
                    options.forEach(opt => {
                        let option = $('<option>')
                            .val(opt.value)
                            .text(opt.text);
                    
                        if (opt.value === data) {
                            option.attr('selected', 'selected');
                        }
                    
                        select.append(option);
                    });
                    return select[0].outerHTML;
                } 
            },
        ]
        let data = [
            {
                module:"AA",
                function:"AA1",
                auth:"A"
            }
        ]
        super.setTable(`datatable`,data,columns,function(){
            //設定L區DataTable點擊動作
            //alert($($(this).find('td').get(2)).html())
            pageaction.areahide("L");
            pageaction.areashow("E");
            pageaction.ToolBarUnDisabled("save");
        });
    }          
    Save(){
        if(super.verification("EArea")){
            this.alertMsg("成功")
        }else{
            this.alertMsg("請輸入必填資料")
        }
    }
    SearchAfter(data){
        let tree = $(`#tree`);
        tree.html(generateTreeHtml(data.tree,true));
        let chk = tree.find('.tree-checkbox');
        $.each(chk,(i,d)=>{
            let id = $(d).data("id");
            if(data.empl.filter(x=>x.Functionid == id).length > 0){
                $(d).prop("checked",true);
            }else{
                $(d).prop("checked",false);
            }
        });
        validateTreeCheckboxes();
        pageaction.hideLoading();
    }
}
currentview = new UA3();