<script lang="ts">
 let schoolType='public';
 let ownerType='jst';
 let kscStatus='unknown';
 const faq='https://cyber.gov.pl/assets/pdf/faq-ksc.pdf#page=19';
 const sources=[
  {title:'Ustawa o krajowym systemie cyberbezpieczeństwa, tekst jednolity',url:'https://eli.gov.pl/eli/DU/2026/20/ogl'},
  {title:'Ustawa zmieniająca KSC (Dz.U. 2026 poz. 252)',url:'https://eli.gov.pl/eli/DU/2026/252/ogl'},
  {title:'Ministerstwo Cyfryzacji: kogo obejmują zmiany?',url:'https://www.gov.pl/web/cyfryzacja/nowelizacja-ustawy-o-krajowym-systemie-cyberbezpieczenstwa-ksc---kogo-obejmuje'},
  {title:'Ministerstwo Cyfryzacji: obowiązki podmiotów kluczowych i ważnych',url:'https://www.gov.pl/web/cyfryzacja/nowelizacja-ustawy-o-krajowym-systemie-cyberbezpieczenstwa-ksc---obowiazki-podmiotow-kluczowych-i-waznych'},
  {title:'RODO, rozporządzenie (UE) 2016/679',url:'https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32016R0679'}
 ];
</script>
<section class="scope">
 <div class="eyebrow">ZAKRES OBOWIĄZKÓW</div>
 <h1>Najpierw ustal, które przepisy mają zastosowanie</h1>
 <p>Ministerstwo Cyfryzacji wskazuje, że publiczne szkoły i przedszkola będące jednostkami budżetowymi są objęte KSC. Dla podmiotów ważnych będących podmiotami publicznymi przewidziano uproszczone wymagania w załączniku nr 4. Inne formy organizacyjne wymagają odrębnego ustalenia statusu.</p><p><a href={faq} target="_blank" rel="noopener noreferrer">FAQ Ministerstwa Cyfryzacji, pytanie 1.16 ↗</a></p>
 <div class="form">
  <label>Rodzaj szkoły<select bind:value={schoolType}><option value="public">Szkoła publiczna</option><option value="nonpublic">Szkoła niepubliczna</option><option value="other">Inna placówka oświatowa</option></select></label>
  <label>Organ prowadzący<select bind:value={ownerType}><option value="jst">Jednostka samorządu terytorialnego</option><option value="other">Inny podmiot</option><option value="unknown">Nie wiem</option></select></label>
  <label>Status w KSC<select bind:value={kscStatus}><option value="unknown">Nie ustalono</option><option value="confirmed">Potwierdzony status podmiotu objętego obowiązkami</option><option value="notconfirmed">Nie potwierdzono objęcia obowiązkami</option></select></label>
 </div>
 <div class="outcome">
  <h2>Co wynika z wyboru?</h2>
  {#if schoolType==='public' && ownerType==='jst'}<p><strong>Szkoła samorządowa:</strong> przy działaniu jako samorządowa jednostka budżetowa jest objęta KSC. Uproszczony zakres SZBI dla podmiotu ważnego będącego publicznym wynika z art. 8 ust. 3 i załącznika nr 4. Ustal z organem prowadzącym, które systemy i zadania pozostają po stronie placówki, a które są realizowane wspólnie.</p>{/if}
  <p><strong>RODO:</strong> szkoła przetwarzająca dane osobowe powinna stosować odpowiednie środki techniczne i organizacyjne, dobrane do ryzyka. Przykładowe funkcje Google to 2SV, zarządzanie dostępem i kontrola udostępniania.</p>
  {#if kscStatus==='confirmed'}
   <p><strong>KSC:</strong> wskazano, że status jest potwierdzony. Zweryfikuj kategorię podmiotu, właściwy organ, terminy i zakres obowiązków na podstawie aktualnego prawa oraz dokumentacji podmiotu.</p>
  {:else}
   <p><strong>KSC:</strong> status podmiotu wymaga ustalenia. Nie przypisuj automatycznie wszystkich obowiązków KSC tylko na podstawie ogólnej nazwy placówki. Dla samorządowej jednostki budżetowej skorzystaj przede wszystkim z załącznika nr 4, a dla innych podmiotów ustal kategorię i zakres obowiązków. Zweryfikuj status w przepisach i oficjalnych wyjaśnieniach Ministerstwa Cyfryzacji oraz ustal zakres odpowiedzialności z organem prowadzącym. Przy niepewności pozostaw status jako „nieustalony”.</p>
  {/if}
  {#if ownerType==='jst'}
   <p><strong>Organ prowadzący:</strong> ustal, za które systemy i procesy odpowiada szkoła, a które zabezpieczenia i procedury są organizowane przez JST.</p>
  {/if}
 </div>
 <h2>Mapa: zadanie szkoły → rozwiązanie Google</h2>
 <div class="cards">
  <article><span>RODO · art. 32</span><h3>Ochrona kont i poufności</h3><p>Weryfikacja dwuetapowa, zarządzanie dostępem i kontami użytkowników. Środki dobiera administrator danych w oparciu o ryzyko.</p><a href="https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32016R0679" target="_blank" rel="noopener noreferrer">Przepis źródłowy ↗</a></article>
  <article><span>RODO · art. 32</span><h3>Ochrona informacji i odporność</h3><p>Ochrona Gmail, zabezpieczenia ChromeOS i narzędzia monitorowania. Szkoła nadal odpowiada za procedury i testy skuteczności.</p><a href="https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:32016R0679" target="_blank" rel="noopener noreferrer">Przepis źródłowy ↗</a></article>
  <article><span>KSC · zakres warunkowy</span><h3>Kwalifikacja i analiza obowiązków</h3><p>Google nie ustala statusu KSC. Narzędzia mogą pomagać w kontroli dostępu, monitorowaniu i reagowaniu, ale nie zastępują wpisu do wykazu ani zgłoszeń incydentów.</p><a href="https://www.gov.pl/web/cyfryzacja/nowelizacja-ustawy-o-krajowym-systemie-cyberbezpieczenstwa-ksc---kogo-obejmuje" target="_blank" rel="noopener noreferrer">Informacja ministerstwa ↗</a></article>
 </div>
 <h2>Źródła do sprawdzenia</h2>
 <ul>{#each sources as s}<li><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a></li>{/each}</ul>
 <p class="foot">Stan odniesienia: 1 listopada 2026 r. Opisy są informacyjne i nie zastępują kwalifikacji prawnej konkretnego podmiotu. Wersja robocza nie jest stanowiskiem MEN ani Google. Nie wymaga wydawania formalnej opinii prawnej do przeprowadzenia autodiagnozy, ale nie stanowi wiążącej kwalifikacji podmiotu.</p>
</section>
<style>
.scope{max-width:1030px}.eyebrow{font-size:12px;letter-spacing:2px;color:#2863b8;font-weight:800}h1{font-size:clamp(30px,4vw,44px);letter-spacing:-1.3px}h2{font-size:22px;margin-top:28px}p{color:#556780;line-height:1.65}.form{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;background:white;border:1px solid #e1e7ef;padding:20px;border-radius:14px}.form label{font-weight:700;font-size:13px}.form select{display:block;width:100%;margin-top:9px;background:white;border:1px solid #cbd5e1;border-radius:8px;padding:10px;color:#26374d}.outcome{background:#eaf2ff;border-left:4px solid #2863b8;padding:10px 22px;margin:20px 0;border-radius:10px}.outcome h2{margin-top:12px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.cards article{padding:20px;background:white;border-radius:13px;border:1px solid #dee6ef}.cards span{color:#2863b8;font-size:12px;font-weight:800}.cards h3{margin:12px 0}.cards p{font-size:14px}.cards a,li a{color:#175ab7}li{margin:10px 0}.foot{font-size:12px;margin-top:25px}@media(max-width:760px){.form,.cards{grid-template-columns:1fr}}
</style>