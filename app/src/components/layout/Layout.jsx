import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
