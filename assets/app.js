// Fetch posts and render cards
const grid = document.getElementById('postsGrid');
const yearSpan = document.getElementById('y');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

let allPosts = [];
fetch('data/posts.json')
  .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
  .then(data => {
    allPosts = (data.posts || []);
    console.log('Loaded posts:', allPosts.length, allPosts);
    render(allPosts);
  })
  .catch(err => {
    console.error('Failed to load data/posts.json:', err);
    grid.innerHTML = '<div class="card">Tidak bisa memuat <code>data/posts.json</code>. Periksa lokasi file & format JSON.</div>';
  });


function render(list){
  grid.innerHTML = '';
  list.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card post-card';
    el.innerHTML = `
      <div class="post-meta">
        <span class="badge">${p.type.toUpperCase()}</span>
        <small>${new Date(p.published_at).toLocaleDateString('id-ID')}</small>
      </div>
      <img src="${p.cover || 'assets/img/placeholder.jpg'}" alt="${escapeHtml(p.title)}">
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.excerpt)}</p>
      ${p.cta ? `<a class="btn" href="${p.cta}" target="_blank" rel="noreferrer">${p.cta_label || (p.type==='product' ? 'Lihat Detail' : 'Baca Selengkapnya')}</a>` : ''}
    `;
    grid.appendChild(el);
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s]));
}

// Filters
document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    render(f==='all' ? allPosts : allPosts.filter(p => p.type===f));
  });
});

/* === Simple slider for #mochiSlider === */
(function(){
  const root = document.getElementById('mochiSlider');
  if(!root) return;

  const track = root.querySelector('.slides');
  const slides = Array.from(track.children);
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dotsWrap = root.querySelector('.dots');

  let index = 0;
  const last = slides.length - 1;

  /* === Slider untuk #munggurSlider === */
(function(){
  const root = document.getElementById('munggurSlider');
  if(!root) return;

  const track = root.querySelector('.slides');
  const slides = Array.from(track.children);
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dotsWrap = root.querySelector('.dots');

  let index = 0;
  const last = slides.length - 1;

  slides.forEach((_, i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=> go(i));
    dotsWrap.appendChild(b);
  });

  function update(){
    track.style.transform = `translateX(-${index*100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d,i)=>d.classList.toggle('active', i===index));
  }

  function go(i){
    index = (i<0)? last : (i>last ? 0 : i);
    update();
  }

  prev.addEventListener('click', ()=> go(index-1));
  next.addEventListener('click', ()=> go(index+1));

  // swipe
  let startX=0, dx=0, dragging=false;
  const start = x => { dragging=true; startX=x; dx=0; root.classList.add('grabbing'); }
  const move  = x => { if(!dragging) return; dx=x-startX; track.style.transform = `translateX(calc(-${index*100}% + ${dx}px))`; }
  const end   = () => { if(!dragging) return; dragging=false; root.classList.remove('grabbing'); Math.abs(dx)>60 ? go(index+(dx<0?1:-1)) : update(); }

  root.addEventListener('pointerdown', e=> start(e.clientX));
  window.addEventListener('pointermove', e=> move(e.clientX));
  window.addEventListener('pointerup', end);
  root.addEventListener('pointerleave', end);

  update();
})();


  // build dots
  slides.forEach((_, i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=> go(i));
    dotsWrap.appendChild(b);
  });

  function update(){
    track.style.transform = `translateX(-${index*100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d,i)=>d.classList.toggle('active', i===index));
  }
  function go(i){
    index = (i<0) ? last : (i>last ? 0 : i);
    update();
  }

  prev.addEventListener('click', ()=> go(index-1));
  next.addEventListener('click', ()=> go(index+1));

  // drag / swipe
  let startX=0, dx=0, dragging=false;
  const start = (x)=>{ dragging=true; startX=x; dx=0; root.classList.add('grabbing'); }
  const move  = (x)=>{ if(!dragging) return; dx = x-startX; track.style.transform = `translateX(calc(-${index*100}% + ${dx}px))`; }
  const end   = ()=>{ if(!dragging) return; dragging=false; root.classList.remove('grabbing');
    Math.abs(dx)>60 ? go(index + (dx<0?1:-1)) : update();
  };

  root.addEventListener('pointerdown', e=> start(e.clientX));
  window.addEventListener('pointermove', e=> move(e.clientX));
  window.addEventListener('pointerup', end);
  root.addEventListener('pointerleave', end);

  update();
})();
/* === Slider untuk #sonoSlider === */
(function(){
  const root = document.getElementById('sonoSlider');
  if(!root) return;

  const track = root.querySelector('.slides');
  const slides = Array.from(track.children);
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dotsWrap = root.querySelector('.dots');

  let index = 0;
  const last = slides.length - 1;

  slides.forEach((_, i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=> go(i));
    dotsWrap.appendChild(b);
  });

  function update(){
    track.style.transform = `translateX(-${index*100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d,i)=>d.classList.toggle('active', i===index));
  }

  function go(i){
    index = (i<0)? last : (i>last ? 0 : i);
    update();
  }

  prev.addEventListener('click', ()=> go(index-1));
  next.addEventListener('click', ()=> go(index+1));

  let startX=0, dx=0, dragging=false;
  const start = x => { dragging=true; startX=x; dx=0; root.classList.add('grabbing'); }
  const move  = x => { if(!dragging) return; dx=x-startX; track.style.transform = `translateX(calc(-${index*100}% + ${dx}px))`; }
  const end   = () => { if(!dragging) return; dragging=false; root.classList.remove('grabbing'); Math.abs(dx)>60 ? go(index+(dx<0?1:-1)) : update(); }

  root.addEventListener('pointerdown', e=> start(e.clientX));
  window.addEventListener('pointermove', e=> move(e.clientX));
  window.addEventListener('pointerup', end);
  root.addEventListener('pointerleave', end);

  update();
})();

