import LegalPage from '../components/legal/LegalPage'
import { siteContent } from '../data/siteContent'

const { email, address } = siteContent.contact

const sections = [
  {
    heading: 'Who we are',
    body: [
      `This website is operated by the Centre for Extractives and Development Africa (CEDA), ${address}. CEDA is responsible for the personal information collected through this site. Questions about this policy can be sent to ${email}.`,
    ],
  },
  {
    heading: 'What we collect',
    body: [
      'We only collect information you choose to give us, plus limited technical data needed to run the site:',
      [
        'Contact form: your name, email address and message, and optionally your phone number and organisation.',
        'Site feedback form: your ratings and comments, and optionally your name and role.',
        'Assessment quiz: your answers are added to anonymous totals. We do not store who gave which answer.',
        'Usage statistics: pages visited, referring site, device type and country, collected in aggregate without cookies and without identifying you.',
      ],
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'We use contact form details only to reply to your enquiry and keep a record of our correspondence. We use feedback and usage statistics to improve the website. We do not sell or rent personal information, and we do not use it for advertising.',
    ],
  },
  {
    heading: 'Cookies and similar technologies',
    body: [
      'This site does not use advertising or tracking cookies. Our analytics (Vercel Web Analytics and Speed Insights) work without cookies.',
      'Our contact page includes an embedded Google Map and our homepage includes an embedded YouTube video (in YouTube’s privacy-enhanced mode). Google and YouTube may set their own cookies or collect usage information when this content loads, under their own privacy policies. You can block or delete these cookies in your browser settings.',
      'When you dismiss our cookie notice, we store that choice in your browser’s local storage so the notice does not appear again.',
    ],
  },
  {
    heading: 'Where your information is stored',
    body: [
      'Form submissions are stored securely with our database provider, Supabase. The website is hosted by Vercel. These providers may process data on servers outside Ghana, under contractual safeguards. Access to submissions is limited to authorised CEDA staff.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'We keep contact enquiries for as long as needed to respond and for up to two years afterwards, unless a longer period is required for an ongoing relationship or by law. Feedback is kept until the related website review is complete. Aggregated statistics contain no personal information.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `Under Ghana’s Data Protection Act, 2012 (Act 843) and other applicable laws, you can ask to see the personal information we hold about you, ask us to correct or delete it, or object to how we use it. Email ${email} and we will respond within a reasonable time.`,
    ],
  },
  {
    heading: 'Changes to this policy',
    body: ['We may update this policy from time to time. The date at the top of this page shows when it was last changed.'],
  },
]

export default function PrivacyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" updated="9 November 2026" sections={sections} />
}
