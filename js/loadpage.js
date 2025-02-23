let pages = ["../header-aside.html","../header-nav.html","../footer-alert.html","../footer-loading.html","../Announcement.html"];
let area = ["layout-menu","layout-navbar","buynow","loadingArea","AnnouncementArea"];
let chk = [false,false,false,false,false];
//var url = "https://localhost:7036/api";
var url = "https://narwhal-wired-platypus.ngrok-free.app/api";
var Module;
var headers = {
  
}
var CurrentFunc;

getModule().then(()=>{
  if(Module){
    pages.forEach(async (d,i)=>{
      await gethtml(d,area[i]).then(async x=>{
        chk[i] = true;
        switch (area[i]){
          case "layout-menu":
            setmodule(Module);
            const scripts = [
              "../../assets/vendor/js/helpers.js",
              '../../assets/vendor/js/menu.js',
              '../../assets/js/main.js',
            ];
            scripts.reduce((promise, scriptUrl) => {
              return promise.then(() => loadScript(scriptUrl));
            }, Promise.resolve()) // 開始一個空的 resolved promise
            .then(() => {
              console.log('All scripts loaded successfully');
              setList();
            })
            .catch((error) => {
              console.error(error);
            });
            
            break;
          case "layout-navbar":
            let response = await fetch(`${url}/Login/GetNotify`,{
              method:"POST",
              headers :new Headers({
                "ngrok-skip-browser-warning": "69420",
              })
            });
            let data = await response.json();
            let ul = document.getElementById(`announcement-list`);
            data.Data.forEach(x=>{
              let li = document.createElement('li')
              li.classList.add(`alert`,`alert-${x.degree}`)
              li.innerHTML = x.text;
              ul.append(li);
            })
            if(data.Data)
              action(d);
            break;
          default:
            break;
        }
      });
    })
  }
});
async function gethtml(url,id){
  let response = await fetch(url);
  if(!response.ok)
    throw new Error(""); 
  let data = await response.text();
  $(`#${id}`).append(data);
}

function action(d){
  chk.forEach(x=>{
    if(!x)
      return;
  })
  startAnnouncement(d);
}

//公告顯示
function startAnnouncement(d) {
  const announcementList = document.getElementById('announcement-list');
  if(announcementList){
    const items = announcementList.children;
    const itemHeight = items[0].offsetHeight; // 每行的高度
    let index = 0;
    
    setInterval(() => {
      // 計算新的位置
      index = (index + 1) % items.length; // 循環顯示
      announcementList.style.top = `-${index * itemHeight}px`;
    }, 5000); // 每 10 秒切换一次
  }
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve(url); // 當檔案載入完成時，觸發 resolve
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`)); // 當載入失敗時，觸發 reject
    document.head.appendChild(script); // 將 script 元素添加到 head 標籤
  });
}

async function getModule(){
  let emplid = sessionStorage.getItem("emplid")
  if(emplid){
    let response = await fetch(`${url}/Login/GetModuleAuth?emplid=${emplid}`,{
      method:"POST",
      headers :new Headers({
        "ngrok-skip-browser-warning": "69420",
      })
    });
    let data = await response.json();
    if(data.Status){
      Module = data.Data;
    }
  }else{
    window.open("../../html/base/login.html","_self");
  }
}

function setmodule(data){
  let module = document.querySelectorAll('#layout-menu .menu-toggle');
  if(module.length != 0 && !Module.Modules.includes("ALL")){
    module.forEach((d,i)=>{
      let m = $(d).parent()
      if(!data.Modules.includes(m.attr("id"))){
        m.remove();
      }
    })
  }
}

function setList(){
  if(CurrentFunc){
    reList(CurrentFunc);
  }
  else{
    setList();
  }
}