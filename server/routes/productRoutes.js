const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});

const upload = multer({ storage: storage });

// Mock Data Store (Fallback)
let mockProducts = [
    { _id: '1', title: 'Hot Wheels Twin Mill (Mock)', description: 'Mock Description', price: 19.99, category: 'Originals', images: [] },
    { _id: '2', title: 'Hot Wheels Bone Shaker (Mock)', description: 'Mock Description', price: 14.99, category: 'Hot Rods', images: [] },
    { _id: '3', title: 'Hot Wheels Deora II (Mock)', description: 'Futuristic surf truck design. Famous for its appearance in the World Race movie.', price: 24.99, category: 'Futuristic', images: [] }
];

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
    try {
        if (!req.app.locals.isDbConnected()) {
            return res.json(mockProducts);
        }
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product
router.get('/:id', async (req, res) => {
    try {
        if (!req.app.locals.isDbConnected()) {
            const product = mockProducts.find(p => p._id === req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            return res.json(product);
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/products
// @desc    Create a product with images
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        // Process image paths
        const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        if (!req.app.locals.isDbConnected()) {
            const newProduct = {
                _id: Date.now().toString(),
                title, description, price: Number(price), category, images: imagePaths, createdAt: new Date()
            };
            mockProducts.unshift(newProduct);
            return res.status(201).json(newProduct);
        }

        const newProduct = new Product({
            title,
            description,
            price,
            category,
            images: imagePaths
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product
router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, price, category, existingImages } = req.body;

        let imagePaths = [];
        if (existingImages) {
            imagePaths = Array.isArray(existingImages) ? existingImages : [existingImages];
        }
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            imagePaths = [...imagePaths, ...newImages];
        }

        if (!req.app.locals.isDbConnected()) {
            const index = mockProducts.findIndex(p => p._id === req.params.id);
            if (index === -1) return res.status(404).json({ message: 'Product not found' });

            mockProducts[index] = { ...mockProducts[index], title, description, price: Number(price), category, images: imagePaths };
            return res.json(mockProducts[index]);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, description, price, category, images: imagePaths },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete('/:id', async (req, res) => {
    try {
        if (!req.app.locals.isDbConnected()) {
            mockProducts = mockProducts.filter(p => p._id !== req.params.id);
            return res.json({ message: 'Product deleted' });
        }

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
