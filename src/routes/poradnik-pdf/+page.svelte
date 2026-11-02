<script lang="ts">
  import { base } from '$app/paths';
  import SecurityArtwork from '$lib/SecurityArtwork.svelte';
  import { features } from '$lib/content';
  import { annexRequirements, LEGAL_SOURCE, MINISTRY_FAQ } from '$lib/requirements';
  import { practicalAdvice } from '$lib/practicalAdvice';
  import { educationPartners } from '$lib/partners';
  import { googleBridges } from '$lib/googleBridges';
  import '$lib/print-guide.css';

  const requirementsPerPage = 2;
  const featuresPerPage = 3;
  const requirementPages = Array.from(
    {length: Math.ceil(annexRequirements.length / requirementsPerPage)},
    (_, i) => annexRequirements.slice(i * requirementsPerPage, (i + 1) * requirementsPerPage)
  );
  const featurePages = Array.from(
    {length: Math.ceil(features.length / featuresPerPage)},
    (_, i) => features.slice(i * featuresPerPage, (i + 1) * featuresPerPage)
  );
  const editionLabel = {
    fundamentals: 'Education Fundamentals',
    plus: 'Education Plus',
    chromeos: 'ChromeOS, funkcje systemowe',
    upgrade: 'ChromeOS Education Upgrade',
    public: 'Bezpłatne materiały'
  };
  function downloadGuide() {
    const anchor = document.createElement('a');
    anchor.href = `${base}/publikacje/cyberbezpieczna-szkola.pdf`;
    anchor.download = 'cyberbezpieczna-szkola.pdf';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
  const issueDate = new Intl.DateTimeFormat('pl-PL', {dateStyle:'long',timeZone:'Europe/Warsaw'}).format(new Date());
</script>

<svelte:head>
  <title>Poradnik PDF | Cyberbezpieczna szkoła z Google for Education</title>
  <meta name="description" content="Przewodnik do druku: 18 wymagań KSC, checklisty zabezpieczeń Google Workspace for Education i ChromeOS oraz kontakt z partnerami."/>
</svelte:head>

<div class="print-guide">
  <div class="guide-toolbar">
    <a href={`${base}/`}>← Powrót do poradnika</a>
    <button class="toolbar-download" onclick={downloadGuide}>Pobierz gotowy PDF ↓</button>
  </div>

  <article class="pdf-page cover">
    <header class="pdf-header">
      <span class="mark"><span></span><span></span><span></span><span></span></span>
      <img class="brand-logo" src={`${base}/brand/logo-google-for-education.png`} alt="Google for Education"/>
    </header>
    <div class="cover-content">
      <p class="kicker">BEZPIECZEŃSTWO CYFROWE W EDUKACJI</p>
      <h1>Cyberbezpieczna<br/><span>szkoła</span></h1>
      <p class="cover-subtitle">Praktyczny przewodnik dla szkół i organów prowadzących</p>
      <p class="cover-desc">Od wymagań KSC do konkretnych działań z wykorzystaniem Google Workspace for Education i ChromeOS.</p>
      <div class="cover-art"><SecurityArtwork/></div>
    </div>
    <div class="cover-bottom">
      <div><b>18</b><span>wymagań KSC</span></div>
      <div><b>11</b><span>funkcji Google</span></div>
      <div><b>3</b><span>kroki do wdrożenia</span></div>
    </div>
    <div class="cover-date">Wydanie: {issueDate} <span>cyber.hubedu.pl</span></div>
  </article>

  <section class="pdf-page">
    <div class="mini-header"><span class="mini-pills"><i></i><i></i><i></i><i></i></span><span>Cyberbezpieczna szkoła / Jak korzystać</span></div>
    <p class="section-kicker">NA POCZĄTEK</p>
    <h2 class="page-title">Jak korzystać z poradnika?</h2>
    <p class="page-lead">To praktyczny punkt startowy do rozmowy o bezpieczeństwie szkoły. Każdy obszar zawiera działania do rozważenia oraz wskazówkę, jak potwierdzić ich wykonanie.</p>
    <div class="step-cards">
      <div class="step-card blue"><b>01</b><h3>Sprawdź wymaganie</h3><p>Ustal, które działania dotyczą Twojej placówki, uwzględniając jej formę organizacyjną.</p></div>
      <div class="step-card green"><b>02</b><h3>Włącz zabezpieczenia</h3><p>Skorzystaj z podanych funkcji Google i wykonaj czynności po stronie szkoły.</p></div>
      <div class="step-card yellow"><b>03</b><h3>Potwierdź działanie</h3><p>Zachowaj wskazane dowody wdrożenia, sprawdź wyniki i wyznacz kolejny przegląd.</p></div>
    </div>
    <div class="paper-note">
      <strong>Zakres dokumentu i indywidualna analiza</strong><p>Każda szkoła ma inne potrzeby i środowisko technologiczne. Przedstawione działania są punktem wyjścia. Ich zakres należy dobrać po indywidualnej analizie infrastruktury, używanych usług i obowiązujących wymagań. Pomoc we wdrożeniu mogą zapewnić Partnerzy Google for Education.</p>
      <p>Przedstawiamy 18 podstawowych punktów części I załącznika nr 4 do nowelizacji KSC oraz przykładowe zabezpieczenia Google. Materiał nie zastępuje analizy statusu prawnego placówki ani kompletnej dokumentacji bezpieczeństwa. Korzystanie z Google samo w sobie nie oznacza spełnienia wymogów ustawowych.</p>
      <p>Niektóre funkcje wymagają płatnej edycji Google Workspace lub dodatkowej licencji. Weryfikuj dostępność przed wdrożeniem.</p>
    </div>
    <h3 class="plain-title">Spis treści</h3>
    <div class="toc-row"><span>01</span><b>Wymagania KSC i checklisty dla szkoły</b><span>Punkty 1–18</span></div>
    <div class="toc-row"><span>02</span><b>Funkcje Google i instrukcje konfiguracji</b><span>11 zabezpieczeń</span></div>
    <div class="toc-row"><span>03</span><b>Kopie zapasowe: praktyczne warianty</b><span>Eksport i odtwarzanie</span></div>
    <div class="toc-row"><span>04</span><b>Partnerzy Google for Education i źródła</b><span>Kontakt i dokumenty</span></div>
    <p class="small-endnote">Wersja interaktywna, autodiagnoza i bieżące odnośniki: <a href="https://cyber.hubedu.pl/">cyber.hubedu.pl</a>.</p>
  </section>

  {#each requirementPages as pageItems, pageIndex}
    <section class="pdf-page requirements-page">
      <div class="mini-header"><span class="mini-pills"><i></i><i></i><i></i><i></i></span><span>Wymagania KSC / część I załącznika nr 4</span></div>
      <p class="section-kicker">CZĘŚĆ 01 · WYMAGANIA KSC</p>
      <h2 class="page-title">Co sprawdzić w szkole?</h2>
      <p class="page-lead compact">Kroki do wykonania i przykładowe potwierdzenie. Każdy punkt odpowiada pozycji z części I załącznika nr 4.</p>
      <div class="req-cards">
        {#each pageItems as requirement (requirement.id)}
          <article class="req-card">
            <div class="req-head"><span class="num-pill">PKT {String(requirement.point).padStart(2,'0')}</span><span class="area">{requirement.area}</span></div>
            <h3>{requirement.title}</h3>
            <p class="req-summary">{requirement.summary}</p>
            <div class="req-columns">
              {#if practicalAdvice[requirement.id].google.length}
                <div class="req-actions">
                  <strong class="blue-label">W Google for Education</strong>
                  <ul>{#each practicalAdvice[requirement.id].google as step}<li>{step}</li>{/each}</ul>
                </div>
              {/if}
              <div class="req-actions">
                <strong class="green-label">Po stronie szkoły</strong>
                <ul>{#each practicalAdvice[requirement.id].school as step}<li>{step}</li>{/each}</ul>
              </div>
            </div>
            <p class="proof"><b>Potwierdzenie:</b> {practicalAdvice[requirement.id].proof}</p>
            {#if googleBridges[requirement.id] && requirement.point !== 10}
              <p class="bridge-tip"><b>Pomysł z Google:</b> {googleBridges[requirement.id].title}</p>
            {/if}
          </article>
        {/each}
      </div>
      <p class="foot-reference">Źródło: <a href={LEGAL_SOURCE}>Dz.U. 2026 poz. 252, załącznik nr 4</a>. Zakres stosowania ustal zgodnie ze statusem placówki.</p>
    </section>
  {/each}

  {#each featurePages as pageItems, pageIndex}
    <section class="pdf-page feature-page">
      <div class="mini-header"><span class="mini-pills"><i></i><i></i><i></i><i></i></span><span>Google Workspace for Education / ChromeOS</span></div>
      <p class="section-kicker">CZĘŚĆ 02 · NARZĘDZIA GOOGLE</p>
      <h2 class="page-title">Zabezpieczenia, które możesz wdrożyć</h2>
      <p class="page-lead compact">Dostępność funkcji zależy od edycji i środowiska szkoły. Linki prowadzą do aktualnej dokumentacji Google, a wskazówki nie zastępują indywidualnej analizy.</p>
      <div class="features-list">
        {#each pageItems as f (f.id)}
          <article class="feature-card">
            <div class="feature-bar"><h3>{f.title}</h3><span class:paid={f.tier==='plus'||f.tier==='upgrade'}>{editionLabel[f.tier]}</span></div>
            <p class="feature-help">{f.help}</p>
            <div class="do-label">CO WŁĄCZYĆ LUB SPRAWDZIĆ</div>
            <ol>{#each f.steps as step}<li>{step}</li>{/each}</ol>
            <a href={f.link} class="howto">{f.link}</a>
          </article>
        {/each}
      </div>
    </section>
  {/each}

  <section class="pdf-page backup-page">
    <div class="mini-header"><span class="mini-pills"><i></i><i></i><i></i><i></i></span><span>Kopie zapasowe / praktyczny plan</span></div>
    <p class="section-kicker">CZĘŚĆ 03 · ODSEPAROWANE KOPIE</p>
    <h2 class="page-title">Kopie zapasowe: od czego zacząć?</h2>
    <p class="page-lead">Google Workspace może pomóc w eksporcie danych, a Google Cloud w przechowywaniu archiwów. Zakres, separację i częstotliwość kopii trzeba dopasować do środowiska szkoły.</p>
    <div class="backup-option blue"><div class="backup-num">01</div><div><h3>Wariant podstawowy: eksport danych Workspace</h3><p>Google Workspace umożliwia eksportowanie danych organizacji. Należy ustalić, czy eksport obejmuje odpowiedni zakres, gdzie będzie przechowywany i jak zostanie sprawdzona możliwość odzyskania danych.</p><a href="https://knowledge.workspace.google.com/admin/migrate/export-all-your-organizations-data">Oficjalna instrukcja Google Data Export ↗</a></div></div>
    <div class="backup-option green"><div class="backup-num">02</div><div><h3>Odseparowane archiwum w Google Cloud</h3><p>Google Cloud Storage może wspierać przechowywanie odrębnych archiwów. Wymaga to analizy zasad dostępu, separacji, kosztów i odzyskiwania.</p><a href="https://docs.cloud.google.com/storage/docs/protection-backup-recovery-overview">Dokumentacja ochrony danych Cloud Storage ↗</a></div></div>
    <div class="backup-option yellow"><div class="backup-num">03</div><div><h3>Regularny backup z pomocą partnera</h3><p>Szkoła powinna ocenić częstotliwość potrzebnych kopii, pozostałe systemy oraz sposób testowania odtwarzania. W doborze rozwiązania może pomóc administrator lub partner.</p><a href="https://cyber.hubedu.pl/#partnerzy">Kontakty partnerów Google for Education ↗</a></div></div>
    <div class="paper-note backup-note"><strong>Ważne ograniczenia</strong><p>Sam eksport, historia wersji i Google Vault nie zastępują pełnego systemu kopii zapasowych. Szczegółowe warunki usług i dostępność funkcji mogą się zmieniać. Dobór metody wymaga sprawdzenia aktualnej dokumentacji i indywidualnej analizy środowiska szkoły.</p></div>
  </section>

  <section class="pdf-page partners-page">
    <div class="mini-header"><span class="mini-pills"><i></i><i></i><i></i><i></i></span><span>Kontakt / źródła</span></div>
    <p class="section-kicker">CZĘŚĆ 04 · WSPARCIE</p>
    <h2 class="page-title">Potrzebujesz pomocy we wdrożeniu?</h2>
    <p class="page-lead compact">Skontaktuj się z wybranym Partnerem Google for Education. Poproś o sprawdzenie konfiguracji i wsparcie przy wdrożeniu zabezpieczeń.</p>
    <div class="partner-cards">
      {#each educationPartners as partner, index (partner.id)}
        <article class="partner-entry" class:accent-green={index===1} class:accent-yellow={index===2} class:accent-red={index===3}>
          <h3>{partner.name}</h3>
          <p>{partner.street}<br/>{partner.postalCity}</p>
          <p><a href={partner.phoneHref}>{partner.phoneLabel}</a><br/>{#each partner.emails as email}<a href={`mailto:${email}`}>{email}</a><br/>{/each}</p>
          <a href={partner.websiteHref} class="partner-site">{partner.websiteLabel} ↗</a>
        </article>
      {/each}
    </div>
    <div class="sources-block">
      <h3>Oficjalne źródła</h3>
      <p><a href={LEGAL_SOURCE}>Ustawa KSC, nowelizacja, Dz.U. 2026 poz. 252</a></p>
      <p><a href={MINISTRY_FAQ}>FAQ Ministerstwa Cyfryzacji dotyczące KSC</a></p>
      <p><a href="https://edu.google.com/workspace-for-education/editions/compare-editions/">Google Workspace for Education, porównanie edycji</a></p>
      <p><a href="https://cyber.hubedu.pl/">Aktualna wersja poradnika i autodiagnoza: cyber.hubedu.pl</a></p>
    </div>
    <div class="endmark">Cyberbezpieczna szkoła <span>•</span> Google for Education <span>•</span> {issueDate}</div>
  </section>
</div>