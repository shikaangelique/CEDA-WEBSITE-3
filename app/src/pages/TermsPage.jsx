import LegalPage from '../components/legal/LegalPage'
import { siteContent } from '../data/siteContent'

const { email } = siteContent.contact

const sections = [
  {
    heading: 'About these terms',
    body: [
      'These terms apply to your use of the website of the Centre for Extractives and Development Africa (CEDA). By using the site you agree to them. If you do not agree, please do not use the site.',
    ],
  },
  {
    heading: 'Use of our content',
    body: [
      'Unless stated otherwise, the text, publications, images and other material on this site belong to CEDA or are used with permission from their owners.',
      'You may read, download and share our publications for personal, educational, research and non-commercial advocacy purposes, provided you credit CEDA as the source and do not change the content. Any other use, including commercial use or republishing photographs, needs our written permission.',
    ],
  },
  {
    heading: 'Accuracy of information',
    body: [
      'We work to keep the information on this site accurate and up to date, but it is provided for general information only. It is not legal, financial or professional advice. Publications reflect the evidence available when they were written.',
    ],
  },
  {
    heading: 'Links to other websites',
    body: [
      'This site links to websites run by partners and other organisations. We are not responsible for their content or privacy practices, and a link does not mean we endorse them.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: [
      'You must not misuse the site, including by submitting false, abusive or unlawful content through our forms, sending automated or bulk submissions, or trying to gain unauthorised access to the site or its systems.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'To the extent allowed by law, CEDA is not liable for any loss arising from use of this site or reliance on its content. We do not guarantee that the site will always be available or free of errors.',
    ],
  },
  {
    heading: 'Governing law',
    body: ['These terms are governed by the laws of the Republic of Ghana.'],
  },
  {
    heading: 'Contact',
    body: [`Questions about these terms can be sent to ${email}.`],
  },
]

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms of Use" updated="9 November 2026" sections={sections} />
}
