/**
 * Tam, gdzie Workspace/ChromeOS nie pokrywa całego wymagania,
 * pokazujemy praktyczny wariant wspierający oparty na dostępnych usługach Google.
 * Nie jest to deklaracja spełnienia wymagania prawnego.
 */
export type GoogleBridge = {
  title: string;
  use: string;
  outside: string;
  guide: string;
  guideUrl: string;
};
export const googleBridges: Record<string, GoogleBridge> = {
  ksc01: {
    title: 'Rejestr sprzętu i usług w Arkuszach Google',
    use: 'Jeden chroniony Arkusz: nazwa zasobu, numer, system, miejsce, odpowiedzialny, data przeglądu. Eksportuj dane zarządzanych kont i Chromebooków z konsoli.',
    outside: 'Pozostałe komputery, sieć i usługi trzeba wpisać ręcznie lub importować z używanego systemu inwentaryzacyjnego.',
    guide: 'Arkusze Google, udostępnianie i uprawnienia',
    guideUrl: 'https://support.google.com/docs/answer/2494822?hl=pl'
  },
  ksc11: {
    title: 'Kalendarz Google + protokół w Arkuszach',
    use: 'Ustaw cykliczne wydarzenie „Test odtwarzania danych” z osobą odpowiedzialną. W Arkuszu zapisuj źródło kopii, próbkę, wynik i czas odzyskania.',
    outside: 'Odtwarzanie wykonaj z prawdziwego, odseparowanego archiwum na środowisku testowym. Sam kalendarz i Arkusz nie sprawdzają kopii.',
    guide: 'Jak utworzyć wydarzenie cykliczne',
    guideUrl: 'https://support.google.com/calendar/answer/37115?hl=pl'
  },
  ksc12: {
    title: 'Formularz Google + ograniczony rejestr incydentów',
    use: 'Utwórz prosty formularz „Zgłoś incydent” z dostępem dla pracowników. Odpowiedzi trafiają do chronionego Arkusza, a Kalendarz przypomina o ćwiczeniach.',
    outside: 'Wyznacz osobę reagującą i awaryjny numer telefonu, gdy Google nie działa. Nie zbieraj haseł ani pełnej dokumentacji uczniów w formularzu.',
    guide: 'Kontrola dostępu do Formularzy Google',
    guideUrl: 'https://support.google.com/docs/answer/16319311?hl=pl'
  },
  ksc13: {
    title: 'Chromebooki + rejestr ochrony pozostałych urządzeń',
    use: 'Dla Chromebooków korzystaj z aktualizacji i ochrony ChromeOS. W Arkuszach Google zapisuj, czy pozostałe urządzenia są chronione i aktualizowane.',
    outside: 'Na Windows, macOS i serwerach trzeba osobno zapewnić odpowiednią ochronę antymalware. Arkusz jej nie zastępuje.',
    guide: 'Zarządzanie aktualizacjami ChromeOS',
    guideUrl: 'https://support.google.com/chrome/a/answer/3168106?hl=pl'
  },
  ksc15: {
    title: 'Arkusze + przypomnienia przed końcem wsparcia',
    use: 'W chronionym Arkuszu prowadź listę urządzeń i dat końca aktualizacji. W Kalendarzu ustaw przypomnienia o wycofaniu lub wymianie urządzenia.',
    outside: 'Daty wsparcia komputerów i programów spoza Google sprawdź u odpowiednich dostawców.',
    guide: 'Powtarzające się terminy w Kalendarzu Google',
    guideUrl: 'https://support.google.com/calendar/answer/37115?hl=pl'
  },
  ksc17: {
    title: 'Bezpłatne materiały Google + test wiedzy',
    use: 'Wykorzystaj materiały Google Safety Center, a w Formularzach Google przygotuj pięć pytań o phishing, 2SV i zgłaszanie incydentów.',
    outside: 'Szkoła nadal ustala zakres i częstotliwość szkoleń, przekazuje własne procedury oraz dokumentuje udział pracowników.',
    guide: 'Materiały Google Safety Center',
    guideUrl: 'https://safety.google/intl/pl/'
  },
  ksc18: {
    title: 'Formularz, Arkusz i osobny kanał alarmowy',
    use: 'Wdroż prosty formularz zgłoszeń oraz chroniony rejestr podjętych działań w Arkuszach Google. Zdefiniuj osoby sprawdzające alerty konsoli.',
    outside: 'Zapewnij kanał awaryjny poza Google i właściwe zgłoszenia do CSIRT. Formularz nie wysyła automatycznie wymaganych zgłoszeń.',
    guide: 'Kontrola dostępu do Formularzy Google',
    guideUrl: 'https://support.google.com/docs/answer/16319311?hl=pl'
  }
};
