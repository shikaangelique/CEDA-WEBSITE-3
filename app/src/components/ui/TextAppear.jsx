import { motion } from 'framer-motion'

export default function TextAppear({
  children,
  as = 'p',
  className = '',
  delay = 0,
  stagger = 0.035,
  once = true,
}) {
  const Tag = motion[as] || motion.p

  if (typeof children !== 'string') {
    return <Tag className={className}>{children}</Tag>
  }

  const words = children.split(' ')

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
          variants={{
            hidden: {
              y: '110%',
              opacity: 0,
            },
            visible: {
              y: '0%',
              opacity: 1,
              transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}
