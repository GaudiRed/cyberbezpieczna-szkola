export type EducationPartner = {
  id: string;
  name: string;
  street: string;
  postalCity: string;
  phoneLabel: string;
  phoneHref: string;
  emails: string[];
  websiteLabel: string;
  websiteHref: string;
};

export const educationPartners: EducationPartner[] = [
  {
    id: 'gocloud',
    name: 'GoCloud Polska sp. z o.o.',
    street: 'ul. Krzyżówki 13B/27',
    postalCity: '03-193 Warszawa',
    phoneLabel: '+48 22 20 35 551',
    phoneHref: 'tel:+48222035551',
    emails: ['kontakt@gocloud.pl'],
    websiteLabel: 'gocloud.pl',
    websiteHref: 'https://gocloud.pl'
  },
  {
    id: 'cct',
    name: 'CCT Poland',
    street: 'Aleja 3 Maja 12',
    postalCity: '00-391 Warszawa',
    phoneLabel: '+48 886 199 305',
    phoneHref: 'tel:+48886199305',
    emails: ['info@cctpoland.com', 'i.zakharchenko@cctpoland.com'],
    websiteLabel: 'cctpoland.com',
    websiteHref: 'https://cctpoland.com'
  },
  {
    id: 'mscloud',
    name: 'MScloud',
    street: 'ul. Twarda 18',
    postalCity: '00-105 Warszawa',
    phoneLabel: '+48 732 704 404',
    phoneHref: 'tel:+48732704404',
    emails: ['artur.banasiak@mscloud.pl'],
    websiteLabel: 'mscloud.pl',
    websiteHref: 'https://mscloud.pl'
  },
  {
    id: 'buena',
    name: 'Buena Cloud',
    street: 'ul. Wichrowa 20C',
    postalCity: '60-449 Poznań',
    phoneLabel: '+48 606 125 407',
    phoneHref: 'tel:+48606125407',
    emails: ['info@buenacloud.pl'],
    websiteLabel: 'buenacloud.pl',
    websiteHref: 'https://buenacloud.pl'
  }
];
