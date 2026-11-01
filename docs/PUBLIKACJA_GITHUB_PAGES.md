# Publiczny podgląd GitHub Pages

## Status

Aplikacja jest zbudowana ze statycznego SvelteKit i ma automatyczne testy desktop, tablet, mobile i PDF. Przed udostępnieniem włącz publikację według kroków poniżej.

**Ważne:** GitHub Pages jest publicznie dostępny, nawet jeśli sam kod pozostaje w repozytorium prywatnym (na płatnych planach). Nie publikuj tu danych szkolnych, haseł, kluczy API ani materiałów nieprzeznaczonych do rozpowszechniania.

## Włączenie publicznej strony

Jeśli repozytorium jest prywatne, a konto korzysta z darmowego planu GitHub:

1. Otwórz `https://github.com/GaudiRed/cyberbezpieczna-szkola/settings`.
2. W sekcji **General → Danger Zone → Change repository visibility** wybierz **Make public**. Potwierdź zmianę, świadomie ujawniając cały kod i historię commitów.
3. Otwórz `https://github.com/GaudiRed/cyberbezpieczna-szkola/settings/pages`.
4. W **Build and deployment → Source** wybierz **GitHub Actions**.
5. Otwórz `https://github.com/GaudiRed/cyberbezpieczna-szkola/actions/workflows/publish-pages.yml`.
6. Przy pierwszej publikacji uruchom workflow przez **Run workflow → Branch: main → Run workflow**, jeśli nie uruchomił się sam po włączeniu GitHub Pages.
7. Po udanym zakończeniu akcji witryna powinna być widoczna pod adresem: `https://gaudired.github.io/cyberbezpieczna-szkola/`.

Jeśli konto pozwala na GitHub Pages w prywatnym repozytorium, można pozostawić kod prywatny i wykonać kroki 3–7. Uwaga: sama witryna GitHub Pages na standardowym koncie nadal będzie publiczna.

**Publikacja automatyczna:** każda zmiana zaakceptowana i zapisana w gałęzi `main` uruchamia kontrolę typów, kompilację i aktualizację strony GitHub Pages. Nadal można skorzystać z ręcznego przycisku **Run workflow**. Jeśli Pages nie jest skonfigurowane, wymagane jest ustawienie źródła **GitHub Actions** w ustawieniach repozytorium.

## Sprawdzenie po publikacji

- [ ] Znak Google for Education: poziomy desktop/tablet, pionowy mobile, bez zniekształceń.
- [ ] 18 kart wymagań KSC i poprawne powiązania z funkcjami Google.
- [ ] Test wyboru licencji Fundamentals / Plus / ChromeOS Education Upgrade.
- [ ] Autodiagnoza: zapis odpowiedzi lokalnie po odświeżeniu.
- [ ] Raport PDF: część KSC i część Google, bez nawigacji.
- [ ] Zastrzeżenie: wersja informacyjna, bez automatycznej zgodności z KSC/RODO.
- [ ] Sprawdzenie linków do aktualnych dokumentów ELI, Ministerstwa Cyfryzacji i Google.
- [ ] Informacje o marce i prawo użycia logotypu w publicznym serwisie.

## Czego nie robić

- Nie podawać osobowych danych uczniów ani dokumentów szkoły w statycznych plikach projektu.
- Nie umieszczać prywatnych identyfikatorów w linkach ani sekretów w konfiguracji frontendu.
- Nie traktować autodiagnozy jako wiążącego potwierdzenia wykonania obowiązków prawnych.
- Nie opisywać materiału jako oficjalnie zatwierdzonego przez MEN lub Google bez takiej decyzji.

## Dokumentacja GitHub

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
