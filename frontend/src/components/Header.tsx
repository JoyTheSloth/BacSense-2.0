import { Link, useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">coronavirus</span>
                    <h1 className="font-display font-bold text-2xl tracking-tight">Bacsense 2.0</h1>
                </Link>
                <nav className="hidden md:flex items-center gap-10">
                    <Link className={`cursor-target text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'hover:text-primary text-slate-500 dark:text-slate-400'}`} to="/">Home</Link>
                    {location.pathname === '/' && (
                        <>
                            <a className="cursor-target text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400" href="#species">Supported Species</a>
                            <a className="cursor-target text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400" href="#upload">Upload</a>
                        </>
                    )}
                    <Link className={`cursor-target text-sm font-medium transition-colors ${location.pathname === '/docs' ? 'text-primary' : 'hover:text-primary text-slate-500 dark:text-slate-400'}`} to="/docs">Documentation</Link>
                    <Link className={`cursor-target text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-primary' : 'hover:text-primary text-slate-500 dark:text-slate-400'}`} to="/about">About/Research</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link to="/" className="cursor-target bg-primary text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-all glow-primary">
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
};
