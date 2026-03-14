import { useState, useRef } from "react";

interface PredictionResult {
    success: boolean;
    prediction: string;
    confidence: number;
    probabilities: { name: string; probability: number }[];
    details: {
        gram_stain: string;
        shape: string;
        pathogenicity: string;
    };
}

export const UploadZone = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (selectedFile: File) => {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setResult(null);
        setError(null);
        setIsUploading(true);
        setProgress(20);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setProgress(60);
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze image");
            }
            
            setProgress(90);
            const data = await response.json();
            setResult(data);
            setProgress(100);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsUploading(false);
        }
    };

    const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) handleFile(droppedFile);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) handleFile(selectedFile);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10" id="upload">
            <div className={`grid ${result ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'} gap-12`}>
                <div className="space-y-6">
                    <h3 className="text-3xl font-display font-bold">Upload Zone</h3>
                    
                    <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onFileDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-target border-2 border-dashed border-primary/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md hover:bg-primary/10 transition-colors group cursor-pointer"
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={onFileChange} 
                            className="hidden" 
                            accept="image/*"
                        />
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-4xl">cloud_upload</span>
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Drag and drop images here</h4>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">Supports JPG, PNG up to 20MB.</p>
                        <button className="cursor-target bg-primary text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform">Browse Files</button>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                        <div className="bg-slate-100 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Processing {file?.name}</span>
                                <span className="text-sm font-bold text-primary">{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                                Analyzing morphological features via VGG16 backbone...
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

                {result && (
                    <div className="space-y-6">
                        <h3 className="text-3xl font-display font-bold">Detailed Analysis</h3>
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
                            <div className="flex flex-col sm:flex-row gap-6 mb-8">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/20 flex-shrink-0 bg-black">
                                    {previewUrl && <img className="w-full h-full object-cover" alt="Uploaded preview" src={previewUrl} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                        <h4 className="text-2xl font-bold italic text-slate-900 dark:text-slate-100">{result.prediction}</h4>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${result.confidence > 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            {result.confidence > 80 ? 'High Confidence' : 'Moderate'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-3xl font-display font-bold text-primary">{result.confidence.toFixed(1)}%</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-xs text-slate-900 dark:text-slate-100"><span className="text-slate-500">Morphology:</span> <span className="font-semibold">{result.details.shape}</span></div>
                                        <div className="text-xs text-slate-900 dark:text-slate-100"><span className="text-slate-500">Stain:</span> <span className="font-semibold">{result.details.gram_stain}</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500">Probability Distribution</h5>
                                <div className="space-y-3">
                                    {result.probabilities.slice(0, 3).map((prob, idx) => (
                                        <div key={prob.name}>
                                            <div className="flex justify-between text-xs mb-1 text-slate-900 dark:text-slate-100">
                                                <span>{prob.name}</span>
                                                <span className="font-bold">{prob.probability.toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                                                <div className={`h-full rounded-full ${idx === 0 ? 'bg-primary' : 'bg-slate-400'}`} style={{ width: `${prob.probability}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
