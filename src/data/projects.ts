// Sister projects shown in the footer, on the homepage strip and on the About page.
// Both language versions of each site are reachable from the site's own root URL.

export interface Project {
  id: string;
  name: string;
  url: string;
  icon: string;
  en: string;
  ru: string;
}

export const projects: Project[] = [
  { id: 'resumelink', name: 'Resumelink', url: 'https://resumelink.cc/', icon: '📄',
    en: 'Build a professional resume with the help of AI.',
    ru: 'Профессиональное резюме с помощью ИИ.' },
  { id: 'fundan', name: 'Fundan.cc', url: 'https://fundan.cc/', icon: '💼',
    en: 'A database of grants and investment for Central Asia, a region that is becoming attractive to investors.',
    ru: 'База данных грантов и инвестиций для Центральной Азии, региона, который становится привлекательным для инвесторов.' },
  { id: 'connect4', name: 'Connect4.pro', url: 'https://connect4.pro/', icon: '🌏',
    en: 'Opportunities and resources for Central Asia.',
    ru: 'Возможности и ресурсы для Центральной Азии.' },
];

/** Adds simple UTM tags so the sister sites can see where visitors came from. */
export function projectUrl(url: string, medium: string): string {
  return `${url}?utm_source=ratekit&utm_medium=${medium}&utm_campaign=projects`;
}
