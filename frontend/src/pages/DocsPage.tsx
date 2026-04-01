import { useEffect, useState } from "react";

export const DocsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeSection, setActiveSection] = useState("overview");

    const renderContent = () => {
        switch (activeSection) {
            case "overview":
                return (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-[#00e599]/20 text-[#00e599] font-mono text-sm font-bold px-3 py-1 rounded border border-[#00e599]/30">V2.0</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">/overview</h1>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            BacSense 2.0 is a state-of-the-art analytical system designed for the rapid identification of waterborne pathogens. 
                            By combining Deep Learning (VGG16) with specialized Support Vector Machines (SVM) and expert-curated feature engineering, 
                            the system achieves clinical-grade accuracy in unsupervised environments.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800">
                                <span className="material-symbols-outlined text-[#00e599] mb-4">biotech</span>
                                <h3 className="text-white font-bold mb-2">Microscopic Precision</h3>
                                <p className="text-sm text-slate-400">Trained on thousands of Gram-stained digital micrographs representing primary contaminants.</p>
                            </div>
                            <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800">
                                <span className="material-symbols-outlined text-blue-400 mb-4">bolt</span>
                                <h3 className="text-white font-bold mb-2">Cascaded Inference</h3>
                                <p className="text-sm text-slate-400">Routes ambiguous samples to a 683-dimensional "Specialist" evaluator for disambiguation.</p>
                            </div>
                        </div>
                    </>
                );
            case "architecture":
                return (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-[#00e599]/20 text-[#00e599] font-mono text-sm font-bold px-3 py-1 rounded border border-[#00e599]/30">V2.0</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">/architecture</h1>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            The BacSense pipeline uses a hierarchical evaluation logic. High-confidence results are 
                            processed by the main VGG16 backbone, while "confusion pairs" are escalated to the Stage 2 Specialist.
                        </p>
                        <div className="space-y-6">
                            <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden p-6 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00e599]"></div>
                                <h3 className="text-lg font-bold text-white mb-2 italic">Stage 1: Frozen VGG16 Backbone</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Acts as the primary feature extractor. We use a modified VGG16 architecture pre-trained on ImageNet and fine-tuned on the 
                                    Digital Image Analysis of Waterborne Pathogens (DIAWP) dataset.
                                </p>
                            </div>
                            <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden p-6 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                <h3 className="text-lg font-bold text-white mb-2 italic">Stage 2: Specialist RBF-SVM</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Invoked only when the input is identified as either E. coli or P. aeruginosa with low class separation. 
                                    It utilizes a massive 683-dimensional feature vector combining neural and handcrafted features.
                                </p>
                            </div>
                        </div>
                    </>
                );
            case "pathogens":
                return (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-red-500/20 text-red-500 font-mono text-sm font-bold px-3 py-1 rounded border border-red-500/30">SCOPE</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">/pathogen_scope</h1>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            BacSense 2.0 is specifically optimized for five primary waterborne pathogens. Each identified species carries distinct clinical 
                            risks and requires specific environmental interventions.
                        </p>

                        <div className="space-y-12">
                            {/* E. coli */}
                            <div className="relative pl-8 border-l border-slate-800">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <h3 className="text-2xl font-bold italic text-white">Escherichia coli</h3>
                                    <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/20">HIGH RISK 🔥</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">GRAM (-)</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">ROD (BACILLUS)</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Identification Harm</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            The primary indicator of recent fecal contamination. Certain strains like O157:H7 produce Shiga toxins 
                                            leading to severe intestinal damage, kidney failure, and hemolytic uremic syndrome.
                                        </p>
                                    </div>
                                    <div className="bg-[#111827] p-4 rounded-xl border border-red-900/20">
                                        <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Safety Action</h4>
                                        <p className="text-sm text-slate-400">Immediate boiling of water sources. Identify sewage breaches. Do not use for cleaning open wounds.</p>
                                    </div>
                                </div>
                            </div>

                            {/* P. Aeruginosa */}
                            <div className="relative pl-8 border-l border-slate-800">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <h3 className="text-2xl font-bold italic text-white">Pseudomonas aeruginosa</h3>
                                    <span className="bg-orange-500/10 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/20">HIGH RISK ☣️</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">GRAM (-)</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">ROD (BACILLUS)</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Identification Harm</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            A multidrug-resistant opportunistic pathogen. Highly dangerous in hospital environments and for those with 
                                            compromised immunity. Known for causing lung infections and sepsis.
                                        </p>
                                    </div>
                                    <div className="bg-[#111827] p-4 rounded-xl border border-orange-900/20">
                                        <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">Safety Action</h4>
                                        <p className="text-sm text-slate-400">Intensive chlorination required. Avoid eye/ear contact. Critical for burn units/ICUs to filter.</p>
                                    </div>
                                </div>
                            </div>

                            {/* L. Monocytogenes */}
                            <div className="relative pl-8 border-l border-slate-800">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <h3 className="text-2xl font-bold italic text-white">Listeria monocytogenes</h3>
                                    <span className="bg-purple-500/10 text-purple-500 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/20">CRITICAL RISK ⚠️</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">GRAM (+)</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">ROD (BACILLUS)</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Identification Harm</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Causes Listeriosis. Extremely dangerous to pregnant women, leading to miscarriages and neonatal meningitis. 
                                            One of the most resilient foodborne/waterborne pathogens.
                                        </p>
                                    </div>
                                    <div className="bg-[#111827] p-4 rounded-xl border border-purple-900/20">
                                        <h4 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-2">Safety Action</h4>
                                        <p className="text-sm text-slate-400">Stop all consumption immediately. Requires pasteurization or standard heat treatment above 70°C.</p>
                                    </div>
                                </div>
                            </div>

                            {/* C. Perfringens */}
                            <div className="relative pl-8 border-l border-slate-800">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <h3 className="text-2xl font-bold italic text-white">Clostridium perfringens</h3>
                                    <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/20">PERSISTENT RISK 🧪</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">GRAM (+)</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">ROD (BACILLUS)</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Identification Harm</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Spore-forming pathogen indicating remote/past fecal pollution. Causes gas gangrene in wounds 
                                            and severe food poisoning due to its heat-resistant enterotoxins.
                                        </p>
                                    </div>
                                    <div className="bg-[#111827] p-4 rounded-xl border border-yellow-900/20">
                                        <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">Safety Action</h4>
                                        <p className="text-sm text-slate-400">Resistant to standard chlorination. Use UV filtration or specialized nano-membrane filtering systems.</p>
                                    </div>
                                </div>
                            </div>

                            {/* E. Faecalis */}
                            <div className="relative pl-8 border-l border-slate-800 pb-10">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <h3 className="text-2xl font-bold italic text-white">Enterococcus faecalis</h3>
                                    <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/20">MODERATE RISK 📉</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">GRAM (+)</span>
                                    <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">COCCUS (SPHERE)</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Identification Harm</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Common inhabitant of the GI tract but indicates old/prolonged fecal pollution. 
                                            Can cause endocarditis, sepsis, and urinary tract infections in clinical settings.
                                        </p>
                                    </div>
                                    <div className="bg-[#111827] p-4 rounded-xl border border-blue-900/20">
                                        <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Safety Action</h4>
                                        <p className="text-sm text-slate-400">Shock chlorination for the entire system. Discontinue source use until multi-day negative results are achieved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case "features":
                return (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-[#00e599]/20 text-[#00e599] font-mono text-sm font-bold px-3 py-1 rounded border border-[#00e599]/30">V2.0</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">/feature_metrics</h1>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            The Specialist Stage utilizes a 683-dimensional hyper-space to separate E. coli from P. aeruginosa. 
                            This is achieved by fusing deep feature extraction with traditional computer vision metrics.
                        </p>
                        <div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden mb-10">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#0d131f] border-b border-slate-800 text-slate-400">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold w-1/4">Modality</th>
                                        <th className="px-5 py-3 font-semibold text-[#00e599] w-[15%]">Dims</th>
                                        <th className="px-5 py-3 font-semibold">Diagnostic Utility</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">VGG16 Block 5</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">512</td>
                                        <td className="px-5 py-4 text-slate-400">Captures high-dimensional spatial correlations and macro-structure.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">LBP Uniform</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">59</td>
                                        <td className="px-5 py-4 text-slate-400">Differentiates textures and surface roughness of bacterial clusters.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">HSV Distribution</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">48</td>
                                        <td className="px-5 py-4 text-slate-400">Quantifies Gram-staining absorption characteristics.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">GLCM Matrix</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">24</td>
                                        <td className="px-5 py-4 text-slate-400">Measures image homogeneity and local bacterial density.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">Morphological</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">5</td>
                                        <td className="px-5 py-4 text-slate-400">Area, Perimeter, Circularity, Aspect Ratio and Solidity.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                );
            case "performance":
                return (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-[#00e599]/20 text-[#00e599] font-mono text-sm font-bold px-3 py-1 rounded border border-[#00e599]/30">V2.0</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">/benchmarks</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl flex flex-col items-center">
                                <span className="text-5xl font-bold text-white mb-2 italic">95.65%</span>
                                <span className="text-slate-500 uppercase tracking-widest text-xs font-bold">Accuracy (Combined)</span>
                            </div>
                            <div className="bg-[#111827] border border-slate-800 p-8 rounded-2xl flex flex-col items-center">
                                <span className="text-5xl font-bold text-[#00e599] mb-2 italic">0.986</span>
                                <span className="text-slate-500 uppercase tracking-widest text-xs font-bold">Specialist ROC-AUC</span>
                            </div>
                        </div>
                        <div className="bg-[#111827] rounded-2xl border border-slate-800 p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Confusion Pair Resolution</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                                The transition from V1.0 to V2.0 focused entirely on resolving the morphology confusion between Escherichia coli and Pseudomonas aeruginosa. 
                                In baseline VGG16 models, these pathogens overlap significantly in pixel-space. With the Stage 2 Specialist, we achieve near-perfect class separation.
                            </p>
                            <div className="w-full bg-[#131b2f] h-2 rounded-full overflow-hidden flex">
                                <div className="h-full bg-[#00e599]" style={{width: '98%'}}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase">
                                <span>Sensitivity: 97.2%</span>
                                <span>Specificity: 98.4%</span>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-[#0b101e] text-slate-300 font-sans pt-20 flex">
            
            {/* Left Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-slate-800/60 hidden lg:block overflow-y-auto h-[calc(100vh-5rem)] sticky top-20 custom-scrollbar pb-10">
                <div className="p-6">
                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Introduction</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button 
                                    onClick={() => setActiveSection("overview")}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "overview" ? "text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">verified</span>
                                    System Overview
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveSection("architecture")}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "architecture" ? "text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">account_tree</span>
                                    Architecture
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Core Reference</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button 
                                    onClick={() => setActiveSection("pathogens")}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "pathogens" ? "text-red-500 bg-red-500/10 border border-red-500/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">microbiology</span>
                                    Pathogen Scope
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setActiveSection("features")}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "features" ? "text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">token</span>
                                    Feature Specs
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setActiveSection("performance")}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "performance" ? "text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">monitoring</span>
                                    Benchmarks
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">API</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 px-3 py-1.5 opacity-50"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> /predict_batch</li>
                            <li className="flex items-center gap-2 px-3 py-1.5 opacity-50"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> /health</li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex flex-col xl:flex-row h-[calc(100vh-5rem)] overflow-y-auto">
                
                {/* Center Document */}
                <div className="flex-1 max-w-4xl px-8 py-10 lg:px-12 pb-24">
                    {renderContent()}
                </div>

                {/* Right Column / Quick JSON Preview (Static) */}
                <div className="w-full xl:w-[400px] flex-shrink-0 bg-[#0c1221]/50 xl:border-l border-slate-800/60 p-6 xl:p-8 xl:overflow-y-auto">
                    
                    {/* JSON Block */}
                    <div className="bg-[#141b2d] rounded-xl border border-slate-700/60 overflow-hidden mb-10 shadow-2xl">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1524] border-b border-slate-700/60">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono ml-2 uppercase tracking-widest">SAMPLE_RESPONSE.JSON</span>
                        </div>
                        <div className="p-5 font-mono text-[12px] overflow-x-auto text-slate-400">
<pre className="!bg-transparent !m-0 !p-0 leading-relaxed">
<code>
{`{`}
{`  "prediction": "Escherichia coli",`}
{`  "confidence": 98.2,`}
{`  "risk": "HIGH",`}
{`  "characteristics": {`}
{`    "gram": "Negative (-)",`}
{`    "shape": "Rod"`}
{`  },`}
{`  "success": true`}
{`}`}
</code>
</pre>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 italic">Neural Backbone</h4>
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-400">Model:</span>
                                <span className="text-blue-400">VGG16-CASCADED</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 italic">Feature Space</h4>
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-400">Dimensions:</span>
                                <span className="text-[#00e599]">683-DIM</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 italic">Environment</h4>
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-400">Runtime:</span>
                                <span className="text-orange-400">Python 3.11</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono mt-2">
                                <span className="text-slate-400">Backend:</span>
                                <span className="text-orange-400">FastAPI / HF-Spaces</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #1e293b;
                    border-radius: 10px;
                }
                @font-face {
                    font-family: 'Space Grotesk';
                    src: url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
                }
            `}} />
        </main>
    );
};
