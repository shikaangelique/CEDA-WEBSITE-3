import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './routes'
import ScrollToTop from './ScrollToTop'

function AppRoutes() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}
