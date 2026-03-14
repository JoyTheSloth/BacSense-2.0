import { Meteors } from "../registry/magicui/meteors";
import { DotPattern } from "../registry/magicui/dot-pattern";
import { cn } from "../lib/utils";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden mb-24 pt-32 pb-32">
      {/* Bacteria/Molecular Background */}
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: "url('/bacteria-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 z-0 bg-background-light/70 dark:bg-background-dark/80 bg-gradient-to-b from-transparent to-background-light dark:to-background-dark" />

      {/* MagicUI Dot Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] z-0 mix-blend-overlay dark:mix-blend-plus-lighter opacity-60",
        )}
      />

      {/* MagicUI Meteors */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Meteors number={30} />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Now with VGG16 + SVM Hybrid Architecture
        </div>
        <h2 className="text-6xl md:text-7xl font-display font-bold max-w-4xl leading-[1.1]">
          Bacterial <span className="text-primary">Classification</span> System
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Advanced medical AI for high-accuracy identification of microbial
          species. Leveraging deep learning features and support vector machines
          for clinical-grade scientific research.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <a
            href="#upload"
            className="cursor-target bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform glow-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined">upload_file</span>
            Upload Image
          </a>
          <button className="cursor-target bg-slate-200 dark:bg-slate-800 px-8 py-4 text-slate-900 dark:text-white rounded-xl font-bold text-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
            Documentation
          </button>
        </div>
      </div>
    </section>
  );
};
