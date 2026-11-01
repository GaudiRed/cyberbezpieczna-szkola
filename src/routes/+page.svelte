<script lang="ts">
 import { onMount } from 'svelte';
 import { base } from '$app/paths';
 import '$lib/google-ui.css';
 import ScopeGuide from '$lib/ScopeGuide.svelte';
 import KnowledgeQuiz from '$lib/KnowledgeQuiz.svelte';
 import AuditPanel from '$lib/AuditPanel.svelte';
 import AnnexMatrix from '$lib/AnnexMatrix.svelte';
 import SecurityArtwork from '$lib/SecurityArtwork.svelte';
 import { features, resources, type Feature } from '$lib/content';
 let tab:'start'|'law'|'matrix'|'features'|'check'|'quiz'|'resources'='start';
 let search=''; let filter='all'; let active:Feature=features[0];
 let answers:Record<string,string>={};
 let role='dyrektor';let edition='fundamentals';
 let logoFailed=false;
 let hydrated=false;
 onMount(()=>{try{answers=JSON.parse(localStorage.getItem('cyber-guide-checks')||'{}')}catch{answers={}} hydrated=true;});
 $: shown=features.filter(f=>(filter==='all'||f.tier===filter)&&[f.title,f.risk,f.category].join(' ').toLocaleLowerCase('pl').includes(search.toLocaleLowerCase('pl')));
 $: if (shown.length > 0 && !shown.some((feature) => feature.id === active.id)) active = shown[0];
 function answer(id:string,v:string){answers={...answers,[id]:v};try{localStorage.setItem('cyber-guide-checks',JSON.stringify(answers))}catch{}}
</script>
<svelte:head><title>Cyberbezpieczna szkoła | Interaktywny poradnik</title><meta name="description" content="Interaktywny przewodnik po zabezpieczeniach szkoły i rozwiązaniach Google for Education."/></svelte:head>
<div class="shell" data-hydrated={hydrated}>
<header class="topbar">
 <div class="brand">
  <span class="project-symbol" aria-hidden="true"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 3 28 8v9c0 7-4.8 11-12 13C8.8 28 4 24 4 17V8L16 3Z" fill="#4285F4"/><path d="m10.5 16.6 4 4 7-8" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  <div><strong>Cyberbezpieczna szkoła</strong><small>Interaktywny przewodnik dla szkół i organów prowadzących</small></div>
 </div>
 <div class="topbar-right">
  <div class="gfe-identity">
   {#if logoFailed}
     <span class="logo-fallback">Google for Education</span>
    {:else}
     <picture>
      <source media="(max-width: 640px)" srcset={`${base}/brand/logo-google-for-education-vertical.png`}/>
      <img src={`${base}/brand/logo-google-for-education.png`} alt="Google for Education" loading="eager" decoding="async" onerror={()=>logoFailed=true}/>
     </picture>
    {/if}
  </div>
  <span class="status">Wersja robocza · do zatwierdzenia</span>
 </div>
</header>
<nav aria-label="Nawigacja główna">
<button class:current={tab==='start'} onclick={()=>tab='start'}>Start</button><button class:current={tab==='law'} onclick={()=>tab='law'}>Moje obowiązki</button><button class:current={tab==='matrix'} onclick={()=>tab='matrix'}>18 wymagań KSC</button><button class:current={tab==='features'} onclick={()=>tab='features'}>Zabezpieczenia</button><button class:current={tab==='check'} onclick={()=>tab='check'}>Autodiagnoza</button><button class:current={tab==='quiz'} onclick={()=>tab='quiz'}>Quiz</button><button class:current={tab==='resources'} onclick={()=>tab='resources'}>Źródła i kursy</button>
</nav>
<main>
{#if tab==='start'}
<section class="hero">
 <div class="hero-copy">
  <div class="eyebrow"><span class="eyebrow-dot"></span> BEZPIECZEŃSTWO CYFROWE W EDUKACJI</div>
  <h1>Bezpieczniejsza szkoła. <span>Prostsze działania.</span></h1>
  <p>Od wymagań KSC do konkretnych zabezpieczeń. Sprawdź, jak chronić szkolne konta, dane i urządzenia przy użyciu Google Workspace for Education oraz ChromeOS.</p>
  <div class="hero-points">
   <span><span class="mini-dot green"></span> 18 wymagań KSC</span>
   <span><span class="mini-dot blue"></span> 11 funkcji Google</span>
   <span><span class="mini-dot yellow"></span> Praktyczna autodiagnoza</span>
  </div>
  <div class="actions"><button class="primary" onclick={()=>tab='matrix'}>Poznaj wymagania KSC →</button><button class="secondary" onclick={()=>tab='check'}>Sprawdź swoją szkołę</button></div>
 </div>
 <div class="hero-visual"><SecurityArtwork /></div>
</section>
<div class="notice"><strong>Ważne:</strong> publiczne szkoły i przedszkola będące jednostkami budżetowymi są objęte KSC zgodnie z FAQ Ministerstwa Cyfryzacji. Dla podmiotów ważnych będących podmiotami publicznymi przewidziano uproszczone wymagania w załączniku nr 4. Korzystanie z Google nie oznacza automatycznej zgodności z przepisami; w innych formach organizacyjnych konieczna jest odrębna kwalifikacja.</div>
<div class="tiles">
 <article class="tile-blue"><span class="tile-icon" aria-hidden="true">§</span><span class="number">KROK 01</span><h3>Poznaj swoje obowiązki</h3><p>18 wymagań, podstawy prawne i konkretne działania dla szkoły.</p><button type="button" onclick={()=>tab='matrix'}>Zobacz wymagania →</button></article>
 <article class="tile-green"><span class="tile-icon" aria-hidden="true">✓</span><span class="number">KROK 02</span><h3>Wybierz zabezpieczenia Google</h3><p>Sprawdź bezpłatne możliwości Fundamentals i rozszerzenia Education Plus.</p><button type="button" onclick={()=>tab='features'}>Poznaj rozwiązania →</button></article>
 <article class="tile-yellow"><span class="tile-icon" aria-hidden="true">▤</span><span class="number">KROK 03</span><h3>Sprawdź gotowość szkoły</h3><p>Zapisz stan wdrożenia i przygotuj własny raport działań.</p><button type="button" onclick={()=>tab='check'}>Rozpocznij autodiagnozę →</button></article>
</div>
<section class="panel"><div class="panel-heading"><div><div class="eyebrow">TWÓJ PUNKT STARTOWY</div><h2>Dostosuj poradnik do swojej roli</h2></div><span class="panel-decoration" aria-hidden="true"><span></span><span></span><span></span><span></span></span></div><div class="formgrid"><label>Moja rola<select bind:value={role}><option value="dyrektor">Dyrektor szkoły</option><option value="admin">Administrator IT</option><option value="organ">Organ prowadzący</option><option value="nauczyciel">Nauczyciel</option></select></label><label>Korzystamy z<select bind:value={edition}><option value="fundamentals">Education Fundamentals</option><option value="plus">Education Plus</option><option value="unknown">Nie wiem / nie korzystamy</option></select></label></div><p class="small">Wybór nie jest prawną kwalifikacją szkoły. Nie przesyłamy tych informacji na serwer.</p><button class="primary" onclick={()=>{filter=edition==='plus'?'all':'fundamentals';tab='features'}}>Przeglądaj funkcje →</button></section>
{:else if tab==='law'}
<ScopeGuide />
{:else if tab==='matrix'}
<AnnexMatrix {answers} updateAnswer={answer} />
{:else if tab==='features'}
<div class="sectiontitle"><div><div class="eyebrow">KATALOG FUNKCJI</div><h1>Zabezpieczenia Google Workspace i ChromeOS</h1><p>Wybierz funkcję, aby poznać jej zastosowanie, dostępność w licencjach i konkretne korzyści dla szkoły.</p></div></div>
<div class="filters"><input aria-label="Szukaj" placeholder="Szukaj funkcji lub zagrożenia…" bind:value={search}/><select aria-label="Dostępność" bind:value={filter}><option value="all">Wszystkie funkcje</option><option value="fundamentals">Education Fundamentals</option><option value="plus">Education Plus</option><option value="chromeos">ChromeOS, zabezpieczenia systemowe</option><option value="upgrade">ChromeOS Education Upgrade</option></select></div>
<div class="catalog"><div class="entries">{#each shown as f}<button class:selected={active.id===f.id} onclick={()=>active=f}><strong>{f.title}</strong><small>{f.category} · {f.tier==='fundamentals'?'Fundamentals, bez dodatkowej opłaty':f.tier==='plus'?'Płatna edycja Education Plus':f.tier==='upgrade'?'Oddzielna płatna licencja ChromeOS Education Upgrade':'Zabezpieczenie systemowe'}</small></button>{/each}{#if shown.length===0}<p>Brak wyników.</p>{/if}</div>{#if shown.length > 0}<article class="detail"><span class="tag">{active.tier==='plus'?'Płatna funkcja':active.tier==='fundamentals'?'Fundamentals':active.tier==='upgrade'?'Płatna licencja ChromeOS Education Upgrade':'Wbudowane ChromeOS'}</span><h2>{active.title}</h2><h3>Przed czym pomaga chronić?</h3><p>{active.risk}</p><h3>Co zyskuje szkoła dzięki Google?</h3><p>{active.help}</p><h3>Co powinna zrobić szkoła?</h3><ol>{#each active.steps as step}<li>{step}</li>{/each}</ol><h3>Powiązanie z przepisami</h3><p>{active.legal}</p><p class="small">Powiązanie informacyjne, nie certyfikacja zgodności z określonym przepisem.</p><a href={active.link} target="_blank" rel="noopener noreferrer">Przejdź do instrukcji Google: {active.source} ↗</a><div class="answer"><strong>Stan w naszej szkole</strong><select value={answers[active.id]||'unknown'} onchange={e=>answer(active.id,e.currentTarget.value)}><option value="unknown">Nie sprawdzono</option><option value="done">Wdrożone i sprawdzone</option><option value="todo">Do wdrożenia</option><option value="na">Nie dotyczy</option></select></div></article>{:else}<p class="no-selection">Wybierz inny filtr lub zmień wyszukiwaną frazę.</p>{/if}</div>
{:else if tab==='check'}
<AuditPanel {answers} updateAnswer={answer} />
{:else if tab==='quiz'}
<KnowledgeQuiz />
{:else}
<div class="eyebrow">MATERIAŁY ŹRÓDŁOWE</div><h1>Oficjalne dokumenty i szkolenia</h1><p>Materiały do wdrożenia, edukacji i weryfikacji działań. Bezpłatne zasoby Google i oficjalne dokumenty.</p><div class="resourcegrid">{#each resources as r}<article><small>{r.access}</small><h2>{r.title}</h2><p>{r.detail}</p><a target="_blank" rel="noopener noreferrer" href={r.url}>Otwórz źródło ↗</a></article>{/each}</div>
{/if}
</main><footer><strong>Cyberbezpieczna szkoła</strong><span>Praktyczny poradnik cyberbezpieczeństwa z wykorzystaniem Google for Education.</span></footer></div>
<style>
:global(*){box-sizing:border-box}:global(body){margin:0;background:#f5f7fb;color:#17243d;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}:global(button),:global(select),:global(input){font:inherit}:global(button){cursor:pointer}.shell{max-width:1200px;margin:auto;padding:0 24px}header{display:flex;justify-content:space-between;align-items:center;padding:25px 0;border-bottom:1px solid #e4e8ef}.brand{display:flex;align-items:center;gap:12px}.brand strong,.brand small{display:block}.brand strong{font-size:19px}.brand small{font-size:12px;color:#69768b;margin-top:3px}.shield{display:grid;place-items:center;background:#1b66cc;border-radius:13px;width:46px;height:46px;color:#fff;font-size:30px}.status,.tag{font-size:12px;border-radius:999px;background:#e8f0fe;color:#2153a3;padding:8px 12px}nav{display:flex;gap:7px;border-bottom:1px solid #e4e8ef;padding:12px 0;overflow:auto}nav button{border:0;background:transparent;color:#55647a;padding:12px 17px;border-radius:9px;white-space:nowrap}nav button.current{background:#e6efff;color:#1756b9;font-weight:700}main{padding:38px 0 70px;min-height:65vh}h1{font-size:clamp(30px,4vw,48px);line-height:1.12;letter-spacing:-1.5px;margin:12px 0 17px}h2{font-size:22px;letter-spacing:-.5px}h3{font-size:15px;margin:24px 0 8px}p{line-height:1.65;color:#596982}.hero{background:linear-gradient(120deg,#eaf2ff,#fff);border:1px solid #dfe9f8;padding:48px;border-radius:22px;max-width:100%}.hero h1{max-width:720px}.hero p{max-width:680px;font-size:17px}.eyebrow{font-weight:800;color:#2863b8;letter-spacing:2px;font-size:12px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.primary,.secondary{border-radius:9px;padding:13px 18px;font-weight:700;border:1px solid #1c5ebd}.primary{background:#1c5ebd;color:white}.secondary{background:white;color:#2058aa}.notice{padding:18px 22px;border-left:4px solid #e0a32b;background:#fff9e9;margin:24px 0;color:#715829;line-height:1.6}.tiles,.resourcegrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.tiles article,.resourcegrid article,.panel,.detail{background:white;border:1px solid #e2e7ef;border-radius:15px;padding:24px}.number{font-size:13px;color:#2162b5;font-weight:800}.panel{margin-top:24px}.formgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.formgrid label{font-weight:700;font-size:14px}.formgrid select{display:block;margin:9px 0 15px;width:100%}.small{font-size:12px;color:#69768b}select,input{background:white;border:1px solid #cbd5e1;border-radius:9px;padding:12px;color:#24324c}.filters{display:flex;gap:12px;margin:24px 0}.filters input{flex:1}.catalog{display:grid;grid-template-columns:330px 1fr;gap:20px}.entries{display:flex;flex-direction:column;gap:8px}.entries button{text-align:left;border:1px solid #dfe5ef;border-radius:12px;padding:17px;background:white;color:#192c47}.entries button.selected{background:#e9f2ff;border-color:#3182d9}.entries small,.checkrow small{display:block;font-size:12px;color:#708198;margin-top:7px;line-height:1.5}.detail ol{line-height:1.8;color:#53657c;padding-left:21px}.detail a,.resourcegrid a{color:#175ebf;font-weight:700;text-decoration:none}.answer{display:flex;justify-content:space-between;align-items:center;background:#f1f6fd;border-radius:10px;padding:14px;margin-top:25px;gap:12px}.summary{display:flex;align-items:center;gap:15px;background:#e8f0ff;border-radius:12px;padding:22px;margin:24px 0 12px}.summary strong{font-size:29px}.progress{height:9px;background:#e1e8f2;border-radius:99px;overflow:hidden}.progress div{height:100%;background:#2b73d2}.checklist{margin-top:20px}.checkrow{display:flex;justify-content:space-between;align-items:center;padding:17px 12px;border-bottom:1px solid #dfe6f0;gap:15px}.resourcegrid article{min-height:210px}.resourcegrid small{color:#2869a9;font-weight:700}footer{border-top:1px solid #e1e8f0;padding:26px 0;display:flex;justify-content:space-between;gap:20px;color:#69768b;font-size:12px}footer strong{color:#17243d}@media(max-width:720px){.shell{padding:0 14px}header{align-items:flex-start;gap:8px}.status{display:none}.hero{padding:25px}.tiles,.resourcegrid,.formgrid,.catalog{grid-template-columns:1fr}.filters,.answer,.checkrow,footer{flex-direction:column;align-items:stretch}.catalog{gap:13px}main{padding-top:25px}}@media print{header,nav,.actions,.filters,footer,.entries,.notice{display:none!important}body{background:white}.shell{max-width:none}.catalog{display:block}}

/* Stylistyka prototypu do zatwierdzenia zgodnie z zasadami Google */
:global(body){background:#F8FAFD;color:#202124;font-family:Arial,Roboto,system-ui,-apple-system,"Segoe UI",sans-serif}
:global(button:focus-visible),:global(a:focus-visible),:global(select:focus-visible),:global(input:focus-visible){outline:3px solid #4285F4;outline-offset:3px}
.shell{max-width:1300px;padding-left:32px;padding-right:32px}
.topbar{padding:13px 0 17px;border-bottom:1px solid #E5EAF2;gap:20px;min-height:106px}
.topbar-right{display:flex;align-items:center;gap:17px;min-width:0}
.brand{gap:14px}.brand strong{font-size:20px;letter-spacing:-.35px;color:#202124}
.brand small{font-size:12px;color:#5F6368;margin-top:5px}
.project-symbol{width:52px;height:52px;border-radius:17px;display:grid;place-items:center;background:#E8F0FE;flex:none}
.gfe-identity{background:#fff;border:1px solid #E5EAF2;border-radius:13px;display:grid;place-items:center;overflow:hidden;width:162px;height:72px;flex:none}
.gfe-identity img{width:158px;height:88px;object-fit:cover;object-position:center}
.status{background:#F3F7FE;color:#3569AD;border:1px solid #E4EDF9;padding:8px 11px;line-height:1.4}
nav{border-bottom:1px solid #DFE5ED;padding:9px 0;gap:6px;scrollbar-width:thin}
nav button{font-size:13px;font-weight:600;color:#5F6368;border-radius:100px;padding:11px 17px;transition:background .15s ease,color .15s ease}
nav button.current{background:#E8F0FE;color:#1967D2}
nav button:hover{background:#F0F4FA}
main{padding:32px 0 68px}
.hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(340px,.9fr);gap:12px;align-items:center;border:1px solid #DFE8F7;border-radius:28px;padding:38px 39px 42px;background:linear-gradient(120deg,#EEF5FF 0%,#FAFCFF 65%,#FFFFFF 100%);position:relative;overflow:hidden}
.hero h1{font-size:clamp(38px,4.2vw,61px);letter-spacing:-2.6px;line-height:1.08;color:#202124;font-weight:750;max-width:650px}
.hero h1 span{color:#1967D2;display:block}
.hero p{color:#485569;max-width:620px;font-size:16px;line-height:1.72}
.hero-visual{width:100%;display:flex;justify-content:center;align-items:center;min-width:0}
.hero .eyebrow{font-size:11px;letter-spacing:1.4px;color:#1967D2;display:flex;align-items:center;gap:8px}
.eyebrow-dot{width:8px;height:8px;border-radius:50%;background:#4285F4;box-shadow:14px 0 #EA4335,28px 0 #FBBC04,42px 0 #34A853;margin-right:43px;flex:none}
.hero-points{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:20px 0 7px}
.hero-points>span{display:flex;align-items:center;gap:7px;font-size:12px;color:#4A596E;font-weight:650}
.mini-dot{width:8px;height:8px;border-radius:50%;display:inline-block}.mini-dot.green{background:#34A853}.mini-dot.blue{background:#4285F4}.mini-dot.yellow{background:#FBBC04}
.primary,.secondary{border-radius:100px;padding:13px 22px;font-size:13px;font-weight:700;transition:transform .15s ease,box-shadow .15s ease}
.primary{background:#1967D2;border:1px solid #1967D2;color:#fff}
.secondary{background:#fff;border:1px solid #D9E2EF;color:#1967D2}
.primary:hover,.secondary:hover{transform:translateY(-1px);box-shadow:0 4px 13px rgba(32,65,120,.10)}
.notice{border:1px solid #F3E0B0;border-left:4px solid #F9AB00;border-radius:12px;padding:16px 22px;color:#625332;background:#FFFBF1;margin:22px 0 25px;font-size:13px}
.tiles{gap:19px}.tiles article{border:1px solid #E3EAF3;border-radius:20px;padding:26px;position:relative;box-shadow:0 5px 20px rgba(40,70,100,.025);display:flex;flex-direction:column;align-items:start;min-height:264px}
.tiles article.tile-blue{border-top:4px solid #4285F4}.tiles article.tile-green{border-top:4px solid #34A853}.tiles article.tile-yellow{border-top:4px solid #FBBC04}
.tile-icon{width:41px;height:41px;border-radius:13px;display:grid;place-items:center;font-size:21px;font-weight:700;margin-bottom:19px;color:#1967D2;background:#E8F0FE}
.tile-green .tile-icon{color:#188038;background:#E6F4EA}.tile-yellow .tile-icon{color:#B06000;background:#FEF7E0}
.tiles .number{font-size:10px;letter-spacing:1.4px;color:#6C788D}
.tiles h3{margin:11px 0 7px;font-size:17px;line-height:1.35;color:#253246}
.tiles p{margin:0 0 17px;font-size:13px;line-height:1.6}
.tiles button{margin-top:auto;background:none;border:0;color:#1967D2;padding:0;font-size:12px;font-weight:750;cursor:pointer}
.panel{border-radius:20px;padding:28px;margin-top:22px;border:1px solid #DFE6F1}
.panel-heading{display:flex;justify-content:space-between;align-items:center;gap:12px}.panel-heading h2{margin:8px 0 24px;font-size:24px}
.panel-decoration{display:flex;gap:5px}.panel-decoration span{width:11px;height:11px;border-radius:50%}.panel-decoration span:nth-child(1){background:#4285F4}.panel-decoration span:nth-child(2){background:#EA4335}.panel-decoration span:nth-child(3){background:#FBBC04}.panel-decoration span:nth-child(4){background:#34A853}
.panel .formgrid{max-width:800px}
.panel select,main select{border-color:#DAE1EA}
.catalog .detail,.entries button,.resourcegrid article{box-shadow:0 4px 20px rgba(25,65,110,.025)}
.entries button.selected{border-color:#4285F4;background:#E8F0FE}
.tag{background:#E8F0FE;color:#1967D2}
footer{color:#68778A;line-height:1.65}
@media(max-width:980px){.hero{grid-template-columns:1fr;gap:0}.hero-visual{max-width:430px;margin:0 auto}.hero h1{font-size:clamp(36px,6vw,54px)}.topbar-right{gap:9px}.status{display:none}}
@media(max-width:720px){.shell{padding-left:16px;padding-right:16px}.topbar{padding:12px 0;min-height:90px}.brand small{font-size:11px;max-width:230px}.brand strong{font-size:17px}.project-symbol{width:44px;height:44px;border-radius:13px}.topbar-right{flex:none}.gfe-identity{width:95px;height:63px;border-radius:10px}.gfe-identity img{width:108px;height:70px}.hero{padding:27px 22px 21px;border-radius:22px}.hero h1{letter-spacing:-1.6px;font-size:36px}.hero p{font-size:14px}.hero-visual{max-width:340px}.hero-points{gap:10px}.tiles{grid-template-columns:1fr;gap:12px}.tiles article{min-height:0;padding:22px}.tile-icon{margin-bottom:14px}.panel{padding:21px}.panel-heading h2{font-size:21px}}
@media(max-width:450px){.gfe-identity{width:81px;height:54px}.gfe-identity img{width:98px;height:62px}.brand small{font-size:10px;max-width:190px}.brand strong{font-size:15px}.hero h1{font-size:31px}.actions{gap:8px}.actions button{width:100%}.hero-points>span{font-size:11px}}
@media print{.hero-visual,.topbar-right,.hero-points,.tile-icon{display:none!important}}

.logo-fallback{font-size:13px;color:#35659c;font-weight:700;line-height:1.3;text-align:center;padding:0 7px}
.gfe-identity{width:239px;height:88px;background:transparent;border:0;overflow:visible;flex:none}
.gfe-identity picture{display:block;width:100%;height:100%}
.gfe-identity img{object-fit:contain;display:block;width:100%;height:100%}
@media(max-width:720px){
 .topbar{flex-wrap:wrap;gap:4px}
 .brand{width:100%;min-width:0}
 .topbar-right{width:100%;justify-content:flex-end}
 .gfe-identity{width:152px;height:77px}
}
@media(max-width:450px){
 .gfe-identity{width:132px;height:70px}
}
.resourcegrid article{border-radius:19px}
.resourcegrid article:nth-child(4n+1){border-top:4px solid #4285f4}
.resourcegrid article:nth-child(4n+2){border-top:4px solid #34a853}
.resourcegrid article:nth-child(4n+3){border-top:4px solid #fbbc04}
.resourcegrid article:nth-child(4n){border-top:4px solid #ea4335}
.resourcegrid a{display:inline-block;margin-top:8px;font-size:13px}
.catalog .detail{border-radius:20px}
.catalog .detail .tag{background:#e8f0fe;color:#174ea6;font-weight:700}
.catalog .detail h2{margin-top:22px}
.catalog .detail h3{margin-top:22px;color:#202124}
.catalog .detail ol li{margin-bottom:7px}
.catalog .entries button{transition:background .15s,border-color .15s}
.catalog .entries button:hover{background:#f5f9ff;border-color:#b2cef3}
.catalog .answer{border-radius:14px;background:#edf4ff}
.catalog .answer strong{font-size:13px}
.catalog .answer select{max-width:100%}
@media(max-width:720px){.catalog .entries{max-height:330px;overflow-y:auto}.catalog .answer{align-items:stretch}}
</style>