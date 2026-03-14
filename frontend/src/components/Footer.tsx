export const Footer = () => {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-2xl">coronavirus</span>
                            <h1 className="font-display font-bold text-xl tracking-tight">Bacsense 2.0</h1>
                        </div>
                        <p className="text-sm text-slate-500 max-w-sm">
                            An open-access platform for clinical microbiology research. Our mission is to accelerate pathogen identification through advanced hybrid neural networks and machine learning.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h6 className="font-bold text-sm">Resources</h6>
                        <ul className="text-sm text-slate-500 space-y-2">
                            <li><a className="hover:text-primary transition-colors" href="#">API Documentation</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">VGG16 Model Papers</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Dataset Disclosure</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Benchmarking</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h6 className="font-bold text-sm">Institutional</h6>
                        <ul className="text-sm text-slate-500 space-y-2">
                            <li><a className="hover:text-primary transition-colors" href="#">Research Partners</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Grant Information</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Legal &amp; Ethics</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Contact Lab</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">© 2026 Bacsense Scientific Systems. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">hub</span></a>
                        <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">science</span></a>
                        <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">school</span></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
