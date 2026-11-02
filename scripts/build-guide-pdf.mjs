import { chromium } from '@playwright/test';
import { mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = 'http://127.0.0.1:4173/cyberbezpieczna-szkola/poradnik-pdf/';
const output = resolve('build/publikacje/cyberbezpieczna-szkola.pdf');
await mkdir(resolve('build/publikacje'), { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 920 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  const response = await page.goto(base, { waitUntil: 'networkidle', timeout: 90000 });
  if (!response?.ok()) throw new Error('Brak strony poradnika do wydruku: ' + response?.status());
  await page.locator('.pdf-page').first().waitFor({ state: 'visible' });
  const count = await page.locator('.pdf-page').count();
  if (count < 15) throw new Error('Zbyt malo stron poradnika: ' + count);
  await page.evaluate(async () => document.fonts.ready);
  await page.locator('.brand-logo').evaluate(async (img) => {
    if (!img.complete) await new Promise((resolve, reject) => { img.addEventListener('load', resolve, { once:true }); img.addEventListener('error', reject, { once:true }); });
    if (!img.naturalWidth) throw new Error('Nie zaladowano logo Google for Education');
  });
  if (errors.length) throw new Error('Bledy JS: ' + errors.join('; '));
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false, margin: {top: '0', bottom:'0', left:'0', right:'0'} });
  const file = await stat(output);
  if (file.size < 30000) throw new Error('Zbyt maly wynikowy PDF: ' + file.size);
  console.log('Gotowy PDF: ' + output + ' | rozmiar: ' + file.size + ' | stron HTML: ' + count);
} finally {
  await browser.close();
}
