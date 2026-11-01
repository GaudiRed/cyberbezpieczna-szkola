# Rejestr źródeł i ograniczeń (stan: 2026-11-01)

To jest **wewnętrzny** rejestr twierdzeń i źródeł pierwszej wersji aplikacji. Publikacja jako oficjalny poradnik Google for Education lub MEN wymaga zatwierdzenia.

## Źródła prawne

| Zakres | Oficjalne źródło | Sposób użycia |
| --- | --- | --- |
| KSC, tekst jednolity (Dz.U. 2026 poz. 20) | https://eli.gov.pl/eli/DU/2026/20/ogl | Czytać z uwzględnieniem późniejszych zmian |
| Nowelizacja KSC (Dz.U. 2026 poz. 252) | https://eli.gov.pl/eli/DU/2026/252/ogl | Weszła w życie 3 kwietnia 2026 r. |
| Zakres podmiotowy KSC | https://www.gov.pl/web/cyfryzacja/nowelizacja-ustawy-o-krajowym-systemie-cyberbezpieczenstwa-ksc---kogo-obejmuje | Podmiot wymaga indywidualnej kwalifikacji |
| Obowiązki podmiotów kluczowych i ważnych | https://www.gov.pl/web/cyfryzacja/nowelizacja-ustawy-o-krajowym-systemie-cyberbezpieczenstwa-ksc---obowiazki-podmiotow-kluczowych-i-waznych | Terminy i obowiązki tylko dla podmiotów właściwie zakwalifikowanych |
| RODO (art. 5, 28, 32) | https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32016R0679 | Źródło wymagań dotyczących ochrony danych |

## KSC: publiczne szkoły i przedszkola oraz załącznik nr 4

Ministerstwo Cyfryzacji w FAQ (pytanie 1.16) wskazuje, że szkoły publiczne i przedszkola będące jednostkami budżetowymi są podmiotami KSC. Dla podmiotu ważnego będącego podmiotem publicznym art. 8 ust. 3 ustawy wskazuje uproszczony system zarządzania bezpieczeństwem informacji z załącznika nr 4. Część I załącznika obejmuje 18 podstawowych wymagań, część II rozwiązania fakultatywne, część III przeglądy, a część IV dokumentowanie realizacji działań.

- Źródło ustawy: https://eli.gov.pl/eli/DU/2026/252/ogl
- Oryginalny załącznik nr 4, strony 102–103: https://eli.gov.pl/api/acts/DU/2026/252/text/T/D20260252L.pdf#page=102
- Ministerstwo Cyfryzacji, FAQ: https://cyber.gov.pl/assets/pdf/faq-ksc.pdf (pyt. 1.16)

**Zasada redakcyjna:** karta wymogu zawiera parafrazę, a nie skrócony cytat podany jako dosłowne brzmienie prawa. Dokładne brzmienie zawsze sprawdzamy w oryginalnym akcie. Każda funkcja Google jest środkiem wspierającym, nie dowodem zgodności. Szczególnie: Vault ≠ odseparowany backup; zabezpieczenia ChromeOS ≠ antywirus na każdym urządzeniu; narzędzia dochodzeniowe Google ≠ obowiązkowe zgłoszenie incydentu.

## Oficjalne źródła Google

| Temat | Oficjalny dokument | Uwaga |
| --- | --- | --- |
| Edycje Google Workspace for Education | https://edu.google.com/workspace-for-education/editions/compare-editions/ | Aktualna główna oferta obejmuje Fundamentals i Plus |
| Weryfikacja dwuetapowa | https://support.google.com/a/answer/175197?hl=pl | Dostępna w Fundamentals; administrator musi ją skonfigurować |
| Automatyczne aktualizacje ChromeOS | https://support.google.com/chrome/a/answer/6220366?hl=pl | Wsparcie zależy od daty dla urządzenia |
| Bezpieczeństwo Google for Education | https://edu.google.com/our-values/privacy-security/ | Opis praktyk i zabezpieczeń |
| Umowa Google Workspace for Education | https://workspace.google.com/terms/education_terms/ | Weryfikować datę modyfikacji i warunki danego podmiotu |
| Kursy i materiały | https://edu.google.com/learning-center/ | Bezpłatne kursy online, sprawdzić język danego modułu |

## Kontrole redakcyjne wymagane przed publikacją

- [ ] Każde przypisanie obowiązku prawnego ma bezpośrednie odwołanie do aktualnego przepisu i wskazany status: potwierdzony dla opisanej kategorii / warunkowy / do indywidualnego ustalenia.\n- [ ] Jeśli źródło nie pozwala na jednoznaczne przypisanie obowiązku, materiał nie formułuje kategorycznej oceny zgodności. Zewnętrzna opinia prawna jest możliwa, ale nie jest warunkiem tworzenia prototypu.
- [ ] Aktualne wersje funkcji i licencji zostaną zweryfikowane na oficjalnej stronie porównawczej Google.
- [ ] Linki zostaną ponownie sprawdzone automatycznie lub ręcznie.
- [ ] Zespół Google zatwierdzi oznaczenia marki oraz treść oficjalnych deklaracji.
- [ ] Przed występowaniem jako oficjalny materiał MEN, ministerstwo zatwierdzi użycie materiału i sposób przedstawienia odpowiedzialności prawnej.
- [ ] Zostanie wykonany test dostępności, funkcji autodiagnozy i raportu drukowanego do PDF.

## Zasady treści

1. Jeden obowiązek może wymagać wielu środków, a jedna funkcja może wspierać wiele obowiązków.
2. Nie stwierdzamy, że włączenie funkcji Google jest równoznaczne ze zgodnością z prawem.
3. Nie przedstawiamy materiałów ogólnych jako certyfikowanych szkoleń z KSC.
4. W pierwszej wersji autodiagnoza działa lokalnie i nie weryfikuje automatycznie konfiguracji konsoli.
