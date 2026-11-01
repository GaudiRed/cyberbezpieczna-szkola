<script lang="ts">
 const questions=[
 {question:'Czy sama aktywna licencja Google Workspace oznacza, że szkoła spełnia wymagania KSC?',options:['Tak, zawsze','Nie, konieczna jest właściwa konfiguracja, procedury i ocena obowiązków','Tylko w płatnej edycji'],correct:1,why:'Zabezpieczenia techniczne mogą wspierać wymagania, ale nie zastępują oceny ryzyka, procedur ani obowiązków prawnych.'},
 {question:'Czy weryfikacja dwuetapowa jest dostępna w Education Fundamentals?',options:['Tak','Nie, tylko w Plus','Nie jest funkcją Google Workspace'],correct:0,why:'2SV jest dostępna w podstawowym pakiecie. Wdrożenie i egzekwowanie zależy od działań administratora.'},
 {question:'Czy Google Vault jest pełnym systemem kopii zapasowych?',options:['Tak','Nie, to przede wszystkim retencja i eDiscovery','Tak, wyłącznie dla Chromebooków'],correct:1,why:'Vault pomaga w przechowywaniu i wyszukiwaniu danych zgodnie z regułami retencji, nie zastępuje strategii backupu.'},
 {question:'Czy samo wskazanie, że szkoła jest publiczna, pozwala przypisać jej wszystkie obowiązki KSC?',options:['Tak','Nie, należy ustalić status i obowiązki podmiotu','Nie, KSC nigdy nie dotyczy podmiotów publicznych'],correct:1,why:'Zakres KSC zależy od ustawowych przesłanek i statusu podmiotu. Należy sprawdzić go indywidualnie.'},
 {question:'Czy podstawowe zabezpieczenia Verified Boot na Chromebooku wymagają licencji ChromeOS Education Upgrade?',options:['Tak','Nie, są wbudowane w ChromeOS','Tak, ale tylko w szkołach niepublicznych'],correct:1,why:'Verified Boot to zabezpieczenie systemowe. Licencja Education Upgrade rozszerza możliwości zarządzania urządzeniami.'}
 ];
 let answers:Record<number,number>={};
 let revealed=false;
 $: score=questions.filter((q,i)=>answers[i]===q.correct).length;
 $: allAnswered=questions.every((_,i)=>answers[i]!==undefined);
 function change(i:number,v:number){answers={...answers,[i]:v};revealed=false}
 function reset(){answers={};revealed=false}
</script>
<section class="quiz">
 <div class="eyebrow">QUIZ EDUKACYJNY</div><h1>Sprawdź swoją wiedzę</h1>
 <p>Pięć pytań o bezpieczeństwo szkoły i rozwiązania Google. Quiz służy do nauki, nie jest audytem, szkoleniem KSC ani certyfikatem zgodności.</p>
 {#each questions as q,i}
 <fieldset><legend>{i+1}. {q.question}</legend>
 {#each q.options as opt,j}
  <label class:correct={revealed&&q.correct===j} class:wrong={revealed&&answers[i]===j&&j!==q.correct}>
  <input type="radio" name={'q'+i} checked={answers[i]===j} onchange={()=>change(i,j)}/>{opt}</label>
 {/each}
 {#if revealed}<div class="explanation"><strong>{answers[i]===q.correct?'Poprawnie.':'Odpowiedź do poprawy.'}</strong> {q.why}</div>{/if}
 </fieldset>{/each}
 <div class="actions"><button class="primary" disabled={!allAnswered} onclick={()=>revealed=true}>Sprawdź odpowiedzi</button><button class="secondary" onclick={reset}>Rozpocznij ponownie</button></div>
 {#if revealed}<div class="result" role="status"><strong>Wynik: {score} z {questions.length}</strong><p>Wróć do katalogu funkcji i instrukcji, aby pogłębić wiedzę.</p></div>{/if}
</section>
<style>
.quiz{max-width:900px}.eyebrow{font-size:12px;letter-spacing:2px;color:#2863b8;font-weight:800}h1{font-size:clamp(30px,4vw,44px);letter-spacing:-1.3px}p{color:#556780;line-height:1.6}fieldset{border:1px solid #dce5ee;background:#fff;border-radius:14px;padding:19px 22px;margin:17px 0}legend{font-weight:800;padding:4px 7px;max-width:95%;line-height:1.5}label{display:flex;align-items:center;gap:10px;padding:11px;border-radius:9px;cursor:pointer;color:#334762}input{accent-color:#245eae}label.correct{background:#e3f5e8}label.wrong{background:#ffebeb}.explanation{background:#edf4ff;padding:14px;margin-top:10px;border-radius:8px;line-height:1.6}.actions{display:flex;gap:12px;margin-top:25px;flex-wrap:wrap}button{padding:12px 18px;border-radius:9px;font-weight:700;border:1px solid #245eae;cursor:pointer}.primary{background:#245eae;color:#fff}.primary:disabled{opacity:.5;cursor:not-allowed}.secondary{background:white;color:#245eae}.result{margin-top:18px;background:#eaf2ff;border-radius:12px;padding:18px}
</style>