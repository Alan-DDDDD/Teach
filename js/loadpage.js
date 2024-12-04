// fetch('header-aside.html')
//       .then(response => response.text())
//       .then(data => {
//         document.getElementById('layout-menu').innerHTML = data;
//       })
//       .catch(error => console.error('Error loading header:', error));
// fetch('header-nav.html')
//       .then(response => response.text())
//       .then(data => {
//         document.getElementById('layout-navbar').innerHTML = data;
//       })
//       .catch(error => console.error('Error loading header:', error));
// fetch('footer-alert.html')
//       .then(response => response.text())
//       .then(data => {
//         document.getElementById('buynow').innerHTML = data;
//       })
//       .catch(error => console.error('Error loading header:', error));

let pages = ["../header-aside.html","../header-nav.html","../footer-alert.html"];
let area = ["layout-menu","layout-navbar","buynow"];
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