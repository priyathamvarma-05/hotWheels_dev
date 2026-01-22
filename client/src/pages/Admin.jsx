import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, X, MoreVertical } from 'lucide-react';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Data State
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', category: '', image: null
    });

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if (confirm('Permanently remove this item from the collection?')) {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        if (formData.image) {
            for (let i = 0; i < formData.image.length; i++) {
                data.append('images', formData.image[i]);
            }
        }

        try {
            await axios.post('http://localhost:5000/api/products', data);
            setShowModal(false);
            fetchProducts();
            setFormData({ title: '', description: '', price: '', category: '', image: null });
        } catch (err) { console.error(err); alert('Failed to create product'); }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Console</h1>
                    <p className="text-textMuted">Manage your inventory and assets.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-600 transition shadow-lg shadow-primary/20"
                >
                    <Plus size={20} /> Add Asset
                </button>
            </div>

            <div className="bg-surface rounded-2xl shadow-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/20 text-xs uppercase text-textMuted font-bold tracking-wider">
                        <tr>
                            <th className="px-8 py-5">Product Name</th>
                            <th className="px-6 py-5">Category</th>
                            <th className="px-6 py-5">Price</th>
                            <th className="px-6 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-8 py-6 font-medium text-white text-lg">{product.title}</td>
                                <td className="px-6 py-6">
                                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm text-textMuted">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-6 text-white font-mono">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-textMuted hover:text-red-500 p-2 transition-colors bg-white/5 hover:bg-red-500/10 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                    <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative animate-fade-in ring-1 ring-white/10">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 text-textMuted hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-display font-bold mb-8 text-white">Add New Asset</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase text-textMuted mb-2">Title</label>
                                <input required name="title" onChange={handleInputChange} className="w-full bg-background border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-textMuted mb-2">Price</label>
                                    <input required type="number" name="price" onChange={handleInputChange} className="w-full bg-background border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-textMuted mb-2">Category</label>
                                    <input required name="category" onChange={handleInputChange} className="w-full bg-background border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-textMuted mb-2">Description</label>
                                <textarea required name="description" rows="3" onChange={handleInputChange} className="w-full bg-background border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors"></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-textMuted mb-2">Images</label>
                                <div className="relative">
                                    <input type="file" multiple name="image" onChange={handleFileChange} className="w-full bg-background border border-white/10 rounded-xl p-3 text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition shadow-lg shadow-primary/25 mt-4">
                                Confirm Asset
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
