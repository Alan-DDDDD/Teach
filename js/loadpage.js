let pages = ["../header-aside.html","../header-nav.html","../footer-alert.html","../footer-loading.html"];
let area = ["layout-menu","layout-navbar","buynow","loadingArea"];
let chk = [false,false,false]
pages.forEach(async (d,i)=>{
  await gethtml(d,area[i]).then(x=>{
    chk[i] = true
  }).catch(async error=>{
    await gethtml(d.substring(3,d.length),area[i]).then(x=>{
      chk[i] = true
    })
  });
})
async function gethtml(url,id){
  let response = await fetch(url);
  if(!response.ok)
    throw new Error(""); 
  let data = await response.text();
  document.getElementById(id).innerHTML = data;
}

function action(){
  chk.forEach(x=>{
    if(!x)
      return;
  })
  startAnnouncement();
}

//公告顯示
function startAnnouncement() {
  const announcementList = document.getElementById('announcement-list');
  const items = announcementList.children;
  const itemHeight = items[0].offsetHeight; // 每行的高度
  let index = 0;

  setInterval(() => {
    // 計算新的位置
    index = (index + 1) % items.length; // 循環顯示
    announcementList.style.top = `-${index * itemHeight}px`;
  }, 10000); // 每 10 秒切换一次
}