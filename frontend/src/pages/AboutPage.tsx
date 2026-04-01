import { useEffect } from "react";
import { Footer } from "../components/Footer";

export const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-[#0b101e] text-slate-300 font-sans">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#00e599]/10 text-[#00e599] font-mono text-sm font-bold px-4 py-1.5 rounded-full border border-[#00e599]/20 mb-6 uppercase tracking-wider">
                        BacSense 2.0: Research Overview
                    </span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight mb-8">
                        Automated Microbial <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e599] to-blue-400 font-italic italic">Water Quality Assessment</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        BacSense 2.0 is a state-of-the-art analytical system designed for the rapid identification 
                        of waterborne pathogens using a cascaded deep-learning framework and morphological feature engineering.
                    </p>
                </div>

                {/* Abstract Section */}
                <section className="mb-20 bg-[#131b2f] border border-slate-800/60 rounded-3xl p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e599]/5 blur-[100px] pointer-events-none"></div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-[#00e599] text-3xl">description</span>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Technical Abstract</h2>
                    </div>
                    <p className="text-lg text-slate-400 leading-relaxed italic border-l-4 border-[#00e599]/40 pl-6">
                        Microbial contamination in water sources remains a global health crisis. Traditional culture-based methods 
                        for pathogen identification (e.g., Membrane Filtration, MPN) typically require 24–48 hours for visible 
                        colony formation. BacSense 2.0 introduces an automated, two-stage cascaded hybrid classification model 
                        capable of identifying five primary waterborne pathogens with clinical-grade accuracy in under 1 second. 
                        By fusing VGG16-extracted deep features with 171 dimensions of hand-crafted morphological and textural 
                        descriptors, the system resolves historical "morphological overlaps" (confusion pairs) between 
                        Escherichia coli and Pseudomonas aeruginosa, achieving an overall classification accuracy of 95.65%.
                    </p>
                </section>

                {/* Architecture Gallery / Diagram */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-blue-400 text-3xl">account_tree</span>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Proposed Architecture</h2>
                    </div>
                    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 overflow-hidden shadow-2xl relative group">
                        <img 
                            src="/architecture.png" 
                            alt="BacSense 2.0 Architecture Diagram" 
                            className="w-full h-auto rounded-xl hover:scale-[1.01] transition-transform duration-700"
                        />
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#0f1524] p-6 rounded-2xl border border-slate-800/40">
                                <h4 className="text-[#00e599] font-bold mb-2">Stage 1</h4>
                                <p className="text-xs text-slate-500 font-mono uppercase mb-2 italic">Neural Backbone</p>
                                <p className="text-sm text-slate-400">Frozen VGG16 fine-tuned on the DIAWP dataset for high-level semantic feature extraction.</p>
                            </div>
                            <div className="bg-[#0f1524] p-6 rounded-2xl border border-slate-800/40">
                                <h4 className="text-[#00e599] font-bold mb-2">Stage 2</h4>
                                <p className="text-xs text-slate-500 font-mono uppercase mb-2 italic">Specialist Evaluator</p>
                                <p className="text-sm text-slate-400">A 683-dimensional RBF-SVM that resolves confusion pairs if Stage 1 confidence is below 90%.</p>
                            </div>
                            <div className="bg-[#0f1524] p-6 rounded-2xl border border-slate-800/40">
                                <h4 className="text-[#00e599] font-bold mb-2">Fused Space</h4>
                                <p className="text-xs text-slate-500 font-mono uppercase mb-2 italic">Feature Engineering</p>
                                <p className="text-sm text-slate-400">Combination of LBP histograms, Color bins, GLCM textures, and Hu-Moments for precision.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Methodology Detail */}
                <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#00e599] text-3xl">psychology</span>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Materials & Methods</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            The study utilized a dataset of digital micrographs collected under bright-field microscopy. 
                            Gram-stained samples were digitized at 1000x magnification. Pre-processing involves 
                            adaptive Gaussian thresholding and Otsu thresholding to segment bacterial formations from 
                            background noise.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="bg-[#00e599]/20 text-[#00e599] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</span>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Morphological Descriptors</h4>
                                    <p className="text-sm text-slate-500">Calculated Area, Perimeter, Circularity, Solidity, and Aspect Ratios (5 dimensions).</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</span>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Texture (LBP & GLCM)</h4>
                                    <p className="text-sm text-slate-500">Local Binary Patterns (59D) and Gray-Level Co-occurrence Matrices (24D) for biofilm surface roughness.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-4 italic">Performance Metrics Summary</h4>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-bold text-white font-mono uppercase">Global Accuracy</span>
                                    <span className="text-[#00e599] font-bold font-mono">95.65%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00e599] rounded-full" style={{ width: '95.65%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-bold text-white font-mono uppercase">Specialist ROC-AUC</span>
                                    <span className="text-blue-400 font-bold font-mono">0.9863</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '98.63%' }}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                                <div>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">Sensitivity</span>
                                    <p className="text-xl font-bold text-white">97.2%</p>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">Specificity</span>
                                    <p className="text-xl font-bold text-white">98.4%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="text-center bg-gradient-to-b from-[#131b2f] to-[#0b101e] border border-slate-700/40 rounded-3xl p-12 mb-20 shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-6 tracking-tight italic uppercase">Conclusion & Impact</h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                        The integration of cascaded logic significantly reduces False Negative rates in critical cases 
                        (e.g., E. coli contamination), providing a viable pathway for real-time field diagnostics 
                        on 11th-gen CPU hardware with sub-second latency.
                    </p>
                    <div className="flex justify-center gap-6">
                        <div className="px-6 py-2 bg-slate-800/80 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Source: DIAWP Study v2
                        </div>
                        <div className="px-6 py-2 bg-[#00e599]/10 rounded-full text-xs font-bold text-[#00e599] uppercase tracking-widest">
                            Revision 3.14 (Stable)
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
};
