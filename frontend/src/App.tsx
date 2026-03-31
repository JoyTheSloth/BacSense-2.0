import { useState } from "react"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Species } from "./components/Species"
import { UploadZone } from "./components/UploadZone"
import type { PredictionResult } from "./components/UploadZone"
import { Results } from "./components/Results"
import { Footer } from "./components/Footer"
import TargetCursor from "./components/TargetCursor"

function App() {
  const [results, setResults] = useState<PredictionResult[] | null>(null);

  return (
    <>
      <TargetCursor 
        spinDuration={4}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <Header />
      <main className="pt-32 pb-20">
        <Hero />
        <Species />
        <UploadZone onResultsGenerated={setResults} />
        {results && results.length > 0 && <Results items={results} />}
      </main>
      <Footer />
    </>
  )
}

export default App
