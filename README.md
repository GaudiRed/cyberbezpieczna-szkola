# Cyberbezpieczna szkoła

**Wersja robocza interaktywnego poradnika** dla szkół i organów prowadzących. Projekt nie stanowi opinii prawnej ani oficjalnego stanowiska Google for Education lub MEN.

## Co jest już dostępne?

- Strona wprowadzająca oraz wybór roli i edycji Google Workspace.
- **Moje obowiązki:** pomoc w uporządkowaniu źródeł prawa, bez automatycznego przypisywania statusu podmiotu KSC.
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

Kompilacja wersji statycznej:

```bash
npm run build
npm run preview
```

Repozytorium zawiera workflow `.github/workflows/validate.yml` do kontroli typów i kompilacji w GitHub Actions. **Workflow niczego publicznie nie publikuje.**

## Publikacja

Projekt jest przygotowany pod GitHub Pages (statyczny SvelteKit, ścieżka bazowa `/cyberbezpieczna-szkola`, plik `static/.nojekyll`). Wersję demonstracyjną można rozwijać i testować bez opinii prawnika. Przed przedstawieniem jako oficjalne stanowisko Google/MEN trzeba zweryfikować źródła, status licencji, legalne użycie marki i uzyskać właściwe zatwierdzenia. Nie należy reklamować aplikacji jako certyfikatora zgodności z prawem.

## Źródła i odpowiedzialność

Zobacz [Rejestr źródeł i weryfikacji](docs/ZRODLA_I_WERYFIKACJA.md).

Kwalifikacja szkoły jako podmiotu KSC wymaga indywidualnej analizy. Funkcje Google wspierają ochronę kont, danych i urządzeń, ale nie zapewniają automatycznej zgodności z KSC/NIS2/RODO.

Wyniki autodiagnozy są przechowywane lokalnie w `localStorage`, nie są wysyłane do serwera. Wyczyszczenie danych przeglądarki usuwa zapisane odpowiedzi.
