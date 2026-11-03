<script lang="ts">
 import { annexRequirements, matchedFeatures, LEGAL_SOURCE, ANNEX_PDF, MINISTRY_FAQ, type Requirement } from '$lib/requirements';
 import type { Feature } from '$lib/content';
 import { practicalAdvice } from '$lib/practicalAdvice';
 import { googleBridges } from '$lib/googleBridges';
 export let answers: Record<string,string> = {};
 export let updateAnswer: (id:string, value:string)=>void;
 let area='Wszystkie';
 let query='';
 let selected:Requirement=annexRequirements[0];
 let scope:'public'|'other'|'unknown'='public';
 let showOnlyOpen=false;
 const tierLabel: Record<Feature['tier'],string>={
   fundamentals:'Fundamentals · bez dodatkowej opłaty',
   plus:'Education Plus · płatne',
   chromeos:'ChromeOS · wbudowane',
   upgrade:'ChromeOS Education Upgrade · płatne',
   public:'Publicznie bezpłatne'
 };
 $: visible = annexRequirements.filter((r) =>
   (area==='Wszystkie'||r.area===area)&&
   (!showOnlyOpen||!['done','na'].includes(answers['annex:'+r.id]||'unknown'))&&
   (r.title+' '+r.summary+' '+r.point).toLocaleLowerCase('pl').includes(query.toLocaleLowerCase('pl'))
 );
 $: completed = annexRequirements.filter((r)=>answers['annex:'+r.id]==='done').length;
 $: pending = annexRequirements.filter((r)=>answers['annex:'+r.id]==='todo').length;
 const categories=['Wszystkie','Dostęp','Dane','Urządzenia','Poczta','Ludzie','Procedury'];
</script>

<section class="matrix">
 <div class="eyebrow">ZAŁĄCZNIK NR 4 · KSC</div>
 <h1>18 wymagań, konkretne działania</h1>
 <p>Wybierz wymaganie i sprawdź, które funkcje Google for Education mogą w jego realizacji pomóc. Obok opisujemy czynności, za które nadal odpowiada szkoła lub jej organ prowadzący.</p>
 <div class="applicability">
  <label for="schoolstatus"><strong>Jaką placówkę analizujesz?</strong></label>
  <select id="schoolstatus" bind:value={scope}>
   <option value="public">Publiczna szkoła lub przedszkole będące jednostką budżetową</option>
   <option value="other">Placówka o innej formie organizacyjnej</option>
   <option value="unknown">Nie znam formy organizacyjnej</option>
  </select>
  {#if scope==='public'}
   <p>Ministerstwo Cyfryzacji potwierdza w FAQ (pyt. 1.16), że publiczne szkoły i przedszkola będące jednostkami budżetowymi są podmiotami KSC. Uproszczone wymagania dotyczą podmiotów ważnych będących podmiotami publicznymi, zgodnie z art. 8 ust. 3 i załącznikiem nr 4. Sprawdź dokładny status i odpowiedzialność organizacyjną swojej placówki.</p>
  {:else}
   <p>Nie przesądzamy stosowania załącznika nr 4 do tej placówki. Potwierdź jej status prawny i kategorię w KSC przed traktowaniem wymagań jako obowiązkowych. Możesz używać kart jako dobrych praktyk.</p>
  {/if}
  <div class="links"><a href={LEGAL_SOURCE} target="_blank" rel="noopener noreferrer">Ustawa i nowelizacja ↗</a><a href={MINISTRY_FAQ} target="_blank" rel="noopener noreferrer">FAQ Ministerstwa Cyfryzacji ↗</a></div>
 </div>
 <div class="numbers">
  <div><strong>18</strong><span>wymagań w części I</span></div><div><strong>{completed}</strong><span>potwierdzonych przez użytkownika</span></div><div><strong>{pending}</strong><span>oznaczonych do działania</span></div>
 </div>
 <div class="toolbar">
  <label><span>Szukaj wymagania</span><input placeholder="np. kopie zapasowe lub dostęp" bind:value={query}/></label>
  <label><span>Obszar</span><select bind:value={area}>{#each categories as category}<option value={category}>{category}</option>{/each}</select></label>
  <label class="toggle"><input type="checkbox" bind:checked={showOnlyOpen}/> Pokaż niesprawdzone i niezrealizowane</label>
 </div>
 <div class="layout">
  <div class="list" aria-label="Wymagania załącznika nr 4">
   {#each visible as requirement}
    <button type="button" class:chosen={selected.id===requirement.id} onclick={()=>selected=requirement}>
     <span class="number">Pkt {requirement.point}</span>
     <span class="name">{requirement.title}</span>
     {#if answers['annex:'+requirement.id]==='done'}<span class="state">Sprawdzone</span>{:else if answers['annex:'+requirement.id]==='todo'}<span class="state todo">Do działania</span>{/if}
    </button>
   {/each}
   {#if visible.length===0}<div class="empty">Brak wyników. Zmień filtry.</div>{/if}
  </div>
  <article class="details">
    <div class="meta"><span>Załącznik nr 4 · część I · pkt {selected.point}</span><span>{selected.area}</span></div>
    <h2>{selected.title}</h2>
    <div class="section"><h3>Co wynika z przepisu?</h3><p>{selected.summary}</p><a href={ANNEX_PDF} target="_blank" rel="noopener noreferrer">Otwórz oficjalny tekst przepisu w Dzienniku Ustaw ↗</a></div>
    <div class="quick-actions" aria-label="Konkretne kroki">
      <h3>Co zrobić? Krótka lista</h3>
      {#if practicalAdvice[selected.id].google.length}
        <div class="quick-group">
          <strong>W Google for Education</strong>
          <ul class="todo-list">
            {#each practicalAdvice[selected.id].google as step}
              <li><span class="checkmark" aria-hidden="true"></span><span>{step}</span></li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if practicalAdvice[selected.id].school.length}
        <div class="quick-group">
          <strong>Po stronie szkoły {practicalAdvice[selected.id].google.length ? 'lub innych systemów' : ''}</strong>
          <ul class="todo-list">
            {#each practicalAdvice[selected.id].school as step}
              <li><span class="checkmark" aria-hidden="true"></span><span>{step}</span></li>
            {/each}
          </ul>
        </div>
      {/if}
      <p class="proof"><strong>Co zachować jako potwierdzenie?</strong> {practicalAdvice[selected.id].proof}</p>
    </div>
    {#if selected.point===1 || selected.point===2 || selected.point===3 || selected.point===4 || selected.point===13}
      <div class="section">
        <h3>Sprawdź w dokumentacji Google</h3>
        {#if selected.point===1}
          <p><a href="https://support.google.com/chrome/a/answer/9286924?hl=en" target="_blank" rel="noopener noreferrer">Jak wyeksportować listę zarządzanych przeglądarek, wersji i rozszerzeń z Chrome Enterprise Core ↗</a></p>
          <p class="small">Ta lista obejmuje zarejestrowane przeglądarki i ich informacje techniczne, nie cały sprzęt i wszystkie programy szkoły.</p>
        {:else if selected.point===2}
          <p><a href="https://support.google.com/chrome/a/answer/10025748?hl=en" target="_blank" rel="noopener noreferrer">Raport wersji przeglądarek Chrome i ChromeOS ↗</a></p>
        {:else if selected.point===3}
          <p><a href="https://workspace.google.com/learn-more/security/security-whitepaper/asset-protection/" target="_blank" rel="noopener noreferrer">Google Workspace Security Whitepaper, mechanizmy ochrony danych ↗</a></p>
          <p class="small">Dokumentacja dostawcy stanowi materiał wejściowy. Szkoła powinna też udokumentować własną konfigurację i odpowiedzialności.</p>
        {:else if selected.point===4}
          <p><a href="https://support.google.com/a/answer/7281227?hl=en" target="_blank" rel="noopener noreferrer">Kontrola dostępu aplikacji zewnętrznych do danych Workspace (OAuth) ↗</a></p>
          <p class="small">Logowanie przez Google nie oznacza automatycznego przeglądu uprawnień w każdej aplikacji zewnętrznej.</p>
        {:else if selected.point===13}
          <p><a href="https://workspace.google.com/learn-more/security/security-whitepaper/asset-protection/" target="_blank" rel="noopener noreferrer">Ochrona przed phishingiem i malware w Gmail, dokumentacja Google ↗</a></p>
          <p class="small">Podawany przez Google poziom blokowania ponad 99,9% zagrożeń dotyczy Gmail, nie wszystkich urządzeń i usług w szkole.</p>
        {/if}
      </div>
    {/if}
    {#if matchedFeatures(selected).length}
      <div class="section">
        <h3>Funkcje Google i aktualna dokumentacja</h3>
        <div class="feature-links">
          {#each matchedFeatures(selected) as feature}
            <div class="feature-link">
              <strong>{feature.title}</strong>
              <small>{tierLabel[feature.tier]}</small>
              <a href={feature.link} target="_blank" rel="noopener noreferrer">Dokumentacja Google ↗</a>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if selected.point===10}
      <section class="backup-workarounds" aria-label="Możliwości wsparcia tworzenia kopii zapasowych">
        <h3>Jak Google może wesprzeć tworzenie kopii?</h3>
        <div class="backup-grid">
          <article>
            <span>GOOGLE WORKSPACE</span>
            <h4>Eksport danych organizacji</h4>
            <p>Google Workspace udostępnia narzędzie eksportowania danych. Zakres i sposób wykonania kopii należy dobrać do potrzeb szkoły, pamiętając, że sam eksport nie zapewnia regularnego backupu.</p>
            <a href="https://knowledge.workspace.google.com/admin/migrate/export-all-your-organizations-data" target="_blank" rel="noopener noreferrer">Aktualna dokumentacja Google ↗</a>
          </article>
          <article>
            <span>GOOGLE CLOUD</span>
            <h4>Osobne miejsce przechowywania kopii</h4>
            <p>Google Cloud Storage może służyć do przechowywania archiwów. Wymaga to oceny separacji, dostępu, kosztów i sposobu odzyskiwania danych.</p>
            <a href="https://docs.cloud.google.com/storage/docs/protection-backup-recovery-overview" target="_blank" rel="noopener noreferrer">Możliwości ochrony w Cloud Storage ↗</a>
          </article>
          <article>
            <span>ROZWIĄZANIE DOPASOWANE DO SZKOŁY</span>
            <h4>Regularny backup i test odtworzenia</h4>
            <p>Szkoła powinna objąć kopiami odpowiednie dane oraz systemy spoza Google. Częstotliwość i sposób separacji warto ustalić po analizie środowiska z administratorem lub partnerem.</p>
            <a href="#partnerzy">Porozmawiaj z partnerem ↗</a>
          </article>
        </div>
        <p class="backup-caution"><strong>Ważne:</strong> Dysk Google, historia wersji i Vault nie stanowią samodzielnie kompletnego rozwiązania backupowego. Dostępność funkcji eksportu i warunki usług mogą się zmieniać, dlatego szczegóły należy sprawdzać w aktualnej dokumentacji. Żaden z wariantów nie potwierdza automatycznie spełnienia wymagań KSC.</p>
      </section>
    {:else if googleBridges[selected.id]}
      <section class="google-bridge" aria-label="Pomocnicze rozwiązanie Google">
        <div class="bridge-tag">Pomocne narzędzie Google</div>
        <h3>{googleBridges[selected.id].title}</h3>
        <p><strong>Możliwe zastosowanie:</strong> {googleBridges[selected.id].use}</p>
        <p><strong>Co wymaga dodatkowej analizy:</strong> {googleBridges[selected.id].outside}</p>
        <a href={googleBridges[selected.id].guideUrl} target="_blank" rel="noopener noreferrer">Dokumentacja i wskazówki ↗</a>
      </section>
    {/if}
    {#if selected.point===17}
      <div class="section"><strong>Bezpłatne materiały do szkolenia</strong><p><a href="https://safety.google/intl/pl/" target="_blank" rel="noopener noreferrer">Google Safety Center ↗</a> · <a href="https://edu.google.com/learning-center/" target="_blank" rel="noopener noreferrer">Google Learning Center ↗</a></p></div>
    {/if}
    <details class="fineprint">
      <summary>Co jeszcze warto wiedzieć?</summary>
      <p><strong>Granica działania Google:</strong> {selected.limit}</p>
      <p><strong>Dokumentacja:</strong> {selected.evidence}</p>
    </details>
    <p class="partner-help"><strong>Każde środowisko szkolne jest inne.</strong> Wybór i zakres zabezpieczeń należy dopasować do wykorzystywanych systemów oraz potrzeb placówki. Potrzebujesz pomocy we wdrożeniu? <a href="#partnerzy">Skontaktuj się z Partnerem Google for Education</a>.</p>
    <div class="evaluate"><label for="requirement-status">Stan realizacji w naszej szkole</label>
     <select id="requirement-status" value={answers['annex:'+selected.id]||'unknown'} onchange={(e)=>updateAnswer('annex:'+selected.id,e.currentTarget.value)}>
      <option value="unknown">Nie sprawdzono</option><option value="todo">Wymaga działania</option><option value="done">Wdrożone i zweryfikowane</option><option value="na">Nie dotyczy (wymaga uzasadnienia)</option>
     </select>
     <p>Odpowiedź jest deklaracją użytkownika. Nie oznacza automatycznie spełnienia przepisów.</p>
    </div>
  </article>
 </div>
 <div class="disclaimer">
  <strong>Zakres:</strong> przedstawiamy obowiązki z części I załącznika nr 4, a nie wszystkie przepisy KSC. W części II załącznika są rozwiązania dodatkowe, natomiast część III przewiduje przegląd co najmniej raz w roku lub w sytuacjach wskazanych w przepisie, a część IV dokumentowanie realizacji działań. Funkcje Google mają charakter wspierający i nie zastępują systemu zarządzania bezpieczeństwem informacji.
 </div>
</section>
<style>
.matrix{max-width:1180px}.eyebrow{font-size:12px;color:#265cb4;letter-spacing:2px;font-weight:800}h1{font-size:clamp(30px,4vw,44px);margin:12px 0}p{line-height:1.58;color:#5b6980}.applicability{background:#eaf2ff;border-left:4px solid #2867ba;border-radius:11px;padding:22px;margin:24px 0}.applicability label{display:block;margin-bottom:7px}.applicability select{width:100%}.links{display:flex;gap:16px;flex-wrap:wrap}.links a,.section a{color:#185db7;font-weight:650}.numbers{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0}.numbers div{background:#fff;border:1px solid #e0e7f0;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px}.numbers strong{font-size:28px}.numbers span{color:#64748b;font-size:12px}.toolbar{display:flex;align-items:end;gap:12px;flex-wrap:wrap;margin:22px 0}.toolbar label{display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:650}.toolbar label:first-child{flex:1}.toolbar .toggle{flex-direction:row;align-items:center;padding:12px}.toolbar .toggle input{width:auto}.toolbar select,.toolbar input,.applicability select,.evaluate select{border:1px solid #cbd5e1;border-radius:8px;padding:11px;background:#fff;color:#243454;max-width:100%}.layout{display:grid;grid-template-columns:minmax(240px,350px) minmax(0,1fr);gap:17px;align-items:start}.list{display:flex;flex-direction:column;gap:6px;max-height:760px;overflow:auto}.list button{text-align:left;border:1px solid #dce4ed;background:white;border-radius:11px;padding:13px 15px;display:flex;flex-direction:column;align-items:start;gap:5px;color:#18283f;cursor:pointer}.list button.chosen{background:#e9f2ff;border-color:#2770cf}.list .number{font-size:11px;font-weight:800;color:#2966bb}.list .name{font-weight:680}.state{font-size:11px;color:#227a55}.state.todo{color:#a25b0b}.details{background:white;border:1px solid #dbe5ef;border-radius:15px;padding:24px;min-width:0}.details h2{font-size:26px;margin:12px 0}.meta{font-size:12px;font-weight:700;color:#496d9f;display:flex;gap:14px;flex-wrap:wrap}.section{border-top:1px solid #edf0f5;padding:17px 0}.section h3{font-size:15px;margin:8px 0}.section p{margin:9px 0}.product{background:#f4f8fd;border:1px solid #e1e9f2;border-radius:10px;padding:14px;margin:10px 0}.product strong{display:block}.product span{display:block;font-size:12px;font-weight:700;color:#275b9b;margin-top:6px}.product p{font-size:13px}.alert{background:#fff6e8;padding:12px;border-radius:8px}.evaluate{background:#eaf2ff;border-radius:10px;padding:15px;display:flex;flex-direction:column;gap:8px}.evaluate label{font-weight:700}.evaluate p{font-size:12px;margin:0}.disclaimer{background:#fff9e9;border-left:3px solid #d39b28;padding:17px;margin-top:25px;font-size:13px;line-height:1.5;color:#64532d}.empty{padding:18px;color:#64748b}@media(max-width:760px){.layout{grid-template-columns:1fr}.numbers{grid-template-columns:1fr}.list{max-height:280px}.toolbar label{width:100%}.details{padding:18px}}@media print{.toolbar,.list,.numbers,.evaluate{display:none!important}.layout{display:block}.details{border:0}.disclaimer{page-break-before:avoid}}

.limitation{padding:17px 19px;border-radius:14px;background:#f5f9ff;border-left:3px solid #4285f4;margin-top:16px}
.limitation h3{margin-top:9px}
.limitation p{line-height:1.6}

.google-support>.partner-help{background:#e8f0fe;border-radius:12px;padding:14px 16px;color:#254974;margin-top:15px}
.feature-list{list-style:none;margin:14px 0;padding:0;display:grid;gap:10px}
.feature-item{background:#f7faff;border:1px solid #dfe7f4;border-radius:14px;padding:15px 17px}
.feature-item strong{display:block;color:#202124;line-height:1.45}
.feature-item .edition{font-weight:700;color:#225d9e;font-size:12px;display:block;margin-top:5px}
.feature-item p{margin:9px 0 5px;font-size:13px;line-height:1.55}
.feature-item a{font-size:12px}

.quick-actions{background:#f8fbff;border:1px solid #dae7f8;border-radius:16px;padding:20px;margin:17px 0}
.quick-actions h3{font-size:18px;margin:0 0 18px;color:#202124}
.quick-group+.quick-group{margin-top:17px}
.quick-group>strong{color:#2154a4;font-size:14px}
.todo-list{list-style:none;padding:0;margin:10px 0;display:flex;flex-direction:column;gap:11px}
.todo-list li{display:flex;align-items:flex-start;gap:11px;margin:0;color:#26364c;line-height:1.5;font-size:14px}
.checkmark{display:inline-block;width:17px;height:17px;border:2px solid #4c83d6;border-radius:5px;flex:none;margin-top:3px;background:#fff}
.proof{padding:12px 15px;margin:17px 0 0!important;background:#e9f5ec;border-radius:10px;color:#28543c!important;font-size:13px}
.feature-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:11px;margin:11px 0}
.feature-link{border:1px solid #e0e7ee;background:#fff;border-radius:11px;padding:14px;display:flex;flex-direction:column;gap:8px}
.feature-link strong{font-size:13px;color:#29394f;line-height:1.4}
.feature-link small{color:#60758b;font-size:11px}
.feature-link a{font-size:12px}
.fineprint{border:1px solid #e2e9f1;border-radius:10px;padding:12px 15px;margin:18px 0}
.fineprint summary{cursor:pointer;font-weight:650;color:#4c5b70}
.fineprint p{font-size:13px}
.partner-help{font-size:13px;background:#f1f7ff;border-radius:10px;padding:13px 15px}
.partner-help a{font-weight:700}


.backup-workarounds{padding:19px;background:#f1f7ff;border:1px solid #d8e6f6;border-radius:16px;margin:20px 0}
.backup-workarounds>h3{font-size:17px;margin:0 0 15px}
.backup-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.backup-grid article{border:1px solid #dce6f3;background:#fff;padding:17px;border-radius:13px;display:flex;flex-direction:column;gap:10px}
.backup-grid article>span{font-size:10px;letter-spacing:.06em;font-weight:800;color:#1e5ca7}
.backup-grid h4{margin:0;font-size:15px;color:#24364d}
.backup-grid p{font-size:13px;margin:0;line-height:1.55}
.backup-grid a{font-size:12px;font-weight:700;margin-top:auto}
.backup-caution{font-size:12px;line-height:1.55;background:#fff9ec;color:#624b28!important;border-left:3px solid #f9ab00;padding:12px 14px;border-radius:8px;margin:16px 0 0!important}
@media(max-width:1030px){.backup-grid{grid-template-columns:1fr}}

.google-bridge{margin:17px 0;padding:19px;background:#f3f9f4;border-left:4px solid #34a853;border-radius:12px}
.google-bridge .bridge-tag{font-weight:800;color:#187a3d;font-size:11px;letter-spacing:.07em}
.google-bridge h3{margin:8px 0;font-size:17px}
.google-bridge p{font-size:13px;margin:9px 0;line-height:1.55}
.google-bridge a{display:inline-block;margin-top:5px;font-size:13px;font-weight:700}
.backup-law{font-size:12px;background:#fff;border-left:3px solid #4285f4;padding:12px 14px;border-radius:8px}
.backup-law a,.backup-caution a{font-weight:700}
</style>
