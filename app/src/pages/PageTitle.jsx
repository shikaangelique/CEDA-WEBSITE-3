export default function PageTitle({ title }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-normal md:text-5xl">{title}</h1>
    </section>
  )
}
