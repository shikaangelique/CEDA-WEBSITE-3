export const assessmentContent = {
  title: 'Where do you stand?',
  intro:
    "A short three-question check-in. Pick what feels right. We'll show you what other visitors have said and a quick read on what's happening in the sector.",
  resultLead: "Thanks for sharing. Here's where you sit.",
  resultTemplate: 'X% of visitors picked the same option as you.',
  narrativeTitle: 'Where the sector is right now.',
  narrative: [
    "Ghana sits at a real inflection point. Critical minerals demand is rising fast as the world electrifies. The energy transition is rerouting global investment flows. The country's gold sector is under more international scrutiny than it has been in a generation, and artisanal mining reform is finally back on the policy table. Whatever your priorities, the choices made over the next few years will shape how a generation of Ghanaians experiences the resources beneath their feet.",
    "CEDA's work runs across all of these questions: revenue governance, community engagement, anti-corruption, climate policy, and the next generation of leadership. If you'd like to dig deeper, our publications and thematic areas are the best places to start.",
  ],
  ctas: ['Explore publications', 'Read our thematic areas'],
}

export const assessmentQuestions = [
  {
    id: 'q1',
    label: 'Question 1.',
    question: "Where do you think Ghana's biggest opportunity sits over the next ten years?",
    options: [
      { id: 'a', label: 'Critical minerals and the energy transition' },
      { id: 'b', label: 'Strengthening governance of existing oil and gas' },
      { id: 'c', label: 'Formalising artisanal and small-scale mining' },
      { id: 'd', label: 'Building local value addition and processing' },
    ],
  },
  {
    id: 'q2',
    label: 'Question 2.',
    question: 'Who has the biggest role to play in making sure mining benefits ordinary Ghanaians?',
    options: [
      { id: 'a', label: 'Government and policymakers' },
      { id: 'b', label: 'Mining and oil companies themselves' },
      { id: 'c', label: 'Civil society and research organisations' },
      { id: 'd', label: 'Local communities and traditional authorities' },
    ],
  },
  {
    id: 'q3',
    label: 'Question 3.',
    question: "What's the single most important reform you'd like to see in the next year?",
    options: [
      { id: 'a', label: 'Stricter environmental enforcement' },
      { id: 'b', label: 'Better revenue transparency and tracking' },
      { id: 'c', label: 'Stronger community consent processes' },
      { id: 'd', label: 'Faster shift to clean energy investment' },
    ],
  },
]
