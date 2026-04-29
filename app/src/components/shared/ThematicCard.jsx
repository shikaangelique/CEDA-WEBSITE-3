import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'

export default function ThematicCard({ title, summary, path, diagram }) {
  return (
    <Card className="group relative flex min-h-[30rem] overflow-hidden p-8 [perspective:1200px]">
      {diagram ? (
        <motion.img
          src={diagram}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 z-0 h-80 w-80 max-w-none object-contain opacity-35 mix-blend-screen blur-[0.2px] saturate-125"
          initial={{
            x: -130,
            y: 135,
            scale: 1.9,
            rotateX: 58,
            rotateY: -38,
            rotateZ: -24,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            scale: 0.95,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            opacity: 0.35,
          }}
          whileHover={{
            scale: 1.06,
            rotateX: 10,
            rotateY: -14,
            rotateZ: 5,
            opacity: 0.5,
          }}
          viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : null}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[rgba(10,12,10,0.86)] via-[rgba(10,12,10,0.54)] to-[rgba(10,12,10,0.2)]" />
      <div className="relative z-10 flex flex-col justify-between">
        <div>
          <p className="eyebrow mb-5">Thematic area</p>
          <h3 className="heading-lg text-[var(--color-text)]">{title}</h3>
          <p className="body-md mt-6">{summary}</p>
        </div>
        {path ? (
          <Link
            to={path}
            className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] transition group-hover:text-[var(--color-accent-bright)]"
          >
            Read area
          </Link>
        ) : null}
      </div>
    </Card>
  )
}
