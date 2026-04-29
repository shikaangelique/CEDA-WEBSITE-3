import { boardContent, boardMembers, team } from '../data/team'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'

function TeamMemberCard({ member }) {
  return (
    <Card className="flex h-full flex-col text-center">
      <div className="mx-auto h-44 w-44 overflow-hidden rounded-full border border-[var(--color-line-strong)] bg-[var(--color-bg-elevated)] p-1">
        {member.image ? (
          <img src={member.image} alt={member.name} className="h-full w-full rounded-full object-cover" />
        ) : null}
      </div>
      <h3 className="mt-6 text-2xl font-medium text-[var(--color-text)]">{member.name}</h3>
      <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[rgba(255,255,255,0.03)] p-4 text-left">
        <div className="flex items-center gap-2 text-[var(--color-accent)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(107,181,120,0.45)] font-mono text-[0.62rem]">
            in
          </span>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em]">LinkedIn</p>
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--color-text)]">{member.linkedInTagline}</p>
        <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
          {member.linkedInActivity}
        </p>
      </div>
      <a
        href={member.linkedIn}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex justify-center pt-6 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition hover:text-[var(--color-accent-bright)]"
      >
        View full LinkedIn profile
      </a>
    </Card>
  )
}

function BoardAnnouncement() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-h-[26rem] overflow-hidden bg-[var(--color-bg-elevated)]">
          <img
            src={boardContent.groupImage}
            alt="CEDA Governing Board"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-end p-6 md:p-8">
          <p className="eyebrow">Board launch</p>
          <h3 className="heading-lg mt-6">{boardContent.announcement}</h3>
          <p className="body-md mt-6">{boardContent.intro}</p>
        </div>
      </div>
    </Card>
  )
}

function BoardMemberCard({ member }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="aspect-[4/3] overflow-hidden bg-[var(--color-bg-elevated)]">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <p className="eyebrow">{member.role}</p>
        <h3 className="mt-4 text-2xl font-medium text-[var(--color-text)]">{member.name}</h3>
        <div className="mt-5 grid gap-4">
          {member.bio.map((paragraph) => (
            <p key={paragraph} className="body-md">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Board and team"
        title="The people behind CEDA's research, advocacy, and convening."
        subtitle={boardContent.intro}
        image="/assets/hero/team-hero.jpg"
      />

      <section className="border-b border-[var(--color-line)]">
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="Governing Board" intro={boardContent.intro} number="01" />
          <div className="mt-14">
            <BoardAnnouncement />
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {boardMembers.map((member) => (
              <BoardMemberCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-[var(--section-y)]">
          <SectionHeader title="The Team" number="02" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
