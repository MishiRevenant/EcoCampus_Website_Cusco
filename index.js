
const toggleBtn=document.querySelector('#sidebar .toggle');
const sidebar=document.getElementById('sidebar');

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
leBtn.addEventListener('click',()=>{sidebar.classList.toggle('collapsed');toggleBtn.querySelector('i').classList.toggle('fa-angles-right');toggleBtn.querySelector('i').classList.toggle('fa-angles-left');});}

const page=(location.pathname.split('/').pop()||'index.html').replace('.html','');
const active=document.getElementById('nav-'+page);
if(active) active.classList.add('active');
if(document.getElementById('barChart')){const ctx=document.getElementById('barChart').getContext('2d');new Chart(ctx,{type:'bar',data:{labels:['Residuos','Papel','CO₂'],datasets:[{data:[9.4,3.1,16],backgroundColor:'#1982c4'}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});}
