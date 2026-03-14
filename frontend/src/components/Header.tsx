export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">coronavirus</span>
                    <h1 className="font-display font-bold text-2xl tracking-tight">Bacsense 2.0</h1>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    <a className="cursor-target text-sm font-medium hover:text-primary transition-colors" href="#">Home</a>
                    <a className="cursor-target text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400" href="#species">Supported Species</a>
                    <a className="cursor-target text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400" href="#upload">Upload</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="cursor-target bg-primary text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-all glow-primary">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
};
