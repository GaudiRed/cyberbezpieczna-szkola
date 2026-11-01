<script lang="ts">
  import { features, type Feature } from '$lib/content';

  export let answers: Record<string, string> = {};
  export let updateAnswer: (id: string, status: string) => void;

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

    <h2>Ocena poszczególnych zabezpieczeń</h2>
    <div class="checklist">
      {#each list as feature (feature.id)}
        <div class="checkrow">
          <div class="description">
            <strong>{feature.title}</strong>
            <span>{tierLabels[feature.tier]}</span>
            <small>{feature.risk}</small>
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

    <div class="actions">
      <button class="primary" type="button" onclick={() => window.print()}>Zapisz raport jako PDF / drukuj</button>
    </div>
    <p class="disclaimer">Odpowiedzi zapisują się wyłącznie w tej przeglądarce. Nie sprawdzamy automatycznie konfiguracji konsoli Google. Liczba pozycji „sprawdzone” nie jest oceną zgodności z prawem.</p>
  </div>

  <div class="print-report">
    <header>
      <h1>Raport autodiagnozy cyberbezpieczeństwa szkoły</h1>
      <p>Lista deklarowanych zabezpieczeń i proponowanych działań. Stan na dzień wydruku. Wersja robocza.</p>
    </header>
    <h2>Podsumowanie odpowiedzi</h2>
    <p>Wdrożone i sprawdzone: <strong>{doneCount}</strong> · Wymaga działania: <strong>{todoCount}</strong> · Nie sprawdzono: <strong>{unknownCount}</strong> · Nie dotyczy: <strong>{naCount}</strong></p>

    <h2>Plan sprawdzenia i działań</h2>
    {#if outstanding.length === 0}
      <p>Wszystkie pozycje oznaczono jako wdrożone lub nie mające zastosowania. Weryfikuj regularnie skuteczność zabezpieczeń.</p>
    {:else}
      {#each outstanding as feature, i (feature.id)}
        <article class="report-entry">
          <h3>{i + 1}. {feature.title} <small>({labels[feature.state]})</small></h3>
          <p><strong>Ryzyko:</strong> {feature.risk}</p>
          <p><strong>Dostępność:</strong> {tierLabels[feature.tier]}</p>
          <p><strong>Powiązanie z przepisami:</strong> {feature.legal}</p>
          <p><strong>Co sprawdzić lub wykonać:</strong></p>
          <ol>{#each feature.steps as step}<li>{step}</li>{/each}</ol>
          <p><strong>Oficjalna instrukcja:</strong> {feature.link}</p>
          <p><strong>Osoba odpowiedzialna:</strong> ................................................................</p>
          <p><strong>Termin:</strong> ................................................</p>
        </article>
      {/each}
    {/if}
    <h2>Pozostałe pozycje</h2>
    {#each list.filter((feature) => feature.state === 'done' || feature.state === 'na') as feature (feature.id)}
      <p><strong>{feature.title}</strong>: {labels[feature.state]}</p>
    {/each}
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
  @media(max-width:700px){.stats{grid-template-columns:repeat(2,1fr)}.checkrow{flex-direction:column;align-items:stretch}select{width:100%}}
  @media print{
    .screen-only{display:none!important}.print-report{display:block!important;color:#111;background:#fff}
    .print-report h1{font-size:24px}.print-report h2{font-size:18px;margin-top:22px}
    .print-report h3{font-size:15px}.print-report h3 small{font-size:12px;font-weight:normal}
    .print-report p,.print-report li{font-size:11px;line-height:1.5;color:#111;overflow-wrap:anywhere}
    .report-entry{border-bottom:1px solid #aaa;padding:12px 0;break-inside:avoid}
    .print-warning{font-size:10px;padding:12px;border:1px solid #777;margin-top:25px}
  }
</style>
