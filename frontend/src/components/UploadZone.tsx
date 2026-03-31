import { useState, useRef } from "react";

export interface PredictionResult {
    filename?: string;
    success: boolean;
    error?: string;
    prediction?: string;
    confidence?: number;
    probabilities?: { name: string; probability: number }[];
    details?: {
        gram_stain: string;
        shape: string;
        pathogenicity: string;
    };
    previewUrl?: string;
}

const PRECAUTIONS: Record<string, string> = {
    "Escherichia coli": "Indicator of fecal contamination. \n\nPrecautions/Actions: Boil water immediately before consumption. Source trace to find sewage leaks. Do not use for washing open wounds.",
    "Pseudomonas aeruginosa": "Opportunistic pathogen resistant to many sanitizers. \n\nPrecautions/Actions: Ensure water chlorination levels are adequate. Can cause severe infections in immunocompromised individuals. Avoid contact with eyes or ears.",
    "Enterococcus faecalis": "Indicates prolonged fecal contamination. Very resilient. \n\nPrecautions/Actions: Shock chlorinate the water system. Discontinue use for drinking until negative tests are returned.",
    "Clostridium perfringens": "Spore-forming bacteria, highly resistant to standard disinfection. \n\nPrecautions/Actions: Indicates remote or past fecal contamination. UV filtration or extreme heat treatment may be required.",
    "Listeria monocytogenes": "Dangerous to pregnant women and immunocompromised individuals. \n\nPrecautions/Actions: Do not use water for food preparation or drinking. Pasteurization/boiling is required."
};

interface UploadZoneProps {
    onResultsGenerated?: (results: PredictionResult[] | null) => void;
}

export const UploadZone = ({ onResultsGenerated }: UploadZoneProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [localResults, setLocalResults] = useState<PredictionResult[] | null>(null);
    const [selectedResult, setSelectedResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (selectedFiles: FileList | File[]) => {
        const fileArray = Array.from(selectedFiles);
        if (fileArray.length === 0) return;
        
        setFiles(fileArray);
        
        // Generate preview URLs
        const previewUrls = fileArray.map(f => URL.createObjectURL(f));
        
        setLocalResults(null);
        if (onResultsGenerated) onResultsGenerated(null);
        setSelectedResult(null);
        setError(null);
        setIsUploading(true);
        setProgress(20);

        const formData = new FormData();
        fileArray.forEach(f => {
            formData.append("files", f);
        });

        try {
            setProgress(60);
            const response = await fetch("http://localhost:5000/predict_batch", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze images");
            }
            
            setProgress(90);
            const data = await response.json();
            
            // Attach preview URLs to results for display
            if (data.results && Array.isArray(data.results)) {
                const resultsWithPreviews = data.results.map((r: any) => {
                    const matchIndex = fileArray.findIndex(f => f.name === r.filename);
                    return {
                        ...r,
                        previewUrl: matchIndex >= 0 ? previewUrls[matchIndex] : null
                    };
                });
                setLocalResults(resultsWithPreviews);
                if (onResultsGenerated) onResultsGenerated(resultsWithPreviews);
            }
            setProgress(100);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsUploading(false);
        }
    };

    const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10" id="upload">
            <div className={`grid ${localResults ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 max-w-2xl mx-auto'} gap-8`}>
                <div className="space-y-6 lg:col-span-1">
                    <h3 className="text-3xl font-display font-bold">Upload Zone</h3>
                    
                    <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onFileDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-target border-2 border-dashed border-primary/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md hover:bg-primary/10 transition-colors group cursor-pointer h-64"
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={onFileChange} 
                            className="hidden" 
                            accept="image/*"
                            multiple
                        />
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Drag & drop images</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Supports JPG, PNG up to 20MB.</p>
                        <button className="cursor-target bg-primary text-white px-5 py-2 rounded-lg font-bold hover:scale-105 transition-transform text-sm">Browse</button>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                        <div className="bg-slate-100 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Processing {files.length} images</span>
                                <span className="text-sm font-bold text-primary">{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                                Analyzing morphological features...
                            </p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-2">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}
                </div>

                {localResults && (
                    <div className="space-y-6 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-display font-bold">Analysis Results</h3>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">{localResults.length} processed</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {localResults.map((res, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => res.success && setSelectedResult(res)}
                                    className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col ${res.success ? 'cursor-pointer hover:scale-[1.02] hover:border-primary/50 transition-all' : ''}`}
                                    title={res.success ? "Click for detailed summary" : ""}
                                >
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-primary/20 flex-shrink-0 bg-black">
                                            {res.previewUrl ? (
                                                <img className="w-full h-full object-cover" alt={`Upload ${index}`} src={res.previewUrl} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-800"><span className="material-symbols-outlined text-slate-500">image</span></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mb-1" title={res.filename}>{res.filename}</p>
                                            
                                            {res.success && res.prediction ? (
                                                <>
                                                    <h4 className="text-lg font-bold italic text-slate-900 dark:text-slate-100 leading-tight mb-2 truncate" title={res.prediction}>{res.prediction}</h4>
                                                    <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${(res.confidence || 0) > 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                                        <span className="material-symbols-outlined text-[14px]">{(res.confidence || 0) > 80 ? 'verified' : 'warning'}</span>
                                                        {(res.confidence || 0).toFixed(1)}% Conf
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-red-500 text-sm font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">error</span> Failed
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {res.success && res.details && (
                                        <div className="flex-1 flex flex-col justify-end">
                                            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                                <div className="text-xs text-slate-900 dark:text-slate-100">
                                                    <span className="text-slate-500 block mb-0.5 mt-0">Morphology</span>
                                                    <span className="font-semibold">{res.details.shape}</span>
                                                </div>
                                                <div className="text-xs text-slate-900 dark:text-slate-100">
                                                    <span className="text-slate-500 block mb-0.5 mt-0">Stain</span>
                                                    <span className="font-semibold">{res.details.gram_stain}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Dialog Box */}
            {selectedResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedResult(null)}>
                    <div 
                        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 md:p-8 flex flex-col gap-6">
                            <div className="flex items-start justify-between">
                                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Detailed Classification Summary</h3>
                                <button onClick={() => setSelectedResult(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-black flex-shrink-0 border-4 border-slate-100 dark:border-slate-800">
                                    {selectedResult.previewUrl ? (
                                        <img src={selectedResult.previewUrl} alt="Analyzed bacteria" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-500"><span className="material-symbols-outlined text-4xl">image</span></div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Predicted Species</span>
                                        <h4 className="text-3xl font-bold italic text-primary mt-1">{selectedResult.prediction}</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                                            <span className="text-xs text-slate-500 block mb-1">Confidence</span>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">{(selectedResult.confidence || 0).toFixed(1)}%</span>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                                            <span className="text-xs text-slate-500 block mb-1">Risk Level</span>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">{selectedResult.details?.pathogenicity || 'Unknown'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                <div className="space-y-3">
                                    <h5 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">Microbiology Specifics</h5>
                                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                        <li className="flex justify-between"><span>Gram Stain:</span> <strong className="text-slate-900 dark:text-white">{selectedResult.details?.gram_stain}</strong></li>
                                        <li className="flex justify-between"><span>Morphology:</span> <strong className="text-slate-900 dark:text-white">{selectedResult.details?.shape}</strong></li>
                                        <li className="flex justify-between"><span>Pathogenicity:</span> <strong className="text-slate-900 dark:text-white">{selectedResult.details?.pathogenicity}</strong></li>
                                    </ul>
                                </div>

                                <div className="space-y-3">
                                    <h5 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">Precautions & Actions</h5>
                                    <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-800 dark:text-yellow-200 shadow-inner">
                                        <div className="flex gap-2 items-start whitespace-pre-line">
                                            <span className="material-symbols-outlined text-[18px] mt-0.5">warning</span>
                                            <p className="leading-relaxed m-0">
                                                {selectedResult.prediction ? (PRECAUTIONS[selectedResult.prediction] || "Standard water safety protocols apply. Heat above 70°C before any consumption.") : "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                                <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform" onClick={() => setSelectedResult(null)}>
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

