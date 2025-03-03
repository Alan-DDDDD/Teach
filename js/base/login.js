 var url = "https://narwhal-wired-platypus.ngrok-free.app/api";
//var url = "https://localhost:7036/api";
$(`#login`).on('click',async function(){
    let emp = $(`#emplid`).val();
    let psw = $(`#password`).val();
    if(emp && psw){
        let response = await fetch(`${url}/Login/LogIn`,{
                method:"POST",
                headers:new Headers({
                    "Content-type":"application/json",
                    "ngrok-skip-browser-warning": "69420",
                }),
                body:JSON.stringify({
                    emplid:emp,
                    password:psw
            })
        })
        let data = await response.json();
        if(data.Status){
            console.log(data.Data)
            sessionStorage.setItem("jwttoken",data.Data.jwt);
            sessionStorage.setItem("emplid",data.Data.emplid);
            let OriginalPage = sessionStorage.getItem("OriginalPage");
            console.log()
            if(!OriginalPage || OriginalPage == "home")
                window.open(`../../html/base/index.html`,`_self`)
            else
                window.open(`../../html/${OriginalPage.substring(0,2) ?? "base"}/${OriginalPage ?? "index"}.html`,`_self`)
        }else{
            alert(data.Msg);
        }
    }else{
        alert("請輸入帳號密碼")
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        $(`#login`).click();
    }
});
