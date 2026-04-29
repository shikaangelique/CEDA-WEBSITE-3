export const partnerWallContent = {
  displayNote: 'Logo wall of the following partners, displayed greyscale by default with a colour hover state:',
  preLaunchAction:
    'The strategic-partner list also includes Ford Foundation, Spotlight on Corruption, Resource Resolutions, GACC, and the UK Ghana Gold Programme. Confirm with the team which of these should be displayed on the public partner wall before launch.',
  confirmationNote:
    'Partner names matched to logo files where the original was an unexplained acronym (CECI, SFG, CCG flagged for confirmation).',
}

export const partners = [
  { name: 'ACEP', logo: '/assets/partners/acep.png', featuredScale: true },
  { name: 'CECI', logo: '/assets/partners/ceci.png', pending: 'Flagged for confirmation.' },
  { name: 'GHEITI', logo: '/assets/partners/gheiti.png', compact: true },
  { name: 'GIZ', logo: '/assets/partners/giz.png' },
  { name: 'Gower Street', logo: '/assets/partners/gower-street.jpeg' },
  { name: 'NRGI', logo: '/assets/partners/nrgi.png' },
  {
    name: 'SFG',
    logo: '/assets/partners/star-foundation-ghana.webp',
    pending: 'Flagged for confirmation.',
  },
  { name: 'SYND', logo: '/assets/partners/synd.png' },
  { name: 'Women in Mining (WiM)', logo: '/assets/partners/wim.jpg' },
  { name: 'WUSC', logo: '/assets/partners/wusc-eumc.jpg' },
  { name: 'CCG', logo: '/assets/partners/ccg.png', pending: 'Flagged for confirmation.' },
  { name: 'UK Ghana Gold Programme', logo: '/assets/partners/ukggp.png' },
]

export const strategicPartnersToConfirm = [
  'Ford Foundation',
  'Spotlight on Corruption',
  'Resource Resolutions',
  'GACC',
  'UK Ghana Gold Programme',
]
