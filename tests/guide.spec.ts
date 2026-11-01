import { test, expect } from '@playwright/test';

test('Strona startowa i menu działają na ekranie komputera i telefonu', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
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
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: '18 wymagań KSC' }).click();
  await expect(page.getByRole('heading', { name: '18 wymagań, konkretne działania' })).toBeVisible();
  await expect(page.locator('.matrix .list button')).toHaveCount(18);
  await page.locator('.matrix .list button').filter({ hasText: 'Pkt 10' }).click();
  await expect(page.getByRole('heading', { name: 'Odseparowane kopie zapasowe' })).toBeVisible();
  await expect(page.getByText('Google Vault i Historia wersji')).toBeVisible();
  await page.locator('#requirement-status').selectOption('todo');
  await page.screenshot({ path: testInfo.outputPath('wymaganie-10.png'), fullPage: true });
  await page.reload();
  await page.getByRole('navigation').getByRole('button', { name: '18 wymagań KSC' }).click();
  await page.locator('.matrix .list button').filter({ hasText: 'Pkt 10' }).click();
  await expect(page.locator('#requirement-status')).toHaveValue('todo');
  await page.getByRole('navigation').getByRole('button', { name: 'Autodiagnoza' }).click();
  await expect(page.getByText('Do sprawdzenia lub realizacji pozostaje 18')).toBeVisible();
});

test('Filtrowanie zabezpieczeń pokazuje spójną kartę i poprawny rodzaj licencji', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Zabezpieczenia' }).click();
  await page.getByRole('combobox', { name: 'Dostępność' }).selectOption('plus');
  await expect(page.getByRole('heading', { name: 'Centrum bezpieczeństwa' })).toBeVisible();
  await expect(page.locator('.catalog .detail .tag')).toContainText('Płatna funkcja');
  await page.getByRole('combobox', { name: 'Dostępność' }).selectOption('upgrade');
  await expect(page.getByRole('heading', { name: 'Centralne zarządzanie Chromebookami' })).toBeVisible();
  await expect(page.locator('.catalog .detail .tag')).toContainText('ChromeOS Education Upgrade');
});

test('Quiz ocenia wszystkie odpowiedzi i umożliwia powtórzenie', async ({ page }) => {
  await page.goto('/');
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
  test.skip(testInfo.project.name.includes('mobile'), 'PDF generujemy w scenariuszu desktopowym');
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: '18 wymagań KSC' }).click();
  await page.locator('.matrix .list button').filter({ hasText: 'Pkt 10' }).click();
  await page.locator('#requirement-status').selectOption('todo');
  await page.getByRole('navigation').getByRole('button', { name: 'Autodiagnoza' }).click();
  await expect(page.getByRole('heading', { name: 'Sprawdź, co już działa i co trzeba zrobić' })).toBeVisible();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.audit .print-report')).toBeVisible();
  await expect(page.locator('.audit .screen-only')).toBeHidden();
  await expect(page.locator('.audit .print-report')).toContainText('Część A. Realizacja wymagań KSC');
  await expect(page.locator('.audit .print-report')).toContainText('Część B. Plan sprawdzenia i działań');
  await expect(page.locator('.audit .print-report')).toContainText('Odseparowane kopie zapasowe');
  const pdf = await page.pdf({ path: testInfo.outputPath('przykladowy-raport.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  expect(pdf.byteLength).toBeGreaterThan(10_000);
});
