
const toggleBtn=document.querySelector('#sidebar .toggle');
const sidebar=document.getElementById('sidebar');
if(window.innerWidth<=768){
  sidebar.classList.add('collapsed');
  if(toggleBtn){
    toggleBtn.querySelector('i').classList.add('fa-angles-right');
    toggleBtn.querySelector('i').classList.remove('fa-angles-left');
  }
}
window.addEventListener('resize',()=>{
  if(window.innerWidth<=768){
    sidebar.classList.add('collapsed');
    if(toggleBtn){
      toggleBtn.querySelector('i').classList.add('fa-angles-right');
      toggleBtn.querySelector('i').classList.remove('fa-angles-left');
    }
  }else{
    sidebar.classList.remove('collapsed');
    if(toggleBtn){
      toggleBtn.querySelector('i').classList.remove('fa-angles-right');
      toggleBtn.querySelector('i').classList.add('fa-angles-left');
    }
  }
});
if(toggleBtn){toggleBtn.addEventListener('click',()=>{sidebar.classList.toggle('collapsed');toggleBtn.querySelector('i').classList.toggle('fa-angles-right');toggleBtn.querySelector('i').classList.toggle('fa-angles-left');});}
const page=(location.pathname.split('/').pop()||'index.html').replace('.html','');
const active=document.getElementById('nav-'+page);
if(active) active.classList.add('active');
if(document.getElementById('barChart')){const ctx=document.getElementById('barChart').getContext('2d');new Chart(ctx,{type:'bar',data:{labels:['Residuos','Papel','CO₂'],datasets:[{data:[9.4,3.1,16],backgroundColor:'#1982c4'}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});}


/* Estas son las funciones para el sweetalert */

function alertForo(){
  Swal.fire({
    title: "Drag me!",
    icon: "success",
    draggable: true
  });
}
function alertTaza(){
Swal.fire({
  imageUrl: "https://i.postimg.cc/tgDJ9Gkf/Captura-de-pantalla-2025-08-20-213600.png",
  imageHeight: 400,
  imageAlt: "A tall image"
});
}
function alertBolsa(){
Swal.fire({
  imageUrl: "https://i.postimg.cc/rz6FfVyd/Captura-de-pantalla-2025-08-20-213607.png",
  imageHeight: 400,
  imageAlt: "A tall image"
});
}
function alertStickers(){
  Swal.fire({
    title: "¿Estas Seguro que quieres canjear los Stickers?",
    text: "SI QUIERO LOS STICKERS!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SI!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Listo",
        text: "Acabas de canjear los Stickers.",
        icon: "success"
      });
    }
  });
}
function alertCuaderno(){
  Swal.fire({
    title: "¿Estas Seguro que quieres canjear el Cuaderno?",
    text: "SI QUIERO EL CUADERNO!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SI!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Listo",
        text: "Acabas de canjear el Cuaderno.",
        icon: "success"
      });
    }
  });
}