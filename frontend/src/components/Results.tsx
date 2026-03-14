export const Results = () => {
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
                        <tr className="hover:bg-primary/5 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">sample_a102.png</td>
                            <td className="px-6 py-4 text-sm italic">E. coli</td>
                            <td className="px-6 py-4">
                                <span className="bg-green-500/10 text-green-500 text-[11px] font-bold px-2 py-0.5 rounded">98.2%</span>
                            </td>
                            <td className="px-6 py-4 text-sm">Negative</td>
                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Rod</td>
                            <td className="px-6 py-4">
                                <span className="bg-red-500/10 text-red-500 text-[11px] font-bold px-2 py-0.5 rounded uppercase">High Risk</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-primary/5 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">sample_b405.png</td>
                            <td className="px-6 py-4 text-sm italic">S. aureus</td>
                            <td className="px-6 py-4">
                                <span className="bg-green-500/10 text-green-500 text-[11px] font-bold px-2 py-0.5 rounded">96.7%</span>
                            </td>
                            <td className="px-6 py-4 text-sm">Positive</td>
                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Cocci</td>
                            <td className="px-6 py-4">
                                <span className="bg-orange-500/10 text-orange-500 text-[11px] font-bold px-2 py-0.5 rounded uppercase">Moderate</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-primary/5 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">sample_z901.png</td>
                            <td className="px-6 py-4 text-sm italic">B. cereus</td>
                            <td className="px-6 py-4">
                                <span className="bg-yellow-500/10 text-yellow-500 text-[11px] font-bold px-2 py-0.5 rounded">84.1%</span>
                            </td>
                            <td className="px-6 py-4 text-sm">Positive</td>
                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Spore-rod</td>
                            <td className="px-6 py-4">
                                <span className="bg-blue-500/10 text-blue-500 text-[11px] font-bold px-2 py-0.5 rounded uppercase">Low Risk</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
