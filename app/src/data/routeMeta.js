// Titles and descriptions for fixed routes. Detail pages (publications, news,
// thematic areas, project spotlights) set their own via <Seo>.
// Also read by scripts/generate-sitemap.mjs, so keep it plain data.
export const routeMeta = {
  '/': {
    title: null,
    description:
      'CEDA is a research and advocacy organisation working for better governance of Africa’s mineral and petroleum resources, so they deliver real improvements for the people who depend on them.',
  },
  '/about': {
    title: 'About',
    description:
      'Who CEDA is: our objectives, operational areas and core values in extractive sector governance across Africa.',
  },
  '/about/team': {
    title: 'Team and Governing Board',
    description: 'Meet the CEDA team and the governing board guiding our work.',
  },
  '/thematic-areas': {
    title: 'Thematic Areas',
    description:
      'Four areas anchor CEDA’s work: youth development, corporate accountability, climate and energy transition, and gender, equity and social inclusion.',
  },
  '/thematic-areas/climate-energy-transition/strategy': {
    title: 'Energy Transition and Critical Minerals Strategy',
    description:
      'CEDA’s strategy for a just energy transition and accountable critical minerals governance.',
  },
  '/resource-centre/publications': {
    title: 'Publications',
    description:
      'Research reports, studies and policy papers from CEDA on extractives governance, revenue management and the energy transition.',
  },
  '/resource-centre/press-statements': {
    title: 'Press Statements',
    description: 'Official press statements from CEDA.',
  },
  '/resource-centre/annual-reports': {
    title: 'Annual Reports',
    description: 'CEDA annual reports and organisational policies, including our HR and financial management policies.',
  },
  '/news': {
    title: 'News and Media',
    description: 'News, blog posts, event coverage and project updates from CEDA.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Get in touch with CEDA. Visit our office in Madina, Accra, call or send us a message.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How CEDA collects, uses and protects personal information on this website.',
  },
  '/terms': {
    title: 'Terms of Use',
    description: 'Terms governing the use of the CEDA website and its content.',
  },
  '/review-ceda-site-2026': {
    title: 'Site Feedback',
    description: 'Share feedback on the CEDA website.',
    noindex: true,
  },
}
