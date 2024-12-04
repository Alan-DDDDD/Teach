alert("test");
let pages = ["../header-aside.html","../header-nav.html","../footer-alert.html","../footer-loading.html"];
let area = ["layout-menu","layout-navbar","buynow","loadingArea"];
pages.forEach(async (d,i)=>{
  await gethtml(d,area[i]).catch(async error=>{
    await gethtml(d.substring(3,d.length),area[i])
  });
})
async function gethtml(url,id){
  let response = await fetch(url);
  if(!response.ok)
    throw new Error(""); 
  let data = await response.text();
  document.getElementById(id).innerHTML = data;
}
