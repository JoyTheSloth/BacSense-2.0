import { Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import TargetCursor from "./components/TargetCursor"
import { HomePage } from "./pages/HomePage"
import { DocsPage } from "./pages/DocsPage"

function App() {
  return (
    <>
      <TargetCursor 
        spinDuration={4}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
