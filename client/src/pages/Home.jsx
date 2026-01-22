import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                // Fallback to empty array on error, layout handles empty state
                setError('Could not reach the garage. Is the server running?');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <Loader />;

    return (
        <div>
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center mb-16 border border-white/10 group">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt="Hero Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center max-w-3xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/20 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                            New Collection Drop
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6">
                            SPEED. STYLE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">LEGACY.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-textMuted mb-8 max-w-2xl mx-auto">
                            Secure the rarest 1:64 scale die-cast models. From vintage Redlines to modern Treasure Hunts.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                                Start Collecting <ChevronRight />
                            </button>
                            <button className="bg-surface/50 hover:bg-surface text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-md border border-white/10">
                                View Showroom
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Grid */}
            <section>
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">Showroom Floor</h2>
                        <p className="text-textMuted">Recently added die-cast models available for acquisition.</p>
                    </div>
                    <div className="hidden sm:block h-px flex-grow ml-8 bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>

                {error ? (
                    <div className="p-8 border border-red-500/20 bg-red-500/10 rounded-xl text-center">
                        <h3 className="text-red-400 font-bold text-xl mb-2">System Failure</h3>
                        <p className="text-red-300">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <ProductCard key={product._id || index} product={product} />
                        ))}
                    </div>
                )}

                {products.length === 0 && !error && (
                    <div className="text-center py-20 bg-surface/30 rounded-2xl border border-white/5 border-dashed">
                        <p className="text-textMuted text-lg">Garage is currently empty.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
