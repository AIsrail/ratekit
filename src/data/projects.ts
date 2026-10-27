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
    en: 'Turn your resume into a modern online profile with a shareable link, QR code and ATS score. AI builds it in seconds, in 50+ languages.',
    ru: 'ИИ превращает ваше резюме в современный онлайн-профиль со ссылкой, QR-кодом и ATS-оценкой за считаные секунды. Работает на 50+ языках.' },
  { id: 'fundan', name: 'Fundan.cc', url: 'https://fundan.cc/', icon: '💼',
    en: 'Find grants, loans and investors for your project in Kyrgyzstan and Central Asia. Amounts, deadlines and application status in one searchable place.',
    ru: 'Гранты, кредиты и инвесторы для вашего проекта в Кыргызстане и Центральной Азии. Суммы, дедлайны и статус приёма заявок в одном месте, с поиском.' },
  { id: 'connect4', name: 'Connect4.pro', url: 'https://connect4.pro/', icon: '🌏',
    en: 'Open grants and investment programmes with deadlines and sources, a knowledge base, and help preparing projects for NGOs, businesses and startups.',
    ru: 'Открытые гранты и инвестиционные программы с дедлайнами и источниками, база знаний и помощь в подготовке проектов для НКО, бизнеса и стартапов.' },
];

/** Adds simple UTM tags so the sister sites can see where visitors came from. */
export function projectUrl(url: string, medium: string): string {
  return `${url}?utm_source=ratekit&utm_medium=${medium}&utm_campaign=projects`;
}
