import { useState } from "react"
import { Hero } from "../components/Hero"
import { Species } from "../components/Species"
import { UploadZone } from "../components/UploadZone"
import type { PredictionResult } from "../components/UploadZone"
import { Results } from "../components/Results"
import { Footer } from "../components/Footer"

export const HomePage = () => {
  const [results, setResults] = useState<PredictionResult[] | null>(null);

  return (
    <main className="pt-32 pb-20">
      <Hero />
      <Species />
      <UploadZone onResultsGenerated={setResults} />
      {results && results.length > 0 && <Results items={results} />}
      <Footer />
    </main>
  )
}
