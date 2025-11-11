const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const Consultation = require('./models/Consultation');
require('dotenv').config({ path: './config.env' });

// Demo data
const demoUsers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'client'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9876543211',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'architect'
    }
];

const demoProjects = [
    {
        title: 'Modern Family Home',
        description: 'A contemporary 3BHK house design with open kitchen and living area',
        type: 'house_plan',
        budget: 15000,
        plotSize: '30x40 feet',
        requirements: 'Modern design with Vastu compliance',
        status: 'in_progress'
    },
    {
        title: 'Luxury Villa Design',
        description: 'Premium villa with swimming pool and garden',
        type: 'elevation',
        budget: 25000,
        plotSize: '50x80 feet',
        requirements: 'Luxury finishes and premium materials',
        status: 'pending'
    }
];

const demoConsultations = [
    {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '9876543212',
        service: 'house_plan',
        message: 'I need help designing a small house for my family',
        plotSize: '25x30 feet',
        budget: '50000',
        timeline: '2 months',
        status: 'new'
    },
    {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '9876543213',
        service: 'interior',
        message: 'Looking for interior design for my new apartment',
        plotSize: '1200 sq ft',
        budget: '80000',
        timeline: '1 month',
        status: 'contacted'
    }
];

async function createDemoData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/houseyog_clone');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Project.deleteMany({});
        await Consultation.deleteMany({});
        console.log('Cleared existing demo data');

        // Create demo users
        const users = await User.insertMany(demoUsers);
        console.log('Created demo users');

        // Create demo projects
        const projects = await Project.insertMany(
            demoProjects.map((project, index) => ({
                ...project,
                client: users[0]._id,
                architect: users[1]._id
            }))
        );
        console.log('Created demo projects');

        // Create demo consultations
        await Consultation.insertMany(demoConsultations);
        console.log('Created demo consultations');

        console.log('\n🎉 Demo data created successfully!');
        console.log('\nDemo Users:');
        console.log('Client: john@example.com / password');
        console.log('Architect: jane@example.com / password');
        console.log('\nYou can now login and test the application.');

        process.exit(0);
    } catch (error) {
        console.error('Demo data creation failed:', error);
        process.exit(1);
    }
}

// Run demo data creation
createDemoData();

