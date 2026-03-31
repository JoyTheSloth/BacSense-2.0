import { useEffect } from "react";

export const DocsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 relative z-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-primary/20 pb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-3">BacSense v2</h1>
                    <h2 className="text-xl text-primary font-semibold">Technical Architecture & Model Documentation</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
                        A cascaded hybrid classifier for waterborne bacterial identification combining VGG16 Transfer Learning, Hand-Crafted Feature Engineering, and RBF-SVM.
                    </p>
                </div>
                <div className="mt-6 md:mt-0 flex flex-col gap-2">
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold border border-primary/20 inline-flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        Version 2.0 (Cascaded Specialist)
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 inline-flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                        Amity University Kolkata
                    </span>
                </div>
            </div>

            {/* 1. Executive Summary */}
            <section className="mb-16">
                <h3 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
                    1. Executive Summary
                </h3>
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl prose prose-slate dark:prose-invert max-w-none">
                    <p className="lead text-lg">
                        <strong>BacSense v2</strong> is a two-stage cascaded hybrid classifier for the identification of five waterborne bacterial species from Gram-stained microscopy images. The system combines deep transfer learning (VGG16) with rich hand-crafted feature engineering and a binary specialist Support Vector Machine to resolve a critical confusion pair that the original single-stage model completely failed on.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                            <h4 className="text-red-700 dark:text-red-400 font-bold flex items-center gap-2 m-0 mb-3">
                                <span className="material-symbols-outlined">warning</span> The Problem
                            </h4>
                            <p className="m-0 text-sm">
                                The original BacSense v1 achieved 95.83% overall accuracy but had near-zero F1 scores for <em>Escherichia coli</em> and <em>Pseudomonas aeruginosa</em> — two morphologically similar Gram-negative rods that VGG16 FC features alone could not separate.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/30">
                            <h4 className="text-green-700 dark:text-green-400 font-bold flex items-center gap-2 m-0 mb-3">
                                <span className="material-symbols-outlined">check_circle</span> The Solution
                            </h4>
                            <p className="m-0 text-sm">
                                A cascaded architecture routes ambiguous predictions to a specialist binary SVM trained on a 683-dimensional feature vector, combining VGG16 deep features with seven hand-crafted descriptors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Architecture Visuals */}
            <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 shadow-xl group hover:shadow-2xl hover:-translate-y-1 transition-all">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                        <span className="material-symbols-outlined text-white text-3xl">memory</span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4">Stage 1: Main Classifier</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                        Uses a frozen <strong>VGG16</strong> backbone extracting semantic structural features fed into a PCA-reduced 94-dimensional RBF Support Vector Machine. 
                    </p>
                    <ul className="space-y-3 text-sm font-medium">
                        <li className="flex gap-3 text-slate-700 dark:text-slate-200"><span className="material-symbols-outlined text-blue-500">done</span> 5-Class Base Identification</li>
                        <li className="flex gap-3 text-slate-700 dark:text-slate-200"><span className="material-symbols-outlined text-blue-500">done</span> 95.65% Baseline Accuracy</li>
                        <li className="flex gap-3 text-slate-700 dark:text-slate-200"><span className="material-symbols-outlined text-blue-500">done</span> Triggers Specialist if Conf &lt; 90%</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8 rounded-3xl border border-orange-100 dark:border-orange-900/30 shadow-xl group hover:shadow-2xl hover:-translate-y-1 transition-all">
                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                        <span className="material-symbols-outlined text-white text-3xl">radar</span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4">Stage 2: Specialist Evaluator</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                        An <strong>RBF-SVM Binary Specialist</strong> explicitly formulated for differentiating <em>E. coli</em> and <em>P. aeruginosa</em> via 683-dimensional multi-domain matrices.
                    </p>
                    <ul className="space-y-3 text-sm font-medium">
                        <li className="flex gap-3 text-slate-700 dark:text-slate-200"><span className="material-symbols-outlined text-orange-500">done</span> 683-dim Hand-crafted + Deep Features</li>
                        <li className="flex gap-3 text-slate-700 dark:text-slate-200"><span className="material-symbols-outlined text-orange-500">done</span> 0.9863 ROC-AUC Score</li>
                        <li className="flex gap-3 text-slate-700 dark:text-slate-200"><span className="material-symbols-outlined text-orange-500">done</span> Virtually eliminates false-positives</li>
                    </ul>
                </div>
            </section>

            {/* 3. Deep Dive into Specialist Features */}
            <section className="mb-16">
                <h3 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                    Specialist Feature Engineering
                </h3>
                <div className="glass rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold w-1/4 uppercase tracking-wider text-slate-500">Feature Modality</th>
                                <th className="px-6 py-4 text-xs font-bold w-[10%] uppercase tracking-wider text-slate-500">Dims</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Discriminative Target Signal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-700 dark:text-slate-300">
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">VGG16 Deep Features</td>
                                <td className="px-6 py-4 font-mono text-primary">512</td>
                                <td className="px-6 py-4">High-level semantic structural gradients. Extracts baseline foundational geometries.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">LBP Histogram</td>
                                <td className="px-6 py-4 font-mono text-primary">59</td>
                                <td className="px-6 py-4">Local Binary Patterns (P=8, R=1). Catches local texture micro-aggregations distinct to <em>P. aeruginosa</em> biofilms.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">HSV Bins</td>
                                <td className="px-6 py-4 font-mono text-primary">48</td>
                                <td className="px-6 py-4">Color distribution vectors mapped to isolate variations in staining saturation and intensity drops.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">GLCM Descriptors</td>
                                <td className="px-6 py-4 font-mono text-primary">24</td>
                                <td className="px-6 py-4">Co-occurrence measurements at varying rotational angles detecting localized bacterial density changes.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Spatial Density</td>
                                <td className="px-6 py-4 font-mono text-primary">16</td>
                                <td className="px-6 py-4">4x4 raster grid assessing clustering severity vs. uniform dispersal of individual bacilli.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Morphology</td>
                                <td className="px-6 py-4 font-mono text-primary">5</td>
                                <td className="px-6 py-4">Exact Area, Perimeter, Circularity, and Aspect Ratios extracted from raw contours.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Curvature Vectors</td>
                                <td className="px-6 py-4 font-mono text-primary">3</td>
                                <td className="px-6 py-4">Bending limits. Differentiates rigid <em>E. coli</em> rods from the characteristically curved <em>P. aeruginosa</em> forms.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Pathogen Scope */}
            {/* ... */}
            <section className="mb-16">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-white border border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 blur-3xl w-96 h-96 bg-primary rounded-full translate-x-1/3 -translate-y-1/3"></div>
                    
                    <h4 className="text-3xl font-bold font-display mb-8 relative z-10 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-4xl">science</span>
                        Included Pathogenic Scope
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
                            <strong className="block text-xl italic text-blue-300 mb-2">E. coli</strong>
                            <div className="flex gap-2 font-bold mb-3">
                                <span className="text-xs bg-red-500/20 text-red-200 px-2 py-0.5 rounded tracking-wider border border-red-500/30">GRAM -</span>
                                <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded tracking-wider border border-blue-500/30">ROD</span>
                            </div>
                            <p className="text-sm text-slate-300">Critical indicator of fresh fecal and coliform contamination in water reserves.</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
                            <strong className="block text-xl italic text-blue-300 mb-2">P. aeruginosa</strong>
                            <div className="flex gap-2 font-bold mb-3">
                                <span className="text-xs bg-red-500/20 text-red-200 px-2 py-0.5 rounded tracking-wider border border-red-500/30">GRAM -</span>
                                <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded tracking-wider border border-blue-500/30">ROD</span>
                            </div>
                            <p className="text-sm text-slate-300">Resilient opportunistic pathogen forming strong biofilm matrices in chlorinated environments.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
                            <strong className="block text-xl italic text-blue-300 mb-2">C. perfringens</strong>
                            <div className="flex gap-2 font-bold mb-3">
                                <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded tracking-wider border border-purple-500/30">GRAM +</span>
                                <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded tracking-wider border border-blue-500/30">SPORE ROD</span>
                            </div>
                            <p className="text-sm text-slate-300">Highly destructive pathogen surviving remote environments due to calcified spore states.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
                            <strong className="block text-xl italic text-blue-300 mb-2">E. faecalis</strong>
                            <div className="flex gap-2 font-bold mb-3">
                                <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded tracking-wider border border-purple-500/30">GRAM +</span>
                                <span className="text-xs bg-green-500/20 text-green-200 px-2 py-0.5 rounded tracking-wider border border-green-500/30">COCCI</span>
                            </div>
                            <p className="text-sm text-slate-300">Resilient intestinal pathogen indicating prolonged exposure or remote sewage leakage.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
                            <strong className="block text-xl italic text-blue-300 mb-2">L. monocytogenes</strong>
                            <div className="flex gap-2 font-bold mb-3">
                                <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded tracking-wider border border-purple-500/30">GRAM +</span>
                                <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded tracking-wider border border-blue-500/30">ROD</span>
                            </div>
                            <p className="text-sm text-slate-300">Able to rapidly divide and multiply in near-freezing or low-temperature systems.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
