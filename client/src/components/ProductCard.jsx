import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    const imageUrl = product.images && product.images.length > 0
        ? (product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`)
        : 'https://placehold.co/400x300?text=No+Image';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

            <Link to={`/product/${product._id}`} className="block h-full relative bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-white/5 to-transparent p-6 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/10">
                        {product.category}
                    </span>

                    <motion.img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-contain drop-shadow-2xl z-10"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />

                    {/* Background elements inside card */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Info */}
                <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-white mb-2 truncate group-hover:text-primary transition-colors">
                        {product.title}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-textMuted uppercase font-semibold">Current Value</span>
                            <span className="text-xl font-bold text-white font-mono">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all transform group-hover:translate-x-1">
                            <ArrowRight size={18} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
