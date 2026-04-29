import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { pppStrategy } from '../../data/pppStrategy'
import Card from '../ui/Card'

const finalOffsets = ['-118%', '0%', '118%']
const rotations = [-4, 0, 4]
const loopDuration = 15
const loopTimes = [0, 0.12, 0.34, 0.48, 0.62, 0.9, 1]

function DiagramNode({ pillar, index }) {
  return (
    <motion.img
      src={pillar.image}
      alt=""
      className="absolute left-1/2 top-1/2 z-10 w-[25%] max-w-44 -translate-x-1/2 -translate-y-1/2 object-contain"
      loading="lazy"
      animate={{
        x: ['0%', '0%', finalOffsets[index], finalOffsets[index], finalOffsets[index], finalOffsets[index], '0%'],
        y: ['0%', '0%', '0%', '0%', '0%', '0%', '0%'],
        scale: [0.34, 0.7, 0.92, 0.92, 0.92, 0.92, 0.34],
        opacity: [0, 1, 1, 1, 0.18, 0.18, 0],
        rotateZ: [0, rotations[index], 0, 0, 0, 0, 0],
      }}
      transition={{
        duration: loopDuration,
        repeat: Infinity,
        ease: [0.16, 1, 0.3, 1],
        times: loopTimes,
      }}
    />
  )
}

function PillarText({ pillar, index }) {
  return (
    <motion.div
      className="relative isolate min-h-48 overflow-hidden rounded-[var(--radius-sm)] border border-[rgba(107,181,120,0.18)] bg-[rgba(10,12,10,0.72)] p-4 backdrop-blur-sm"
      animate={{
        opacity: [0, 0, 0, 0, 1, 1, 0],
        y: [8, 8, 8, 8, 0, 0, -4],
      }}
      transition={{
        duration: loopDuration,
        repeat: Infinity,
        ease: 'easeOut',
        times: loopTimes,
      }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(10,12,10,0.34)] via-[rgba(10,12,10,0.72)] to-[rgba(10,12,10,0.9)]" />
      <div className="relative z-10">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          0{index + 1}
        </p>
        <h3 className="mt-2 text-2xl font-medium text-[var(--color-text)]">{pillar.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function PPPStrategyBlock() {
  const videoRef = useRef(null)
  const isVideoInView = useInView(videoRef, { once: true, margin: '-20% 0px -20% 0px' })
  const videoSrc = isVideoInView
    ? `https://www.youtube-nocookie.com/embed/${pppStrategy.video.youtubeId}?autoplay=1&playsinline=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/${pppStrategy.video.youtubeId}?rel=0`

  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-[1.45fr_0.85fr]">
      <Card className="min-h-[22rem] overflow-hidden p-0">
        <div className="relative min-h-[22rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(107,181,120,0.16),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(201,197,119,0.08),transparent_32%)]" />

          <div className="relative z-10 grid min-h-[22rem] content-between gap-6 p-6 md:p-7">
            <div className="max-w-2xl">
              <p className="eyebrow">People · Policy · Process</p>
              <h3 className="mt-4 text-3xl font-medium leading-tight text-[var(--color-text)] md:text-4xl">
                {pppStrategy.title}
              </h3>
              <p className="body-md mt-4 max-w-xl">{pppStrategy.subtitle}</p>
            </div>

            <div className="relative min-h-52 overflow-hidden">
              <div className="absolute inset-0 z-0 rounded-[var(--radius-sm)] bg-[radial-gradient(circle_at_50%_50%,rgba(107,181,120,0.11),transparent_32%)]" />
              <div className="absolute inset-0 z-0">
                {pppStrategy.pillars.map((pillar, index) => (
                  <DiagramNode key={pillar.title} pillar={pillar} index={index} />
                ))}
              </div>
              <div className="relative z-20 grid gap-3 md:grid-cols-3">
                {pppStrategy.pillars.map((pillar, index) => (
                  <PillarText key={pillar.title} pillar={pillar} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="min-h-[22rem] p-0">
        <div className="flex h-full min-h-[22rem] flex-col">
          <div
            ref={videoRef}
            className="aspect-video overflow-hidden rounded-t-[var(--radius-md)] bg-[var(--color-bg-elevated)]"
          >
            <iframe
              className="h-full w-full"
              src={videoSrc}
              title={pppStrategy.video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <p className="eyebrow">Project spotlight</p>
              <p className="body-md mt-4">{pppStrategy.spotlight}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
