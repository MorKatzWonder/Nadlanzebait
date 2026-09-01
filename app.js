const MARK=`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round"><path d="M32 60C32 60 54 42 54 26A22 22 0 0 0 10 26C10 42 32 60 32 60Z"/><path d="M20 30 32 19 44 30v12h-8V32h-8v10h-8z"/></svg>`;
const S={lang:localStorage.getItem('nzb-lang')||'he',page:localStorage.getItem('nzb-page')||'land',f:{hood:'',band:'',type:''},open:{}};
const t=()=>T[S.lang],i=()=>S.lang==='he'?0:1;
const money=n=>'₪ '+n.toLocaleString('en-US');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const waHref=addr=>`https://wa.me/972507464403?text=${encodeURIComponent(t().waMsg(addr))}`;
const telHref=`tel:+972507464403`;

function facts(l){const T2=t();return[`${l.rooms} ${T2.rooms}`,`${l.size} ${T2.sqm}`,T2.floorOf(l.floor,l.floors),T2.expo(l.expN)].map(f=>`<span>${esc(f)}</span>`).join('<i>·</i>')}
function tagList(l,n){return l.chars.slice(0,n||99).map(c=>`<span class="tag">${esc(CH[c][i()])}</span>`).join('')}
function detail(l){const F=t().fields,y=F.yes,no=F.no;const rows=[[F.type,TYPES[l.type][i()]],[F.city,S.lang==='he'?'תל אביב':'Tel Aviv'],[F.hood,HOODS[l.hood][i()]],[F.street,l.street[i()]],[F.rooms,l.rooms],[F.size,l.size+' '+t().sqm],[F.balcony,l.balcony?l.balcony+' '+t().sqm:no],[F.floor,l.floor],[F.floors,l.floors],[F.exposure,`${l.expN} · ${l.expD[i()]}`],[F.parking,l.parking?l.parking:no],[F.storage,l.storage?y:no],[F.basement,l.basement?y:no],[F.shabbat,l.shabbat?y:no],[F.access,l.access?y:no],[F.year,l.year],[F.cond,COND[l.cond][i()]]];
return`<div class="detail"><div class="dl">${rows.map(r=>`<div><span>${esc(r[0])}</span><span>${esc(r[1])}</span></div>`).join('')}</div>
<div><div class="kick" style="margin-bottom:8px">${esc(F.chars)}</div><div class="tags">${tagList(l)}</div></div>
<div><div class="kick" style="margin-bottom:8px">${esc(F.poi)}</div><div class="poi">${l.poi.map(p=>`<span>${esc(POI[p][i()])}</span>`).join('<span style="color:var(--line)">·</span>')}</div></div>
<div><div class="kick" style="margin-bottom:8px">${esc(F.desc)}</div><p class="desc">${esc(l.desc[i()])}</p></div></div>`}

function card(l){const st=l.status[i()];const addr=`${l.street[i()]}, ${HOODS[l.hood][i()]}`;
return`<article class="card${S.open[l.id]?' open':''}" data-id="${l.id}">
<div class="ph">${st?`<span class="tag tag-status st">${esc(st)}</span>`:''}${S.lang==='he'?'תמונת הנכס':'Property photograph'}</div>
<div class="body"><div><div class="type">${esc(TYPES[l.type][i()])}</div><div class="loc">${esc(HOODS[l.hood][i()])} · ${esc(l.street[i()])}</div></div>
<div class="price tnum">${money(l.price)}</div>
<div class="facts">${facts(l)}</div>
<p class="teaser">${esc(l.teaser[i()])}</p>
<div class="tags">${tagList(l,3)}</div>
<div class="cta-row"><a class="btn btn-primary btn-sm" href="${telHref}">${esc(t().call)}</a><a class="btn btn-outline btn-sm" href="${waHref(addr)}" target="_blank" rel="noopener">${esc(t().wa)}</a>
<button class="more" data-toggle="${l.id}">${esc(S.open[l.id]?t().less:t().all)} ${S.open[l.id]?'↑':'↓'}</button></div></div>
${detail(l)}</article>`}

function landing(){const T2=t();return`
<div class="band"><div class="wrap hero">
<div class="kick">${esc(T2.heroKick)}</div>
<h1 style="margin-top:var(--s3)">${esc(T2.heroH[0])}<br><em>${esc(T2.heroH[1])}</em></h1>
<p>${esc(T2.heroP)}</p>
<div class="cta"><a class="btn btn-neon" href="#valuation">${esc(T2.cta1)}</a><button class="btn btn-outline" style="border-color:rgba(92,255,122,.5);color:#C9F5CD" data-go="list">${esc(T2.cta2)}</button></div>
<div class="stats">${T2.stats.map(s=>`<div class="stat"><div class="n tnum">${esc(s[0])}</div><div class="l">${esc(s[1])}</div></div>`).join('')}</div>
</div></div>

<div class="wrap sec"><div class="sec-head"><div><div class="kick">${esc(T2.stepsKick)}</div><h2 style="margin-top:var(--s2)">${esc(T2.stepsH)}</h2></div></div>
<div class="steps">${T2.steps.map(s=>`<div class="step"><div class="n tnum">${esc(s[0])}</div><h3>${esc(s[1])}</h3><p>${esc(s[2])}</p></div>`).join('')}</div></div>
<div class="wrap"><div class="rule"></div></div>

<div class="wrap sec"><div class="sec-head"><div><div class="kick">${esc(T2.featKick)}</div><h2 style="margin-top:var(--s2)">${esc(T2.featH)}</h2></div><button class="btn btn-ghost btn-sm" data-go="list">${esc(T2.featAll)} →</button></div>
<div class="grid-cards">${LISTINGS.slice(0,3).map(card).join('')}</div></div>
<div class="wrap"><div class="rule"></div></div>

<div class="wrap sec"><div class="kick">${esc(T2.qKick)}</div><h2 style="margin:var(--s2) 0 var(--s4);font-size:34px;font-weight:400">${esc(T2.qH)}</h2>
<div class="quotes">${T2.quotes.map(q=>`<figure class="quote"><p>${esc(q[0])}</p><figcaption class="who">${esc(q[1])}</figcaption></figure>`).join('')}</div></div>

<div class="wrap sec"><div class="about">
<div><div class="kick">${esc(T2.aboutKick)}</div><h2 style="margin:var(--s2) 0 var(--s3);font-size:34px;font-weight:400">${esc(T2.aboutH)}</h2>
${T2.aboutP.map(p=>`<p class="muted" style="max-width:44ch;margin-bottom:var(--s2)">${esc(p)}</p>`).join('')}
<div style="display:flex;gap:var(--s2);margin-top:var(--s3);flex-wrap:wrap"><a class="btn btn-primary" href="${telHref}">${esc(T2.call)} ${CONTACT.phone}</a><a class="btn btn-outline" href="https://wa.me/972507464403" target="_blank" rel="noopener">${esc(T2.wa)}</a></div></div>
<div class="slot">${esc(T2.slot)}</div></div></div>

<div class="wrap sec" id="valuation"><div class="kick">${esc(T2.formKick)}</div><h2 style="margin:var(--s2) 0 var(--s4);font-size:34px;font-weight:400">${esc(T2.formH)}</h2>
<form class="form" id="valform" novalidate>
<div class="field"><label for="vn">${esc(T2.f.name)}</label><input class="input" id="vn" name="name" autocomplete="name"><div class="err" data-err="name"></div></div>
<div class="field"><label for="vp">${esc(T2.f.phone)}</label><input class="input" id="vp" name="phone" inputmode="tel" autocomplete="tel"><div class="err" data-err="phone"></div></div>
<div class="field full"><label for="va">${esc(T2.f.addr)}</label><input class="input" id="va" name="addr"><div class="err" data-err="addr"></div></div>
<div class="field"><label for="vt">${esc(T2.f.type)}</label><select class="input" id="vt">${Object.entries(TYPES).map(([k,v])=>`<option value="${k}">${esc(v[i()])}</option>`).join('')}</select></div>
<div class="field full"><label for="vm">${esc(T2.f.msg)}</label><input class="input" id="vm"></div>
<div class="full"><button class="btn btn-primary" type="submit">${esc(T2.f.send)}</button></div>
<div class="full" id="valok" hidden></div>
</form></div>

<footer class="foot"><div class="wrap"><div class="cols">
<div><div style="display:flex;align-items:center;gap:10px;color:var(--neon)"><span style="width:26px;height:26px;display:block">${MARK}</span><b style="font-weight:500;font-size:17px;color:#EAF6E6">${esc(T2.brand)}</b></div>
<div style="font-size:12.5px;letter-spacing:.14em;color:#7FA277;margin-top:8px">${esc(T2.sub)}</div></div>
<div><div class="kick">${S.lang==='he'?'קשר':'Contact'}</div><div style="margin-top:var(--s2);font-size:15px;line-height:2">${esc(CONTACT.agent[i()])}<br><a href="${telHref}">${CONTACT.phone}</a><br><a href="https://wa.me/972507464403" target="_blank" rel="noopener">${esc(T2.wa)}</a></div></div>
<div><div class="kick">${S.lang==='he'?'משרד':'Office'}</div><div style="margin-top:var(--s2);font-size:15px;line-height:1.9">${esc(CONTACT.addr[i()])}<br>${esc(CONTACT.hours[i()])}</div></div>
</div></div></footer>`}

function listings(){const T2=t(),F=T2.filters;
const out=LISTINGS.filter(l=>{if(S.f.hood&&l.hood!==S.f.hood)return false;if(S.f.type&&l.type!==S.f.type)return false;
if(S.f.band){const b=PRICE_BANDS.find(x=>x.k===S.f.band);if(b.min&&l.price<b.min)return false;if(b.max&&l.price>b.max)return false}return true});
const hoods=[...new Set(LISTINGS.map(l=>l.hood))],types=[...new Set(LISTINGS.map(l=>l.type))];
return`<div class="wrap sec">
<div class="kick">${esc(T2.nav.list)}</div><h2 style="margin:var(--s2) 0 var(--s4);font-size:34px;font-weight:400">${esc(T2.featH)}</h2>
<div class="filters">
<div class="field"><label for="fh">${esc(F.hood)}</label><select class="input" id="fh" data-f="hood"><option value="">${esc(F.any)}</option>${hoods.map(h=>`<option value="${h}"${S.f.hood===h?' selected':''}>${esc(HOODS[h][i()])}</option>`).join('')}</select></div>
<div class="field"><label for="fp">${esc(F.price)}</label><select class="input" id="fp" data-f="band"><option value="">${esc(F.any)}</option>${PRICE_BANDS.map(b=>`<option value="${b.k}"${S.f.band===b.k?' selected':''}>${esc(S.lang==='he'?b.he:b.en)}</option>`).join('')}</select></div>
<div class="field"><label for="ft">${esc(F.type)}</label><select class="input" id="ft" data-f="type"><option value="">${esc(F.any)}</option>${types.map(x=>`<option value="${x}"${S.f.type===x?' selected':''}>${esc(TYPES[x][i()])}</option>`).join('')}</select></div>
<span class="count tnum">${esc(F.results(out.length))}</span></div>
<div class="grid-cards" style="margin-top:var(--s3)">${out.length?out.map(card).join(''):`<p class="muted">${esc(F.none)}</p>`}</div></div>`}

function foundation(){const T2=t();
const sw=(bg,fg,lab,br)=>`<div style="height:88px;border-radius:var(--r);background:${bg};color:${fg};display:flex;align-items:flex-end;padding:var(--s2);font-size:11px;font-family:Archivo,sans-serif${br?';border:1px solid var(--line)':''}">${lab}</div>`;
const ramp=arr=>`<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:var(--s2);margin-top:var(--s2)">${arr.map(a=>`<div style="height:52px;border-radius:6px;background:${a[0]};color:${a[1]};display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;font-size:10px;font-family:Archivo,sans-serif">${a[2]}</div>`).join('')}</div>`;
return`<div class="wrap sec">
<div class="kick">${esc(T2.foundKick)}</div><h2 style="margin:var(--s2) 0 var(--s5);font-size:34px;font-weight:400">${esc(T2.foundH)}</h2>
<div class="kick">${esc(T2.fColor)}</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s3);margin-top:var(--s3)">
${sw('#FFFFFF','#4A5A46','White · #FFFFFF',1)}${sw('#5CFF7A','#1C3F17','Neon · #5CFF7A')}${sw('#2F6B26','#fff','Green 600 · #2F6B26')}${sw('#1C3F17','#5CFF7A','Green 900 · #1C3F17')}</div>
${ramp([['#EAFBEC','#1C3F17','100'],['#C6F5CE','#1C3F17','200'],['#5CFF7A','#1C3F17','Neon'],['#3E8C33','#fff','400'],['#2F6B26','#fff','600'],['#1C3F17','#5CFF7A','900']])}
${ramp([['#F7FBF6','#4A5A46','N100'],['#E1EBDE','#4A5A46','N200'],['#C2D0BE','#1B2E18','N300'],['#8A9686','#fff','N500'],['#4A5A46','#fff','N700'],['#1B2E18','#fff','N900']])}
<p class="muted" style="font-size:13.5px;margin-top:var(--s2);max-width:70ch">${esc(T2.colorNote)}</p>
<div class="rule" style="margin:var(--s5) 0"></div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s5)">
<div><div class="kick">${esc(T2.fType)}</div>
<div style="display:grid;grid-template-columns:110px 1fr;gap:var(--s3) var(--s4);align-items:baseline;margin-top:var(--s3)">
<div style="font-size:11px;color:var(--ink-3);font-family:Archivo,sans-serif">Display / 46</div><div style="font-size:46px;font-weight:300;line-height:1.1">${S.lang==='he'?'דירת גן ברוטשילד':'Garden apartment'}</div>
<div style="font-size:11px;color:var(--ink-3);font-family:Archivo,sans-serif">Title / 25</div><div style="font-size:25px;font-weight:500">${S.lang==='he'?'4 חדרים בלב העיר':'Four rooms in the center'}</div>
<div style="font-size:11px;color:var(--ink-3);font-family:Archivo,sans-serif">Body / 16</div><div class="muted">${esc(LISTINGS[0].teaser[i()])}</div>
<div style="font-size:11px;color:var(--ink-3);font-family:Archivo,sans-serif">Data / 16</div><div class="tnum">${money(4250000)} · 112 ${esc(T2.sqm)} · ${esc(T2.floorOf(2,5))}</div>
</div><p class="muted" style="font-size:13.5px;margin-top:var(--s3);max-width:46ch">${esc(T2.typeNote)}</p></div>

<div><div class="kick">${esc(T2.fBtn)}</div>
<div style="display:flex;gap:var(--s2);flex-wrap:wrap;margin-top:var(--s3)"><button class="btn btn-primary">${esc(T2.call)}</button><button class="btn btn-neon">${esc(T2.cta1)}</button><button class="btn btn-outline">${esc(T2.wa)}</button><button class="btn btn-ghost">${esc(T2.save)}</button></div>
<div class="tags" style="margin-top:var(--s3)">${Object.values(CH).slice(0,8).map(c=>`<span class="tag">${esc(c[i()])}</span>`).join('')}<span class="tag tag-line">${esc(CH.tama[i()])}</span><span class="tag tag-status">${esc(S.lang==='he'?'חדש':'New')}</span></div>
<div class="kick" style="margin-top:var(--s5)">${esc(T2.fNav)}</div>
<div style="display:flex;align-items:center;gap:var(--s3);border:1px solid var(--line);border-radius:var(--r);padding:12px var(--s3);margin-top:var(--s3);font-size:14.5px">
<span style="width:22px;height:22px;display:block;color:var(--g-600)">${MARK}</span><b style="font-weight:500">${esc(T2.brand)}</b><span class="muted">${esc(T2.nav.list)}</span><span class="muted">${esc(T2.nav.land)}</span>
<button class="btn btn-outline btn-sm" style="margin-inline-start:auto">${esc(T2.contact)}</button></div>
<div class="kick" style="margin-top:var(--s5)">${S.lang==='he'?'לוגו':'Logo'}</div>
<div style="display:flex;gap:var(--s3);align-items:center;margin-top:var(--s3)">
<div style="width:96px;height:96px;border-radius:var(--r);background:var(--g-900);color:var(--neon);display:flex;align-items:center;justify-content:center"><span style="width:54px;height:54px;display:block">${MARK}</span></div>
<div style="width:96px;height:96px;border-radius:var(--r);border:1px solid var(--line);color:var(--g-600);display:flex;align-items:center;justify-content:center"><span style="width:54px;height:54px;display:block">${MARK}</span></div>
<img src="assets/logo-original.jpg" alt="" style="width:96px;height:96px;object-fit:cover;border-radius:var(--r);border:1px solid var(--line)">
<span class="muted" style="font-size:12.5px;max-width:20ch">${S.lang==='he'?'ימין: הקובץ המקורי, לעיון בלבד':'Right: the original file, for reference'}</span></div>
</div></div>
<div class="rule" style="margin:var(--s5) 0"></div>
<div class="kick">${esc(T2.fCard)}</div>
<div style="max-width:400px;margin-top:var(--s3)">${card(LISTINGS[0])}</div>
</div>`}

function phone(){const l=LISTINGS[0],T2=t(),addr=`${l.street[i()]}, ${HOODS[l.hood][i()]}`;
return`<div class="wrap"><div class="phonewrap">
<div class="phone"><div class="notch"></div><div class="pscreen">
<div class="pbar"><span class="tnum">9:41</span><span>●●● ▮</span></div>
<div class="pnav"><span style="width:22px;height:22px;display:block;color:var(--g-600)">${MARK}</span><b style="font-weight:500;font-size:15px">${esc(T2.brand)}</b><span style="margin-inline-start:auto;font-size:13px;color:var(--ink-3)">${S.lang==='he'?'עב / EN':'EN / עב'}</span></div>
<div class="pgal">${S.lang==='he'?'גלריית תמונות · 1/8':'Gallery · 1/8'}</div>
<div class="pbody">
<div><div class="type" style="font-size:11.5px;letter-spacing:.12em;color:var(--g-400);font-weight:500">${esc(TYPES[l.type][i()])}</div>
<div style="font-size:21px;font-weight:500;margin-top:2px">${esc(HOODS[l.hood][i()])} · ${esc(l.street[i()])}</div></div>
<div class="tnum" style="font-size:27px">${money(l.price)}</div>
<div class="facts">${facts(l)}</div>
<div class="tags">${tagList(l,4)}</div>
<p class="desc">${esc(l.desc[i()])}</p>
<div class="dl" style="grid-template-columns:1fr">${[[T2.fields.exposure,`${l.expN} · ${l.expD[i()]}`],[T2.fields.year,l.year],[T2.fields.cond,COND[l.cond][i()]],[T2.fields.storage,T2.fields.yes],[T2.fields.shabbat,T2.fields.yes]].map(r=>`<div><span>${esc(r[0])}</span><span>${esc(r[1])}</span></div>`).join('')}</div>
<div><div class="kick" style="margin-bottom:8px">${esc(T2.fields.poi)}</div><div class="poi">${l.poi.map(p=>`<span>${esc(POI[p][i()])}</span>`).join('<span style="color:var(--line)">·</span>')}</div></div>
</div></div>
<div class="pdock"><a class="btn btn-primary" href="${telHref}">${esc(T2.call)}</a><a class="btn btn-outline" href="${waHref(addr)}" target="_blank" rel="noopener">${esc(T2.wa)}</a></div></div>
<div style="max-width:34ch"><div class="kick">${esc(T2.phoneKick)}</div><h2 style="margin:var(--s2) 0 var(--s3);font-size:28px;font-weight:400">${esc(T2.phoneH)}</h2>
<p class="muted" style="font-size:14.5px">${S.lang==='he'?'בטלפון הכרטיס נפתח כדף מלא: גלריה, מחיר, נתונים, תיאור חופשי, ומעגן קבוע בתחתית המסך עם התקשרות וּוואטסאפ — שני יעדים בלבד, שניהם מעל 44px.':'On a phone the card becomes a full page: gallery, price, data, free description, and a fixed dock with call and WhatsApp — two targets only, both above 44px.'}</p></div>
</div></div>`}

function renderNav(){const T2=t();
document.getElementById('nav').innerHTML=`<div class="inner">
<div class="brand" style="color:var(--g-600)"><span style="width:26px;height:26px;display:block">${MARK}</span><b style="color:var(--ink)">${esc(T2.brand)}</b></div>
<nav class="navlinks">${['land','list','found','phone'].map(p=>`<button class="navlink" data-go="${p}" aria-current="${S.page===p}">${esc(T2.nav[p])}</button>`).join('')}</nav>
<div class="navright"><div class="lang"><button data-lang="he" aria-pressed="${S.lang==='he'}">עב</button><button data-lang="en" aria-pressed="${S.lang==='en'}">EN</button></div>
<a class="btn btn-primary btn-sm" href="${telHref}">${esc(T2.contact)}</a></div></div>`}

function render(){document.documentElement.lang=S.lang;document.documentElement.dir=S.lang==='he'?'rtl':'ltr';
renderNav();
const html={land:landing,list:listings,found:foundation,phone:phone}[S.page]();
document.getElementById('main').innerHTML=html;
localStorage.setItem('nzb-lang',S.lang);localStorage.setItem('nzb-page',S.page)}

document.addEventListener('click',e=>{
const go=e.target.closest('[data-go]');if(go){S.page=go.dataset.go;S.open={};render();window.scrollTo({top:0});return}
const lg=e.target.closest('[data-lang]');if(lg){S.lang=lg.dataset.lang;render();return}
const tg=e.target.closest('[data-toggle]');if(tg){const id=tg.dataset.toggle;S.open[id]=!S.open[id];
const c=tg.closest('.card');c.classList.toggle('open',S.open[id]);tg.innerHTML=`${esc(S.open[id]?t().less:t().all)} ${S.open[id]?'↑':'↓'}`}});

document.addEventListener('change',e=>{const f=e.target.closest('[data-f]');if(f){S.f[f.dataset.f]=f.value;render()}});

document.addEventListener('submit',e=>{if(e.target.id!=='valform')return;e.preventDefault();const f=e.target,T2=t();
const v={name:f.name.value.trim(),phone:f.phone.value.trim(),addr:f.addr.value.trim()};
const errs={name:v.name.length<2?T2.f.eName:'',phone:/^[0-9+\-\s()]{9,}$/.test(v.phone)?'':T2.f.ePhone,addr:v.addr.length<3?T2.f.eAddr:''};
let ok=true;for(const k in errs){f.querySelector(`[data-err="${k}"]`).textContent=errs[k];if(errs[k])ok=false}
const box=document.getElementById('valok');
if(ok){box.hidden=false;box.className='full ok';box.textContent=T2.f.sent;f.reset()}else{box.hidden=true}});

render();
