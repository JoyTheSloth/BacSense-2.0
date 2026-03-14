export const Species = () => {
    const speciesList = [
        { name: "C. perfringens", full: "Clostridium perfringens", traits: "Gram-positive, Anaerobic", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqX5as8VB98coMPS1nNFsfu9M233xaiSFzXZJnG-iqFTWvjxRyPasTfINhM5Yi8GcCSLRaqgraUgLDc1VbIo_PF3Y3WOoj79rMRmZzKnmtEQiD3imFaD5xrI9wQRiIcXjS3J96bSpaEQYjt8ZDTLXZ96K7tjwU6JXqZ74Nf8ETJ_T-oxvqdyS-3wxc06Mbrvc5QwkEkuY4UOPUJs25mhCQf8QbL2cpG6pC6A2Pg0fpdGAkSe1sQVqLhZJcBpLV8A8z-V2SsgjrCmo" },
        { name: "Escherichia coli", full: "Escherichia coli", traits: "Gram-negative, Rod", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3KwFAUK3s5aDqMCX-TqfHdtQlznX0kk5aU6dfWM7b_ZXqjfbvJ2_2NYG4WAcOnkmXzSEAWmKBQDxKqDwltJNttqllKLNDA2AVNsSH9V-BhZV46l9TQuCjurGru4cUKRTiPjUV_yuAx83WD-TwWSec751FfZA0en73GZU8-3u9bGm0YMSel0Tafi2EjicYvKgewBtwPCFfyZqVjLZCgm-fFbinF__m9zMogoIgENOqZIId2rukRZnrZYefyWZv7cbg3HzN9OOXmQ8" },
        { name: "S. aureus", full: "Staphylococcus aureus", traits: "Gram-positive, Cocci", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMYEJJkt17J03_UiNaRU-EPoYelpNlqQ4AtoiWoLPy05oNKBToqZlsFxc0SpA8jCkYQqGg8kAQ1FQFILvsv527XzITyUHScVOE-eTotf0wF4YcFykbRR4kvyceOsGVO3bcHvrQ5apT4CpDV7_jXvy88dSqB4sjYxWrTJCTzrmcMsPg0l8jrTOsmgjRbAI8wJ_TfEhNGLL72YNt6-GQK2mXhBGgT3ba1md93NICpB-rCzppXQWFP4pyud_Sx5DFUHkSmsAQzxT_3Gc" },
        { name: "Bacillus cereus", full: "Bacillus cereus", traits: "Gram-positive, Spore", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL1k9a185JqakiYjo-2VJ9mw6OOefPvUoZgM2eTmKwJKMIkVlzcuxbS3rFyEEyeh8fO_N1VV0NC1bqH-e4ilRnPvzxhMZmdHcDl7xlrGF5zcZ8Fn2lUqyEUtdvPaUh4PoFMUCunABFPrO7EiviLb-hhMKKr9Qr-5RBQGWa8wl4G1_NusRvel3BwSNv1dmCdJtabnpfLPf36jzvxtQDO3qMh2_TeIDh6LtCCvHOhiD--cNzhp1QSqIannGMyo4b348Mw2HWCmuYb98" },
        { name: "L. monocytogenes", full: "Listeria monocytogenes", traits: "Gram-positive, Rod", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMnV4nByP765X_gmBbkyiNF3oqf4kYgD3vsXPdkUAwM8VZb-cTvkGo93H2hraUtpUgsA1Om24vR2gwZDNJUIZ8FdFm2R3YoHUS15My0y8J26dMerah7GqR0w5NhrwDABjT7hKwEfJjdKpmZlmfe3K8YByQrUFJCMSqWCndfFkpIyfkwd89RINHMI2-5odgkZlCRSLeDr-prVaTJmhZK-eSmWrBodqF2lJyyfHneSJk_nqkcDpr94E1rS2DVIFqH5UpagbfbOGPeGY" }
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 mb-24" id="species">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <h3 className="text-3xl font-display font-bold mb-2">Supported Species</h3>
                    <p className="text-slate-500 dark:text-slate-400">Our model is optimized for the most common pathogenic bacteria.</p>
                </div>
                <a className="cursor-target text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                    View all 50+ species <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-12">
                {speciesList.map((species, i) => (
                    <div key={i} className="group flex flex-col items-center text-center">
                        <div className="aspect-square w-full max-w-[140px] md:max-w-[160px] rounded-full overflow-hidden mb-4 relative border-4 border-slate-100 dark:border-slate-800/80 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(19,164,236,0.4)] transition-all duration-300">
                            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`Microscopic view of ${species.full}`} src={species.img} />
                            {/* Inner ring to give petri-dish feel */}
                            <div className="absolute inset-0 rounded-full border border-white/10 dark:border-white/5 pointer-events-none" />
                        </div>
                        <h4 className="font-bold text-sm mb-1 italic text-slate-900 dark:text-slate-100">{species.name}</h4>
                        <p className="text-xs text-slate-500 leading-tight px-2">{species.traits}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
