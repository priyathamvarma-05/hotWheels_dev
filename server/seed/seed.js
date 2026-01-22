const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotwheels';

const sampleProducts = [
    {
        title: 'Hot Wheels Twin Mill',
        description: 'The legendary Twin Mill is one of the most recognizable Hot Wheels cars of all time. Features dual blown engines.',
        price: 19.99,
        category: 'Originals',
        images: ['https://upload.wikimedia.org/wikipedia/commons/e/e5/Hot_Wheels_Twin_Mill_II.jpg']
    },
    {
        title: 'Hot Wheels Bone Shaker',
        description: 'A classic hot rod design with a skull front grille. A fan favorite for years.',
        price: 14.99,
        category: 'Hot Rods',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/9/90/Bone_Shaker_%282019_Mainline%29.jpg']
    },
    {
        title: 'Hot Wheels Deora II',
        description: 'Futuristic surf truck design. Famous for its appearance in the World Race movie.',
        price: 24.99,
        category: 'Futuristic',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/8/87/Deora_II_%282000_First_Editions%29.JPG']
    },
    {
        title: 'Hot Wheels Rodger Dodger',
        description: 'Modified muscle car with a massive engine blowing out of the hood.',
        price: 12.99,
        category: 'Muscle',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/b/b3/Rodger_Dodger_%282019_Mainline%29.jpg']
    },
    {
        title: 'Hot Wheels Sharkruiser',
        description: 'Is it a shark? Is it a car? It is both! The predator of the track.',
        price: 9.99,
        category: 'Creatures',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/c/c5/Sharkruiser_%282018_Mainline%29.jpg']
    },
    {
        title: 'Hot Wheels 67 Camaro',
        description: 'The very first Hot Wheels car ever released. A true classic.',
        price: 29.99,
        category: 'Classics',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/6/6f/1967_Camaro_%281983_Hot_Ones%29.jpg']
    },
    {
        title: 'Hot Wheels Batmobile',
        description: 'The iconic ride of the Dark Knight. Crime fighting has never looked so good.',
        price: 15.99,
        category: 'Licensed',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/2/23/The_Batmobile_%282020_Mainline%29.jpg']
    },
    {
        title: 'Hot Wheels Purple Passion',
        description: 'Sleek, low-riding 50s custom Mercury. Smoothest ride in town.',
        price: 18.99,
        category: 'Classics',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/4/44/Purple_Passion_%281990_Mainline%29.jpg']
    },
    {
        title: 'Hot Wheels Way 2 Fast',
        description: 'An elongated streamliner built for pure speed.',
        price: 11.99,
        category: 'Speed',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/5/52/Way_2_Fast_%282020_Mainline%29.jpg']
    },
    {
        title: 'Hot Wheels Fast Fish',
        description: 'Sleek, aerodynamic, and ready to smoke the competition.',
        price: 8.99,
        category: 'Muscle',
        images: ['https://static.wikia.nocookie.net/hotwheels/images/3/36/Fast_Fish_%282008_New_Models%29.JPG']
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        await Product.insertMany(sampleProducts);
        console.log('🌱 Seeded database with 10 products');

        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
