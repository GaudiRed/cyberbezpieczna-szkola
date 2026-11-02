import { test, expect } from '@playwright/test';

test('Strona startowa i menu działają na ekranie komputera i telefonu', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await expect(page.getByRole('heading', { name: /Bezpieczniejsza szkoła. Prostsze działania./i })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Nawigacja główna' })).toBeVisible();
  await page.getByRole('navigation').getByRole('button', { name: 'Źródła i kursy' }).click();
  await expect(page.getByRole('heading', { name: 'Oficjalne dokumenty i szkolenia' })).toBeVisible();
  expect(errors).toEqual([]);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, 'Strona nie powinna mieć poziomego przewijania całego dokumentu').toBeLessThanOrEqual(2);
  await page.screenshot({ path: testInfo.outputPath('zrodla.png'), fullPage: true });
});

test('Matryca KSC wyszukuje wymaganie, zapisuje status i zachowuje wynik po odświeżeniu', async ({ page }, testInfo) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await page.getByRole('navigation').getByRole('button', { name: '18 wymagań KSC' }).click();
  await expect(page.getByRole('heading', { name: '18 wymagań, konkretne działania' })).toBeVisible();
  await expect(page.locator('.matrix .list button')).toHaveCount(18);
  await page.locator('.matrix .list button').filter({ hasText: 'Pkt 10' }).click();
  await expect(page.getByRole('heading', { name: 'Odseparowane kopie zapasowe' })).toBeVisible();
  await expect(page.locator('.matrix .backup-workarounds')).toBeVisible();
  await expect(page.locator('.matrix .backup-workarounds article')).toHaveCount(3);
  await expect(page.locator('.backup-workarounds')).toContainText('Eksport + kopia odłączona od sieci');
  await expect(page.locator('.backup-workarounds')).toContainText('Cloud Storage');
  await expect(page.locator('.backup-workarounds')).toContainText('Regularne kopie i łatwe odtwarzanie');
  await expect(page.locator('.backup-workarounds')).toContainText('60 dniach');
  await expect(page.locator('.backup-workarounds')).toContainText('30 dni');
  await expect(page.locator('.backup-workarounds')).toContainText('Assured Controls');
  await expect(page.locator('.backup-workarounds')).toContainText('separacji fizycznej i logicznej');
  await expect(page.locator('.backup-law a[href*="gov.pl/attachment/"]')).toHaveCount(1);
  await expect(page.locator('.backup-workarounds a[href="https://knowledge.workspace.google.com/admin/migrate/export-all-your-organizations-data"]')).toHaveCount(1);
  await page.locator('#requirement-status').selectOption('todo');
  await page.screenshot({ path: testInfo.outputPath('wymaganie-10.png'), fullPage: true });
  await page.reload();
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await page.getByRole('navigation').getByRole('button', { name: '18 wymagań KSC' }).click();
  await page.locator('.matrix .list button').filter({ hasText: 'Pkt 10' }).click();
  await expect(page.locator('#requirement-status')).toHaveValue('todo');
  await page.getByRole('navigation').getByRole('button', { name: 'Autodiagnoza' }).click();
  await expect(page.getByText('Do sprawdzenia lub realizacji pozostaje 18')).toBeVisible();
});

test('Filtrowanie zabezpieczeń pokazuje spójną kartę i poprawny rodzaj licencji', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await page.getByRole('navigation').getByRole('button', { name: 'Zabezpieczenia' }).click();
  await page.getByRole('combobox', { name: 'Dostępność' }).selectOption('plus');
  await expect(page.getByRole('heading', { name: 'Centrum bezpieczeństwa' })).toBeVisible();
  await expect(page.locator('.catalog .detail .tag')).toContainText('Płatna funkcja');
  await page.getByRole('combobox', { name: 'Dostępność' }).selectOption('upgrade');
  await expect(page.getByRole('heading', { name: 'Centralne zarządzanie Chromebookami' })).toBeVisible();
  await expect(page.locator('.catalog .detail .tag')).toContainText('ChromeOS Education Upgrade');
});

test('Quiz ocenia wszystkie odpowiedzi i umożliwia powtórzenie', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await page.getByRole('navigation').getByRole('button', { name: 'Quiz' }).click();
  await expect(page.locator('fieldset')).toHaveCount(5);
  const correct = [1, 0, 1, 1, 1];
  for (let i = 0; i < correct.length; i++) {
    await page.locator('fieldset').nth(i).locator('input[type=radio]').nth(correct[i]).check();
  }
  await page.getByRole('button', { name: 'Sprawdź odpowiedzi' }).click();
  await expect(page.getByRole('status')).toContainText('Wynik: 5 z 5');
  await page.getByRole('button', { name: 'Rozpocznij ponownie' }).click();
  await expect(page.getByRole('status')).toHaveCount(0);
});

test('Raport do PDF zawiera wymagania KSC i funkcje Google bez elementów nawigacji', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('desktop'), 'PDF generujemy w scenariuszu desktopowym');
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await page.getByRole('navigation').getByRole('button', { name: '18 wymagań KSC' }).click();
  await page.locator('.matrix .list button').filter({ hasText: 'Pkt 10' }).click();
  await page.locator('#requirement-status').selectOption('todo');
  await page.getByRole('navigation').getByRole('button', { name: 'Autodiagnoza' }).click();
  await expect(page.getByRole('heading', { name: 'Sprawdź, co już działa i co trzeba zrobić' })).toBeVisible();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.audit .print-report')).toBeVisible();
  await expect(page.locator('.audit .screen-only')).toBeHidden();
  await expect(page.locator('.audit .print-report')).toContainText('Część A. Realizacja wymagań KSC');
  await expect(page.locator('.audit .print-report')).toContainText('Część B. Funkcje Google, które warto sprawdzić');
  await expect(page.locator('.audit .print-report')).toContainText('Odseparowane kopie zapasowe');
  await expect(page.locator('.audit .print-report')).toContainText('Google Data Export:');
  await expect(page.locator('.audit .print-report')).toContainText('FAQ, odpowiedź 3.41');
  await expect(page.locator('.print-source')).toContainText('Wydrukowano z:');
  await expect(page.locator('.print-source')).toContainText('Cyberbezpieczna szkoła z Google for Education');
  await expect(page.locator('.print-source')).toContainText('Data i godzina wydruku:');
  await expect(page.locator('.print-source')).toContainText(new URL(page.url()).origin);
  await expect(page.locator('.audit .print-report')).toContainText('Po stronie szkoły:');
  await expect(page.locator('.audit .print-report')).toContainText('zaszyfrowanym nośniku odłączonym od sieci');
  const pdf = await page.pdf({ path: testInfo.outputPath('przykladowy-raport.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  expect(pdf.byteLength).toBeGreaterThan(10_000);
});


test('Logo Google for Education ma poprawny wariant na komputerze i telefonie', async ({ page }, testInfo) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  const logo = page.locator('.gfe-identity img[alt="Google for Education"]');
  await expect(logo).toBeVisible();
  await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  const src = await logo.evaluate((img: HTMLImageElement) => img.currentSrc);
  if (testInfo.project.name.includes('mobile')) {
    expect(src).toContain('logo-google-for-education-vertical.png');
  } else {
    expect(src).toContain('logo-google-for-education.png');
  }
  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(horizontalOverflow).toBeLessThanOrEqual(2);
  await page.screenshot({ path: testInfo.outputPath('logo-google-for-education.png'), fullPage: false });
});


test('Wszystkie 18 wymagań KSC ma krótką listę konkretnych działań', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await page.getByRole('navigation').getByRole('button', { name: '18 wymagań KSC' }).click();
  const items = page.locator('.matrix .list button');
  await expect(items).toHaveCount(18);
  for (let n=0; n<18; n++){
    await items.nth(n).click();
    const checklist=page.locator('.matrix .quick-actions');
    await expect(checklist).toContainText('Co zrobić? Krótka lista');
    expect(await checklist.locator('.todo-list li').count()).toBeGreaterThan(0);
    expect(await checklist.locator('.todo-list li').count()).toBeLessThanOrEqual(4);
    await expect(checklist).toContainText('Co zachować jako potwierdzenie?');
  }
  await items.first().click();
  await expect(page.locator('.matrix .quick-actions')).toContainText('W Arkuszach Google przygotuj wspólny rejestr sprzętu');
  await expect(page.locator('.matrix .partner-help')).toContainText('Partnerem Google for Education');
});

test('Favicon Google oraz kontakty czterech partnerów są dostępne na komputerze i telefonie', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', 'https://www.google.com/favicon.ico');
  const section = page.locator('#partnerzy');
  await expect(section).toBeVisible();
  await expect(section.locator('article.partner-card')).toHaveCount(4);
  for (const name of ['GoCloud Polska sp. z o.o.', 'CCT Poland', 'MScloud', 'Buena Cloud']) {
    await expect(section.getByRole('heading', { name })).toBeVisible();
  }
  await expect(section.locator('a[href="tel:+48222035551"]')).toBeVisible();
  await expect(section.locator('a[href="mailto:i.zakharchenko@cctpoland.com"]')).toBeVisible();
  await expect(section.locator('a[href="https://buenacloud.pl"]')).toBeVisible();
  await page.getByRole('link', { name: 'Partnerzy', exact: true }).click();
  await expect(page).toHaveURL(/#partnerzy$/);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
});

test('Funkcje mają konkretne kroki, poprawny odnośnik i pomoc partnera', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated', 'true');
  await page.getByRole('navigation').getByRole('button', { name: 'Zabezpieczenia' }).click();
  const cards=page.locator('.catalog .entries button');
  await expect(cards).toHaveCount(11);
  for (let n=0; n<11; n++){
    await cards.nth(n).click();
    const steps=page.locator('.catalog .detail .feature-actions li');
    expect(await steps.count()).toBeGreaterThan(0);
    expect(await steps.count()).toBeLessThanOrEqual(3);
    const href=await page.getByRole('link', {name:'Otwórz instrukcję konfiguracji Google'}).getAttribute('href');
    expect(['support.google.com', 'knowledge.workspace.google.com']).toContain(new URL(href!).hostname);
  }
  await expect(page.locator('.catalog .detail .partner-advice')).toContainText('Partnera Google for Education');
  await page.getByRole('navigation').getByRole('button', { name: 'Autodiagnoza' }).click();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.audit .print-report')).toContainText('Co włączyć lub sprawdzić:');
});

test('Nagłówek partnerów nie rozrywa frazy Google for Education', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  const section=page.locator('#partnerzy .intro');
  await expect(section.getByRole('heading', {name:/Masz pytania/})).toBeVisible();
  await expect(section.locator('.keep-together')).toHaveCount(2);
  for (const text of await section.locator('.keep-together').all()){
    await expect(text).toHaveCSS('white-space','nowrap');
  }
  const overflowing=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflowing).toBeLessThanOrEqual(2);
});


test('Szkoła ma wykonalny plan oparty o Google także tam, gdzie samo Google nie wystarczy', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.shell')).toHaveAttribute('data-hydrated','true');
  await page.getByRole('navigation').getByRole('button',{name:'18 wymagań KSC'}).click();
  const cases=[
    {point:1,title:'Rejestr sprzętu i usług w Arkuszach Google'},
    {point:11,title:'Kalendarz Google + protokół w Arkuszach'},
    {point:12,title:'Formularz Google + ograniczony rejestr incydentów'},
    {point:13,title:'Chromebooki + rejestr ochrony pozostałych urządzeń'},
    {point:15,title:'Arkusze + przypomnienia przed końcem wsparcia'},
    {point:17,title:'Bezpłatne materiały Google + test wiedzy'},
    {point:18,title:'Formularz, Arkusz i osobny kanał alarmowy'}
  ];
  const list=page.locator('.matrix .list button');
  for(const item of cases){
    await list.nth(item.point-1).click();
    const bridge=page.locator('.matrix .google-bridge');
    await expect(bridge).toContainText(item.title);
    await expect(bridge).toContainText('Co jeszcze jest potrzebne:');
    await expect(bridge.locator('a')).toHaveAttribute('href',/^https:\/\//);
  }
});


test('Poradnik A4 zawiera 18 wymagan, 11 funkcji i logo Google', async ({ page }) => {
  await page.goto('./poradnik-pdf/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', {name:/Cyberbezpieczna/}).first()).toBeVisible();
  await expect(page.locator('.req-card')).toHaveCount(18);
  await expect(page.locator('.feature-card')).toHaveCount(11);
  await expect(page.locator('.partner-entry')).toHaveCount(4);
  await expect(page.locator('.cover .brand-logo')).toBeVisible();
  await expect.poll(() => page.locator('.cover .brand-logo').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.backup-page')).toContainText('Eksport danych Workspace');
  await expect(page.getByRole('link',{name:'Pobierz gotowy PDF'})).toHaveAttribute('download','');
});
