# Cyberbezpieczna szkoła

**Wersja robocza interaktywnego poradnika** dla szkół i organów prowadzących. Projekt nie stanowi opinii prawnej ani oficjalnego stanowiska Google for Education lub MEN.

## Co jest już dostępne?

- Strona wprowadzająca oraz wybór roli i edycji Google Workspace.
- **Moje obowiązki:** kwalifikacja rodzaju szkoły w oparciu o oficjalne FAQ Ministerstwa Cyfryzacji, bez automatycznej oceny indywidualnego wpisu do wykazu KSC.
- **18 wymagań KSC:** interaktywna matryca z załącznika nr 4, cz. I, połączona z funkcjami Google, zadaniami szkoły i przykładami dokumentacji.
- Katalog funkcji Google Workspace for Education i ChromeOS, z filtrami, instrukcjami i informacją o licencjach.
- **Autodiagnoza:** lokalna lista kontrolna, zapis w przeglądarce, raport z zadaniami, instrukcjami i źródłami, wydruk lub zapis w PDF przez funkcję drukowania.
- **Quiz:** pięć pytań edukacyjnych z wyjaśnieniami.
- Biblioteka źródeł i materiałów Google.

## Uruchomienie lokalne

Wymagany Node.js 22.

```bash
npm install
npm run check
npm run dev
```

Automatyczne testy interfejsu (komputer, emulacja telefonu, quiz, autodiagnoza, raport do PDF):

```bash
npx playwright install chromium
npm run test:e2e
```

W GitHub Actions scenariusze przeglądarkowe uruchamiają się po poprawnej kompilacji. Zrzuty ekranu, raport Playwright i przykładowy PDF są przechowywane jako **prywatne artefakty testów**, a nie jako publiczna strona.

Kompilacja wersji statycznej:

```bash
npm run build
npm run preview
```

Repozytorium zawiera workflow `.github/workflows/validate.yml` do kontroli typów i kompilacji w GitHub Actions. **Workflow niczego publicznie nie publikuje.**

## Publiczny podgląd

Przygotowano ręcznie uruchamiany workflow `.github/workflows/publish-pages.yml`. Pozwala on opublikować statyczną aplikację w GitHub Pages po skonfigurowaniu repozytorium przez właściciela. Rutynowe zapisy do `main` nie publikują automatycznie nowych wersji, dzięki czemu treści wymagające aktualizacji mogą zostać sprawdzone przed udostępnieniem.

[Instrukcja krok po kroku](docs/PUBLIKACJA_GITHUB_PAGES.md).

## Publikacja

Projekt jest przygotowany pod GitHub Pages (statyczny SvelteKit, ścieżka bazowa `/cyberbezpieczna-szkola`, plik `static/.nojekyll`). Wersję demonstracyjną można rozwijać i testować bez opinii prawnika. Przed przedstawieniem jako oficjalne stanowisko Google/MEN trzeba zweryfikować źródła, status licencji, legalne użycie marki i uzyskać właściwe zatwierdzenia. Nie należy reklamować aplikacji jako certyfikatora zgodności z prawem.

## Źródła i odpowiedzialność

Zobacz [Rejestr źródeł i weryfikacji](docs/ZRODLA_I_WERYFIKACJA.md).

Ministerstwo Cyfryzacji potwierdza, że szkoły publiczne i przedszkola będące jednostkami budżetowymi podlegają KSC (FAQ pyt. 1.16). Dla podmiotów ważnych będących podmiotami publicznymi zastosowanie ma art. 8 ust. 3 i załącznik nr 4. Pozostałe podmioty wymagają indywidualnej kwalifikacji. Funkcje Google wspierają ochronę kont, danych i urządzeń, ale nie zapewniają automatycznej zgodności z KSC/NIS2/RODO.

Wyniki autodiagnozy są przechowywane lokalnie w `localStorage`, nie są wysyłane do serwera. Wyczyszczenie danych przeglądarki usuwa zapisane odpowiedzi.
