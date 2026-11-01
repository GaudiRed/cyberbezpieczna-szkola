<script lang="ts">
  import { educationPartners } from '$lib/partners';
</script>

<section id="partnerzy" class="partners" aria-labelledby="partners-title">
  <div class="intro">
    <div class="eyebrow">WSPARCIE WE WDROŻENIU</div>
    <h2 id="partners-title">Masz pytania? Porozmawiaj z partnerem Google for Education.</h2>
    <p>Jeżeli masz pytania lub chcesz wiedzieć więcej, skontaktuj się z wybranym Partnerem Google for Education. Kontakty znajdziesz poniżej:</p>
  </div>

  <div class="partners-grid">
    {#each educationPartners as partner, index (partner.id)}
      <article class="partner-card" class:blue={index===0} class:green={index===1} class:yellow={index===2} class:red={index===3}>
        <div class="partner-heading">
          <span class="partner-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
          <h3>{partner.name}</h3>
        </div>
        <address>
          <span>{partner.street}</span>
          <span>{partner.postalCity}</span>
        </address>
        <div class="contact-details">
          <a href={partner.phoneHref} aria-label={`Zadzwoń do ${partner.name}, ${partner.phoneLabel}`}>{partner.phoneLabel}</a>
          {#each partner.emails as email (email)}
            <a href={`mailto:${email}`}>{email}</a>
          {/each}
        </div>
        <a class="website" href={partner.websiteHref} target="_blank" rel="noopener noreferrer" aria-label={`Strona internetowa ${partner.name}, ${partner.websiteLabel}`}>
          Odwiedź {partner.websiteLabel} <span aria-hidden="true">↗</span>
        </a>
      </article>
    {/each}
  </div>
  <p class="all-partners">Zobacz również <a href="https://rsvp.withgoogle.com/events/edu/partnerzy?pli=1" target="_blank" rel="noopener noreferrer">listę Partnerów Google for Education</a>.</p>
</section>

<style>
  .partners { scroll-margin-top: 24px; padding: 40px 0 52px; border-top: 1px solid #e2e7ee; }
  .intro { max-width: 760px; margin-bottom: 26px; }
  .eyebrow { font-size: 12px; font-weight: 750; letter-spacing: .12em; color: #1967d2; }
  h2 { color: #202124; font-size: clamp(26px, 3vw, 35px); letter-spacing: -.035em; line-height: 1.25; margin: 11px 0 13px; }
  .intro p { color: #58677a; line-height: 1.65; margin: 0; }
  .partners-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 15px; }
  .partner-card { background: #fff; border: 1px solid #e0e6ee; border-top: 4px solid #4285f4; border-radius: 17px; padding: 21px; display: flex; flex-direction: column; min-width: 0; box-shadow: 0 5px 23px rgba(28, 61, 105, .035); }
  .partner-card.green { border-top-color: #34a853; }
  .partner-card.yellow { border-top-color: #fbbc04; }
  .partner-card.red { border-top-color: #ea4335; }
  .partner-heading { display: flex; gap: 10px; align-items: flex-start; min-height: 67px; }
  .partner-number { display: grid; place-items: center; width: 31px; height: 31px; flex: none; border-radius: 10px; background: #e8f0fe; color: #1967d2; font-size: 11px; font-weight: 800; }
  h3 { margin: 4px 0 0; font-size: 16px; line-height: 1.4; color: #202124; }
  address { font-style: normal; color: #526277; font-size: 13px; line-height: 1.65; padding: 11px 0 18px; border-bottom: 1px solid #e8edf4; }
  address span { display: block; }
  .contact-details { display: flex; flex-direction: column; gap: 10px; margin: 18px 0 23px; }
  a { color: #1759b8; text-decoration: none; overflow-wrap: anywhere; font-size: 13px; }
  a:hover { text-decoration: underline; }
  a:focus-visible { outline: 3px solid #4285f4; outline-offset: 3px; border-radius: 3px; }
  .website { margin-top: auto; padding-top: 12px; font-weight: 700; }
  .website span { margin-left: 3px; }
  .all-partners { color: #637184; font-size: 13px; margin: 25px 0 0; line-height: 1.55; }
  .all-partners a { font-weight: 700; }
  @media (max-width: 1030px) { .partners-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 580px) { .partners-grid { grid-template-columns: 1fr; } .partners { padding-top: 32px; } .partner-heading { min-height: 0; } }
  @media print { .partners { display: none !important; } }
</style>
