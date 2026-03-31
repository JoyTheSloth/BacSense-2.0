import type { PredictionResult } from "./UploadZone";

interface ResultsProps {
    items: PredictionResult[];
}

export const Results = ({ items }: ResultsProps) => {
    return (
        <section className="max-w-7xl mx-auto px-6 mb-24">
            <h3 className="text-3xl font-display font-bold mb-8">Classification Results</h3>
            <div className="glass rounded-3xl overflow-x-auto border border-slate-200 dark:border-slate-800 shadow-2xl">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Filename</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Predicted Class</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Confidence</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Gram Stain</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Shape</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Pathogenicity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                        {items.map((item, index) => {
                            if (!item.success) return null;
                            const risk = item.details?.pathogenicity || 'Unknown';
                            const confColor = (item.confidence || 0) >= 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500';
                            
                            let riskColor = 'bg-blue-500/10 text-blue-500'; // low/unknown
                            if (risk.toLowerCase().includes('high')) riskColor = 'bg-red-500/10 text-red-500';
                            else if (risk.toLowerCase().includes('moderate')) riskColor = 'bg-orange-500/10 text-orange-500';

                            return (
                                <tr key={index} className="hover:bg-primary/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium">{item.filename}</td>
                                    <td className="px-6 py-4 text-sm italic">{item.prediction}</td>
                                    <td className="px-6 py-4">
                                        <span className={`${confColor} text-[11px] font-bold px-2 py-0.5 rounded`}>{(item.confidence || 0).toFixed(1)}%</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{item.details?.gram_stain}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.details?.shape}</td>
                                    <td className="px-6 py-4">
                                        <span className={`${riskColor} text-[11px] font-bold px-2 py-0.5 rounded uppercase`}>{risk}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

