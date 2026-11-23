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

export const talents: Talent[] = [
  {
    slug: 'laura',
    name: 'Laura',
    roles: ['Mannequin', 'Créatrice UGC'],
    city: 'Sud de la France',
    bio: 'Des images lumineuses, entre la mer et la ville : matières naturelles, lumière de fin de journée, une allure simple et soignée. Laura pose pour des marques de mode, de beauté et des lieux qui veulent ce rendu pour leur feed et leurs publicités. Elle a déjà shooté pour les réseaux sociaux de Myessencil.',
    photos: Array.from({ length: 8 }, (_, i) => `/images/talents/laura/laura-${i + 1}.jpg`),
    socials: [{ platform: 'Instagram', url: 'https://www.instagram.com/laura_tnnr/', followers: '44,3k' }],
    specialties: ['Mode', 'Beauté', 'Lifestyle', 'Hôtels et beach clubs', 'Déplacements Paris et Espagne'],
    published: true,
  },
  {
    // TODO Norman : infos du 2e talent, puis published: true
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
