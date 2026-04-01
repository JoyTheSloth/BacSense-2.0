import { useEffect, useState } from "react";

export const DocsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeSection, setActiveSection] = useState("quickstart");

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
                                    onClick={() => setActiveSection("quickstart")}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "quickstart" ? "text-[#00e599] bg-[#00e599]/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">verified</span>
                                    Overview
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveSection("architecture")}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "architecture" ? "text-[#00e599] bg-[#00e599]/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">account_tree</span>
                                    Architecture
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Stages</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center justify-between group">
                                <button className="text-slate-400 hover:text-slate-200 px-3 py-1.5 transition-colors">Stage 1: VGG16</button>
                                <span className="text-[10px] font-bold bg-[#00e599]/20 text-[#00e599] px-1.5 py-0.5 rounded mr-3">MAIN</span>
                            </li>
                            <li className="flex items-center justify-between group">
                                <button className="text-slate-400 hover:text-slate-200 px-3 py-1.5 transition-colors">Stage 2: Specialist</button>
                                <span className="text-[10px] font-bold bg-[#00e599]/20 text-[#00e599] px-1.5 py-0.5 rounded mr-3">V2</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Reference</h4>
                        <ul className="space-y-3 text-sm">
                            <li><button className="text-slate-400 hover:text-slate-200 px-3 transition-colors">Feature Engineering</button></li>
                            <li><button className="text-slate-400 hover:text-slate-200 px-3 transition-colors">Pathogen Scope</button></li>
                            <li><button className="text-slate-400 hover:text-slate-200 px-3 transition-colors">Performance</button></li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex flex-col xl:flex-row h-[calc(100vh-5rem)] overflow-y-auto">
                
                {/* Center Document */}
                <div className="flex-1 max-w-4xl px-8 py-10 lg:px-12 pb-24">
                    
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-[#00e599]/20 text-[#00e599] font-mono text-sm font-bold px-3 py-1 rounded border border-[#00e599]/30">V2.0</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">/architecture</h1>
                    </div>

                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        The primary architecture used by the BacSense classification pipeline. Takes an input microscopy image, runs a two-stage cascaded hybrid evaluation (VGG16 + Hand-Crafted Features), and returns the predicted bacterial species with confidence metrics.
                    </p>

                    <div className="flex items-center gap-3 bg-[#131b2f] border border-slate-700/50 rounded-lg px-4 py-3 mb-12 font-mono text-sm text-slate-300 w-fit">
                        <span className="material-symbols-outlined text-[#00e599] text-[18px]">bolt</span>
                        <span className="text-slate-500">BASE MODEL:</span>
                        <span className="text-[#00e599]">Cascaded_Hybrid_Classifier</span>
                    </div>

                    <div className="mb-12 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00e599] rounded-full"></div>
                        <h2 className="text-2xl font-bold text-white mb-6 pl-5">Pipeline Execution — /predict</h2>
                        
                        <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] divide-y md:divide-y-0 md:divide-x divide-slate-800">
                                <div className="p-5 flex flex-col justify-center">
                                    <div className="flex items-center justify-between mb-2">
                                        <code className="text-blue-400 font-bold">Image</code>
                                        <span className="text-xs text-slate-500 font-semibold tracking-wider">FILE | REQUIRED</span>
                                    </div>
                                    <p className="text-sm text-slate-400">Microscopy image of water sample.</p>
                                </div>
                                <div className="p-5 flex flex-col justify-center bg-[#0d131f]">
                                    <p className="text-sm text-slate-300">Accepted formats: .jpg, .jpeg, .png. Image should contain clearly visible Gram-stained bacterial formations.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] divide-y md:divide-y-0 md:divide-x divide-slate-800">
                                <div className="p-5 flex flex-col justify-center">
                                    <div className="flex items-center justify-between mb-2">
                                        <code className="text-blue-400 font-bold">Stage 1: VGG16</code>
                                        <span className="text-xs text-slate-500 font-semibold tracking-wider">NET | CORE</span>
                                    </div>
                                    <p className="text-sm text-slate-400">Main Classifier Backbone.</p>
                                </div>
                                <div className="p-5 flex flex-col justify-center bg-[#0d131f]">
                                    <p className="text-sm text-slate-300">Outputs a 5-class prediction. If confidence is &lt;90% on E.coli/P.aeruginosa, it triggers the specialist.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] divide-y md:divide-y-0 md:divide-x divide-slate-800">
                                <div className="p-5 flex flex-col justify-center">
                                    <div className="flex items-center justify-between mb-2">
                                        <code className="text-blue-400 font-bold">Stage 2: Specialist</code>
                                        <span className="text-xs text-slate-500 font-semibold tracking-wider">SVM | CONDITIONAL</span>
                                    </div>
                                    <p className="text-sm text-slate-400">683-dim RBF-SVM Evaluator.</p>
                                </div>
                                <div className="p-5 flex flex-col justify-center bg-[#0d131f]">
                                    <p className="text-sm text-slate-300">Explicitly formulated to differentiate E. coli and P. aeruginosa using hand-crafted and deep features.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specialist Features Scope */}
                    <div className="mb-12 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-white mb-6 pl-5">Specialist Matrix — /features</h2>
                        <div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#0d131f] border-b border-slate-800 text-slate-400">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold w-1/4">Modality</th>
                                        <th className="px-5 py-3 font-semibold text-[#00e599] w-[15%]">Dims</th>
                                        <th className="px-5 py-3 font-semibold">Target Signal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">VGG16 FC</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">512</td>
                                        <td className="px-5 py-4 text-slate-400">High-level semantic structural gradients.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">LBP Hist</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">59</td>
                                        <td className="px-5 py-4 text-slate-400">Local texture micro-aggregations for biofilms.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">HSV Bins</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">48</td>
                                        <td className="px-5 py-4 text-slate-400">Staining saturation and intensity variation.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">GLCM</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">24</td>
                                        <td className="px-5 py-4 text-slate-400">Co-occurrence measurements for density changes.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">Spatial</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">16</td>
                                        <td className="px-5 py-4 text-slate-400">4x4 raster grid assessing clustering severity.</td>
                                    </tr>
                                    <tr className="hover:bg-[#0d131f]/50 transition-colors">
                                        <td className="px-5 py-4 font-mono text-slate-300">Morphology</td>
                                        <td className="px-5 py-4 text-[#00e599] font-mono">5</td>
                                        <td className="px-5 py-4 text-slate-400">Area, Perimeter, Circularity, Aspect Ratios.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column / API Info */}
                <div className="w-full xl:w-[400px] flex-shrink-0 bg-[#0b101e] xl:border-l border-slate-800/60 p-6 xl:p-8 xl:overflow-y-auto">
                    
                    {/* JSON Block */}
                    <div className="bg-[#141b2d] rounded-xl border border-slate-700/60 overflow-hidden mb-10 shadow-2xl">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1524] border-b border-slate-700/60">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-xs text-slate-500 font-mono ml-2 uppercase tracking-wider">RESPONSE JSON — /predict</span>
                        </div>
                        <div className="p-5 font-mono text-sm overflow-x-auto text-slate-300">
                            <pre className="!bg-transparent !m-0 !p-0">
                                <code>
<span className="text-slate-400">{`{`}</span>{`\n`}
{`  `}<span className="text-blue-300">"prediction"</span>{`: `}<span className="text-orange-300">"Escherichia coli"</span>{`,\n`}
{`  `}<span className="text-blue-300">"confidence"</span>{`: `}<span className="text-purple-400">0.982</span>{`,\n`}
{`  `}<span className="text-blue-300">"risk_level"</span>{`: `}<span className="text-[#00e599]">"HIGH"</span>{`,\n`}
{`  `}<span className="text-blue-300">"routed_to_specialist"</span>{`: `}<span className="text-orange-400">true</span>{`,\n`}
{`  `}<span className="text-blue-300">"characteristics"</span>{`: {\n`}
{`    `}<span className="text-blue-300">"gram_stain"</span>{`: `}<span className="text-orange-300">"Negative (-)"</span>{`,\n`}
{`    `}<span className="text-blue-300">"morphology"</span>{`: `}<span className="text-orange-300">"Rod (Bacillus)"</span>{`\n`}
{`  `}<span className="text-slate-400">{`}\n`}</span>
<span className="text-slate-400">{`}`}</span>
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* Configuration / Quick Ref */}
                    <div className="mb-10">
                        <h4 className="text-[11px] font-bold text-[#00e599] tracking-widest uppercase mb-4">Configuration</h4>
                        
                        <div className="mb-6">
                            <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">rule</span>
                                Decision Rules
                            </h5>
                            <p className="text-sm text-slate-400 leading-relaxed mb-3">
                                The system dynamically routes ambiguously predicted inputs to the Specialist RBF-SVM if the primary confidence threshold is not met.
                            </p>
                            <code className="text-xs bg-slate-800/80 text-blue-300 px-2 py-1 rounded inline-block">&gt; confidence &lt; 0.90</code>
                        </div>

                        <div>
                            <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">speed</span>
                                Performance Profile
                            </h5>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Base Accuracy: 95.65%<br/>
                                Specialist AUC: 0.9863<br/>
                                Avg Latency: &lt; 850ms / image
                            </p>
                        </div>
                    </div>

                    {/* Quick Reference Table */}
                    <div className="mb-10">
                        <h4 className="text-[11px] font-bold text-[#00e599] tracking-widest uppercase mb-4">Quick Reference</h4>
                        
                        <div className="space-y-4 text-sm border-t border-slate-800 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Architecture</span>
                                <span className="text-slate-300 font-mono bg-slate-800/50 px-2 py-0.5 rounded">VGG16 + SVM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Feature Dims</span>
                                <span className="text-slate-300 font-mono bg-slate-800/50 px-2 py-0.5 rounded">683 (Specialist)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Classes Supported</span>
                                <span className="text-slate-300 font-mono bg-slate-800/50 px-2 py-0.5 rounded">5 Pathogens</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Version</span>
                                <span className="text-[#00e599] font-bold font-mono bg-[#00e599]/10 px-2 py-0.5 rounded">V2.0 STABLE</span>
                            </div>
                        </div>
                    </div>

                    {/* Changelog */}
                    <div>
                        <h4 className="text-[11px] font-bold text-[#00e599] tracking-widest uppercase mb-4">Changelog</h4>
                        <div className="relative pl-4 border-l-2 border-slate-800 pb-2 space-y-6">
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#00e599] ring-4 ring-[#0b101e]"></div>
                                <h5 className="text-white text-sm font-bold mb-1">V2.0 — Cascaded Network</h5>
                                <p className="text-xs text-slate-400">Added Binary RBF-SVM Specialist trained on 683-dim feature vectors to resolve E.coli vs P.aeruginosa confusion pairs.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-600 ring-4 ring-[#0b101e]"></div>
                                <h5 className="text-slate-300 text-sm font-bold mb-1">V1.0 — Baseline Release</h5>
                                <p className="text-xs text-slate-500">Initial frozen VGG16 backbone extracting features mapped to PCA-reduced 94-dimensional RBF Support Vector Machine.</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-10"></div>
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
            `}} />
        </main>
    );
};

