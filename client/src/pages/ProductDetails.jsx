import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import Loader from '../components/Loader';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <Loader />;
    if (!product) return <div>Product not found</div>;

    const images = product.images && product.images.length > 0 ? product.images : [];
    const mainImage = images.length > 0
        ? (images[activeImage].startsWith('http') ? images[activeImage] : `http://localhost:5000${images[activeImage]}`)
        : 'https://placehold.co/600x400';

    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-textMuted hover:text-white mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Garage
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
                {/* Left: Interactive Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="aspect-[4/3] bg-surface rounded-3xl p-8 border border-white/5 flex items-center justify-center overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <motion.img
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={mainImage}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain drop-shadow-2xl z-10"
                        />
                    </div>

                    {images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-24 h-24 rounded-xl border-2 p-2 flex-shrink-0 transition-all bg-surface ${activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-white/5 hover:border-white/20'}`}
                                >
                                    <img
                                        src={img.startsWith('http') ? img : `http://localhost:5000${img}`}
                                        className="w-full h-full object-contain"
                                        alt=""
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Right: Product Spec */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
                            {product.category}
                        </span>
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                            <ShieldCheck size={14} /> In Stock
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-4 tracking-tight">
                        {product.title}
                    </h1>

                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-4xl font-bold text-white font-mono">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-lg text-textMuted line-through decoration-red-500/50">
                            ${(product.price * 1.2).toFixed(2)}
                        </span>
                    </div>

                    <div className="prose prose-invert prose-lg mb-10 text-textMuted leading-relaxed border-l-2 border-white/10 pl-6">
                        {product.description}
                    </div>

                    {/* Action Area */}
                    <div className="space-y-4">
                        <button className="w-full bg-gradient-to-r from-primary to-rose-600 text-white px-8 py-5 rounded-xl font-bold text-xl hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/25">
                            <ShoppingBag size={24} />
                            Secure Acquisition
                        </button>

                        <div className="grid grid-cols-2 gap-4 text-xs font-medium text-textMuted text-center">
                            <div className="bg-surface p-3 rounded-lg flex items-center justify-center gap-2 border border-white/5">
                                <Truck size={16} /> Global Shipping Available
                            </div>
                            <div className="bg-surface p-3 rounded-lg flex items-center justify-center gap-2 border border-white/5">
                                <ShieldCheck size={16} /> Authenticity Guaranteed
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetails;
