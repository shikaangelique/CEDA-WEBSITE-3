import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'

export default function ThematicCard({ title, summary, path, diagram }) {
  return (
    <Card className="group relative flex min-h-[30rem] overflow-hidden border-[rgba(47,102,81,0.22)] bg-[linear-gradient(145deg,rgba(63,125,100,0.94),rgba(47,102,81,0.88)_58%,rgba(35,77,61,0.94))] p-8 shadow-[0_24px_60px_rgba(24,49,38,0.12)] [perspective:1200px]">
      {diagram ? (
        <motion.img
          src={diagram}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 z-0 h-80 w-80 max-w-none object-contain opacity-78 drop-shadow-[0_0_30px_rgba(246,247,241,0.14)] saturate-125 contrast-115"
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
            opacity: 0.82,
          }}
          whileHover={{
            scale: 1.06,
            rotateX: 10,
            rotateY: -14,
            rotateZ: 5,
            opacity: 0.95,
          }}
          viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : null}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[rgba(246,247,241,0.04)] via-[rgba(47,102,81,0.12)] to-[rgba(24,49,38,0.18)]" />
      <div className="relative z-10 flex flex-col justify-between">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-[rgba(246,247,241,0.74)]">
            Thematic area
          </p>
          <h3 className="heading-lg text-[var(--color-accent-contrast)]">{title}</h3>
          <p className="mt-6 text-base leading-7 text-[rgba(246,247,241,0.82)]">{summary}</p>
        </div>
        {path ? (
          <Link
            to={path}
            className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-[rgba(246,247,241,0.86)] transition group-hover:text-[var(--color-accent-contrast)]"
          >
            Read area
          </Link>
        ) : null}
      </div>
    </Card>
  )
}
