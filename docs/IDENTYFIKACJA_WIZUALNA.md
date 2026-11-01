# Identyfikacja wizualna – Google for Education (projekt prywatny)

Stan: 1 listopada 2026 r. **Materiały demonstracyjne. Niepublikowane jako oficjalne stanowisko Google ani MEN.**

## Źródła pierwotne

- Zasoby logo, pakiet i wytyczne udostępnione przez Google for Education:
  https://edu.google.com/intl/ALL_uk/resources/get-started/setup-products/google-workspace-for-education/outreach-branding/
- Google Brand Resource Center:
  https://about.google/brand-resource-center/guidance/
- Google Partner Marketing Hub, zasady korzystania z nazwy i logotypu:
  https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/

## Zasady wdrożone w prototypie

1. W prywatnym prototypie korzystamy z **oryginalnych plików Google for Education wskazanych przez właścicielkę projektu**. Wersja pozioma to `static/brand/logo-google-for-education.png` (PNG 736 × 167), a pionowa to `static/brand/logo-google-for-education-vertical.png` (PNG 488 × 248). Obie grafiki zostały zapisane bez modyfikacji obrazu w repozytorium. Źródła: https://drive.google.com/file/d/1bk8PvwMzX5StGE7NLMCdzgNgcsIPJVpm/view oraz https://drive.google.com/file/d/1-_wmC8LESwHl2KZwo3VaissI3NJFPWOY/view.
2. Nazwa projektu („Cyberbezpieczna szkoła”) jest oddzielona od oryginalnego logo, które nie zostało przerysowane, zmienione ani użyte jako część nowego znaku.
3. Kolorystyka i kompozycja prywatnego prototypu odwołują się do estetyki Google: niebieski, czerwony, żółty i zielony, jasne tła oraz proste karty. Przed upublicznieniem wymagają zatwierdzenia sposobu użycia brandu.
4. Ilustracja ochrony szkoły w `src/lib/SecurityArtwork.svelte` jest **oryginalną grafiką** przygotowaną do poradnika, a nie zmodyfikowanym znakiem lub ikoną Google.
5. Aplikacja ładuje logo lokalnie: poziome na większych ekranach i pionowe przy szerokości do 640 px. Nie wymaga publicznego dostępu do plików na Dysku Google ani zewnętrznych serwerów graficznych. Przed publikacją należy potwierdzić uprawnienie do wykorzystania wybranych plików i sprawdzić czytelność w docelowym układzie.
6. Wersja publiczna nie może sugerować, że MEN, Google lub jego zespół zatwierdził publikację, dopóki takiego zatwierdzenia nie uzyskamy.

## Do decyzji przed upublicznieniem

- [ ] Zespół marketingowy Google for Education potwierdzi właściwą wersję poziomego lub pionowego logo.
- [ ] Zostanie zatwierdzony sposób użycia marki w projekcie publikowanym z prywatnego GitHuba.
- [x] Oba dostarczone przez właścicielkę logotypy zapisano lokalnie w repozytorium, bez wymagania publicznego udostępnienia plików Drive.
- [ ] Zostaną przejrzane teksty tytułowe i stopka, aby nie sugerowały nieistniejącej akceptacji MEN.
- [ ] Przeprowadzone zostaną testy na ekranach 375, 768 i 1440 px oraz w druku.
