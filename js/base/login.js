$(`#login`).on('click',async function(){
    let emp = $(`#emplid`).val();
    let psw = $(`#password`).val();
    if(emp && psw){
        let response = await fetch(`${url}/Login/LogIn`,{
                method:"POST",
                headers:new Headers({
                    "Content-type":"application/json"
                }),
                body:JSON.stringify({
                    emplid:emp,
                    password:psw
            })
        })
        let data = await response.json();
        if(data.Status){
            console.log(data.Data)
            sessionStorage.setItem("jwttoken",data.Data);
            let OriginalPage = sessionStorage.getItem("OriginalPage");
            console.log()
            window.open(`../../html/${OriginalPage.substring(0,2) ?? "base"}/${OriginalPage ?? "index"}.html`,`_self`)
        }else{
            alert(data.Msg);
        }
    }else{
        alert("請輸入帳號密碼")
    }
});