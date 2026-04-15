import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/merci'],
    },
    sitemap: 'https://impulse-agency.fr/sitemap.xml',
  };
}
