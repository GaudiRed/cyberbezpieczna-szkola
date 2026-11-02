<script lang="ts">
  import { onMount } from 'svelte';
  import { features, type Feature } from '$lib/content';
  import { annexRequirements, LEGAL_SOURCE, matchedFeatures } from '$lib/requirements';
  import { practicalAdvice } from '$lib/practicalAdvice';
  import { googleBridges } from '$lib/googleBridges';

  export let answers: Record<string, string> = {};
  export let updateAnswer: (id: string, status: string) => void;

  let printSource = '';
  let printDate = '';
  function refreshPrintInfo(): void {
    if (typeof window === 'undefined') return;
    printSource = window.location.origin + window.location.pathname;
    printDate = new Intl.DateTimeFormat('pl-PL', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date());
  }
  function printReport(): void {
    refreshPrintInfo();
    window.print();
  }
  onMount(() => {
    refreshPrintInfo();
    window.addEventListener('beforeprint', refreshPrintInfo);
    return () => window.removeEventListener('beforeprint', refreshPrintInfo);
  });

  const labels: Record<string, string> = {
    done: 'Wdrożone i sprawdzone',
    todo: 'Wymaga działania',
    unknown: 'Nie sprawdzono',
    na: 'Nie dotyczy'
  };
  const tierLabels: Record<Feature['tier'], string> = {
    fundamentals: 'Education Fundamentals: bez dodatkowej opłaty dla uprawnionych placówek',
    plus: 'Education Plus: płatna edycja',
    chromeos: 'ChromeOS: zabezpieczenie wbudowane',
    upgrade: 'ChromeOS Education Upgrade: osobna płatna licencja',
    public: 'Bezpłatny materiał publiczny'
  };
  $: list = features.map((feature) => ({
    ...feature,
    state: answers[feature.id] || 'unknown'
  }));
  $: outstanding = list.filter((feature) => feature.state === 'todo' || feature.state === 'unknown');
  $: doneCount = list.filter((feature) => feature.state === 'done').length;
  $: todoCount = list.filter((feature) => feature.state === 'todo').length;
  $: unknownCount = list.filter((feature) => feature.state === 'unknown').length;
  $: naCount = list.filter((feature) => feature.state === 'na').length;
  $: legalItems = annexRequirements.map((requirement) => ({...requirement,state:answers['annex:'+requirement.id] || 'unknown'}));
  $: legalOpen = legalItems.filter((requirement) => requirement.state === 'unknown' || requirement.state === 'todo');
  $: legalDone = legalItems.filter((requirement) => requirement.state === 'done').length;
</script>

<section class="audit">
  <div class="screen-only">
    <div class="eyebrow">AUTODIAGNOZA BEZPIECZEŃSTWA</div>
    <h1>Sprawdź, co już działa i co trzeba zrobić</h1>
    <p>To lista możliwych zabezpieczeń, a nie lista wymogów, które każda szkoła musi kupić lub wdrożyć. Przy funkcjach płatnych można wybrać „Nie dotyczy”.</p>

    <div class="stats">
      <div><strong>{doneCount}</strong><span>Sprawdzone</span></div>
      <div><strong>{todoCount}</strong><span>Do działania</span></div>
      <div><strong>{unknownCount}</strong><span>Nie sprawdzono</span></div>
      <div><strong>{naCount}</strong><span>Nie dotyczy</span></div>
    </div>

    <div class="legal-summary"><strong>Wymagania KSC, załącznik nr 4</strong><p>Przeanalizowano {legalDone} z {annexRequirements.length} punktów. Do sprawdzenia lub realizacji pozostaje {legalOpen.length}. Oceny wymagań wykonuje się w zakładce „18 wymagań KSC”.</p><small>Ocena dotyczy sytuacji właściwych podmiotów; status „nie dotyczy” wymaga uzasadnienia.</small></div>

    <h2>Ocena poszczególnych zabezpieczeń Google</h2>
    <div class="checklist">
      {#each list as feature (feature.id)}
        <div class="checkrow">
          <div class="description">
            <strong>{feature.title}</strong>
            <span>{tierLabels[feature.tier]}</span>
            <small>{feature.help}</small>
          </div>
          <label>
            <span class="visually-hidden">Status: {feature.title}</span>
            <select value={feature.state} onchange={(event) => updateAnswer(feature.id, event.currentTarget.value)}>
              <option value="unknown">Nie sprawdzono</option>
              <option value="done">Wdrożone i sprawdzone</option>
              <option value="todo">Wymaga działania</option>
              <option value="na">Nie dotyczy</option>
            </select>
          </label>
        </div>
      {/each}
    </div>

    <p class="partner-tip">Nie wiesz, czy funkcja jest dostępna albo jak ją włączyć? <a href="#partnerzy">Skontaktuj się z Partnerem Google for Education.</a></p>
    <div class="actions">
      <button class="primary" type="button" onclick={printReport}>Zapisz raport jako PDF / drukuj</button>
    </div>
    <p class="disclaimer">Odpowiedzi zapisują się wyłącznie w tej przeglądarce. Nie sprawdzamy automatycznie konfiguracji konsoli Google. Liczba pozycji „sprawdzone” nie jest oceną zgodności z prawem.</p>
  </div>

  <div class="print-report">
    <header>
      <h1>Raport autodiagnozy cyberbezpieczeństwa szkoły</h1>
      <p>Lista deklarowanych zabezpieczeń i proponowanych działań. Stan na dzień wydruku.</p>
      <div class="print-source">
        <p><strong>Wydrukowano z:</strong> Cyberbezpieczna szkoła z Google for Education</p>
        <p><strong>Adres poradnika:</strong> {printSource}</p>
        <p><strong>Data i godzina wydruku:</strong> {printDate}</p>
      </div>
    </header>
    <h2>Podsumowanie odpowiedzi</h2>
    <p>Wdrożone i sprawdzone: <strong>{doneCount}</strong> · Wymaga działania: <strong>{todoCount}</strong> · Nie sprawdzono: <strong>{unknownCount}</strong> · Nie dotyczy: <strong>{naCount}</strong></p>

    <h2>Część A. Realizacja wymagań KSC, załącznik nr 4</h2>
    <p>Ocenione jako wdrożone: <strong>{legalDone}</strong> / {annexRequirements.length}. Do sprawdzenia lub działania: <strong>{legalOpen.length}</strong>. Ocena dotyczy wyłącznie zakresu załącznika nr 4, część I, gdy ma on zastosowanie do szkoły.</p>
    {#each legalOpen as requirement, i (requirement.id)}
      <article class="report-entry">
        <h3>{i+1}. Załącznik nr 4, cz. I pkt {requirement.point}: {requirement.title} <small>({labels[requirement.state]})</small></h3>
        {#if practicalAdvice[requirement.id].google.length}
          <p><strong>W Google for Education:</strong></p>
          <ul class="short-actions">{#each practicalAdvice[requirement.id].google as step}<li>{step}</li>{/each}</ul>
        {/if}
        {#if practicalAdvice[requirement.id].school.length}
          <p><strong>Po stronie szkoły:</strong></p>
          <ul class="short-actions">{#each practicalAdvice[requirement.id].school as step}<li>{step}</li>{/each}</ul>
        {/if}
        <p><strong>Potwierdzenie wykonania:</strong> {practicalAdvice[requirement.id].proof}</p>
        {#if requirement.id==='ksc10'}
          <p><strong>Instrukcja Google Data Export:</strong> https://knowledge.workspace.google.com/admin/migrate/export-all-your-organizations-data</p>
          <p><strong>Jak rozumieć odseparowanie kopii:</strong> https://www.gov.pl/attachment/c19a078f-60ca-49ab-ac19-f743f8f64903 (FAQ, odpowiedź 3.41)</p>
          <p><strong>Ważne:</strong> eksport, Vault i historia wersji nie stanowią samodzielnie pełnego backupu. Zakres i częstotliwość kopii oraz możliwość odtworzenia wymagają analizy środowiska szkoły i aktualnych warunków usług.</p>
        {:else if googleBridges[requirement.id]}
          <p><strong>Praktyczne wsparcie Google:</strong> {googleBridges[requirement.id].title}</p>
          <p class="doc-url"><strong>Instrukcja:</strong> {googleBridges[requirement.id].guideUrl}</p>
          <p><strong>Co pozostaje poza Google:</strong> {googleBridges[requirement.id].outside}</p>
        {/if}
        {#each matchedFeatures(requirement) as feature}
          <p class="doc-url">{feature.title}: {feature.link}</p>
        {/each}
        <p><strong>Źródło prawa:</strong> {LEGAL_SOURCE} (załącznik nr 4, część I, pkt {requirement.point})</p>
        <p><strong>Osoba odpowiedzialna:</strong> ........................................ <strong>Termin:</strong> ...........................</p>
      </article>
    {/each}
    <h3>Wymagania KSC oznaczone jako wykonane lub niedotyczące</h3>
    {#each legalItems.filter((item)=>item.state==='done'||item.state==='na') as requirement (requirement.id)}
      <p>Załącznik nr 4, pkt {requirement.point}: {requirement.title}, {labels[requirement.state]}.</p>
    {/each}
    <h2>Część B. Funkcje Google, które warto sprawdzić</h2>
    <p>Poniższe funkcje mogą pomóc szkole. Zastosowanie funkcji zależy od edycji, infrastruktury i potrzeb placówki. Warto przeprowadzić indywidualną analizę z administratorem lub Partnerem Google for Education.</p>
    {#if outstanding.length === 0}
      <p>Wszystkie pozycje oznaczono jako wdrożone lub nie mające zastosowania. Weryfikuj regularnie skuteczność zabezpieczeń.</p>
    {:else}
      {#each outstanding as feature, i (feature.id)}
        <article class="report-entry">
          <h3>{i + 1}. {feature.title} <small>({labels[feature.state]})</small></h3>
          <p><strong>Ryzyko:</strong> {feature.risk}</p>
          <p><strong>Dostępność:</strong> {tierLabels[feature.tier]}</p>
          <p><strong>Powiązanie z przepisami:</strong> {feature.legal}</p>
          <p><strong>Co włączyć lub sprawdzić:</strong></p>
          <ul class="short-actions">{#each feature.steps as step}<li>{step}</li>{/each}</ul>
          <p><strong>Co daje szkole:</strong> {feature.help}</p>
          <p class="doc-url"><strong>Instrukcja konfiguracji Google:</strong> {feature.link}</p>
          <p><strong>Pomoc z konfiguracją:</strong> skontaktuj się z wybranym Partnerem Google for Education.</p>
          <p><strong>Osoba odpowiedzialna:</strong> ................................................................</p>
          <p><strong>Termin:</strong> ................................................</p>
        </article>
      {/each}
    {/if}
    <h2>Pozostałe pozycje</h2>
    {#each list.filter((feature) => feature.state === 'done' || feature.state === 'na') as feature (feature.id)}
      <p><strong>{feature.title}</strong>: {labels[feature.state]}</p>
    {/each}
    <p class="partner-print"><strong>Kontakty partnerów Google for Education:</strong> {printSource}#partnerzy</p>
    <div class="print-warning">
      Raport jest oparty na odpowiedziach osoby wypełniającej, nie na technicznym audycie systemów. Nie stanowi potwierdzenia zgodności z KSC, NIS2 ani RODO. Wymagania KSC należy odczytać zgodnie ze statusem podmiotu i obowiązującymi przepisami. Zakup płatnej funkcji nie jest sam w sobie wymaganiem ustawowym.
    </div>
  </div>
</section>

<style>
  .eyebrow{font-weight:800;letter-spacing:2px;color:#2863b8;font-size:12px}
  h1{font-size:clamp(29px,4vw,43px);margin:12px 0}
  h2{font-size:22px;margin-top:30px}
  p{line-height:1.65;color:#596982}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:25px 0}
  .stats>div{display:flex;flex-direction:column;background:#fff;border:1px solid #dfe7f0;padding:18px;border-radius:12px}
  .stats strong{font-size:28px}.stats span{font-size:12px;color:#64748b;margin-top:7px}
  .checklist{background:#fff;border:1px solid #e1e7ef;border-radius:13px}
  .checkrow{display:flex;gap:18px;justify-content:space-between;align-items:center;padding:17px;border-bottom:1px solid #e8ecf2}
  .checkrow:last-child{border-bottom:0}
  .description{display:flex;flex-direction:column;gap:5px}.description strong{color:#1b2a44}
  .description span,.description small{font-size:12px;line-height:1.4;color:#64748b}
  select{padding:12px;border:1px solid #cbd5e1;border-radius:8px;min-width:220px;background:white;max-width:100%;color:#26374d}
  .actions{margin-top:22px}.primary{padding:13px 18px;border-radius:9px;border:0;background:#1c5ebd;color:#fff;font-weight:700;cursor:pointer}
  .disclaimer{font-size:13px}.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  .print-report{display:none}
  .partner-tip{padding:14px 17px;background:#eaf3ff;border:1px solid #dbe9ff;border-radius:13px;font-size:13px}
  .partner-tip a{font-weight:700;color:#1759b8}
  .partner-print{overflow-wrap:anywhere}
  .legal-summary{background:#eaf2ff;padding:18px;border-radius:12px;margin-top:24px;border-left:4px solid #2368bf}
  .legal-summary p{margin:7px 0}.legal-summary small{color:#64748b}
  @media(max-width:700px){.stats{grid-template-columns:repeat(2,1fr)}.checkrow{flex-direction:column;align-items:stretch}select{width:100%}}
  @media print{
    .screen-only{display:none!important}.print-report{display:block!important;color:#111;background:#fff}
    .print-report h1{font-size:24px}.print-report h2{font-size:18px;margin-top:22px}
    .print-report h3{font-size:15px}.print-report h3 small{font-size:12px;font-weight:normal}
    .print-report p,.print-report li{font-size:11px;line-height:1.5;color:#111;overflow-wrap:anywhere}
    .report-entry{border-bottom:1px solid #aaa;padding:12px 0;break-inside:avoid}
    .print-source{border:1px solid #d8e5f5;background:#f5f9ff;border-radius:8px;padding:8px 13px;margin-top:14px}
    .print-source p{margin:2px 0;font-size:11px;color:#202124}
    .report-entry .short-actions{margin:5px 0 10px;padding-left:19px}
    .report-entry .short-actions li{margin:4px 0;font-size:11px}
    .report-entry .doc-url{font-size:10px;overflow-wrap:anywhere;margin:3px 0}
    .print-warning{font-size:10px;padding:12px;border:1px solid #777;margin-top:25px}
  }
</style>
