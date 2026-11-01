# Rozwiązania przejściowe z narzędziami Google

## Reguła poradnika

Dla obszarów, których nie załatwia jedna funkcja Google Workspace for Education, pokazuj:
1. **Zacznij dziś**: prosty proces z dostępnym narzędziem.
2. **Zachowaj potwierdzenie**: dokument lub wynik testu.
3. **Sprawdź ograniczenie**: jakie ryzyko lub wymóg prawny pozostaje.
4. **Wdrażaj docelowo**: samodzielnie lub z Partnerem Google for Education.

Nie oznaczaj automatycznie statusu „wdrożone” tylko dlatego, że ktoś uruchomił formularz, arkusz, eksport, alert lub utworzył plik na Dysku.

## Przykłady dla szkół

| Obszar z załącznika nr 4 | Jak pomaga Google na start | Co nadal trzeba zapewnić |
| --- | --- | --- |
| 1. Inwentaryzacja | Konsola → Użytkownicy i Urządzenia → Chrome, wspólny spis w Arkuszach Google | Komputery poza ChromeOS, sieci, drukarki, systemy innych dostawców |
| 6–7. Zmiany uprawnień | Blokowanie kont w Admin Console, Formularz zgłoszenia zmiany, rejestr w Arkuszach | Połączenie z procesem kadrowym i dostępami poza Google |
| 9. Poczta | Ochrona antyphishingowa Gmail + konfiguracja SPF, DKIM, DMARC | Weryfikacja rekordów DNS i pozostałych nadawców szkolnej domeny |
| 10. Kopie zapasowe | Pełny eksport danych Workspace do archiwum, dodatkowo Cloud Storage | Cykliczność, odpowiednie odseparowanie, ochrona kopii, szybkie przywracanie i kopie danych spoza Google |
| 11. Odtwarzanie | Pobranie archiwum z eksportu i próbne odzyskanie plików; protokół w Docs | Test odzyskania z rzeczywiście odseparowanego backupu i innych systemów |
| 12 i 18. Incydenty | Formularz zgłoszenia tylko dla pracowników, chroniony arkusz i alerty Google | Procedura, alternatywny kanał poza Google, właściwe zgłoszenia ustawowe |
| 14 i 17. Cyberhigiena i szkolenia | Materiały Google Safety Center, Formularz z pytaniami, Classroom dla pracowników | Cykl szkoleń i lokalna procedura oraz potwierdzenie udziału |

## Punkt 10: dwa poziomy i wariant docelowy

**Prosta procedura przejściowa:**
- Superadministrator włącza 2SV i uruchamia pełny eksport danych organizacji w Konsoli → Dane → Import i eksport danych → Eksport danych.
- Po ukończeniu pobiera archiwum z tymczasowego zasobu Google i kopiuje je na zabezpieczony, zaszyfrowany nośnik, który następnie odłącza i przechowuje osobno.
- Prowadzi harmonogram i protokół odzyskiwania kontrolnego pliku, także dla danych z Dysków współdzielonych. Ustala, czego eksport nie obejmuje.
- Oddzielnie planuje backup danych poza Workspace.

**Możliwość rozwoju:** osobny projekt Google Cloud, Cloud Storage, osobne role i uprawnienia, kontrola okresów przechowywania, Soft Delete, opcjonalna nieodwracalna blokada retencji (Bucket Lock). Funkcje chmurowe wymagają konfiguracji, opłat i kontroli ryzyka. Zastosowanie ich nie dowodzi automatycznie spełnienia fizycznej oraz logicznej separacji w konkretnym przypadku.

**Docelowo:** dopasowany backup automatyczny, osobne uprawnienia i cykliczne testy odzyskiwania, wdrożone także przy pomocy Partnera Google for Education.

**Ograniczenia narzędzi Google:**
- Pełny eksport organizacji dostępny jest we wszystkich edycjach Workspace, ale nie stanowi backupu ciągłego, a archiwum w standardowym zasobie jest usuwane po 60 dniach od rozpoczęcia eksportu.
- Eksport może rozpocząć się z opóźnieniem, a wykonanie może trwać nawet kilkanaście dni. Nie jest dobrym planem odtwarzania w trybie natychmiastowym.
- Eksporty przyrostowe z automatyzacją ogłoszone w 2026 roku nie są funkcją udostępnioną standardowo w Education Fundamentals lub Education Plus.
- Vault i historia wersji na Dysku nie zastępują backupu. Nie polegaj na kopiowaniu do tego samego Dysku czy automatycznej synchronizacji jako jedynej odseparowanej kopii.
- W archiwum mogą być dane osobowe, dlatego wymagane są odpowiednie zasady szyfrowania, dostępów, retencji i usuwania.

## Oficjalne źródła

- Google Workspace: https://knowledge.workspace.google.com/admin/migrate/export-all-your-organizations-data
- Google Workspace Updates, 26 czerwca 2026, eksporty przyrostowe: https://workspaceupdates.googleblog.com/2026/06/streamline-your-data-backups-with-incremental-exports-for-Google-Workspace.html
- Google Cloud Storage, mechanizmy ochrony: https://docs.cloud.google.com/storage/docs/protection-backup-recovery-overview
- Google Cloud Storage, Bucket Lock: https://docs.cloud.google.com/storage/docs/bucket-lock
- Ministerstwo Cyfryzacji, aktualizacja FAQ z czerwca 2026, pyt. 3.41: https://www.gov.pl/attachment/e178e5c5-7f3a-49da-9131-a0f86c2b1601

Dokument jest materiałem projektowym. Każda szkoła powinna określić swój zakres danych, odpowiedzialność i wymagany czas odzyskania.
