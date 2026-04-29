import { motion } from 'framer-motion'
import { Building2, Globe2, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'

const pillars = [
  {
    id: 'national',
    title: 'National Level',
    label: 'Government & Institutional Support',
    color: 'var(--color-accent)',
    icon: Building2,
    activities: [
      [
        'Policy & Strategy Development',
        'Technical support to government to develop critical minerals and energy transition policy frameworks',
      ],
      [
        'Gap Analysis & Needs Assessment',
        'Identifying policy and institutional gaps across the critical minerals and clean energy value chain',
      ],
      [
        'Institutional Strengthening',
        'Supporting government agencies and regulatory bodies on energy transition governance and climate policy',
      ],
      [
        'Value Chain Actor Support',
        'Building capacity of national actors involved in critical minerals and sustainable energy governance',
      ],
    ],
  },
  {
    id: 'subnational',
    title: 'Sub-National Level',
    label: 'Civic & Community Engagement',
    color: 'var(--color-rose)',
    icon: Users,
    activities: [
      [
        'Community Voice Integration',
        'Ensuring community perspectives are mainstreamed into energy transition and climate policy development',
      ],
      [
        'CSO & CBO Capacity Building',
        'Strengthening civil society and community-based organisations engaged in extractives and climate governance',
      ],
      [
        'Sensitisation & Mobilisation',
        'Community awareness on rights, opportunities and impacts of critical minerals and energy transition',
      ],
      [
        'Local Stakeholder Convening',
        'Creating platforms for dialogue on just transition between communities, government and industry',
      ],
    ],
  },
  {
    id: 'crosscutting',
    title: 'Learning & Exchange',
    label: 'Cross-Cutting Implementation',
    color: 'var(--color-secondary)',
    icon: Globe2,
    activities: [
      [
        'Gender Mainstreaming',
        'Integrating gender equity across all interventions in the energy transition and climate action space',
      ],
      ['M&E and Learning', 'Monitoring, evaluation and adaptive learning to strengthen programme effectiveness'],
      ['Peer Exchange & Replication', 'Facilitating knowledge sharing and replicating successful models'],
      [
        'Pilot Community Initiatives',
        'Implementing tailored approaches in target communities such as Ellembelle for scale-up learning',
      ],
    ],
  },
]

const partners = ['ACEP', 'NRGI', 'CCG', 'EITI', 'GHEITI', 'SYND', 'GACC']

const deliverables = [
  {
    id: 'd1',
    label: "E2&3W Gap Analysis",
    full: "Comprehensive Review & Gap Analysis of Ghana's Transition to E2&3Ws",
    x: 50,
    y: 18,
    driftX: [0, -5, 6, -2, 0],
    driftY: [0, 4, -3, 3, 0],
    connections: ['national', 'crosscutting'],
    href: '/resource-centre/publications/comprehensive-review-and-gap-analysis-of-ghanas-transition-to-e2-3ws',
  },
  {
    id: 'd2',
    label: 'E2&3W Inception',
    full: 'Inception Report – Exploring the Transition Pathways To E2&3Ws in Ghana',
    x: 21,
    y: 35,
    driftX: [0, 7, -5, 4, 0],
    driftY: [0, -3, 5, -2, 0],
    connections: ['national'],
    href: '/resource-centre/publications/exploring-the-transition-pathways-to-electric-2-3-wheelers-in-ghana-inception-report',
  },
  {
    id: 'd4',
    label: 'ABFA Impact',
    full: 'Impact Assessment of ABFA Utilization by Development Authorities',
    x: 24,
    y: 69,
    driftX: [0, -4, 6, -6, 0],
    driftY: [0, 5, -4, 3, 0],
    connections: ['national', 'subnational'],
    href: '/resource-centre/publications/impact-assessment-of-abfa-utilization-by-development-authorities',
  },
  {
    id: 'd11',
    label: 'Policy Options',
    full: 'Energy Transition – Cost, Opportunities and Policy Options for Ghana',
    x: 76,
    y: 33,
    driftX: [0, -7, 5, -3, 0],
    driftY: [0, 4, -5, 2, 0],
    connections: ['national', 'crosscutting'],
    href: '/resource-centre/publications/energy-transition-cost-opportunities-and-policy-options-for-ghana',
  },
  {
    id: 'd13',
    label: 'Women in Extractives',
    full: "Enhancing Women's Participation in Extractive Sector Governance",
    x: 72,
    y: 70,
    driftX: [0, 5, -6, 4, 0],
    driftY: [0, -5, 4, -3, 0],
    connections: ['subnational', 'crosscutting'],
    href: '/resource-centre/publications/enhancing-women-participation-in-extractive-sector-governance',
  },
  {
    id: 'd14',
    label: 'Ellembelle Quiz',
    full: 'Ellembelle Energy Transition High School Quiz',
    x: 50,
    y: 84,
    driftX: [0, -6, 6, -3, 0],
    driftY: [0, -4, 3, -5, 0],
    connections: ['subnational', 'crosscutting'],
    href: '/news/ellembelle-energy-transition-committee-launch',
  },
]

const strategyNodes = {
  national: {
    label: 'National',
    x: 50,
    y: 34,
    color: 'var(--color-accent)',
    driftX: [0, 3, -3, 2, 0],
    driftY: [0, -2, 3, -1, 0],
  },
  subnational: {
    label: 'Sub-national',
    x: 34,
    y: 60,
    color: 'var(--color-rose)',
    driftX: [0, -3, 2, -2, 0],
    driftY: [0, 3, -2, 2, 0],
  },
  crosscutting: {
    label: 'Learning',
    x: 66,
    y: 60,
    color: 'var(--color-secondary)',
    driftX: [0, 2, -3, 3, 0],
    driftY: [0, 2, -3, 1, 0],
  },
}

const graphTimes = [0, 0.25, 0.56, 0.82, 1]

function addDrift(value, drift = []) {
  return drift.map((offset) => value + offset)
}

function StrategyGraph() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-[var(--color-line)] p-6">
        <h3 className="text-2xl font-medium text-[var(--color-text)]">Deliverables graph</h3>
        <p className="body-md mt-2">How reports connect to the strategy levels</p>
        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Click node to see related deliverables
        </p>
      </div>
      <div className="relative min-h-[38rem] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(107,181,120,0.13),transparent_38%),var(--color-bg-soft)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {deliverables.flatMap((deliverable, index) =>
            deliverable.connections.map((connection) => {
              const node = strategyNodes[connection]

              return (
                <motion.line
                  key={`${deliverable.id}-${connection}`}
                  animate={{
                    x1: addDrift(deliverable.x, deliverable.driftX),
                    y1: addDrift(deliverable.y, deliverable.driftY),
                    x2: addDrift(node.x, node.driftX),
                    y2: addDrift(node.y, node.driftY),
                  }}
                  stroke="rgba(232,235,217,0.16)"
                  strokeWidth="0.18"
                  initial={{
                    x1: deliverable.x,
                    y1: deliverable.y,
                    x2: node.x,
                    y2: node.y,
                    opacity: 0,
                  }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    default: {
                      duration: 11 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: graphTimes,
                    },
                  }}
                />
              )
            }),
          )}
        </svg>

        {Object.entries(strategyNodes).map(([id, node], index) => (
          <motion.div
            key={id}
            className="absolute z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--color-bg)] shadow-[0_0_44px_rgba(107,181,120,0.2)]"
            style={{ left: `${node.x}%`, top: `${node.y}%`, background: node.color, borderColor: node.color }}
            initial={{ scale: 0.72, opacity: 0, x: 0, y: 0 }}
            whileInView={{
              scale: 1,
              opacity: 1,
              x: node.driftX,
              y: node.driftY,
            }}
            viewport={{ once: true }}
            transition={{
              scale: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 11, repeat: Infinity, ease: 'easeInOut', times: graphTimes },
              y: { duration: 11, repeat: Infinity, ease: 'easeInOut', times: graphTimes },
            }}
          >
            {node.label}
          </motion.div>
        ))}

        {deliverables.map((deliverable, index) => (
          <motion.div
            key={deliverable.id}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${deliverable.x}%`, top: `${deliverable.y}%` }}
            initial={{ scale: 0.4, opacity: 0, x: 0, y: 0 }}
            whileInView={{
              scale: 1,
              opacity: 1,
              x: deliverable.driftX,
              y: deliverable.driftY,
            }}
            whileHover={{ scale: 1.08, zIndex: 30 }}
            viewport={{ once: true }}
            transition={{
              scale: { duration: 0.75, delay: 0.25 + index * 0.06, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.75, delay: 0.25 + index * 0.06, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 10 + index * 0.45, repeat: Infinity, ease: 'easeInOut', times: graphTimes },
              y: { duration: 10 + index * 0.45, repeat: Infinity, ease: 'easeInOut', times: graphTimes },
            }}
          >
            <Link
              to={deliverable.href}
              aria-label={`Open ${deliverable.full}`}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(139,157,195,0.55)] bg-[rgba(139,157,195,0.2)] text-center font-mono text-[0.55rem] uppercase leading-tight tracking-[0.06em] text-[var(--color-text)] backdrop-blur-md transition hover:border-[var(--color-accent)] hover:bg-[rgba(107,181,120,0.2)]"
            >
              {deliverable.label}
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full mt-3 w-60 -translate-x-1/2 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[rgba(10,12,10,0.94)] p-3 text-xs leading-5 text-[var(--color-text-muted)] opacity-0 shadow-xl transition group-hover:opacity-100">
              <span className="block text-[var(--color-text)]">{deliverable.full}</span>
              <span className="mt-2 block font-mono uppercase tracking-[0.1em] text-[var(--color-accent)]">
                Open deliverable
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

export default function StrategyFramework() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[rgba(17,21,15,0.36)]">
      <Container className="py-[var(--section-y)]">
        <SectionHeader
          title="Energy Transition and Critical Minerals Strategy"
          intro="Supporting Africa's just energy transition through integrated policy, research, and community-centred interventions"
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <Card key={pillar.title} className="p-7">
                <div className="flex items-start gap-4 border-b border-[var(--color-line)] pb-6">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)]"
                    style={{ background: pillar.color, color: 'var(--color-bg)' }}
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold uppercase tracking-[0.04em] text-[var(--color-text)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-text-faint)]">{pillar.label}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {pillar.activities.map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[rgba(255,255,255,0.03)] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full" style={{ background: pillar.color }} />
                        <h4 className="text-sm font-semibold text-[var(--color-text)]">{title}</h4>
                      </div>
                      <p className="mt-3 pl-5 text-sm leading-6 text-[var(--color-text-muted)]">{text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-2">Implementation Partners:</span>
          {partners.map((partner) => (
            <span
              key={partner}
              className="rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-xs text-[var(--color-text-muted)]"
            >
              {partner}
            </span>
          ))}
        </div>
        <div className="mt-16">
          <StrategyGraph />
        </div>
      </Container>
    </section>
  )
}
