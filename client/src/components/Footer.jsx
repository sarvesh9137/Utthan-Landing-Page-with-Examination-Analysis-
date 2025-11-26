import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-6 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        © {new Date().getFullYear()} Utthan Student Dashboard. All rights reserved.
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Developed by <span className="font-semibold text-slate-700 dark:text-slate-300">Sarvesh Singh</span> - Software Development Engineer
                    </div>
                </div>
            </div>
        </footer>
    );
}
