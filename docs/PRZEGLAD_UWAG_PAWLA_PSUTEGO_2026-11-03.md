# Przegląd uwag Pawła Psutego — Cyberbezpieczna szkoła

Data przeglądu: 2026-11-03
Status: decyzje redakcyjne do wersji 1.0; nie jest to opinia prawna ani certyfikacja zgodności KSC.

## Cel
Dziękujemy Pawłowi Psutemu za szczegółowy przegląd wszystkich 18 wymagań. Uwagi wskazały konkretne luki w prezentacji narzędzi Google, zwłaszcza Chrome Enterprise Core, aplikacji zewnętrznych i funkcji dostępnych bez opłat. Wprowadzamy tylko zmiany, które uczą szkołę konkretnego działania i nie zacierają odpowiedzialności placówki.

## Zasada akceptacji
Uwagę przyjmujemy, jeśli (1) odpowiada na ryzyko lub obowiązek, (2) wskazuje czynność i dowód jej wykonania, (3) jest poprawna technicznie i licencyjnie, (4) pokazuje, kiedy szkoła potrzebuje administratora lub partnera. Kompletność katalogu produktów nie jest celem samym w sobie.

## Macierz decyzji
| Punkt | Decyzja | Uzasadnienie i zakres |
| --- | --- | --- |
| 1. Inwentaryzacja ICT | Przyjęta, z ograniczeniem | Uzupełniono informacje o urządzeniach, aplikacjach i Chrome Enterprise Core; brak obietnicy automatycznej pełnej inwentaryzacji drukarek, sieci i komputerów. |
| 2. Wersje i instalacje | Przyjęta | Dodano raporty zarządzanych Chrome i rozszerzeń; nie przenosi się kontroli Chrome na inne programy. |
| 3. Chmura | Przyjęta | Link do Google Workspace Security Whitepaper; szkoła dokumentuje także własne ustawienia. |
| 4. Uprawnieni użytkownicy | Przyjęta | Przegląd OAuth i aplikacji zewnętrznych, opcjonalne SSO; SSO nie oznacza automatycznego zarządzania wszystkimi rolami. |
| 5. Minimalne uprawnienia | Utrzymana | Weryfikacja ról i grup już jest; unikanie zdublowanych list. |
| 6. Cofanie uprawnień | Częściowo przyjęta | Uwzględniono absolwentów i nieobecności; nie wprowadzono uniwersalnej zasady zawieszenia kont po miesiącu urlopu. |
| 7. Zmiana zadań | Utrzymana | Aktualizacja uprawnień jest w aktualnej checkliście. |
| 8. Praca zdalna | Przyjęta | Ujęto inne urządzenia; zakres MDM zależy od licencji i konfiguracji. |
| 9. Poczta | Utrzymana | SPF, DKIM i DMARC już obecne. |
| 10. Kopie zapasowe | Częściowo przyjęta | Korzyści niezawodności chmury są ważne, ale redundancja nie zastępuje wymaganego backupu ani testów odtworzenia. |
| 11. Testy odtwarzania | Utrzymana | Kalendarz przypomnień i protokół testowy już obecne. Nie dodajemy automatycznej integracji bez uzasadnienia potrzebą użytkownika. |
| 12. Procedury incydentowe | Przyjęta | Ujęto dzienniki audytu i retencję Vault (nie jest to narzędzie wykrywające incydenty ani backup); płatne narzędzia wskazywane osobno. |
| 13. Antymalware | Przyjęta z doprecyzowaniem | Link do ochrony Gmail; statystyka 99,9% nie dotyczy wszystkich komputerów i całej platformy. |
| 14. Cyberhigiena | Przyjęta | Okresowe przypomnienia i ćwiczenia, powiązane z planem szkoleń. |
| 15. Cykl życia | Utrzymana | Rejestr dat końca wsparcia i przypomnienia są już opisane. |
| 16. Podatności | Utrzymana | Uwzględniono inne systemy oraz decyzje o aktualizacji. |
| 17. Szkolenia | Utrzymana | Odrębny punkt prawny; wspólne wykonanie z pkt 14 bez dublowania pracy. |
| 18. Cyberzagrożenie | Utrzymana | Odrębna instrukcja eskalacji i obowiązków zgłoszeniowych; nie utożsamiamy jej z każdym incydentem IT. |

## Rekomendowane następne działania
1. Zweryfikować aktualne uprawnienia i edycje Google dla każdej funkcji przed zatwierdzeniem katalogu.
2. Przetestować z dyrektorem, administratorem i organem prowadzącym, czy z karty mogą wykonać zadanie i zachować dowód.
3. Zakończyć wersję 1.0 po naprawie jedynie błędów krytycznych i wysokiego priorytetu.
4. Zamknąć pozostałe pomysły jako propozycje, bez automatycznego rozszerzania zakresu.

## Wykorzystane dokumenty producenta
- Chrome Enterprise Core, raporty i eksport: https://support.google.com/chrome/a/answer/9286924?hl=en
- Raport wersji Chrome i ChromeOS: https://support.google.com/chrome/a/answer/10025748?hl=en
- Google Workspace Security Whitepaper: https://workspace.google.com/learn-more/security/security-whitepaper/asset-protection/
- Kontrola dostępu aplikacji zewnętrznych: https://support.google.com/a/answer/7281227?hl=en

## Granice projektu
Poradnik pokazuje dostępne środki i działania organizacyjne, nie gwarantuje bezpieczeństwa ani zgodności KSC. Partnerzy Google mogą pomóc w analizie i wdrożeniu, ale wybór narzędzia zależy od ryzyka, budżetu i istniejącej infrastruktury szkoły.
