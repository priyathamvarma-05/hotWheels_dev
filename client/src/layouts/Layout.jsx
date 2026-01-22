import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
            {/* Background Decor - Gradient Orbs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/20 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <Navbar />

            <main className="flex-grow layout-container py-8 z-10">
                {children}
            </main>

            <footer className="border-t border-white/5 py-8 mt-auto z-10 bg-black/20 backdrop-blur-sm">
                <div className="layout-container text-center text-sm text-textMuted">
                    <p className="mb-2">Built for Speed &middot; Built for Collectors</p>
                    <p>&copy; {new Date().getFullYear()} Hot Wheels Collector. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
