import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
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
    </>
  )
}

export default App
