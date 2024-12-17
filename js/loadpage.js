let pages = ["../header-aside.html","../header-nav.html","../footer-alert.html","../footer-loading.html"];
let area = ["layout-menu","layout-navbar","buynow","loadingArea"];
let chk = [false,false,false]
pages.forEach(async (d,i)=>{
  await gethtml(d,area[i]).then(x=>{
    chk[i] = true;
    action(d);
    switch (area[i]){
      case "layout-menu":
        const scripts = [
          '../../assets/vendor/js/menu.js',
          '../../assets/js/main.js'
        ];
        scripts.reduce((promise, scriptUrl) => {
          return promise.then(() => loadScript(scriptUrl));
        }, Promise.resolve()) // 開始一個空的 resolved promise
          .then(() => {
            console.log('All scripts loaded successfully');
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      default:
        break;
    }
  });
})
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
    }, 10000); // 每 10 秒切换一次
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