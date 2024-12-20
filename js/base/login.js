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
            localStorage.setItem("jwttoken",data.Data);
            window.open(`../../html/base/index.html`,`_self`)
        }else{
            alert(data.Msg);
        }
    }else{
        alert("請輸入帳號密碼")
    }
});