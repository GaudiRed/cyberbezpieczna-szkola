/**
 * Krótkie checklisty działań dla poszczególnych punktów załącznika nr 4.
 * Część „W Google” pokazuje możliwości dostępne zależnie od edycji,
 * a „W szkole” to czynności organizacyjne lub wymagające innych narzędzi.
 */
export type PracticalAdvice = {
  google: string[];
  school: string[];
  proof: string;
};
export const practicalAdvice: Record<string, PracticalAdvice> = {
  "ksc01": { google: ["Otwórz Konsolę administratora → Użytkownicy. Sprawdź listę kont i administratorów.","Jeśli szkoła zarządza Chromebookami, wyeksportuj listę urządzeń z sekcji Urządzenia → Chrome."], school: ["Dopisz pozostałe komputery, sieć, drukarki i aplikacje do jednego spisu."], proof: "Lista sprzętu, usług i osób odpowiedzialnych." },
  "ksc02": { google: ["Na zarządzanych Chromebookach sprawdź ustawienia aktualizacji i dozwolonych aplikacji."], school: ["Zapisz, kto aktualizuje Windows, macOS i pozostałe oprogramowanie."], proof: "Wykaz wersji i polityka instalowania aplikacji." },
  "ksc03": { google: ["Włącz weryfikację dwuetapową (2SV) dla pracowników i administratorów.","Sprawdź zasady udostępniania plików na Dysku."], school: ["Ustal, kto zabezpiecza pomieszczenia, sprzęt i dokumenty szkoły."], proof: "Zapisane ustawienia Google i zasady ochrony danych." },
  "ksc04": { google: ["Włącz 2SV i sprawdź, kto ma role administratora.","Sprawdź dostęp do wrażliwych folderów i Dysków współdzielonych."], school: ["Zapisz, kto ma prawo zatwierdzać dostęp."], proof: "Lista kont, ról i dat ostatniego przeglądu." },
  "ksc05": { google: ["W konsoli → Role administratora odbierz niepotrzebne uprawnienia.","Na Dysku ogranicz udostępnianie plików osobom, które nie muszą ich widzieć."], school: ["Zatwierdź prostą tabelę: stanowisko → niezbędny dostęp."], proof: "Tabela ról oraz wynik przeglądu dostępów." },
  "ksc06": { google: ["W konsoli → Użytkownicy zawieś konto osoby, która zakończyła pracę."], school: ["Odbierz jej dostęp do innych systemów i wspólnych dokumentów."], proof: "Checklista odejścia pracownika z datą wykonania." },
  "ksc07": { google: ["Po zmianie obowiązków zaktualizuj grupy, role i dostępy do plików w Google."], school: ["Wprowadź prosty formularz zgłaszania zmian uprawnień."], proof: "Zgłoszenie i potwierdzenie wykonania zmiany." },
  "ksc08": { google: ["Włącz 2SV dla kont używanych poza szkołą.","Dla zarządzanych Chromebooków sprawdź zasady logowania, aktualizacji i urządzeń."], school: ["Ustal, czy i jak wolno pracować na prywatnym sprzęcie."], proof: "Jednostronicowe zasady pracy poza szkołą." },
  "ksc09": { google: ["Włącz ochronę przed phishingiem i szkodliwymi załącznikami w Gmail.","Dla szkolnej domeny skonfiguruj SPF, DKIM i DMARC."], school: ["Sprawdź również innych nadawców poczty, np. dziennik elektroniczny."], proof: "Wynik kontroli rekordów DNS i polityk Gmail." },
  "ksc10": { google: ["Konsola administratora → Dane → Import i eksport danych → Eksport danych. Uruchom pełny eksport organizacji.", "Po eksporcie pobierz archiwum. Możesz przechować je w osobnym zasobie Google Cloud Storage z ograniczonymi uprawnieniami (opcja płatna)."], school: ["Na początek zapisz archiwum również na zaszyfrowanym nośniku odłączanym od komputera i przechowywanym osobno.", "Ustal harmonogram, zakres kopii i przetestuj odzyskanie plików. Partner może wdrożyć automatyczny backup."], proof: "Rejestr dat eksportu, miejsce odseparowania kopii i protokół odzyskania pliku." },
  "ksc11": { google: [], school: ["Przywróć próbnie wybrany plik z kopii zapasowej.","Zapisz datę, wynik i czas odzyskania danych."], proof: "Protokół testu przywracania danych." },
  "ksc12": { google: ["Utwórz wewnętrzny Formularz Google do zgłaszania incydentów przez pracowników. Ogranicz dostęp do zgłoszeń.", "Sprawdzaj dostępne alerty Google Workspace i zapisuj podjęte działania w chronionym Arkuszu Google."], school: ["Wyznacz osobę przyjmującą zgłoszenia i awaryjny numer telefonu na wypadek niedostępności Google.", "Przeprowadź próbne zgłoszenie i sprawdź, czy dotarło do właściwej osoby."], proof: "Procedura, chroniony rejestr zgłoszeń i protokół testu." },
  "ksc13": { google: ["Sprawdź, czy Chromebooki otrzymują aktualizacje ChromeOS.","Korzystaj z wbudowanych mechanizmów ochrony ChromeOS."], school: ["Na pozostałych urządzeniach sprawdź ochronę przed złośliwym oprogramowaniem."], proof: "Spis urządzeń i potwierdzenie ochrony." },
  "ksc14": { google: ["Włącz 2SV i pokaż pracownikom, jak rozpoznawać phishing w Gmail."], school: ["Przekaż jedną stronę zasad: hasła, linki, pliki, zgłaszanie zagrożeń."], proof: "Zasady cyberhigieny i lista przeszkolonych osób." },
  "ksc15": { google: ["Sprawdź terminy aktualizacji Chromebooków i wersje ChromeOS."], school: ["Dopisz daty końca wsparcia pozostałego sprzętu i aplikacji."], proof: "Spis urządzeń z datami zakończenia wsparcia." },
  "ksc16": { google: ["Włącz automatyczne aktualizacje zarządzanych Chromebooków."], school: ["Sprawdzaj ostrzeżenia producentów innych urządzeń i instaluj poprawki."], proof: "Lista podatności oraz dat ich usunięcia." },
  "ksc17": { google: ["Udostępnij pracownikom bezpłatne materiały Google o phishingu i ochronie kont.", "Zrób krótki sprawdzian w Formularzach Google i zapisz wyniki w arkuszu z ograniczonym dostępem."], school: ["Ustal termin szkolenia i przekaż personelowi szkolną procedurę zgłaszania incydentów."], proof: "Materiały, lista uczestników i wynik sprawdzianu." },
  "ksc18": { google: ["Ustal, kto sprawdza alerty bezpieczeństwa Google i gdzie są dokumentowane."], school: ["Podaj pracownikom konkretny adres do zgłaszania incydentów.","Ustal osobę odpowiedzialną za zgłoszenia wymagane prawem."], proof: "Procedura zgłoszeń i rejestr incydentów." },
};
