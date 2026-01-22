import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield, Flame, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-5'
                    }`}
            >
                <div className="layout-container flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/50 blur-md rounded-full group-hover:bg-primary/80 transition-all"></div>
                            <Flame className="relative text-primary fill-primary w-8 h-8 transform group-hover:scale-110 transition-transform -rotate-12" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-display font-black text-2xl tracking-tighter italic text-white group-hover:text-glow transition-all">
                                HOT<span className="text-primary">WHEELS</span>
                            </span>
                            <span className="text-[0.6rem] font-bold tracking-[0.3em] text-textMuted uppercase ml-1">Collector</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/">Garage</NavLink>
                        <NavLink to="/admin" icon={<Shield size={16} />}>Admin</NavLink>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-medium text-sm transition-all border border-white/5 hover:border-white/20">
                            Connect Wallet
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-xl font-bold">
                            <NavLink to="/" mobile>Garage</NavLink>
                            <NavLink to="/admin" mobile>Admin Console</NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const NavLink = ({ to, children, mobile, icon }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`relative flex items-center gap-2 transition-colors ${isActive ? 'text-primary' : 'text-textMuted hover:text-white'
                } ${mobile ? 'text-2xl py-2 border-b border-white/10' : 'text-sm font-medium'}`}
        >
            {icon}
            {children}
            {isActive && !mobile && (
                <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-glow"
                />
            )}
        </Link>
    );
};

export default Navbar;
