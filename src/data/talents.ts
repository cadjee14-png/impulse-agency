export type TalentRole = 'Mannequin' | 'Créatrice UGC';

export interface Talent {
  slug: string;
  name: string;
  roles: TalentRole[];
  city: string;
  bio: string;
  /** Première photo = photo de couverture. Chemins dans /public/images/talents/ */
  photos: string[];
  measurements?: { label: string; value: string }[];
  socials: { platform: 'Instagram' | 'TikTok' | 'YouTube'; url: string; followers: string }[];
  specialties: string[];
  /** false = profil masqué en prod tant que les infos et l'accord droit à l'image ne sont pas réunis */
  published: boolean;
}

// TODO Norman : remplacer par les vraies infos des deux talents + passer published à true.
export const talents: Talent[] = [
  {
    slug: 'talent-1',
    name: 'Talent 01',
    roles: ['Mannequin', 'Créatrice UGC'],
    city: 'Marseille',
    bio: 'Profil à compléter.',
    photos: [],
    measurements: [
      { label: 'Taille', value: '—' },
      { label: 'Poitrine', value: '—' },
      { label: 'Tour de taille', value: '—' },
      { label: 'Hanches', value: '—' },
      { label: 'Pointure', value: '—' },
    ],
    socials: [],
    specialties: [],
    published: false,
  },
  {
    slug: 'talent-2',
    name: 'Talent 02',
    roles: ['Créatrice UGC'],
    city: 'Marseille',
    bio: 'Profil à compléter.',
    photos: [],
    socials: [],
    specialties: [],
    published: false,
  },
];

export const visibleTalents = () =>
  process.env.NODE_ENV === 'production' ? talents.filter(t => t.published) : talents;

export const getTalent = (slug: string) => visibleTalents().find(t => t.slug === slug);

export const brandOffers = [
  {
    title: 'Contenu UGC pour vos pubs',
    text: 'Vidéos face caméra, unboxings, tutos et avis tournés au téléphone, au format vertical. Pensés pour Meta Ads et TikTok Ads, avec plusieurs accroches à tester.',
  },
  {
    title: 'Shootings photo et campagnes',
    text: 'Photos produit portées, lookbooks, visuels de lancement. On s’occupe du talent, du lieu et de la direction artistique.',
  },
  {
    title: 'Collaborations influence',
    text: 'Publications et stories sur les comptes de nos talents, avec mention partenariat conforme à la loi influenceurs.',
  },
];

export const bookingSteps = [
  { number: '01', title: 'Votre brief', text: 'Produit, cible, plateformes, délai. Dix minutes au téléphone suffisent.' },
  { number: '02', title: 'Choix du talent', text: 'On vous propose le profil le plus adapté et un devis ferme.' },
  { number: '03', title: 'Tournage', text: 'Le talent tourne, on fait le montage et les déclinaisons de formats.' },
  { number: '04', title: 'Livraison et diffusion', text: 'Fichiers livrés avec droits d’usage définis. Si vous voulez, on lance aussi les pubs.' },
];
