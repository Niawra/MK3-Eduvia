const scholarships=[
{name:"Beasiswa Indonesia Maju",short:"BIM",level:"S1, S2, S3",country:"Dalam Negeri",deadline:"30 Juni 2026",style:""},
{name:"Chevening Scholarship",short:"CHEVENING",level:"S2",country:"Inggris",deadline:"05 November 2026",style:"uk"},
{name:"Australia Awards Scholarships",short:"AUSTRALIA AWARDS",level:"S1, S2, S3",country:"Australia",deadline:"31 Agustus 2026",style:"au"},
{name:"Beasiswa LPDP",short:"LPDP",level:"S2, S3",country:"Dalam & Luar Negeri",deadline:"12 Juli 2026",style:""}
];

const categories=[["🏛️","Dalam Negeri","250+ Beasiswa"],["🌐","Luar Negeri","450+ Beasiswa"],["🎓","S1","300+ Beasiswa"],["🎓","S2","350+ Beasiswa"],["🔬","S3","150+ Beasiswa"]];

const grid=document.getElementById("scholarshipGrid");
const modal=document.getElementById("modal");
const modalContent=document.getElementById("modalContent");
const toast=document.getElementById("toast");

function showToast(message){
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);
}

function renderScholarships(list=scholarships){
  grid.innerHTML=list.map((s,i)=>`
    <article class="card">
      <div class="cover ${s.style}">
        <span class="country">${s.country}</span>${s.short}
      </div>
      <div class="card-body">
        <h3>${s.name}</h3>
        <p class="meta">${s.level} • ${s.country}</p>
        <p class="benefit">✓ Biaya pendidikan</p>
        <p class="benefit">✓ Tunjangan dan dukungan</p>
        <p class="benefit">✓ Pengembangan diri</p>
        <div class="deadline">Deadline: <b>${s.deadline}</b></div>
        <button class="detail" data-index="${i}">Lihat Detail</button>
      </div>
    </article>`).join("");

  grid.querySelectorAll(".detail").forEach(btn=>{
    btn.onclick=()=>openDetail(list[Number(btn.dataset.index)]);
  });
}

function renderCategories(){
  document.getElementById("categoryGrid").innerHTML=categories.map((c,i)=>`
    <button class="category" data-index="${i}">
      <div class="category-icon">${c[0]}</div>
      <h3>${c[1]}</h3>
      <p>${c[2]}</p>
    </button>`).join("");

  document.querySelectorAll(".category").forEach(btn=>{
    btn.onclick=()=>{
      const name=categories[Number(btn.dataset.index)][1].toLowerCase();
      const result=scholarships.filter(s=>`${s.country} ${s.level}`.toLowerCase().includes(name));
      renderScholarships(result.length?result:scholarships);
      document.getElementById("scholarships").scrollIntoView({behavior:"smooth"});
      showToast("Kategori dipilih.");
    };
  });
}

function openDetail(s){
  modalContent.innerHTML=`
    <small style="color:#1464e8;font-weight:800">${s.country}</small>
    <h2>${s.name}</h2>
    <p>Beasiswa untuk jenjang ${s.level} dengan manfaat pendidikan dan pengembangan diri.</p>
    <p><b>Deadline:</b> ${s.deadline}</p>
    <div class="modal-form">
      <button class="btn primary" id="apply">Lihat Informasi Pendaftaran</button>
    </div>`;
  modal.classList.add("open");
  document.getElementById("apply").onclick=()=>showToast("Informasi pendaftaran akan segera tersedia.");
}

function auth(type){
  const login=type==="login";
  modalContent.innerHTML=`
    <small style="color:#1464e8;font-weight:800">EDUVIA</small>
    <h2>${login?"Masuk ke Akun":"Buat Akun Baru"}</h2>
    <p>${login?"Masuk untuk menyimpan beasiswa favoritmu.":"Daftar gratis untuk mendapatkan rekomendasi beasiswa."}</p>
    <form class="modal-form" id="authForm">
      ${login?"":'<input placeholder="Nama lengkap" required>'}
      <input type="email" placeholder="Email" required>
      <input type="password" placeholder="Password" required>
      <button class="btn primary">${login?"Masuk":"Daftar"}</button>
    </form>`;
  modal.classList.add("open");
  document.getElementById("authForm").onsubmit=e=>{
    e.preventDefault();
    modal.classList.remove("open");
    showToast(login?"Berhasil masuk ke Eduvia!":"Akun berhasil dibuat!");
  };
}

document.getElementById("searchForm").onsubmit=e=>{
  e.preventDefault();
  const q=document.getElementById("searchInput").value.trim().toLowerCase();
  const result=scholarships.filter(s=>`${s.name} ${s.short} ${s.level} ${s.country}`.toLowerCase().includes(q));
  renderScholarships(q?(result.length?result:[]):scholarships);
  document.getElementById("scholarships").scrollIntoView({behavior:"smooth"});
  showToast(q?(result.length?`${result.length} beasiswa ditemukan.`:"Tidak ada hasil yang cocok."):"Semua beasiswa ditampilkan.");
};

document.getElementById("allBtn").onclick=()=>{renderScholarships();showToast("Semua beasiswa ditampilkan.")};
document.getElementById("loginBtn").onclick=()=>auth("login");
document.getElementById("registerBtn").onclick=()=>auth("register");
document.getElementById("ctaBtn").onclick=()=>auth("register");
document.getElementById("close").onclick=()=>modal.classList.remove("open");

modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});

document.querySelectorAll(".read").forEach(btn=>{
  btn.onclick=()=>showToast("Artikel panduan Eduvia akan segera tersedia.");
});

document.getElementById("hamburger").onclick=()=>{
  document.getElementById("nav").classList.toggle("mobile-nav");
};

document.querySelectorAll("#nav a").forEach(a=>{
  a.onclick=()=>document.getElementById("nav").classList.remove("mobile-nav");
});

document.getElementById("year").textContent=new Date().getFullYear();

renderScholarships();
renderCategories();
