const mongoose = require('mongoose');
const Package = require('./models/Package');
require('dotenv').config({ path: './config.env' });

// Sample packages data
const samplePackages = [
    {
        name: 'Basic House Plan',
        description: 'Perfect for small homes and budget-conscious clients',
        price: 4499,
        features: [
            '2D Floor Plan',
            'Basic Elevation Design',
            'Site Plan',
            '2 Revisions',
            'PDF Delivery'
        ],
        category: 'house_plan',
        duration: '7-10 days',
        revisions: 2,
        isPopular: false
    },
    {
        name: 'Premium House Design',
        description: 'Complete house design with 3D visualization',
        price: 8999,
        features: [
            '2D Floor Plan',
            '3D Elevation Design',
            'Site Plan',
            'Structural Plan',
            '5 Revisions',
            '3D Views',
            'Material Suggestions'
        ],
        category: 'house_plan',
        duration: '10-15 days',
        revisions: 5,
        isPopular: true
    },
    {
        name: 'Complete Interior Design',
        description: 'Full interior design with 3D visualization',
        price: 12999,
        features: [
            '3D Interior Views',
            'Furniture Layout',
            'Material Selection',
            'Lighting Plan',
            'Unlimited Revisions',
            'Color Schemes',
            'Shopping List'
        ],
        category: 'interior',
        duration: '15-20 days',
        revisions: -1,
        isPopular: false
    },
    {
        name: '3D Elevation Design',
        description: 'Stunning 3D elevation for existing floor plans',
        price: 5999,
        features: [
            '3D Front Elevation',
            'Side Elevations',
            'Material Visualization',
            '3 Revisions',
            'High Resolution Images'
        ],
        category: 'elevation',
        duration: '5-7 days',
        revisions: 3,
        isPopular: false
    },
    {
        name: 'CAD Drafting Service',
        description: 'Professional CAD drawings and technical documentation',
        price: 2999,
        features: [
            'AutoCAD Drawings',
            'Technical Specifications',
            'Construction Details',
            '2 Revisions',
            'DWG Files'
        ],
        category: 'cad',
        duration: '3-5 days',
        revisions: 2,
        isPopular: false
    },
    {
        name: 'Luxury Home Design',
        description: 'Premium design package for luxury homes',
        price: 19999,
        features: [
            'Custom Floor Plans',
            '3D Exterior & Interior',
            'Landscape Design',
            'Unlimited Revisions',
            'Site Visits',
            'Project Management',
            'Premium Materials'
        ],
        category: 'house_plan',
        duration: '20-30 days',
        revisions: -1,
        isPopular: false
    }
];

async function initializeDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/houseyog_clone');
        console.log('Connected to MongoDB');

        // Clear existing packages
        await Package.deleteMany({});
        console.log('Cleared existing packages');

        // Insert sample packages
        await Package.insertMany(samplePackages);
        console.log('Inserted sample packages');

        console.log('Database initialization completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

// Run initialization
initializeDatabase();

